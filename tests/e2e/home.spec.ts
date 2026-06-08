import { expect, test } from '@playwright/test'

test('renders the home dashboard', async ({ page }) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', {
      name: /frontend foundation for scalable property workflows/i,
    })
  ).toBeVisible()
})
