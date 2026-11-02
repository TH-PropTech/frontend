import { beforeEach, describe, expect, it, vi } from 'vitest'
import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ApiClientError } from '@/shared/api'
import { buildEventDetail } from '../test-fixtures/fabric-audit.fixtures'
import { renderWithQuery } from '../test-fixtures/render-with-query'
import { AuditEventDetailSheet } from './audit-event-detail-sheet'

const api = vi.hoisted(() => ({ getAuditEvent: vi.fn() }))
vi.mock('../api/fabric-audit-api', () => api)

const EVENT_ID = '66f0000000000000000000a1'

beforeEach(() => {
  vi.clearAllMocks()
})

describe('AuditEventDetailSheet', () => {
  it('does not request anything while closed', () => {
    renderWithQuery(<AuditEventDetailSheet eventId={null} onClose={vi.fn()} />)
    expect(api.getAuditEvent).not.toHaveBeenCalled()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('shows a loading status', () => {
    api.getAuditEvent.mockReturnValue(new Promise(() => undefined))
    renderWithQuery(
      <AuditEventDetailSheet eventId={EVENT_ID} onClose={vi.fn()} />
    )
    expect(
      screen.getByRole('status', { name: 'Đang tải chi tiết sự kiện' })
    ).toBeInTheDocument()
  })

  it('maps a stable not-found code to a readable error', async () => {
    api.getAuditEvent.mockRejectedValue(
      new ApiClientError('nf', 404, {
        code: 'HTTP_404',
        message: 'nf',
        details: { code: 'AUDIT_EVENT_NOT_FOUND' },
      })
    )
    renderWithQuery(
      <AuditEventDetailSheet eventId={EVENT_ID} onClose={vi.fn()} />
    )
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Không tìm thấy sự kiện bằng chứng này.'
    )
  })

  it('shows a committed live event with block, hash, dependencies and verification', async () => {
    api.getAuditEvent.mockResolvedValue(buildEventDetail())
    renderWithQuery(
      <AuditEventDetailSheet eventId={EVENT_ID} onClose={vi.fn()} />
    )

    const dialog = await screen.findByRole('dialog')
    expect(
      await within(dialog).findByText('Kích hoạt hợp đồng')
    ).toBeInTheDocument()
    expect(within(dialog).getByTestId('detail-block')).toHaveTextContent(
      '#10492'
    )
    expect(within(dialog).getByTestId('detail-verification')).toHaveTextContent(
      'Đã xác minh'
    )
    expect(within(dialog).getByTestId('detail-payload-hash')).toHaveTextContent(
      'a'.repeat(64)
    )
    const dependencies = within(dialog).getAllByTestId('detail-dependency')
    expect(dependencies).toHaveLength(2)
    expect(dependencies[0]).toHaveTextContent('Đã xác nhận')
    expect(dependencies[1]).toHaveTextContent('Đang chờ')
  })

  it('copies the transaction id', async () => {
    const user = userEvent.setup()
    const writeText = vi.spyOn(navigator.clipboard, 'writeText')
    api.getAuditEvent.mockResolvedValue(buildEventDetail())
    renderWithQuery(
      <AuditEventDetailSheet eventId={EVENT_ID} onClose={vi.fn()} />
    )
    await user.click(
      await screen.findByRole('button', { name: 'Sao chép mã giao dịch' })
    )
    expect(writeText).toHaveBeenCalledWith(
      'tx-0123456789abcdef0123456789abcdef'
    )
  })

  it('offers the Explorer link only when the server says it is available', async () => {
    api.getAuditEvent.mockResolvedValue(buildEventDetail())
    renderWithQuery(
      <AuditEventDetailSheet eventId={EVENT_ID} onClose={vi.fn()} />
    )
    const link = await screen.findByRole('link', { name: 'Mở trong Explorer' })
    expect(link).toHaveAttribute(
      'href',
      'https://explorer.example.test/tx/tx-0123456789abcdef'
    )
    expect(link).toHaveAttribute('target', '_blank')
    expect(link.getAttribute('rel')).toContain('noopener')
    expect(link.getAttribute('rel')).toContain('noreferrer')
  })

  it('disables the Explorer action with the reason when it is unavailable', async () => {
    api.getAuditEvent.mockResolvedValue(
      buildEventDetail({
        explorer: { available: false, url: null, reason: 'EXPLORER_DEGRADED' },
      })
    )
    renderWithQuery(
      <AuditEventDetailSheet eventId={EVENT_ID} onClose={vi.fn()} />
    )
    const button = await screen.findByRole('button', {
      name: 'Mở trong Explorer',
    })
    expect(button).toBeDisabled()
    expect(screen.getByText('Explorer đang suy giảm')).toBeInTheDocument()
    expect(
      screen.queryByRole('link', { name: 'Mở trong Explorer' })
    ).not.toBeInTheDocument()
  })

  it('never renders a non-http(s) Explorer URL as a link', async () => {
    api.getAuditEvent.mockResolvedValue(
      buildEventDetail({
        explorer: { available: true, url: 'javascript:alert(1)', reason: null },
      })
    )
    renderWithQuery(
      <AuditEventDetailSheet eventId={EVENT_ID} onClose={vi.fn()} />
    )
    expect(
      await screen.findByRole('button', { name: 'Mở trong Explorer' })
    ).toBeDisabled()
    expect(
      screen.queryByRole('link', { name: 'Mở trong Explorer' })
    ).not.toBeInTheDocument()
  })

  it('labels simulation evidence and never shows a Fabric block or tx proof', async () => {
    api.getAuditEvent.mockResolvedValue(
      buildEventDetail({
        networkMode: 'simulation',
        blockNumber: 555,
        verificationState: 'unavailable',
        verification: {
          status: 'unavailable',
          reason: 'FABRIC_SIMULATION_MODE',
        },
        explorer: {
          available: false,
          url: null,
          reason: 'NOT_COMMITTED_ON_FABRIC',
        },
      })
    )
    renderWithQuery(
      <AuditEventDetailSheet eventId={EVENT_ID} onClose={vi.fn()} />
    )

    expect(
      await screen.findByText(/Mô phỏng — không phải bằng chứng Fabric/)
    ).toBeInTheDocument()
    expect(screen.queryByTestId('detail-block')).not.toBeInTheDocument()
    expect(screen.queryByText('#555')).not.toBeInTheDocument()
    expect(screen.getByTestId('detail-verification')).toHaveTextContent(
      'Không khả dụng'
    )
    expect(
      screen.getByText(/chưa được ghi nhận trên Fabric thật/)
    ).toBeInTheDocument()
  })

  it('shows pending evidence as not recorded without a transaction id', async () => {
    api.getAuditEvent.mockResolvedValue(
      buildEventDetail({
        status: 'pending',
        verificationState: 'not-recorded',
        verification: { status: 'not-recorded', reason: null },
        txId: null,
        blockNumber: null,
        recordedAt: null,
        explorer: {
          available: false,
          url: null,
          reason: 'NOT_COMMITTED_ON_FABRIC',
        },
      })
    )
    renderWithQuery(
      <AuditEventDetailSheet eventId={EVENT_ID} onClose={vi.fn()} />
    )
    expect(await screen.findByText('Chưa có mã giao dịch')).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Sao chép mã giao dịch' })
    ).not.toBeInTheDocument()
    expect(screen.getByTestId('detail-verification')).toHaveTextContent(
      'Chưa ghi nhận'
    )
  })

  it('shows the sanitized failure code for a terminal failure', async () => {
    api.getAuditEvent.mockResolvedValue(
      buildEventDetail({
        status: 'failed',
        failureCode: 'TERMINAL_CONFLICT',
        attempts: 5,
        verificationState: 'not-recorded',
        verification: { status: 'not-recorded', reason: null },
        txId: null,
        blockNumber: null,
      })
    )
    renderWithQuery(
      <AuditEventDetailSheet eventId={EVENT_ID} onClose={vi.fn()} />
    )
    expect(await screen.findByTestId('detail-failure')).toHaveTextContent(
      'TERMINAL_CONFLICT'
    )
    expect(screen.getByText('Thất bại hẳn')).toBeInTheDocument()
  })

  it('closes from the sheet close control', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    api.getAuditEvent.mockResolvedValue(buildEventDetail())
    renderWithQuery(
      <AuditEventDetailSheet eventId={EVENT_ID} onClose={onClose} />
    )
    await screen.findByRole('dialog')
    await user.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalled()
  })
})
