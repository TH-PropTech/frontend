import { expect, test, type Page } from '@playwright/test'

const depositFirstPolicy = {
  policyId: 'rental-policy-deposit-first',
  version: 1,
  strategy: 'DEPOSIT_FIRST' as const,
  contentHash: 'policy-deposit-first-hash',
}

const signFirstPolicy = {
  policyId: 'rental-policy-sign-first',
  version: 1,
  strategy: 'SIGN_FIRST' as const,
  contentHash: 'policy-sign-first-hash',
}

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

const rentalTerms = {
  key: 'rental-standard',
  version: 1,
  title: 'Quy chế thuê căn hộ',
  summary: 'Điều khoản kiểm thử cho quy trình đặt thuê.',
  sections: [],
  contentHash: 'rental-terms-hash',
  publishedAt: '2030-01-01T00:00:00.000Z',
}

function rentalContext(apartment = apartmentResponse) {
  return {
    enabled: true,
    eligible: true,
    reasonCode: null,
    listing: {
      id: apartment.id,
      title: apartment.title,
      address: 'Nguyễn Hữu Cảnh, Bình Thạnh',
      area: apartment.areaNum,
      status: apartment.status,
      landlordDisplayName: null,
    },
    pricingRevision: apartment.pricingRevision,
    packages: [
      {
        ...apartment.rentalPackages[0],
        currency: 'VND' as const,
        allowedExecutionPolicies: [depositFirstPolicy, signFirstPolicy],
        defaultExecutionPolicy: depositFirstPolicy,
      },
    ],
    disclosure: {
      version: 'rental-review-v1',
      hash: 'rental-disclosure-hash',
      items: [],
    },
    terms: {
      key: rentalTerms.key,
      version: rentalTerms.version,
      hash: rentalTerms.contentHash,
      url: '/terms',
    },
    flowProfile: null,
  }
}

function submittedApplication(
  policy: typeof depositFirstPolicy | typeof signFirstPolicy
) {
  return {
    _id: 'application-1',
    apartmentId: 'apt-1',
    tenantId: 'tenant-1',
    landlordId: 'landlord-1',
    status: 'pending' as const,
    reasonCode: null,
    actorId: null,
    actorTimestamp: null,
    createdAt: '2030-01-01T00:00:00.000Z',
    updatedAt: '2030-01-01T00:00:00.000Z',
    occupants: 1,
    moveInDate: '2030-01-01',
    occupation: 'Engineer',
    hasPets: false,
    packageSnapshot: {
      packageId: 'pkg-12',
      version: 3,
      durationMonths: 12 as const,
      monthlyRent: 12000000,
      resolvedDepositAmount: 24000000,
      allowedExecutionPolicies: [depositFirstPolicy, signFirstPolicy],
      defaultExecutionPolicy: depositFirstPolicy,
    },
    executionPolicySnapshot: policy,
    contractId: null,
    depositAgreementId: null,
    provisioningStatus: 'not-started' as const,
    provisioningErrorCode: null,
    applicationRevision: 1,
    contractHandoff: {
      state: 'pending' as const,
      contractId: null,
      href: null,
      reasonCode: null,
    },
  }
}

async function mockRentalContext(
  page: Page,
  apartment = apartmentResponse
): Promise<void> {
  await page.route('**/rental-applications/context/apt-1', route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        data: rentalContext(apartment),
        error: null,
      }),
    })
  )
  await page.route('**/legal-terms/rental/versions/1', route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true, data: rentalTerms, error: null }),
    })
  )
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
  await mockRentalContext(page)
  await page.goto('/properties/apt-1')
  await expect(page.locator('a[href="/properties/apt-1/apply"]')).toBeVisible()
  await page.locator('a[href="/properties/apt-1/apply"]').click()
  await expect(page.getByTestId('apply-step-info-form')).toBeVisible()
  await page.locator('#occupation-input').fill('Engineer')
  await page
    .getByTestId('apply-step-info-form')
    .locator('button[type="submit"]')
    .click()
  await expect(page.getByTestId('apply-step-package')).toBeVisible()
}

async function completeApplicationForm(
  page: Page,
  policy: typeof depositFirstPolicy | typeof signFirstPolicy
): Promise<void> {
  await page.getByTestId('package-card-pkg-12').click()
  await page.getByTestId(`execution-policy-${policy.strategy}`).click()
  await page
    .getByTestId('apply-step-package')
    .locator('button')
    .filter({ hasText: 'Xem' })
    .click()
  await expect(page.getByTestId('apply-step-consent')).toBeVisible()
  await page.getByTestId('execution-policy-acceptance-checkbox').click()
  await page.getByTestId('terms-acceptance-checkbox').click()
  await page.getByTestId('apply-step-consent').locator('button').last().click()
}

test('submits the selected package and SIGN_FIRST execution policy', async ({
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
        data: submittedApplication(signFirstPolicy),
        error: null,
      }),
    })
  })
  await openApplication(page)
  await completeApplicationForm(page, signFirstPolicy)

  await expect(page.getByTestId('apply-step-submitted')).toBeVisible()
  await expect
    .poll(() => requestBody)
    .toMatchObject({
      apartmentId: 'apt-1',
      packageId: 'pkg-12',
      packageVersion: 3,
      selectedExecutionPolicy: signFirstPolicy,
    })
})

test('submits the selected package and DEPOSIT_FIRST execution policy', async ({
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
        data: submittedApplication(depositFirstPolicy),
        error: null,
      }),
    })
  })
  await openApplication(page)
  await completeApplicationForm(page, depositFirstPolicy)

  await expect(page.getByTestId('apply-step-submitted')).toBeVisible()
  await expect
    .poll(() => requestBody)
    .toMatchObject({
      apartmentId: 'apt-1',
      packageId: 'pkg-12',
      packageVersion: 3,
      selectedExecutionPolicy: depositFirstPolicy,
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
  await completeApplicationForm(page, depositFirstPolicy)
  await expect(page.getByTestId('flow-error-banner')).toContainText(
    'RENTAL_APPLICATION_FORBIDDEN'
  )
})

test('blocks the application CTA when the apartment is already reserved', async ({
  page,
}) => {
  const reservedApartment = {
    ...apartmentResponse,
    status: 'reserved',
    tag: 'reserved',
    tagText: 'Có người giữ chỗ',
  }

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
        data: reservedApartment,
        error: null,
      }),
    })
  )
  await page.goto('/properties/apt-1')
  await expect(page.getByTestId('rental-application-unavailable')).toBeVisible()
  await expect(page.locator('a[href="/properties/apt-1/apply"]')).toHaveCount(0)
})
