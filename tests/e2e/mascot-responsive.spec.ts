import { expect, test } from '@playwright/test'

test.describe('Mascot Responsive & Session E2E Tests', () => {
  test('renders correctly on desktop and supports role selection', async ({ page }) => {
    // Go to the process guide page
    await page.goto('/process')

    // The AI Guide Bot should be visible by default
    const guideBot = page.locator('.checklist-box')
    await expect(guideBot).toBeVisible()

    // Desktop mascot track column should be present in DOM
    const desktopMascot = page.locator('#mascot-track-col')
    await expect(desktopMascot).toBeVisible()

    // Check that the new Role Selection dropdown exists
    const roleSelect = page.locator('select[title="Đổi vai trò người dùng"]')
    await expect(roleSelect).toBeVisible()

    // Default value should be "tenant"
    await expect(roleSelect).toHaveValue('tenant')

    // Change role to "staff"
    await roleSelect.selectOption('staff')
    await expect(roleSelect).toHaveValue('staff')
  })

  test('renders correctly on mobile layout', async ({ page }) => {
    // Set viewport to mobile width
    await page.setViewportSize({ width: 375, height: 812 })

    await page.goto('/process')

    // On mobile, the desktop track is hidden
    const desktopMascot = page.locator('#mascot-track-col')
    await expect(desktopMascot).not.toBeVisible()

    // The checklist container should still be there
    const guideBot = page.locator('.checklist-box')
    await expect(guideBot).toBeVisible()
  })
})
