import { expect, test } from '@playwright/test'

const preview = {
  transferId: 'transfer-1',
  targetUser: {
    id: 'target-1',
    email: 'owner@example.com',
    role: 'landlord',
  },
  sourceOwners: [{ userId: 'source-1', apartmentCount: 2 }],
  affectedCounts: {
    apartments: 2,
    openBookings: 1,
    openApplications: 1,
    contracts: 1,
    depositAgreements: 1,
    payments: 1,
    disputes: 0,
  },
  immutableCounts: {
    contracts: 1,
    depositAgreements: 1,
    payments: 1,
    disputes: 0,
  },
  conflicts: [],
  previewHash: `sha256:${'a'.repeat(64)}`,
  expiresAt: '2099-09-20T00:00:00.000Z',
}

test('completes the admin preview-confirm-result flow without credentials', async ({
  page,
}) => {
  let previewBody: unknown
  let applyBody: unknown
  let applyHeaders: Record<string, string> | undefined

  await page.addInitScript(() => {
    localStorage.setItem('accessToken', 'e2e-admin-token')
    localStorage.setItem(
      'user',
      JSON.stringify({
        name: 'E2E Admin',
        email: 'admin@example.com',
        roles: ['admin'],
      })
    )
  })

  await page.route('**/api/v1/ownership-transfers/preview', async route => {
    previewBody = route.request().postDataJSON()
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true, data: preview }),
    })
  })

  await page.route(
    '**/api/v1/ownership-transfers/transfer-1/apply',
    async route => {
      applyBody = route.request().postDataJSON()
      applyHeaders = await route.request().allHeaders()
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          data: {
            ...preview,
            status: 'completed',
            idempotencyKey: 'admin-transfer-transfer-1',
            completedAt: '2026-09-19T00:00:00.000Z',
            auditRecordCount: 7,
          },
        }),
      })
    }
  )

  await page.goto('/admin/ownership-transfer')
  await expect(page.getByTestId('ownership-transfer-panel')).toBeVisible()

  await page
    .locator('#ownership-transfer-target-email')
    .fill('owner@example.com')
  await page.getByTestId('ownership-transfer-preview-button').click()
  await expect(page.getByTestId('ownership-transfer-preview')).toBeVisible()

  await page.getByTestId('ownership-transfer-confirm-open').click()
  await expect(page.getByRole('alertdialog')).toBeVisible()
  await page.getByTestId('ownership-transfer-confirm-submit').click()

  await expect(page.getByRole('status')).toContainText('transfer-1')

  expect(JSON.stringify(previewBody)).not.toContain('password')
  expect(JSON.stringify(applyBody)).not.toContain('password')
  expect(applyBody).toEqual({ previewHash: preview.previewHash })
  expect(applyHeaders?.['idempotency-key']).toBe('admin-transfer-transfer-1')
})
