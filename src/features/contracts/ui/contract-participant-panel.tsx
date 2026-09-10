'use client'

import * as React from 'react'
import {
  CheckCircle2,
  Download,
  FileSignature,
  ShieldCheck,
} from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { PublicServiceChecklistPanel } from './public-service-checklist-panel'
import {
  downloadContractArtifact,
  getContract,
  issueSigningGrant,
  signContract,
  verifyContractIntegrity,
  type ContractItem,
} from '../api/contracts-api'

export interface ContractParticipantPanelProps {
  contractId: string
  canSign?: boolean
}

export function ContractParticipantPanel({
  contractId,
  canSign = true,
}: ContractParticipantPanelProps): React.ReactElement {
  const [contract, setContract] = React.useState<ContractItem | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [busy, setBusy] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [verified, setVerified] = React.useState<boolean | null>(null)
  const [biometricGrantId, setBiometricGrantId] = React.useState('')
  const [otpSessionId, setOtpSessionId] = React.useState('')

  const loadContract = React.useCallback(async (): Promise<void> => {
    setLoading(true)
    setError(null)
    try {
      setContract(await getContract(contractId))
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : 'Không tải được hợp đồng.'
      )
    } finally {
      setLoading(false)
    }
  }, [contractId])

  React.useEffect(() => {
    const scheduleLoad = window.setTimeout(() => {
      void loadContract()
    }, 0)

    return () => window.clearTimeout(scheduleLoad)
  }, [loadContract])

  const runAction = async (action: () => Promise<void>): Promise<void> => {
    setBusy(true)
    setError(null)
    try {
      await action()
    } catch (actionError) {
      setError(
        actionError instanceof Error
          ? actionError.message
          : 'Thao tác hợp đồng thất bại.'
      )
    } finally {
      setBusy(false)
    }
  }

  if (loading) {
    return <p className="text-sm text-muted">Đang tải hợp đồng…</p>
  }
  if (error && !contract) {
    return (
      <div className="space-y-3 rounded-xl border border-danger/30 bg-danger/10 p-4">
        <p className="text-sm text-danger">{error}</p>
        <Button
          type="button"
          variant="secondary"
          onClick={() => void loadContract()}
        >
          Thử lại
        </Button>
      </div>
    )
  }
  if (!contract) {
    return <p className="text-sm text-muted">Chưa có dữ liệu hợp đồng.</p>
  }

  const download = (format: 'pdf' | 'docx'): void => {
    void runAction(async () => {
      const blob = await downloadContractArtifact(contract._id, format)
      const url = URL.createObjectURL(blob)
      const anchor = document.createElement('a')
      anchor.href = url
      anchor.download = `${contract.contractCode}.${format}`
      anchor.click()
      URL.revokeObjectURL(url)
    })
  }

  return (
    <section className="space-y-4 rounded-2xl border border-border bg-surface p-5">
      <header className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-fg">{contract.contractCode}</h3>
          <p className="text-xs text-muted">{contract.propertyTitle}</p>
        </div>
        <span className="rounded-full bg-primary-soft px-2.5 py-1 text-xs font-semibold text-primary">
          {contract.status}
        </span>
      </header>

      <PublicServiceChecklistPanel contractId={contract._id} />

      <div className="grid gap-2 text-sm text-muted sm:grid-cols-2">
        <p>Tiền thuê: {contract.monthlyRent.toLocaleString('vi-VN')} đ/tháng</p>
        <p>Tiền cọc: {contract.deposit.toLocaleString('vi-VN')} đ</p>
        <p>Ký bên thuê: {contract.signedByTenant ? 'Đã ký' : 'Chưa ký'}</p>
        <p>
          Ký bên cho thuê: {contract.signedByLandlord ? 'Đã ký' : 'Chưa ký'}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="secondary"
          disabled={busy}
          onClick={() =>
            void runAction(async () => {
              const result = await verifyContractIntegrity(contract._id)
              setVerified(result.isValid)
            })
          }
        >
          <ShieldCheck className="h-4 w-4" />
          Kiểm tra toàn vẹn
        </Button>
        <Button
          type="button"
          variant="secondary"
          disabled={busy}
          onClick={() => download('pdf')}
        >
          <Download className="h-4 w-4" /> PDF
        </Button>
        <Button
          type="button"
          variant="secondary"
          disabled={busy}
          onClick={() => download('docx')}
        >
          DOCX
        </Button>
      </div>

      {verified !== null ? (
        <p
          className={verified ? 'text-sm text-success' : 'text-sm text-danger'}
        >
          {verified
            ? 'Nội dung khớp với bằng chứng blockchain.'
            : 'Phát hiện sai lệch nội dung.'}
        </p>
      ) : null}

      {canSign && contract.status === 'awaiting-signature' ? (
        <div className="space-y-3 border-t border-border pt-4">
          <p className="text-xs text-muted">
            Cần hoàn tất eKYC và OTP trước khi cấp grant ký một lần.
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            <input
              value={biometricGrantId}
              onChange={event => setBiometricGrantId(event.target.value)}
              placeholder="Biometric grant ID"
              className="h-10 rounded-lg border border-border bg-bg px-3 text-sm text-fg"
            />
            <input
              value={otpSessionId}
              onChange={event => setOtpSessionId(event.target.value)}
              placeholder="OTP session ID"
              className="h-10 rounded-lg border border-border bg-bg px-3 text-sm text-fg"
            />
          </div>
          <Button
            type="button"
            disabled={busy || !biometricGrantId.trim() || !otpSessionId.trim()}
            onClick={() =>
              void runAction(async () => {
                const grant = await issueSigningGrant(contract._id, {
                  biometricGrantId: biometricGrantId.trim(),
                  otpSessionId: otpSessionId.trim(),
                })
                const signed = await signContract(contract._id, grant.grantId)
                setContract(signed)
              })
            }
          >
            <FileSignature className="h-4 w-4" />
            Cấp grant và ký
          </Button>
        </div>
      ) : null}

      {error ? <p className="text-sm text-danger">{error}</p> : null}
      {contract.signedByTenant && contract.signedByLandlord ? (
        <p className="inline-flex items-center gap-1.5 text-sm text-success">
          <CheckCircle2 className="h-4 w-4" /> Hai bên đã ký.
        </p>
      ) : null}
    </section>
  )
}
