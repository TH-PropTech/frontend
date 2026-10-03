import { expect, test, type Page } from '@playwright/test'
import {
  buildEventDetail,
  buildEventSummary,
  buildEventsPage,
  buildFinding,
  buildFindingsPage,
  buildOverview,
  buildRun,
  buildRunsPage,
} from '../../src/features/fabric-audit/test-fixtures/fabric-audit.fixtures'

const RUN_ID = '66f000000000000000000001'
const EVENT_ID = '66f0000000000000000000a1'
const FINDING_ID = '66f000000000000000000f01'

function response(data: unknown): string {
  return JSON.stringify({ success: true, data, error: null })
}

async function signIn(page: Page, role: 'admin' | 'staff'): Promise<void> {
  await page.addInitScript(currentRole => {
    window.localStorage.setItem(
      'user',
      JSON.stringify({
        id: `${currentRole}-1`,
        name: currentRole === 'admin' ? 'Quản trị viên' : 'Nhân viên vận hành',
        email: `${currentRole}@th-proptech.test`,
        roles: [currentRole],
      })
    )
  }, role)
}

async function mockAuditApi(page: Page): Promise<void> {
  const simulatedOverview = buildOverview({
    runtime: {
      mode: 'simulation',
      state: 'simulation',
      ready: false,
      connectionState: 'disabled',
      abiVersion: null,
      evidenceSchemaVersions: [2],
      errorCodes: ['FABRIC_SIMULATION_MODE'],
    },
  })
  const event = buildEventSummary({ id: EVENT_ID })
  const detail = buildEventDetail({ id: EVENT_ID })
  const run = buildRun({ id: RUN_ID })

  await page.route('**/fabric/audit/overview', route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: response(simulatedOverview),
    })
  )
  await page.route('**/fabric/audit/events**', route => {
    if (route.request().url().endsWith(`/fabric/audit/events/${EVENT_ID}`)) {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: response(detail),
      })
    }
    return route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: response(buildEventsPage([event])),
    })
  })
  await page.route('**/fabric/reconciliation-runs**', route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: response(buildRunsPage([run])),
    })
  )
  await page.route('**/fabric/reconciliation-runs/**', route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: response(run),
    })
  )
  await page.route('**/fabric/reconciliation-runs/**/findings**', route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: response(buildFindingsPage()),
    })
  )
  await page.route(
    `**/fabric/reconciliation-findings/${FINDING_ID}/repair`,
    route =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: response({
          finding: buildFinding({ status: 'repair-pending' }),
          outboxId: 'outbox-1',
          alreadyRepaired: false,
        }),
      })
  )
}

test.describe('Fabric Audit Center (deterministic API fixtures)', () => {
  test('admin sees the simulation state, filters events and opens the available Explorer link', async ({
    page,
  }) => {
    await signIn(page, 'admin')
    await mockAuditApi(page)

    await page.goto('/admin/fabric-audit')
    await expect(
      page.getByRole('heading', { name: 'Fabric Audit Center', level: 2 })
    ).toBeVisible()
    await expect(
      page.getByText('Chế độ mô phỏng', { exact: true })
    ).toBeVisible()

    await page.getByRole('tab', { name: 'Sự kiện' }).click()
    await page.getByLabel('Loại sự kiện').selectOption('contract.activated')
    await page.getByRole('button', { name: 'Áp dụng bộ lọc' }).click()
    await expect(page).toHaveURL(/tab=events.*eventType=contract\.activated/)
    await page.getByRole('button', { name: 'Xem chi tiết sự kiện' }).click()
    await expect(
      page.getByRole('link', { name: 'Mở trong Explorer' })
    ).toHaveAttribute('href', /explorer\.example\.test/)
  })

  test('staff is read-only while admin can repair through the outbox-only dialog', async ({
    page,
  }) => {
    await signIn(page, 'staff')
    await mockAuditApi(page)

    await page.goto('/admin/fabric-audit?tab=reconciliation')
    await expect(page.getByText(/Chế độ chỉ xem/)).toBeVisible()
    await page
      .getByRole('button', { name: 'Xem chi tiết lần đối soát' })
      .click()
    await expect(page.getByText('Chỉ quản trị viên được sửa.')).toBeVisible()
    await expect(
      page.getByRole('button', { name: 'Sửa phát hiện' })
    ).toHaveCount(0)

    await page.evaluate(() => {
      window.localStorage.setItem(
        'user',
        JSON.stringify({
          id: 'admin-1',
          name: 'Quản trị viên',
          email: 'admin@th-proptech.test',
          roles: ['admin'],
        })
      )
      window.dispatchEvent(new StorageEvent('storage', { key: 'user' }))
    })
    await expect(page.getByText('Quản trị viên: được thao tác')).toBeVisible()
    await page.getByRole('button', { name: 'Sửa phát hiện' }).click()
    await page.getByLabel('Lý do').fill('Tạo lại tác vụ outbox bị thiếu')
    await page.getByRole('button', { name: 'Xác nhận sửa' }).click()
    await expect(page.getByRole('status')).toContainText(
      'Đã tạo tác vụ sửa outbox-1'
    )
  })
})
