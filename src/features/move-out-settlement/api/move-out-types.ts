export type MoveOutItemCondition = 'good' | 'damaged' | 'missing'
export type MoveOutHandoverStatus = 'recorded' | 'completed' | 'disputed'

export interface MoveOutInventoryItem {
  name: string
  quantity: number
  conditionAtMoveIn: 'good' | 'damaged' | null
  noteAtMoveIn: string | null
  condition: MoveOutItemCondition
  note: string | null
}

export interface MoveOutHandover {
  _id: string
  contractId: string
  revision: number
  handedBackAt: string
  meterReadings: { electricity: number; water: number }
  /** Ảnh công tơ; biên bản cũ không có. */
  meterPhotos?: { electricity: string[]; water: string[] } | null
  keyCount: number
  inventoryItems: MoveOutInventoryItem[]
  notes: string | null
  discrepancies: { revision: number; note: string; at: string }[]
  responseDays: number
  responseDueAt: string | null
  status: MoveOutHandoverStatus
  handoverHash: string
  tenantConfirmation: { at: string; hash: string } | null
  landlordConfirmation: { at: string; hash: string } | null
  completedAt: string | null
  completionReason: 'both-confirmed' | 'tenant-no-response' | null
  dispute: { by: string; note: string; at: string } | null
}

export interface MoveOutHandoverInput {
  handedBackAt: string
  electricity: number
  water: number
  /** Ảnh công tơ điện và nước: bắt buộc mỗi loại 1–3 ảnh. */
  meterPhotos: { electricity: string[]; water: string[] }
  /** Gửi khi người ghi xác nhận chỉ số nhỏ hơn lúc nhận nhà (ví dụ công tơ đã được thay). */
  acknowledgeMeterRegression?: boolean
  keyCount: number
  inventoryItems: {
    name: string
    quantity: number
    condition: MoveOutItemCondition
    note?: string
  }[]
  notes?: string
}

export type DepositStatementStatus =
  | 'draft'
  | 'awaiting-tenant'
  | 'accepted'
  | 'disputed'
  | 'refund-recorded'
  | 'closed'

export interface DepositStatementLine {
  id: string
  reason: string
  amount: number
  evidenceUrls: string[]
  /** Vắng mặt = Chủ nhà tự nhập; `meter-suggestion` = gợi ý từ chỉ số công tơ. */
  source?: 'manual' | 'meter-suggestion'
  tenantResponse: {
    decision: 'accept' | 'reject'
    note: string | null
    at: string
  } | null
}

export interface DepositRefund {
  id: string
  amount: number
  transactionRef: string
  paidAt: string
  note: string | null
  recordedAt: string
  tenantAcknowledgedAt: string | null
  /** Lãi chủ nhà chậm hoàn cọc; `null` khi hoàn đúng hạn. */
  lateInterest?: RefundLateInterest | null
}

export interface RefundLateInterest {
  ratePerYear: number
  daysLate: number
  amount: number
  legalBasis: string
}

export interface DepositStatement {
  _id: string
  contractId: string
  status: DepositStatementStatus
  depositAmount: number
  lines: DepositStatementLine[]
  refunds: DepositRefund[]
  responseDays: number
  submittedAt: string | null
  responseDueAt: string | null
  acceptedAt: string | null
  acceptedReason:
    | 'tenant-accepted'
    | 'tenant-no-response'
    | 'no-deductions'
    | null
  refundDueAt: string | null
  refundOverdueAt: string | null
  /** Lãi tạm tính trên phần cọc còn phải hoàn khi đã quá hạn; không lưu, hai bên tự thanh toán. */
  accruedRefundInterest?: number | null
  closedAt: string | null
  closeReason:
    | 'tenant-acknowledged'
    | 'tenant-no-acknowledge'
    | 'no-refund-due'
    | null
  dispute: { by: string; note: string; at: string } | null
}

export interface DeductionLineInput {
  reason: string
  amount: number
  evidenceUrls?: string[]
  source?: 'manual' | 'meter-suggestion'
}

export type UtilitySuggestionNote =
  | 'NO_RATES'
  | 'NO_MOVE_IN_READINGS'
  | 'ELECTRICITY_READING_REGRESSION'
  | 'WATER_READING_REGRESSION'
  | 'NO_SERVICE_MONTHS'

export interface UtilitySuggestion {
  lines: Array<{
    kind: 'electricity' | 'water' | 'service'
    reason: string
    amount: number
    evidenceUrls: string[]
    source: 'meter-suggestion'
  }>
  notes: UtilitySuggestionNote[]
}

export interface LineResponseInput {
  lineId: string
  decision: 'accept' | 'reject'
  note?: string
}

export interface RefundInput {
  amount: number
  transactionRef: string
  paidAt: string
  note?: string
}

export type MoveOutActionKey =
  | 'RECORD_MOVE_OUT_HANDOVER'
  | 'CONFIRM_MOVE_OUT_HANDOVER'
  | 'REPORT_MOVE_OUT_DISCREPANCY'
  | 'CREATE_DEPOSIT_STATEMENT'
  | 'RESPOND_DEPOSIT_STATEMENT'
  | 'RECORD_DEPOSIT_REFUND'
  | 'ACKNOWLEDGE_DEPOSIT_REFUND'

/** Quyền thao tác do server tính (flow.nextActions); vắng mục nào thì không chặn mục đó. */
export type MoveOutGates = Partial<
  Record<MoveOutActionKey, { enabled: boolean; reasonCode: string | null }>
>
