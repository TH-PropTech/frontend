import { expect, test } from '@playwright/test'

test.describe('Apartment Floorplan Dollhouse Preview E2E Tests', () => {
  test('initializes in dollhouse preview and transitions into interior room on room selection', async ({
    page,
  }) => {
    await page.goto('/apartment-floorplan/index.html')

    // Handshake initialization
    await page.evaluate(() => {
      window.postMessage(
        {
          version: 1,
          type: 'FLOORPLAN_INIT',
          payload: {
            version: 1,
            apartmentId: 'e2e-apt-1',
            bedrooms: 2,
            bathrooms: 1,
            areaM2: 70,
            furnishing: 'full',
          },
        },
        '*'
      )
    })

    // Markers container and room list should be populated
    const markers = page.locator('#room-markers')
    await expect(markers).toBeAttached()

    const roomList = page.locator('#room-list button')
    await expect(roomList.first()).toBeVisible()

    // Overview button should initially be hidden in EXTERIOR_PREVIEW
    const overviewButton = page.locator('#overview-button')
    await expect(overviewButton).toBeHidden()

    // Click on a room from the room list to enter INTERIOR_ORBIT
    const firstRoom = roomList.first()
    await firstRoom.click()

    // Overview button should now become visible
    await expect(overviewButton).toBeVisible()

    // Click "Quay lại tổng quan" to return to EXTERIOR_PREVIEW
    await overviewButton.click()
    await expect(overviewButton).toBeHidden()
  })
})
