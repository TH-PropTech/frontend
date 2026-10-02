import { expect, test, type Page } from '@playwright/test'

/**
 * Luồng DEPOSIT_FIRST đầy đủ ở lớp UI, mock toàn bộ backend:
 * tenant đồng ý thỏa thuận cọc → khởi tạo yêu cầu thanh toán → callback ngân
 * hàng giả lập (qua focus lại tab, không reload) → stage chuyển sang move-in
 * → bước nhận nhà hiển thị quyết toán.
 *
 * Tham chiếu hành vi: frontend/src/widgets/contract-workspace/use-contract-workspace.ts
 * (refetch nền khi focus/visibilitychange, không bật spinner, không remount).
 */

const CONTRACT_ID = 'contract-1'
const TENANT_ID = 'tenant-1'
const LANDLORD_ID = 'landlord-1'
const AGREEMENT_ID = 'agreement-1'

interface ContractDepositView {
  agreementId: string | null
  agreementCode?: string | null
  amount: number
  currency?: string
  status: 'draft' | 'pending' | 'paid' | 'transferred'
  consentGiven?: boolean
  contentRevision?: number | null
  contentHash?: string | null
  paidAt: string | null
  txHash: string | null
}

interface FlowAction {
  action: string
  actorRole: 'tenant' | 'landlord' | 'staff'
  enabled: boolean
  reasonCode: string | null
  stage: string
}

interface FlowStage {
  key: string
  status: 'done' | 'active' | 'upcoming' | 'blocked' | 'skipped'
  blockers: unknown[]
  completedAt: string | null
}

/** Trạng thái view hợp đồng tối giản nhưng đủ field để render workspace & step move-in. */
function buildContractView(overrides: {
  depositStatus: ContractDepositView['status']
  consentGiven: boolean
  depositPaidAt?: string | null
  depositTxHash?: string | null
  contractStatus: string
  tenantSigned: boolean
  landlordSigned: boolean
  ledgerStatus: string
  ledgerTxHash: string | null
  stages: FlowStage[]
  activeStage: string
  nextActions: FlowAction[]
  settlement?: Record<string, unknown> | null
}) {
  return {
    contract: {
      id: CONTRACT_ID,
      code: 'HD-2030-001',
      status: overrides.contractStatus,
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
        terminationNoticeDays: 30,
      },
      startDate: '2030-02-01T00:00:00Z',
      endDate: '2031-02-01T00:00:00Z',
      executionMethod: 'POC_ECONSENT',
      notarizationStatus: 'not-requested',
      executionPolicy: {
        policyId: 'policy-deposit-first',
        version: 1,
        strategy: 'DEPOSIT_FIRST' as const,
        depositConfirmed: overrides.depositStatus === 'paid',
        activationReady: false,
        nextAction: 'Hoàn tất đặt cọc trước khi ký hợp đồng.',
      },
    },
    document: {
      mode: 'locked' as const,
      revision: 1,
      lockedAt: '2030-01-15T00:00:00Z',
      lockedHash: '0xlockedhash',
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
      annexes: [],
      integrity: 'valid' as const,
    },
    parties: {
      tenant: {
        id: TENANT_ID,
        name: 'Trần Văn Thuê',
        role: 'tenant' as const,
        maskedCccd: '079***111',
        address: 'Hà Nội',
        kycStatus: 'verified' as const,
        hasSigned: overrides.tenantSigned,
      },
      landlord: {
        id: LANDLORD_ID,
        name: 'Lê Thị Chủ',
        role: 'landlord' as const,
        maskedCccd: '079***222',
        address: 'TP.HCM',
        kycStatus: 'verified' as const,
        hasSigned: overrides.landlordSigned,
      },
    },
    deposit: {
      agreementId: AGREEMENT_ID,
      agreementCode: 'DA-1',
      amount: 20000000,
      currency: 'VND',
      status: overrides.depositStatus,
      consentGiven: overrides.consentGiven,
      contentRevision: 1,
      contentHash: 'deposit-hash-1',
      paidAt: overrides.depositPaidAt ?? null,
      txHash: overrides.depositTxHash ?? null,
    } satisfies ContractDepositView,
    actions: {
      canPayDeposit: overrides.depositStatus === 'pending',
      paymentReasonCode: null,
      signingEligibility: {
        eligible: false,
        reasonCode: 'DEPOSIT_REQUIRED',
        message: null,
      },
      canDownloadArtifact: true,
      artifactReasonCode: null,
      canEditContent: false,
      canLockContent: false,
    },
    ledger: {
      networkMode: 'simulation' as const,
      status: overrides.ledgerStatus,
      txHash: overrides.ledgerTxHash,
      blockNumber: null,
      verifiedAt: overrides.ledgerTxHash ? '2030-02-05T00:00:00Z' : null,
      onChainValid: overrides.ledgerTxHash ? true : null,
    },
    flow: {
      version: 1,
      strategy: 'DEPOSIT_FIRST' as const,
      stages: overrides.stages,
      activeStage: overrides.activeStage,
      nextActions: overrides.nextActions,
    },
    settlement: overrides.settlement ?? null,
  }
}

function stage(key: string, status: FlowStage['status']): FlowStage {
  return { key, status, blockers: [], completedAt: null }
}

async function mockAuditEvents(page: Page): Promise<void> {
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
}

test.describe('Contract workspace flow (DEPOSIT_FIRST, route mock)', () => {
  test('tenant consent → yêu cầu thanh toán → callback giả → stage chuyển → bước move-in', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem(
        'user',
        JSON.stringify({ id: 'tenant-1', roles: ['tenant'] })
      )
    })

    let viewState = buildContractView({
      depositStatus: 'pending',
      consentGiven: false,
      contractStatus: 'draft',
      tenantSigned: false,
      landlordSigned: false,
      ledgerStatus: 'not-requested',
      ledgerTxHash: null,
      stages: [
        stage('document', 'done'),
        stage('deposit', 'active'),
        stage('signing', 'upcoming'),
        stage('ledger', 'upcoming'),
      ],
      activeStage: 'deposit',
      nextActions: [
        {
          action: 'CONSENT_DEPOSIT',
          actorRole: 'tenant',
          enabled: true,
          reasonCode: null,
          stage: 'deposit',
        },
      ],
    })

    await page.route(`**/contracts/${CONTRACT_ID}/view`, route =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, data: viewState, error: null }),
      })
    )
    await mockAuditEvents(page)

    let consentRequestBody: Record<string, unknown> | undefined
    await page.route(
      `**/deposit-agreements/${AGREEMENT_ID}/consent`,
      async route => {
        consentRequestBody = JSON.parse(
          route.request().postData() ?? '{}'
        ) as Record<string, unknown>
        // Server đã ghi nhận đồng ý → view tiếp theo phản ánh consentGiven=true
        // và next action chuyển sang PAY_DEPOSIT.
        viewState = {
          ...viewState,
          deposit: { ...viewState.deposit, consentGiven: true },
          flow: {
            ...viewState.flow,
            nextActions: [
              {
                action: 'PAY_DEPOSIT',
                actorRole: 'tenant',
                enabled: true,
                reasonCode: null,
                stage: 'deposit',
              },
            ],
          },
        }
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true, data: null, error: null }),
        })
      }
    )

    let initRequestBody: Record<string, unknown> | undefined
    await page.route('**/bank/deposit/init', async route => {
      initRequestBody = JSON.parse(
        route.request().postData() ?? '{}'
      ) as Record<string, unknown>
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          data: {
            provider: 'mock-bank',
            txRef: 'TXREF-DEPOSIT-1',
            amount: 20000000,
            description: 'Thanh toan coc HD-2030-001',
            qrCode: 'data:image/png;base64,mock',
            deepLink: 'https://mock-bank.example/pay/TXREF-DEPOSIT-1',
            expiresAt: '2030-01-01T01:00:00.000Z',
            status: 'pending',
          },
          error: null,
        }),
      })
    })

    await page.goto(`/contracts/${CONTRACT_ID}`)
    await expect(page.getByTestId('contract-workspace')).toBeVisible()
    await expect(page.getByTestId('deposit-payment-panel')).toBeVisible()
    await expect(page.getByTestId('deposit-status-pending')).toBeVisible()

    const consentButton = page.getByRole('button', {
      name: 'Đồng ý thỏa thuận cọc',
    })
    await expect(consentButton).toBeVisible()
    await consentButton.click()

    await expect
      .poll(() => consentRequestBody)
      .toMatchObject({
        expectedRevision: 1,
        expectedContentHash: 'deposit-hash-1',
      })

    // Sau consent, panel tự refresh nền và hiện nút thanh toán.
    const payButton = page.getByRole('button', {
      name: /Thanh toán cọc ngay/,
    })
    await expect(payButton).toBeVisible()
    await payButton.click()

    await expect
      .poll(() => initRequestBody)
      .toMatchObject({ depositAgreementId: AGREEMENT_ID })

    await expect(page.getByText('Yêu cầu chuyển khoản')).toBeVisible()
    await expect(
      page.getByRole('link', { name: /Mở cổng thanh toán/ })
    ).toHaveAttribute('href', 'https://mock-bank.example/pay/TXREF-DEPOSIT-1')

    // Mô phỏng callback ngân hàng thành công ở tab khác: cập nhật view sang
    // trạng thái đã cọc + đã ký + stage chuyển hẳn sang move-in với quyết toán.
    viewState = buildContractView({
      depositStatus: 'paid',
      consentGiven: true,
      depositPaidAt: '2030-01-10T02:00:00.000Z',
      depositTxHash: '0xdepositpaid',
      contractStatus: 'active',
      tenantSigned: true,
      landlordSigned: true,
      ledgerStatus: 'confirmed-simulation',
      ledgerTxHash: '0xledgerconfirmed',
      stages: [
        stage('document', 'done'),
        stage('deposit', 'done'),
        stage('signing', 'done'),
        stage('ledger', 'done'),
        stage('move-in', 'active'),
      ],
      activeStage: 'move-in',
      nextActions: [
        {
          action: 'RECORD_HANDOVER',
          actorRole: 'landlord',
          enabled: false,
          reasonCode: null,
          stage: 'move-in',
        },
      ],
      settlement: {
        id: 'settlement-1',
        status: 'pending',
        total: 5000000,
        dueAt: '2030-02-05T00:00:00.000Z',
        statementHash: '0xsettlementhash',
        lines: [{ kind: 'security_topup', amount: 5000000, paymentId: null }],
        handover: null,
      },
    })

    // Quay lại tab (focus) để kích hoạt refetch nền — KHÔNG reload trang.
    await page.evaluate(() => {
      window.dispatchEvent(new Event('focus'))
    })

    await expect(page.getByTestId('deposit-status-paid')).toBeVisible()

    // Bước nhận nhà giờ đã mở vì flow.stages có 'move-in' đang active.
    await page.goto(`/contracts/${CONTRACT_ID}/steps/move-in`)
    await expect(page.getByTestId('contract-step-move-in')).toBeVisible()
    await expect(page.getByTestId('move-in-settlement-panel')).toBeVisible()
    await expect(page.getByTestId('contract-step-guard')).toHaveCount(0)
  })
})
