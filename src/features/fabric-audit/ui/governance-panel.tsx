'use client'

import * as React from 'react'
import { FilePlus2, ShieldCheck } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table'
import {
  useGovernanceSnapshots,
  useGovernanceVerification,
  usePublishGovernanceSnapshot,
} from '../api/fabric-audit-hooks'
import type { FabricAuditCapability } from '../model/capabilities'
import { describeFabricAuditError } from '../model/error-messages'
import { formatDateTime, truncateMiddle } from '../model/format'
import {
  governanceLedgerView,
  runErrorLabel,
  verificationStateView,
} from '../model/labels'
import type { GovernanceSnapshot } from '../model/schemas'
import { PageNav } from './page-nav'
import {
  InlineError,
  PanelEmpty,
  PanelError,
  PanelLoading,
} from './panel-states'
import { StateBadge } from './state-badge'

const PAGE_SIZE = 20

function VerificationResult({
  verification,
}: {
  verification: ReturnType<typeof useGovernanceVerification>
}): React.ReactElement {
  if (verification.isFetching) {
    return <PanelLoading label="Đang xác minh với Fabric" rows={1} />
  }
  if (verification.isError) {
    return (
      <p
        role="alert"
        data-testid="governance-verification-error"
        className="text-sm font-medium text-danger"
      >
        {describeFabricAuditError(verification.error)}
      </p>
    )
  }
  if (!verification.data) return <></>
  const result = verification.data
  const reason = runErrorLabel(result.reason)
  return (
    <div
      data-testid="governance-verification"
      className="space-y-1 rounded-lg border border-border bg-surface-muted p-3 text-xs"
    >
      <StateBadge view={verificationStateView(result.status)} />
      {result.status === 'mismatch' && result.mismatchFields.length > 0 ? (
        <p className="text-danger">
          Trường sai lệch: {result.mismatchFields.join(', ')}
        </p>
      ) : null}
      {reason ? <p className="text-muted">{reason}</p> : null}
      <p className="text-muted">
        Kiểm tra lúc {formatDateTime(result.checkedAt)}
      </p>
    </div>
  )
}

function SnapshotRow({
  snapshot,
  verifying,
  onVerify,
}: {
  snapshot: GovernanceSnapshot
  verifying: boolean
  onVerify: (snapshotId: string) => void
}): React.ReactElement {
  return (
    <TableRow>
      <TableCell className="font-mono text-xs font-semibold text-fg">
        {snapshot.snapshotCode}
      </TableCell>
      <TableCell>v{snapshot.version}</TableCell>
      <TableCell>
        <StateBadge view={governanceLedgerView(snapshot.ledgerStatus)} />
      </TableCell>
      <TableCell className="font-mono text-xs" title={snapshot.manifestHash}>
        {truncateMiddle(snapshot.manifestHash, 8, 6)}
      </TableCell>
      <TableCell className="whitespace-nowrap text-muted">
        {formatDateTime(snapshot.publishedAt)}
      </TableCell>
      <TableCell>
        <Button
          size="sm"
          variant="outline"
          aria-label="Xác minh với Fabric"
          loading={verifying}
          onClick={() => onVerify(snapshot.id)}
        >
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" /> Xác minh
        </Button>
      </TableCell>
    </TableRow>
  )
}

export interface GovernancePanelProps {
  capability: FabricAuditCapability
}

export function GovernancePanel({
  capability,
}: GovernancePanelProps): React.ReactElement {
  const [page, setPage] = React.useState(1)
  const [verifyId, setVerifyId] = React.useState<string | null>(null)
  const [notice, setNotice] = React.useState<string | null>(null)
  const [publishError, setPublishError] = React.useState<string | null>(null)
  const snapshots = useGovernanceSnapshots({ page, limit: PAGE_SIZE })
  const verification = useGovernanceVerification(verifyId)
  const publish = usePublishGovernanceSnapshot()

  const publishSnapshot = async (): Promise<void> => {
    setNotice(null)
    setPublishError(null)
    try {
      const result = await publish.mutateAsync()
      setNotice(
        result.created
          ? `Đã phát hành ${result.snapshot.snapshotCode} (v${result.snapshot.version}) và xếp hàng ghi sổ cái.`
          : `Manifest không đổi so với ${result.snapshot.snapshotCode}; không tạo phiên bản mới.`
      )
    } catch (cause) {
      setPublishError(describeFabricAuditError(cause))
    }
  }

  const verify = (snapshotId: string): void => {
    if (snapshotId === verifyId) void verification.refetch()
    else setVerifyId(snapshotId)
  }

  let body: React.ReactElement
  if (snapshots.isPending) {
    body = <PanelLoading label="Đang tải governance snapshot" />
  } else if (snapshots.isError) {
    body = (
      <PanelError
        error={snapshots.error}
        onRetry={() => void snapshots.refetch()}
      />
    )
  } else if (snapshots.data.items.length === 0) {
    body = (
      <PanelEmpty>Chưa có governance snapshot nào được phát hành.</PanelEmpty>
    )
  } else {
    body = (
      <Card className="border-border bg-surface">
        <Table aria-label="Governance snapshot">
          <TableHeader>
            <TableRow>
              <TableHead>Mã</TableHead>
              <TableHead>Phiên bản</TableHead>
              <TableHead>Sổ cái</TableHead>
              <TableHead>Manifest hash</TableHead>
              <TableHead>Phát hành lúc</TableHead>
              <TableHead>
                <span className="sr-only">Hành động</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {snapshots.data.items.map(snapshot => (
              <SnapshotRow
                key={snapshot.id}
                snapshot={snapshot}
                verifying={verifyId === snapshot.id && verification.isFetching}
                onVerify={verify}
              />
            ))}
          </TableBody>
        </Table>
        {snapshots.data.totalPages > 1 ? (
          <PageNav
            label="Phân trang governance snapshot"
            page={snapshots.data.page}
            totalPages={snapshots.data.totalPages}
            total={snapshots.data.total}
            noun="snapshot"
            onPage={setPage}
          />
        ) : null}
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="max-w-2xl text-xs text-muted">
          Snapshot là bản chụp bất biến của điều khoản, chính sách, mẫu hợp đồng
          và biểu phí đang áp dụng. Xác minh luôn đối chiếu trực tiếp với
          Fabric.
        </p>
        {capability.canOperate ? (
          <Button
            loading={publish.isPending}
            onClick={() => void publishSnapshot()}
          >
            <FilePlus2 className="h-4 w-4" aria-hidden="true" /> Phát hành
            snapshot mới
          </Button>
        ) : null}
      </div>
      {publishError ? <InlineError message={publishError} /> : null}
      {notice ? (
        <p role="status" className="text-sm font-medium text-success">
          {notice}
        </p>
      ) : null}
      {body}
      {verifyId ? <VerificationResult verification={verification} /> : null}
    </div>
  )
}
