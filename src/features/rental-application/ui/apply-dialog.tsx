'use client'

import * as React from 'react'
import { AlertCircle, CheckCircle2, ExternalLink, FileText } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog'
import {
  createRentalApplication,
  getRentalApplicationContext,
  isRentalTermsStaleError,
  type RentalApplicationContext,
} from '../api/rental-application-api'
import type { RentalPackageItem } from '@/entities/properties'

type Step = 1 | 2 | 3 | 4

interface RentalDetails {
  occupants: string
  moveInDate: string
  occupation: string
  hasPets: boolean
  notes: string
}

const INITIAL_RENTAL_DETAILS: RentalDetails = {
  occupants: '1',
  moveInDate: '',
  occupation: '',
  hasPets: false,
  notes: '',
}

export function ApplyDialog({
  apartmentId,
}: {
  apartmentId: string
  packages?: RentalPackageItem[] | undefined
}): React.ReactElement {
  const [open, setOpen] = React.useState(false)
  const [step, setStep] = React.useState<Step>(1)
  const [context, setContext] = React.useState<RentalApplicationContext | null>(
    null
  )
  const [loading, setLoading] = React.useState(false)
  const [submitting, setSubmitting] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [selectedPackageId, setSelectedPackageId] = React.useState('')
  const [acknowledged, setAcknowledged] = React.useState<string[]>([])
  const [termsAccepted, setTermsAccepted] = React.useState(false)
  const [details, setDetails] = React.useState<RentalDetails>(
    INITIAL_RENTAL_DETAILS
  )

  const handleOpenChange = (nextOpen: boolean): void => {
    if (nextOpen) {
      setStep(1)
      setError(null)
      setContext(null)
      setSelectedPackageId('')
      setAcknowledged([])
      setTermsAccepted(false)
      setDetails(INITIAL_RENTAL_DETAILS)
      setLoading(true)
    }
    setOpen(nextOpen)
  }

  React.useEffect(() => {
    if (!open) return
    void getRentalApplicationContext(apartmentId)
      .then(result => {
        setContext(result)
        const firstActive = result.packages.find(
          item => item.status === 'active'
        )
        if (firstActive) setSelectedPackageId(firstActive.packageId)
      })
      .catch(loadError => {
        setError(
          loadError instanceof Error
            ? loadError.message
            : 'Không thể tải điều kiện thuê căn hộ'
        )
      })
      .finally(() => setLoading(false))
  }, [apartmentId, open])

  const activePackages =
    context?.packages.filter(item => item.status === 'active') ?? []
  const selectedPackage = activePackages.find(
    item => item.packageId === selectedPackageId
  )
  const requiredDisclosureIds =
    context?.disclosure.items
      .filter(item => item.required)
      .map(item => item.id) ?? []
  const allDisclosuresAcknowledged = requiredDisclosureIds.every(id =>
    acknowledged.includes(id)
  )
  const isTermsSatisfied = !context?.terms || termsAccepted
  const occupants = Number(details.occupants)
  const detailsValid =
    Number.isInteger(occupants) &&
    occupants >= 1 &&
    occupants <= 20 &&
    /^\d{4}-\d{2}-\d{2}$/.test(details.moveInDate) &&
    details.occupation.trim().length > 0

  const handleOccupantsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setDetails(current => ({ ...current, occupants: event.target.value }))
  }

  const handleMoveInDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setDetails(current => ({ ...current, moveInDate: event.target.value }))
  }

  const handleOccupationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setDetails(current => ({ ...current, occupation: event.target.value }))
  }

  const handleHasPetsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setDetails(current => ({ ...current, hasPets: event.target.checked }))
  }

  const handleNotesChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setDetails(current => ({ ...current, notes: event.target.value }))
  }

  const submit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    if (!detailsValid) {
      setStep(1)
      return
    }
    if (
      !context ||
      !selectedPackage ||
      !allDisclosuresAcknowledged ||
      !isTermsSatisfied
    )
      return
    setSubmitting(true)
    setError(null)
    try {
      await createRentalApplication({
        apartmentId,
        packageId: selectedPackage.packageId,
        packageVersion: selectedPackage.version,
        occupants,
        moveInDate: details.moveInDate,
        occupation: details.occupation.trim(),
        hasPets: details.hasPets,
        ...(details.notes.trim() ? { notes: details.notes.trim() } : {}),
        disclosureVersion: context.disclosure.version,
        acknowledgedDisclosureIds: acknowledged,
        ...(context.terms
          ? {
              acceptedTermsVersion: context.terms.version,
              acceptedTermsHash: context.terms.hash,
            }
          : {}),
      })
      setStep(4)
    } catch (submitError) {
      if (isRentalTermsStaleError(submitError)) {
        setError(
          'Điều khoản dịch vụ vừa được cập nhật phiên bản mới. Vui lòng xem lại và xác nhận để tiếp tục.'
        )
        setTermsAccepted(false)
        void getRentalApplicationContext(apartmentId).then(refreshed => {
          setContext(refreshed)
        })
      } else {
        setError(
          submitError instanceof Error
            ? submitError.message
            : 'Không thể gửi hồ sơ thuê căn hộ'
        )
      }
    } finally {
      setSubmitting(false)
    }
  }

  const fieldClass =
    'mt-1 h-10 w-full rounded-lg border border-border bg-bg px-3 text-sm text-fg'

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          className="h-auto rounded-2xl bg-primary px-6 py-3.5 text-xs font-semibold text-white shadow-lg shadow-primary/20 hover:bg-primary-hover active:scale-[0.98]"
          data-testid="rental-application-trigger"
        >
          <FileText className="h-4 w-4" />
          Đặt thuê căn hộ
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto bg-surface">
        <DialogHeader>
          <DialogTitle>Đặt thuê căn hộ</DialogTitle>
          <DialogDescription>
            Kiểm tra thông tin, chọn gói thuê và xác nhận yêu cầu trước khi gửi
            chủ nhà.
          </DialogDescription>
        </DialogHeader>
        {loading ? (
          <p className="text-sm text-muted">Đang tải điều kiện thuê…</p>
        ) : null}
        {!loading && error && !context ? (
          <Message icon={<AlertCircle className="h-4 w-4" />} text={error} />
        ) : null}
        {!loading && context && !context.enabled ? (
          <Message text="Luồng đặt thuê đang tạm tắt để bảo trì." />
        ) : null}
        {!loading && context && context.enabled && !context.eligible ? (
          <Message text="Căn hộ hiện chưa đủ điều kiện nhận yêu cầu thuê." />
        ) : null}
        {!loading && context?.eligible && activePackages.length === 0 ? (
          <Message text="Chủ nhà chưa công bố gói thuê đang hiệu lực." />
        ) : null}
        {!loading &&
        context?.eligible &&
        activePackages.length > 0 &&
        step < 4 ? (
          <form className="space-y-4" onSubmit={event => void submit(event)}>
            <div className="flex items-center gap-2 text-xs text-muted">
              <span className={step >= 1 ? 'font-semibold text-primary' : ''}>
                1. Thông tin
              </span>
              <span>→</span>
              <span className={step >= 2 ? 'font-semibold text-primary' : ''}>
                2. Gói thuê
              </span>
              <span>→</span>
              <span className={step >= 3 ? 'font-semibold text-primary' : ''}>
                3. Xác nhận
              </span>
            </div>
            {step === 1 ? (
              <>
                <label className="block text-xs text-muted">
                  Số người ở
                  <input
                    required
                    aria-label="Số người ở"
                    name="occupants"
                    type="number"
                    min="1"
                    max="20"
                    value={details.occupants}
                    onChange={handleOccupantsChange}
                    className={fieldClass}
                  />
                </label>
                <label className="block text-xs text-muted">
                  Ngày dự kiến vào ở
                  <input
                    required
                    aria-label="Ngày dự kiến vào ở"
                    name="moveInDate"
                    type="date"
                    value={details.moveInDate}
                    onChange={handleMoveInDateChange}
                    className={fieldClass}
                  />
                </label>
                <label className="block text-xs text-muted">
                  Nghề nghiệp
                  <input
                    required
                    aria-label="Nghề nghiệp"
                    name="occupation"
                    maxLength={200}
                    value={details.occupation}
                    onChange={handleOccupationChange}
                    className={fieldClass}
                  />
                </label>
                <label className="flex items-center gap-2 text-sm text-fg">
                  <input
                    name="hasPets"
                    type="checkbox"
                    checked={details.hasPets}
                    onChange={handleHasPetsChange}
                  />{' '}
                  Có vật nuôi
                </label>
                <label className="block text-xs text-muted">
                  Ghi chú
                  <textarea
                    name="notes"
                    maxLength={1000}
                    value={details.notes}
                    onChange={handleNotesChange}
                    className="mt-1 min-h-20 w-full rounded-lg border border-border bg-bg p-3 text-sm text-fg"
                  />
                </label>
                <Button
                  type="button"
                  disabled={!detailsValid}
                  onClick={() => setStep(2)}
                >
                  Tiếp tục chọn gói
                </Button>
              </>
            ) : null}
            {step === 2 ? (
              <>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-fg">
                    Gói thuê đã công bố
                  </p>
                  {activePackages.map(item => {
                    const selected = selectedPackageId === item.packageId
                    return (
                      <button
                        key={`${item.packageId}-${item.version}`}
                        type="button"
                        data-testid={`rental-package-${item.packageId}`}
                        aria-pressed={selected}
                        onClick={() => setSelectedPackageId(item.packageId)}
                        className={`w-full rounded-lg border p-3 text-left ${selected ? 'border-primary bg-primary-soft' : 'border-border bg-bg'}`}
                      >
                        <span className="block text-sm font-semibold text-fg">
                          {item.durationMonths} tháng ·{' '}
                          {formatMoney(item.monthlyRent)} đ/tháng
                        </span>
                        <span className="mt-1 block text-xs text-muted">
                          Tiền cọc dự kiến{' '}
                          {formatMoney(item.resolvedDepositAmount)} đ · phiên
                          bản {item.version}
                        </span>
                      </button>
                    )
                  })}
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                  >
                    Quay lại
                  </Button>
                  <Button
                    type="button"
                    disabled={!selectedPackage}
                    onClick={() => setStep(3)}
                  >
                    Xem điều khoản
                  </Button>
                </div>
              </>
            ) : null}
            {step === 3 ? (
              <>
                <div className="rounded-lg border border-border bg-surface-muted p-3 text-sm text-fg">
                  <p className="font-semibold">Tóm tắt yêu cầu</p>
                  <p className="mt-1 text-muted">
                    {selectedPackage?.durationMonths} tháng ·{' '}
                    {formatMoney(selectedPackage?.monthlyRent ?? 0)} đ/tháng ·
                    cọc dự kiến{' '}
                    {formatMoney(selectedPackage?.resolvedDepositAmount ?? 0)} đ
                  </p>
                </div>
                <div className="space-y-3">
                  {context.disclosure.items.map(item => (
                    <label key={item.id} className="flex gap-2 text-sm text-fg">
                      <input
                        type="checkbox"
                        checked={acknowledged.includes(item.id)}
                        onChange={event =>
                          setAcknowledged(current =>
                            event.target.checked
                              ? [...current, item.id]
                              : current.filter(id => id !== item.id)
                          )
                        }
                      />
                      <span>
                        <strong>{item.title}.</strong> {item.body}
                      </span>
                    </label>
                  ))}
                </div>
                {context.terms ? (
                  <div className="rounded-lg border border-border bg-surface-muted p-3.5 space-y-2">
                    <div className="flex items-start gap-2.5">
                      <input
                        type="checkbox"
                        id="terms-accepted-checkbox"
                        data-testid="terms-accepted-checkbox"
                        checked={termsAccepted}
                        onChange={event =>
                          setTermsAccepted(event.target.checked)
                        }
                        className="mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                      />
                      <label
                        htmlFor="terms-accepted-checkbox"
                        className="text-xs text-fg leading-relaxed cursor-pointer"
                      >
                        Tôi đã đọc, hiểu rõ và đồng ý tuân thủ{' '}
                        <a
                          href="/terms"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-primary underline underline-offset-2 hover:text-primary-hover inline-flex items-center gap-1"
                        >
                          Quy định dịch vụ công và Điều khoản thuê căn hộ (phiên
                          bản {context.terms.version})
                          <ExternalLink className="h-3 w-3 inline" />
                        </a>{' '}
                        được công bố theo Luật Nhà ở 2023, Luật Kinh doanh BĐS
                        2023 và TTHC 1.004194.
                      </label>
                    </div>
                    <p className="text-[11px] text-muted pl-6 font-mono break-all">
                      Mã xác thực cam kết: {context.terms.hash.slice(0, 16)}…
                    </p>
                  </div>
                ) : null}
                {error ? <p className="text-xs text-danger">{error}</p> : null}
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(2)}
                  >
                    Quay lại
                  </Button>
                  <Button
                    type="submit"
                    loading={submitting}
                    disabled={!allDisclosuresAcknowledged || !isTermsSatisfied}
                    data-testid="rental-application-submit"
                  >
                    Gửi yêu cầu thuê
                  </Button>
                </div>
              </>
            ) : null}
          </form>
        ) : null}
        {step === 4 ? (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <CheckCircle2 className="h-10 w-10 text-success" />
            <p className="font-semibold text-fg">Đã gửi yêu cầu thuê</p>
            <p className="text-sm text-muted">
              Chủ nhà sẽ xem xét trước khi hệ thống tạo bản nháp hợp đồng.
            </p>
            <p className="text-xs text-muted max-w-sm">
              Cam kết điều khoản và chữ ký số được lưu giữ toàn vẹn và sẽ được
              đồng bộ lên mạng lưới Hyperledger Fabric khi hợp đồng thuê chính
              thức có hiệu lực.
            </p>
            <Button type="button" onClick={() => setOpen(false)}>
              Đóng
            </Button>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}

function Message({
  icon,
  text,
}: {
  icon?: React.ReactNode
  text: string
}): React.ReactElement {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-border bg-surface-muted p-3 text-sm text-muted">
      {icon}
      {text}
    </div>
  )
}

function formatMoney(value: number): string {
  return new Intl.NumberFormat('vi-VN').format(value)
}
