import { expect, test, type Page } from '@playwright/test'

const apartmentResponse = {
  id: 'apt-1',
  title: 'Căn hộ thử nghiệm',
  category: 'Căn hộ chung cư',
  tag: 'empty',
  tagText: 'Đang trống',
  description: 'Căn hộ dùng cho kiểm thử luồng thuê.',
  location: 'Thành phố Hồ Chí Minh',
  price: '12 triệu/tháng',
  priceNum: 12,
  area: '70 m²',
  areaNum: 70,
  rooms: '2 PN - 2 WC',
  city: 'Hồ Chí Minh',
  district: 'Bình Thạnh',
  ward: 'Phường 22',
  street: 'Nguyễn Hữu Cảnh',
  projectName: null,
  buildingId: null,
  buildingName: null,
  bedrooms: 2,
  bathrooms: 2,
  direction: 'Đông',
  balconyDirection: 'Nam',
  furniture: 'Cơ bản',
  moveInTime: 'Ngay lập tức',
  electricityPriceType: 'Giá nhà nước',
  waterPriceType: 'Giá nhà nước',
  internetPriceType: 'Cố định',
  amenities: [],
  isVerified: true,
  hasMedia: false,
  images360: [],
  image: '',
  gallery: [],
  status: 'available',
  pricingMode: 'packages',
  pricingRevision: 2,
  rentalPackages: [
    {
      packageId: 'pkg-12',
      version: 3,
      durationMonths: 12,
      monthlyRent: 12000000,
      depositPolicy: { type: 'MONTHS_OF_RENT', months: 2 },
      resolvedDepositAmount: 24000000,
      status: 'active',
    },
  ],
  landlord: null,
}

async function openApplication(page: Page): Promise<void> {
  await page.addInitScript(() => {
    window.localStorage.setItem(
      'user',
      JSON.stringify({ id: 'tenant-1', roles: ['tenant'] })
    )
  })
  await page.route('**/apartments/apt-1*', route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        data: apartmentResponse,
        error: null,
      }),
    })
  )
  await page.goto('/properties/apt-1')
  await page.getByTestId('rental-application-trigger').click()
  await page.getByTestId('rental-package-pkg-12').check()
  await page.locator('input[name="occupants"]').fill('1')
  await page.locator('input[name="moveInDate"]').fill('2030-01-01')
  await page.locator('input[name="occupation"]').fill('Engineer')
}

test('submits the selected package identity and server-derived duration', async ({
  page,
}) => {
  let requestBody: Record<string, unknown> | undefined
  await page.route('**/rental-applications', async route => {
    requestBody = JSON.parse(route.request().postData() ?? '{}') as Record<
      string,
      unknown
    >
    await route.fulfill({
      status: 201,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        data: { _id: 'application-1' },
        error: null,
      }),
    })
  })
  await openApplication(page)
  await page.getByTestId('rental-application-submit').click()

  await expect
    .poll(() => requestBody)
    .toMatchObject({
      apartmentId: 'apt-1',
      packageId: 'pkg-12',
      packageVersion: 3,
      leaseDurationMonths: 12,
    })
})

test('keeps a permission error visible when the application endpoint denies access', async ({
  page,
}) => {
  await page.route('**/rental-applications', route =>
    route.fulfill({
      status: 403,
      contentType: 'application/json',
      body: JSON.stringify({
        success: false,
        data: null,
        error: { code: 'HTTP_403', message: 'RENTAL_APPLICATION_FORBIDDEN' },
      }),
    })
  )
  await openApplication(page)
  await page.getByTestId('rental-application-submit').click()
  await expect(page.getByText('RENTAL_APPLICATION_FORBIDDEN')).toBeVisible()
})
