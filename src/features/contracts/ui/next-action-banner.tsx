'use client'

import type { ReactElement } from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import { ArrowRight, CheckCircle2, Clock3, Compass } from 'lucide-react'
import type {
  ContractFlowAction,
  ContractFlowActionKey,
  ContractFlowView,
} from '../api/contracts-api'
import { toContractStepHref } from '../lib/contract-flow-steps'
import { getFlowReasonLabel } from '../lib/contract-labels'

export interface NextActionBannerProps {
  contractId: string
  flow: ContractFlowView | null | undefined
}

const ACTION_LABELS: Record<ContractFlowActionKey, string> = {
  CONSENT_DEPOSIT: 'Đồng ý thỏa thuận cọc',
  PAY_DEPOSIT: 'Thanh toán cọc',
  LOCK_CONTENT: 'Khóa nội dung hợp đồng',
  LOCK_ARTIFACT: 'Khóa bản PDF hợp đồng',
  COMPLETE_KYC: 'Hoàn tất định danh eKYC',
  SIGN_SMARTCA: 'Ký số VNPT SmartCA',
  SIGN_ECONSENT: 'Ký xác nhận điện tử',
  PAY_SETTLEMENT: 'Thanh toán quyết toán nhận nhà',
  PAY_FEE: 'Thanh toán phí dịch vụ',
  RECORD_HANDOVER: 'Ghi biên bản bàn giao',
  CONFIRM_HANDOVER: 'Xác nhận biên bản bàn giao',
  VERIFY_LEDGER: 'Đối soát bằng chứng lưu vết',
  RECORD_MOVE_OUT_HANDOVER: 'Lập biên bản trả nhà',
  CONFIRM_MOVE_OUT_HANDOVER: 'Xác nhận biên bản trả nhà',
  REPORT_MOVE_OUT_DISCREPANCY: 'Phản đối biên bản trả nhà',
  CREATE_DEPOSIT_STATEMENT: 'Lập bảng khấu trừ cọc',
  RESPOND_DEPOSIT_STATEMENT: 'Phản hồi bảng khấu trừ cọc',
  RECORD_DEPOSIT_REFUND: 'Khai báo đã hoàn cọc',
  ACKNOWLEDGE_DEPOSIT_REFUND: 'Xác nhận đã nhận cọc',
}

const REASON_LABELS: Record<string, string> = {
  DEPOSIT_NOT_READY: 'Cần đồng ý thỏa thuận cọc trước khi thanh toán.',
  DEPOSIT_AGREEMENT_METADATA_MISSING:
    'Thỏa thuận cọc thiếu thông tin phiên bản, hãy tải lại hợp đồng.',
  CONTENT_NOT_LOCKED: 'Nội dung hợp đồng chưa được khóa.',
  ARTIFACT_NOT_LOCKED: 'Bản PDF hợp đồng chưa được khóa để ký số.',
  DEPOSIT_REQUIRED: 'Cần xác nhận tiền cọc trước khi ký.',
  KYC_NOT_VERIFIED: 'Tài khoản chưa hoàn tất định danh eKYC.',
  WRONG_STATE: 'Hợp đồng chưa ở trạng thái cho phép thao tác này.',
  CONFIG_OUTDATED: 'Cấu hình hợp đồng đã đổi, cần đối soát lại.',
}

function describeReason(action: ContractFlowAction): string {
  return (
    (action.reasonCode ? REASON_LABELS[action.reasonCode] : undefined) ??
    getFlowReasonLabel(action.reasonCode)
  )
}

/**
 * Banner "việc cần làm tiếp theo" đọc `flow.nextActions` do server lọc theo
 * user hiện tại. Không tự suy quyền ở client.
 */
export function NextActionBanner({
  contractId,
  flow,
}: NextActionBannerProps): ReactElement | null {
  if (!flow) return null

  const enabledAction = flow.nextActions.find(item => item.enabled)
  const blockedAction = flow.nextActions.find(item => !item.enabled)
  const isCompleted = flow.activeStage === 'completed'

  const title = enabledAction
    ? ACTION_LABELS[enabledAction.action]
    : isCompleted
      ? 'Hợp đồng đã hoàn tất các bước'
      : blockedAction
        ? ACTION_LABELS[blockedAction.action]
        : 'Đang chờ bên còn lại hoặc hệ thống'
  const detail = enabledAction
    ? 'Đây là việc bạn cần làm tiếp theo cho hợp đồng này.'
    : blockedAction && !isCompleted
      ? describeReason(blockedAction)
      : isCompleted
        ? 'Không còn việc nào cần bạn thực hiện.'
        : 'Bạn chưa có việc cần làm; trang sẽ tự cập nhật khi đến lượt.'
  const Icon = enabledAction ? Compass : isCompleted ? CheckCircle2 : Clock3

  return (
    <section
      data-testid="next-action-banner"
      aria-live="polite"
      className={`flex flex-col gap-3 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between ${
        enabledAction
          ? 'border-[var(--primary)] bg-[var(--primary-soft)]'
          : 'border-[var(--border)] bg-[var(--surface-muted)]'
      }`}
    >
      <div className="flex items-start gap-3">
        <Icon
          className="mt-0.5 h-5 w-5 shrink-0 text-[var(--primary)]"
          aria-hidden="true"
        />
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">
            Việc cần làm tiếp theo
          </p>
          <h2 className="text-sm font-bold text-[var(--fg)]">{title}</h2>
          <p className="mt-0.5 text-xs leading-relaxed text-[var(--muted)]">
            {detail}
          </p>
        </div>
      </div>
      {enabledAction ? (
        <Link
          href={toContractStepHref(contractId, enabledAction.stage) as Route}
          className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2 text-xs font-bold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
        >
          Thực hiện
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      ) : null}
    </section>
  )
}
