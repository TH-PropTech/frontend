import { expect, test } from '@playwright/test'

test('renders the home dashboard', async ({ page }) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', {
      name: /Tìm căn hộ phù hợp, minh bạch từng bước/i,
    })
  ).toBeVisible()
})
