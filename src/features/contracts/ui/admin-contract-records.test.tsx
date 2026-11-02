import * as React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  getContractRecords,
  type ContractRecordItem,
  type ContractRecordsPage,
} from '../api/contracts-api'
import { AdminContractRecords } from './admin-contract-records'

vi.mock('../api/contracts-api', async importOriginal => ({
  ...(await importOriginal<typeof import('../api/contracts-api')>()),
  getContractRecords: vi.fn(),
}))

function record(
  overrides: Partial<ContractRecordItem> = {}
): ContractRecordItem {
  return {
    id: 'contract-abc123',
    contractCode: 'HD-001',
    propertyId: 'property-1',
    propertyTitle: 'Căn hộ Sunrise A1',
    landlordId: 'landlord-1',
    landlordName: 'Trần Văn Chủ',
    tenantId: 'tenant-1',
    tenantName: 'Nguyễn Thị Thuê',
    startDate: '2026-01-01T00:00:00.000Z',
    endDate: '2026-12-31T00:00:00.000Z',
    status: 'active',
    createdAt: '2026-03-10T08:00:00.000Z',
    latestRevision: 2,
    hasSigned: true,
    ...overrides,
  }
}

function page(
  items: ContractRecordItem[],
  overrides: Partial<ContractRecordsPage> = {}
): ContractRecordsPage {
  return { items, total: items.length, page: 1, pageSize: 20, ...overrides }
}

function renderView(): void {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } },
  })
  render(
    <QueryClientProvider client={queryClient}>
      <AdminContractRecords />
    </QueryClientProvider>
  )
}

describe('AdminContractRecords', () => {
  beforeEach(() => vi.clearAllMocks())

  it('shows each contract with its parties, term, status and document state', async () => {
    vi.mocked(getContractRecords).mockResolvedValue(page([record()]))
    renderView()

    const row = (await screen.findByText('HD-001')).closest('tr') as HTMLElement
    expect(within(row).getByText('Căn hộ Sunrise A1')).toBeInTheDocument()
    expect(within(row).getByText('Trần Văn Chủ')).toBeInTheDocument()
    expect(within(row).getByText('Nguyễn Thị Thuê')).toBeInTheDocument()
    expect(within(row).getByText('Đang hiệu lực')).toBeInTheDocument()
    expect(within(row).getByText(/Bản 2 · Đã ký/)).toBeInTheDocument()
    expect(
      within(row).getByRole('link', { name: /Xem hợp đồng HD-001/ })
    ).toHaveAttribute('href', '/contracts/contract-abc123')
    expect(
      within(row).getByRole('link', { name: /Mở editor HD-001/ })
    ).toHaveAttribute('href', '/admin/contracts/contract-abc123')
    expect(
      within(row).getByRole('button', { name: 'Tải gói bằng chứng' })
    ).toBeEnabled()
  })

  it('shows a placeholder for missing party names', async () => {
    vi.mocked(getContractRecords).mockResolvedValue(
      page([record({ tenantName: null, landlordName: null })])
    )
    renderView()
    expect(await screen.findByText('Chưa có tên (nant-1)')).toBeInTheDocument()
    expect(screen.getByText('Chưa có tên (lord-1)')).toBeInTheDocument()
  })

  it('disables the evidence download until a PDF version exists', async () => {
    vi.mocked(getContractRecords).mockResolvedValue(
      page([record({ latestRevision: null, hasSigned: false })])
    )
    renderView()
    expect(await screen.findByText('Chưa có bản PDF')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Tải gói bằng chứng' })
    ).toBeDisabled()
  })

  it('applies filters on submit, returns to page 1 and can clear them', async () => {
    vi.mocked(getContractRecords).mockResolvedValue(page([record()]))
    renderView()
    await screen.findByText('HD-001')

    fireEvent.change(screen.getByLabelText('Khách thuê'), {
      target: { value: 'Nguyễn' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Tìm kiếm' }))
    await waitFor(() =>
      expect(getContractRecords).toHaveBeenLastCalledWith({
        property: '',
        tenant: 'Nguyễn',
        landlord: '',
        status: '',
        from: '',
        to: '',
        page: 1,
        pageSize: 20,
      })
    )

    fireEvent.click(screen.getByRole('button', { name: 'Xóa bộ lọc' }))
    await waitFor(() =>
      expect(getContractRecords).toHaveBeenLastCalledWith(
        expect.objectContaining({ tenant: '', page: 1 })
      )
    )
    expect(screen.getByLabelText('Khách thuê')).toHaveValue('')
  })

  it('blocks a search when the start date is after the end date', async () => {
    vi.mocked(getContractRecords).mockResolvedValue(page([record()]))
    renderView()
    await screen.findByText('HD-001')
    const callsBefore = vi.mocked(getContractRecords).mock.calls.length

    fireEvent.change(screen.getByLabelText('Từ ngày'), {
      target: { value: '2026-12-31' },
    })
    fireEvent.change(screen.getByLabelText('Đến ngày'), {
      target: { value: '2026-01-01' },
    })

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc.'
    )
    expect(screen.getByRole('button', { name: 'Tìm kiếm' })).toBeDisabled()
    expect(vi.mocked(getContractRecords).mock.calls.length).toBe(callsBefore)
  })

  it('pages through the results', async () => {
    vi.mocked(getContractRecords).mockImplementation(query =>
      Promise.resolve(
        page([record({ contractCode: `HD-P${query?.page}` })], {
          total: 45,
          page: query?.page ?? 1,
        })
      )
    )
    renderView()
    expect(await screen.findByText('HD-P1')).toBeInTheDocument()
    expect(screen.getByText('Trang 1/3')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Trước' })).toBeDisabled()

    fireEvent.click(screen.getByRole('button', { name: 'Sau' }))
    expect(await screen.findByText('HD-P2')).toBeInTheDocument()
    expect(getContractRecords).toHaveBeenLastCalledWith(
      expect.objectContaining({ page: 2 })
    )
  })

  it('shows an empty state when nothing matches', async () => {
    vi.mocked(getContractRecords).mockResolvedValue(page([]))
    renderView()
    expect(
      await screen.findByText('Không có hợp đồng nào khớp bộ lọc.')
    ).toBeInTheDocument()
  })

  it('shows the error message when loading fails', async () => {
    vi.mocked(getContractRecords).mockRejectedValue(new Error('Lỗi máy chủ'))
    renderView()
    expect(await screen.findByRole('alert')).toHaveTextContent('Lỗi máy chủ')
  })
})
