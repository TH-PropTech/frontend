import { expect, test, type Page } from '@playwright/test'

/**
 * Admin dashboard (route mock): publish biểu phí nền tảng sau khi có rà soát
 * pháp lý, và publish bố cục hợp đồng rồi xem bản xem trước (preview).
 *
 * Tham chiếu: frontend/src/features/platform-fees/ui/fee-schedule-editor.tsx,
 * frontend/src/features/contract-layouts/ui/layout-profile-editor.tsx,
 * frontend/src/widgets/staff-dashboard/ui/admin-dashboard.tsx (routes
 * /admin/fees và /admin/contract-layouts).
 */

async function loginAsAdmin(page: Page): Promise<void> {
  await page.addInitScript(() => {
    window.localStorage.setItem(
      'user',
      JSON.stringify({
        id: 'admin-1',
        name: 'Quản trị viên',
        email: 'admin@th-proptech.vn',
        roles: ['admin'],
      })
    )
  })
}

test.describe('Admin fees & contract layouts (route mock)', () => {
  test('publish biểu phí nền tảng sau khi có rà soát pháp lý', async ({
    page,
  }) => {
    await loginAsAdmin(page)

    await page.route('**/platform-fees/revenue', route =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          data: { paid: 0, unpaid: 0, waived: 0, invoices: 0 },
          error: null,
        }),
      })
    )

    let publishRequestBody: Record<string, unknown> | undefined
    await page.route(
      '**/platform-fees/admin/platform-fee-default/1/publish',
      async route => {
        publishRequestBody = JSON.parse(
          route.request().postData() ?? '{}'
        ) as Record<string, unknown>
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            success: true,
            data: {
              scheduleId: 'platform-fee-default',
              version: 1,
              status: 'published',
              legalReviewStatus: 'reviewed',
              reviewReference: 'LEGAL-REVIEW-2030-01',
            },
            error: null,
          }),
        })
      }
    )

    await page.goto('/admin/fees')
    await expect(page.getByTestId('fee-schedule-editor')).toBeVisible()

    await page.getByLabel('Trạng thái rà soát pháp lý').selectOption('reviewed')
    await page.getByLabel('Mã tham chiếu rà soát').fill('LEGAL-REVIEW-2030-01')
    const effectiveFromLocal = '2030-03-01T00:00'
    await page.getByLabel('Áp dụng từ').fill(effectiveFromLocal)
    const expectedEffectiveFromIso = new Date(effectiveFromLocal).toISOString()

    await page.getByRole('button', { name: 'Publish biểu phí' }).click()

    await expect
      .poll(() => publishRequestBody)
      .toMatchObject({
        effectiveFrom: expectedEffectiveFromIso,
      })

    const editor = page.getByTestId('fee-schedule-editor')
    await expect(editor.getByRole('status')).toHaveText(
      'Đã publish platform-fee-default@1.'
    )
    await expect(editor.getByRole('alert')).toHaveCount(0)
  })

  test('publish bố cục hợp đồng và thấy bản xem trước', async ({ page }) => {
    await loginAsAdmin(page)

    const previewProfile = {
      profileKey: 'default',
      version: 1,
      status: 'draft' as const,
      legalProfile: 'PRIVATE_CIVIL_APARTMENT_LEASE' as const,
      templateKey: null,
      blocks: [
        {
          blockId: 'PARTIES',
          order: 1,
          title: 'Các bên tham gia',
          visible: true,
        },
        {
          blockId: 'PROPERTY',
          order: 2,
          title: 'Thông tin căn hộ',
          visible: true,
        },
        {
          blockId: 'COMMERCIAL_TERMS',
          order: 3,
          title: 'Điều khoản thương mại',
          visible: true,
        },
        {
          blockId: 'LEGAL_ARTICLES',
          order: 4,
          title: 'Điều khoản pháp lý',
          visible: true,
        },
        { blockId: 'SIGNATURES', order: 5, title: 'Chữ ký', visible: true },
      ],
      supplementaryClauses: [],
    }

    await page.route('**/contract-layouts/admin/default/preview', route =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          data: previewProfile,
          error: null,
        }),
      })
    )

    let draftRequestBody: Record<string, unknown> | undefined
    await page.route('**/contract-layouts/admin/default/draft', async route => {
      draftRequestBody = JSON.parse(
        route.request().postData() ?? '{}'
      ) as Record<string, unknown>
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          data: {
            ...previewProfile,
            version: 2,
            status: 'published',
          },
          error: null,
        }),
      })
    })

    await page.goto('/admin/contract-layouts')
    await expect(page.getByTestId('layout-profile-editor')).toBeVisible()

    // Chưa tải layout draft cho tới khi bấm Xem trước.
    await expect(page.getByText('Chưa tải layout draft.')).toBeVisible()

    await page.getByRole('button', { name: /Xem trước/i }).click()

    await expect(page.getByText('Các bên tham gia')).toBeVisible()
    await expect(page.getByText('Chữ ký')).toBeVisible()
    const signaturesSwitch = page.getByRole('switch', {
      name: 'Hiển thị Chữ ký',
    })
    await expect(signaturesSwitch).toBeDisabled()

    await page.getByRole('button', { name: 'Lưu nháp' }).click()

    await expect
      .poll(() => draftRequestBody)
      .toMatchObject({
        legalProfile: 'PRIVATE_CIVIL_APARTMENT_LEASE',
        expectedRevision: 1,
      })
    await expect(
      page.getByTestId('layout-profile-editor').getByRole('alert')
    ).toHaveCount(0)
  })
})
