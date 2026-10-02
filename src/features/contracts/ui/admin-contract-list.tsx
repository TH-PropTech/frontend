'use client'

import * as React from 'react'
import Link from 'next/link'
import { getMyContracts, type ContractItem } from '../api/contracts-api'

export interface AdminContractListProps {
  initialContracts?: ContractItem[]
}

export function AdminContractList({
  initialContracts,
}: AdminContractListProps): React.ReactElement {
  const [contracts, setContracts] = React.useState(initialContracts ?? [])
  const [loading, setLoading] = React.useState(initialContracts === undefined)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (initialContracts !== undefined) return
    let active = true
    void getMyContracts()
      .then(next => {
        if (active) setContracts(next)
      })
      .catch(cause => {
        if (active)
          setError(
            cause instanceof Error
              ? cause.message
              : 'Không thể tải danh sách hợp đồng.'
          )
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [initialContracts])

  return (
    <section
      data-testid="admin-contract-list"
      className="space-y-4 rounded-xl border border-line bg-surface p-5"
    >
      <header>
        <h1 className="text-lg font-bold text-fg">
          Danh sách hợp đồng vận hành
        </h1>
        <p className="mt-1 text-xs text-muted">
          Staff/Admin chọn hợp đồng để mở commercial editor và recovery.
        </p>
      </header>
      {error ? (
        <p role="alert" className="text-sm text-danger">
          {error}
        </p>
      ) : null}
      {loading ? (
        <p role="status" className="text-sm text-muted">
          Đang tải hợp đồng...
        </p>
      ) : null}
      {!loading && !error && contracts.length === 0 ? (
        <p role="status" className="text-sm text-muted">
          Chưa có hợp đồng.
        </p>
      ) : null}
      <div className="space-y-2">
        {contracts.map(contract => (
          <Link
            key={contract._id}
            href={`/admin/contracts/${contract._id}`}
            className="flex items-center justify-between gap-3 rounded-lg border border-line p-3 hover:bg-surface-muted"
          >
            <span>
              <span className="block text-xs font-bold text-fg">
                {contract.contractCode}
              </span>
              <span className="block text-[10px] text-muted">
                {contract.propertyTitle}
              </span>
            </span>
            <span className="text-[10px] font-semibold text-primary">
              Mở editor
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
