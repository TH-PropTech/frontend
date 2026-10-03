import type {
  AuditDeliveryState,
  AuditEventDetail,
  AuditVerificationState,
  FindingCategory,
  FindingStatus,
  GovernanceSnapshot,
  RunStatus,
} from './schemas'

type GovernanceLedgerStatus = GovernanceSnapshot['ledgerStatus']

/** Semantic tone mapped to design tokens in the UI (success/warning/danger/info/muted). */
export type Tone = 'success' | 'warning' | 'danger' | 'info' | 'neutral'

export interface StateView {
  label: string
  tone: Tone
}

type Runtime = 'simulation' | 'live' | 'degraded' | 'unavailable'

const RUNTIME: Record<Runtime, StateView> = {
  simulation: { label: 'Chế độ mô phỏng', tone: 'warning' },
  live: { label: 'Fabric trực tiếp', tone: 'success' },
  degraded: { label: 'Suy giảm', tone: 'warning' },
  unavailable: { label: 'Không khả dụng', tone: 'danger' },
}

const DELIVERY: Record<AuditDeliveryState, StateView> = {
  pending: { label: 'Đang chờ', tone: 'info' },
  processing: { label: 'Đang xử lý', tone: 'info' },
  retryable: { label: 'Chờ thử lại', tone: 'warning' },
  confirmed: { label: 'Đã xác nhận', tone: 'success' },
  failed: { label: 'Thất bại (terminal)', tone: 'danger' },
}

const VERIFICATION: Record<AuditVerificationState, StateView> = {
  verified: { label: 'Đã xác minh', tone: 'success' },
  mismatch: { label: 'Sai lệch', tone: 'danger' },
  unavailable: { label: 'Không khả dụng', tone: 'neutral' },
  'not-recorded': { label: 'Chưa ghi nhận', tone: 'neutral' },
}

const DEPENDENCY: Record<
  AuditEventDetail['dependencies'][number]['state'],
  StateView
> = {
  confirmed: { label: 'Đã xác nhận', tone: 'success' },
  pending: { label: 'Đang chờ', tone: 'info' },
  processing: { label: 'Đang xử lý', tone: 'info' },
  failed: { label: 'Thất bại', tone: 'danger' },
  missing: { label: 'Chưa có', tone: 'warning' },
}

const FINDING_CATEGORY: Record<FindingCategory, string> = {
  missing_delivery_work: 'Thiếu tác vụ chuyển lên sổ cái',
  retryable_delivery_failure: 'Lỗi chuyển có thể thử lại',
  terminal_delivery_failure: 'Lỗi chuyển terminal',
  missing_local_projection: 'Thiếu bản chiếu cục bộ',
  missing_ledger_evidence: 'Thiếu bằng chứng trên sổ cái',
  hash_schema_mismatch: 'Sai lệch hash/schema',
  orphan_local_projection: 'Bản chiếu cục bộ mồ côi',
  orphan_ledger_evidence: 'Bằng chứng sổ cái mồ côi',
  unverifiable: 'Không thể xác minh',
}

const FINDING_STATUS: Record<FindingStatus, StateView> = {
  open: { label: 'Đang mở', tone: 'warning' },
  'repair-pending': { label: 'Đang sửa', tone: 'info' },
  resolved: { label: 'Đã xử lý', tone: 'success' },
  'accepted-risk': { label: 'Chấp nhận rủi ro', tone: 'neutral' },
}

const RUN_STATUS: Record<RunStatus, StateView> = {
  queued: { label: 'Đang xếp hàng', tone: 'info' },
  running: { label: 'Đang chạy', tone: 'info' },
  completed: { label: 'Hoàn tất', tone: 'success' },
  'completed-with-findings': {
    label: 'Hoàn tất, có phát hiện',
    tone: 'warning',
  },
  failed: { label: 'Thất bại', tone: 'danger' },
  cancelled: { label: 'Đã hủy', tone: 'neutral' },
}

const GOVERNANCE_LEDGER: Record<GovernanceLedgerStatus, StateView> = {
  pending: { label: 'Đang chờ ghi', tone: 'info' },
  'confirmed-fabric': { label: 'Đã ghi lên Fabric', tone: 'success' },
  'confirmed-simulation': { label: 'Mô phỏng', tone: 'warning' },
  'failed-terminal': { label: 'Thất bại (terminal)', tone: 'danger' },
}

const IDENTITY_ROLES: Record<'writer' | 'reader' | 'operator', string> = {
  writer: 'Writer',
  reader: 'Reader',
  operator: 'Operator',
}

const EXPLORER_REASONS: Record<string, string> = {
  EXPLORER_NOT_CONFIGURED: 'Explorer chưa được cấu hình',
  EXPLORER_DEGRADED: 'Explorer đang suy giảm',
  NOT_COMMITTED_ON_FABRIC:
    'Sự kiện chưa được ghi nhận trên Fabric thật nên chưa có liên kết giao dịch',
}

const RUN_ERRORS: Record<string, string> = {
  FABRIC_UNAVAILABLE:
    'Không truy vấn được Fabric; kết quả được xếp là chưa thể xác minh',
  FABRIC_SIMULATION_MODE:
    'Chế độ mô phỏng: không có sổ cái Fabric để đối chiếu',
  ORPHAN_SCAN_BUDGET_EXHAUSTED:
    'Đã hết ngân sách quét mồ côi; có thể tiếp tục từ vị trí đã lưu',
  RECONCILIATION_RUN_FAILED: 'Lần đối soát gặp lỗi và dừng lại',
}

export const runtimeStateView = (state: Runtime): StateView => RUNTIME[state]
export const deliveryStateView = (state: AuditDeliveryState): StateView =>
  DELIVERY[state]
export const verificationStateView = (
  state: AuditVerificationState
): StateView => VERIFICATION[state]
export const governanceLedgerView = (
  status: GovernanceLedgerStatus
): StateView => GOVERNANCE_LEDGER[status]
export const dependencyStateView = (
  state: AuditEventDetail['dependencies'][number]['state']
): StateView => DEPENDENCY[state]
export const findingCategoryLabel = (category: FindingCategory): string =>
  FINDING_CATEGORY[category]
export const findingStatusView = (status: FindingStatus): StateView =>
  FINDING_STATUS[status]
export const runStatusView = (status: RunStatus): StateView =>
  RUN_STATUS[status]
export const identityRoleLabel = (
  role: 'writer' | 'reader' | 'operator'
): string => IDENTITY_ROLES[role]

export function explorerReasonLabel(reason: string | null): string | null {
  return reason ? (EXPLORER_REASONS[reason] ?? reason) : null
}

export function runErrorLabel(code: string | null): string | null {
  return code ? (RUN_ERRORS[code] ?? code) : null
}
