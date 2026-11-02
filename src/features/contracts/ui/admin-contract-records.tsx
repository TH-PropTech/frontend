'use client'

import * as React from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { OptionSelect } from '@/shared/ui/option-select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table'
import { getContractRecords, type ContractStatus } from '../api/contracts-api'
import { getContractStatusLabel } from '../lib/contract-labels'
import { EvidencePackageDownload } from './evidence-package-download'

const PAGE_SIZE = 20

const STATUS_OPTIONS: { value: ContractStatus; label: string }[] = (
  [
    'draft',
    'deposit-pending',
    'deposit-paid',
    'awaiting-signature',
    'fully-signed-pending-deposit',
    'active',
    'terminated',
    'cancelled',
    'completed',
  ] as const
).map(value => ({ value, label: getContractStatusLabel(value) }))

interface Filters {
  property: string
  tenant: string
  landlord: string
  status: ContractStatus | ''
  from: string
  to: string
}

const EMPTY_FILTERS: Filters = {
  property: '',
  tenant: '',
  landlord: '',
  status: '',
  from: '',
  to: '',
}

const dateFormatter = new Intl.DateTimeFormat('vi-VN')

function formatDate(value: string): string {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '—' : dateFormatter.format(date)
}

function partyName(name: string | null, id: string): string {
  return name?.trim() ? name : `Chưa có tên (${id.slice(-6)})`
}

function invalidRange(filters: Filters): boolean {
  return Boolean(filters.from && filters.to && filters.from > filters.to)
}

export function AdminContractRecords(): React.ReactElement {
  const [draft, setDraft] = React.useState<Filters>(EMPTY_FILTERS)
  const [applied, setApplied] = React.useState<Filters>(EMPTY_FILTERS)
  const [page, setPage] = React.useState(1)
  const { data, isFetching, error } = useQuery({
    queryKey: ['admin-contract-records', applied, page],
    queryFn: () =>
      getContractRecords({ ...applied, page, pageSize: PAGE_SIZE }),
    placeholderData: keepPreviousData,
  })
  const loading = isFetching
  const errorMessage = error
    ? error instanceof Error
      ? error.message
      : 'Không thể tải danh sách hồ sơ hợp đồng.'
    : null

  const rangeError = invalidRange(draft)
  const totalPages = data
    ? Math.max(1, Math.ceil(data.total / data.pageSize))
    : 1

  const applyFilters = (event: React.FormEvent): void => {
    event.preventDefault()
    if (rangeError) return
    setApplied(draft)
    setPage(1)
  }

  const clearFilters = (): void => {
    setDraft(EMPTY_FILTERS)
    setApplied(EMPTY_FILTERS)
    setPage(1)
  }

  const setField =
    (key: keyof Filters) =>
    (event: React.ChangeEvent<HTMLInputElement>): void =>
      setDraft(current => ({ ...current, [key]: event.target.value }))

  return (
    <section
      data-testid="admin-contract-records"
      className="space-y-4 rounded-xl border border-line bg-surface p-5"
    >
      <header>
        <h1 className="text-lg font-bold text-fg">Hồ sơ hợp đồng</h1>
        <p className="mt-1 text-xs text-muted">
          Tra cứu hợp đồng theo căn hộ, người thuê và thời gian để cung cấp bằng
          chứng khi có tranh chấp.
        </p>
      </header>

      <form
        onSubmit={applyFilters}
        aria-label="Bộ lọc hồ sơ hợp đồng"
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
      >
        <Input
          label="Căn hộ"
          placeholder="Tên hoặc địa chỉ căn hộ"
          value={draft.property}
          onChange={setField('property')}
          maxLength={100}
        />
        <Input
          label="Khách thuê"
          placeholder="Họ tên khách thuê"
          value={draft.tenant}
          onChange={setField('tenant')}
          maxLength={100}
        />
        <Input
          label="Chủ nhà"
          placeholder="Họ tên chủ nhà"
          value={draft.landlord}
          onChange={setField('landlord')}
          maxLength={100}
        />
        <OptionSelect
          label="Trạng thái"
          value={draft.status}
          onChange={value =>
            setDraft(current => ({
              ...current,
              status: value as ContractStatus | '',
            }))
          }
          options={STATUS_OPTIONS}
          allLabel="Tất cả trạng thái"
        />
        <Input
          label="Từ ngày"
          type="date"
          value={draft.from}
          onChange={setField('from')}
        />
        <Input
          label="Đến ngày"
          type="date"
          value={draft.to}
          onChange={setField('to')}
        />
        {rangeError ? (
          <p
            role="alert"
            className="text-xs text-danger sm:col-span-2 lg:col-span-3"
          >
            Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc.
          </p>
        ) : null}
        <div className="flex gap-2 sm:col-span-2 lg:col-span-3">
          <Button type="submit" disabled={rangeError}>
            Tìm kiếm
          </Button>
          <Button type="button" variant="outline" onClick={clearFilters}>
            Xóa bộ lọc
          </Button>
        </div>
      </form>

      {errorMessage ? (
        <p role="alert" className="text-sm text-danger">
          {errorMessage}
        </p>
      ) : null}
      {loading ? (
        <p role="status" className="text-sm text-muted">
          Đang tải hồ sơ hợp đồng...
        </p>
      ) : null}
      {!loading && !errorMessage && data && data.items.length === 0 ? (
        <p role="status" className="text-sm text-muted">
          Không có hợp đồng nào khớp bộ lọc.
        </p>
      ) : null}

      {data && data.items.length > 0 ? (
        <>
          <p className="text-[11px] text-muted">{data.total} hợp đồng</p>
          <div className="overflow-x-auto">
            <Table aria-label="Danh sách hồ sơ hợp đồng">
              <TableHeader>
                <TableRow>
                  <TableHead className="whitespace-nowrap">
                    Mã hợp đồng
                  </TableHead>
                  <TableHead className="whitespace-nowrap">Căn hộ</TableHead>
                  <TableHead className="whitespace-nowrap">Chủ nhà</TableHead>
                  <TableHead className="whitespace-nowrap">
                    Khách thuê
                  </TableHead>
                  <TableHead className="whitespace-nowrap">
                    Thời hạn thuê
                  </TableHead>
                  <TableHead className="whitespace-nowrap">
                    Trạng thái
                  </TableHead>
                  <TableHead className="whitespace-nowrap">Hồ sơ</TableHead>
                  <TableHead className="whitespace-nowrap">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.items.map(record => (
                  <TableRow key={record.id}>
                    <TableCell className="min-w-40 break-all font-mono text-xs font-semibold text-fg">
                      {record.contractCode}
                    </TableCell>
                    <TableCell>{record.propertyTitle}</TableCell>
                    <TableCell>
                      {partyName(record.landlordName, record.landlordId)}
                    </TableCell>
                    <TableCell>
                      {partyName(record.tenantName, record.tenantId)}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {formatDate(record.startDate)} –{' '}
                      {formatDate(record.endDate)}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {getContractStatusLabel(record.status)}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {record.latestRevision === null
                        ? 'Chưa có bản PDF'
                        : `Bản ${record.latestRevision}${record.hasSigned ? ' · Đã ký' : ''}`}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                        <Link
                          href={`/contracts/${record.id}`}
                          className="whitespace-nowrap font-semibold text-primary"
                          aria-label={`Xem hợp đồng ${record.contractCode}`}
                        >
                          Xem hợp đồng
                        </Link>
                        <Link
                          href={`/admin/contracts/${record.id}`}
                          className="whitespace-nowrap font-semibold text-primary"
                          aria-label={`Mở editor ${record.contractCode}`}
                        >
                          Mở editor
                        </Link>
                        <EvidencePackageDownload
                          contractId={record.id}
                          disabled={record.latestRevision === null}
                          compact
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <nav
            aria-label="Phân trang"
            className="flex items-center justify-between text-xs"
          >
            <span className="text-muted">
              Trang {data.page}/{totalPages}
            </span>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={loading || data.page <= 1}
                onClick={() => setPage(data.page - 1)}
              >
                Trước
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={loading || data.page >= totalPages}
                onClick={() => setPage(data.page + 1)}
              >
                Sau
              </Button>
            </div>
          </nav>
        </>
      ) : null}
    </section>
  )
}
