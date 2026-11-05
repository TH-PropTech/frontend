import { expect, test, type Page } from '@playwright/test'

/**
 * Yêu cầu chỉnh sửa hợp đồng nháp ở lớp UI, mock toàn bộ backend:
 * chủ nhà gửi yêu cầu → khách đồng ý hoặc từ chối → hợp đồng hiển thị đúng.
 *
 * Tham chiếu: frontend/src/features/contracts/ui/contract-change-requests-panel.tsx
 * và backend contract-change-request.controller.ts.
 */

const CONTRACT_ID = 'contract-cr-1'
const TENANT_ID = 'tenant-1'
const LANDLORD_ID = 'landlord-1'
const CLAUSES = 'Không nuôi thú cưng. Giờ yên tĩnh 22:00 đến 06:00.'

interface ChangeRequestRecord {
  _id: string
  contractId: string
  sequence: number
  status: 'pending-counterparty' | 'applied' | 'rejected'
  requestedBy: string
  requestedRole: 'landlord' | 'tenant'
  changes: Array<{ field: string; before: unknown; after: unknown }>
  reason: string
  baseRevision: number
  decisionReason?: string
  expiresAt: string
  createdAt: string
}

interface ServerState {
  terminationNoticeDays: number
  commercialRevision: number
  locked: boolean
  requests: ChangeRequestRecord[]
}

function ok(data: unknown): {
  status: number
  contentType: string
  body: string
} {
  return {
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({ success: true, data, error: null }),
  }
}

function buildView(state: ServerState) {
  return {
    contract: {
      id: CONTRACT_ID,
      code: 'HD-2030-CR1',
      status: state.locked ? 'awaiting-signature' : 'draft',
      property: {
        id: 'prop-1',
        title: 'Căn hộ Sunrise City',
        address: '23 Nguyễn Hữu Thọ, Q7',
        area: 70,
        furniture: 'Đầy đủ',
        value: 20000000,
      },
      commercial: {
        monthlyRent: 10000000,
        deposit: 20000000,
        paymentDay: 5,
        latePenaltyRate: 0.05,
        terminationNoticeDays: state.terminationNoticeDays,
      },
      startDate: '2030-02-01T00:00:00Z',
      endDate: '2031-02-01T00:00:00Z',
      executionMethod: 'POC_ECONSENT',
      notarizationStatus: 'not-requested',
      executionPolicy: {
        policyId: 'policy-sign-first',
        version: 1,
        strategy: 'SIGN_FIRST' as const,
        depositConfirmed: false,
        activationReady: false,
        nextAction: 'Hai bên rà soát nội dung trước khi ký.',
      },
    },
    document: {
      mode: state.locked ? ('locked' as const) : ('draft' as const),
      revision: 1,
      lockedAt: state.locked ? '2030-01-15T00:00:00Z' : null,
      lockedHash: state.locked ? '0xlockedhash' : null,
      hashSchemaVersion: 1,
      legalProfile: null,
      templateVersion: '1.0',
      sections: [
        {
          id: 'sec-1',
          number: 1,
          title: 'Đối tượng hợp đồng',
          content: 'Bên A cho Bên B thuê căn hộ Sunrise City.',
          protected: true,
          hash: 'h-1',
        },
      ],
      annexes: [
        {
          id: 'LANDLORD_CUSTOM_CLAUSES',
          title: 'Điều khoản bổ sung do chủ nhà cung cấp',
          description: CLAUSES,
          required: false,
        },
      ],
      integrity: state.locked ? ('valid' as const) : ('not-locked' as const),
    },
    parties: {
      tenant: {
        id: TENANT_ID,
        name: 'Trần Văn Thuê',
        role: 'tenant' as const,
        maskedCccd: '079***111',
        address: 'Hà Nội',
        kycStatus: 'verified' as const,
        hasSigned: false,
      },
      landlord: {
        id: LANDLORD_ID,
        name: 'Lê Thị Chủ',
        role: 'landlord' as const,
        maskedCccd: '079***222',
        address: 'TP.HCM',
        kycStatus: 'verified' as const,
        hasSigned: false,
      },
    },
    deposit: null,
    access: { canSign: true },
    actions: {
      canPayDeposit: false,
      paymentReasonCode: null,
      signingEligibility: {
        eligible: false,
        reasonCode: 'CONTENT_NOT_LOCKED',
        message: null,
      },
      canDownloadArtifact: false,
      artifactReasonCode: null,
      canEditContent: false,
      canLockContent: false,
    },
    ledger: {
      networkMode: 'simulation' as const,
      status: 'not-requested',
      txHash: null,
      blockNumber: null,
      verifiedAt: null,
      onChainValid: null,
    },
    flow: {
      version: 1,
      strategy: 'SIGN_FIRST' as const,
      stages: [
        { key: 'document', status: 'active', blockers: [], completedAt: null },
        { key: 'signing', status: 'upcoming', blockers: [], completedAt: null },
      ],
      activeStage: 'document',
      nextActions: [],
    },
    settlement: null,
  }
}

async function mockBackend(
  page: Page,
  state: ServerState,
  captured: { create?: Record<string, unknown>; actions: string[] }
): Promise<void> {
  await page.route(`**/contracts/${CONTRACT_ID}/view`, route =>
    route.fulfill(ok(buildView(state)))
  )
  await page.route(`**/contracts/${CONTRACT_ID}/audit-events`, route =>
    route.fulfill({
      status: 404,
      contentType: 'application/json',
      body: JSON.stringify({
        success: false,
        data: null,
        error: { code: 'HTTP_404', message: 'NOT_FOUND' },
      }),
    })
  )
  await page.route(`**/contracts/${CONTRACT_ID}/amendments`, route =>
    route.fulfill(ok([]))
  )
  await page.route(
    `**/contracts/${CONTRACT_ID}/change-requests`,
    async route => {
      if (route.request().method() === 'POST') {
        const body = JSON.parse(route.request().postData() ?? '{}') as {
          changes: Array<{ field: string; after: number }>
          reason: string
          expectedRevision: number
        }
        captured.create = body
        const record: ChangeRequestRecord = {
          _id: 'req-1',
          contractId: CONTRACT_ID,
          sequence: 1,
          status: 'pending-counterparty',
          requestedBy: LANDLORD_ID,
          requestedRole: 'landlord',
          changes: body.changes.map(change => ({
            field: change.field,
            before: state.terminationNoticeDays,
            after: change.after,
          })),
          reason: body.reason,
          baseRevision: body.expectedRevision,
          expiresAt: '2030-01-08T00:00:00Z',
          createdAt: '2030-01-01T00:00:00Z',
        }
        state.requests = [record]
        await route.fulfill(ok(record))
        return
      }
      await route.fulfill(
        ok({
          commercialRevision: state.commercialRevision,
          locked: state.locked,
          items: state.requests,
        })
      )
    }
  )
  await page.route(
    `**/contracts/${CONTRACT_ID}/change-requests/req-1/accept`,
    async route => {
      captured.actions.push('accept')
      const request = state.requests[0]
      if (request) {
        request.status = 'applied'
        const change = request.changes[0]
        if (change) state.terminationNoticeDays = Number(change.after)
        state.commercialRevision += 1
      }
      await route.fulfill(ok(request))
    }
  )
  await page.route(
    `**/contracts/${CONTRACT_ID}/change-requests/req-1/reject`,
    async route => {
      captured.actions.push('reject')
      const request = state.requests[0]
      if (request) {
        request.status = 'rejected'
        request.decisionReason = (
          JSON.parse(route.request().postData() ?? '{}') as { reason: string }
        ).reason
      }
      await route.fulfill(ok(request))
    }
  )
}

async function loginAs(page: Page, id: string, role: string): Promise<void> {
  await page.addInitScript(
    ([userId, userRole]) => {
      window.localStorage.setItem(
        'user',
        JSON.stringify({ id: userId, roles: [userRole] })
      )
    },
    [id, role]
  )
}

function pendingRequest(): ChangeRequestRecord {
  return {
    _id: 'req-1',
    contractId: CONTRACT_ID,
    sequence: 1,
    status: 'pending-counterparty',
    requestedBy: LANDLORD_ID,
    requestedRole: 'landlord',
    changes: [{ field: 'terminationNoticeDays', before: 30, after: 45 }],
    reason: 'Cần báo trước lâu hơn',
    baseRevision: 0,
    expiresAt: '2030-01-08T00:00:00Z',
    createdAt: '2030-01-01T00:00:00Z',
  }
}

test.describe('Contract draft change requests (route mock)', () => {
  test('landlord requests a change, the draft shows the clauses annex and the request waits for the tenant', async ({
    page,
  }) => {
    await loginAs(page, LANDLORD_ID, 'landlord')
    const state: ServerState = {
      terminationNoticeDays: 30,
      commercialRevision: 0,
      locked: false,
      requests: [],
    }
    const captured: { create?: Record<string, unknown>; actions: string[] } = {
      actions: [],
    }
    await mockBackend(page, state, captured)

    await page.goto(`/contracts/${CONTRACT_ID}`)
    await expect(page.getByTestId('contract-workspace')).toBeVisible()
    await expect(
      page.getByTestId('annex-LANDLORD_CUSTOM_CLAUSES')
    ).toContainText('Không nuôi thú cưng.')

    await page.getByTestId('change-request-open').click()
    await page
      .getByTestId('change-request-field')
      .selectOption('terminationNoticeDays')
    await page.getByTestId('change-request-value').fill('45')
    await page
      .getByTestId('change-request-reason')
      .fill('Cần báo trước lâu hơn')
    await page.getByTestId('change-request-submit').click()

    await expect
      .poll(() => captured.create)
      .toMatchObject({
        changes: [{ field: 'terminationNoticeDays', after: 45 }],
        reason: 'Cần báo trước lâu hơn',
        expectedRevision: 0,
      })
    const card = page.getByTestId('change-request-req-1')
    await expect(card).toContainText('Chờ bên còn lại phản hồi')
    await expect(card).toContainText('30 → 45')
    // Người đề nghị không tự đồng ý được, chỉ rút được.
    await expect(page.getByTestId('change-request-accept-req-1')).toHaveCount(0)
    await expect(page.getByTestId('change-request-cancel-req-1')).toBeVisible()
    await expect(page.getByTestId('change-request-open')).toBeDisabled()
  })

  test('tenant accepts and the draft is refreshed with the agreed term', async ({
    page,
  }) => {
    await loginAs(page, TENANT_ID, 'tenant')
    const state: ServerState = {
      terminationNoticeDays: 30,
      commercialRevision: 0,
      locked: false,
      requests: [pendingRequest()],
    }
    const captured: { create?: Record<string, unknown>; actions: string[] } = {
      actions: [],
    }
    await mockBackend(page, state, captured)

    await page.goto(`/contracts/${CONTRACT_ID}`)
    const card = page.getByTestId('change-request-req-1')
    await expect(card).toContainText('30 → 45')
    await page.getByTestId('change-request-accept-req-1').click()

    await expect.poll(() => captured.actions).toEqual(['accept'])
    await expect(card).toContainText('Đã đồng ý và cập nhật hợp đồng')
    expect(state.terminationNoticeDays).toBe(45)
    await expect(page.getByTestId('change-request-accept-req-1')).toHaveCount(0)
  })

  test('tenant rejects with a reason and the draft stays unchanged', async ({
    page,
  }) => {
    await loginAs(page, TENANT_ID, 'tenant')
    const state: ServerState = {
      terminationNoticeDays: 30,
      commercialRevision: 0,
      locked: false,
      requests: [pendingRequest()],
    }
    const captured: { create?: Record<string, unknown>; actions: string[] } = {
      actions: [],
    }
    await mockBackend(page, state, captured)

    await page.goto(`/contracts/${CONTRACT_ID}`)
    await page.getByTestId('change-request-reject-req-1').click()
    const confirm = page.getByTestId('change-request-decision-confirm')
    await expect(confirm).toBeDisabled()
    await page
      .getByTestId('change-request-decision-reason')
      .fill('Không đồng ý')
    await confirm.click()

    await expect.poll(() => captured.actions).toEqual(['reject'])
    const card = page.getByTestId('change-request-req-1')
    await expect(card).toContainText('Bị từ chối')
    await expect(card).toContainText('Phản hồi: Không đồng ý')
    expect(state.terminationNoticeDays).toBe(30)
    expect(state.commercialRevision).toBe(0)
  })

  test('a locked contract sends participants to amendments instead of change requests', async ({
    page,
  }) => {
    await loginAs(page, LANDLORD_ID, 'landlord')
    const state: ServerState = {
      terminationNoticeDays: 30,
      commercialRevision: 1,
      locked: true,
      requests: [{ ...pendingRequest(), status: 'applied' }],
    }
    await mockBackend(page, state, { actions: [] })

    await page.goto(`/contracts/${CONTRACT_ID}`)
    await expect(page.getByTestId('change-requests-panel')).toContainText(
      'dùng phụ lục hợp đồng'
    )
    await expect(page.getByTestId('change-request-open')).toHaveCount(0)
  })
})
