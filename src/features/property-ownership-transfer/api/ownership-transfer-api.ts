import { ApiClientError, apiClient } from '@/shared/api'

export interface OwnershipTransferCounts {
  apartments: number
  openBookings: number
  openApplications: number
  contracts: number
  depositAgreements: number
  payments: number
  disputes: number
}

export interface OwnershipTransferTargetUser {
  id: string
  email: string
  role: 'landlord'
}

export interface OwnershipTransferConflict {
  code: string
  entityType: string
  entityId: string
  message: string
}

export interface OwnershipTransferPreview {
  transferId: string
  targetUser: OwnershipTransferTargetUser
  sourceOwners: Array<{ userId: string; apartmentCount: number }>
  affectedCounts: OwnershipTransferCounts
  immutableCounts: Pick<
    OwnershipTransferCounts,
    'contracts' | 'depositAgreements' | 'payments' | 'disputes'
  >
  conflicts: OwnershipTransferConflict[]
  previewHash: string
  expiresAt: string
}

export interface OwnershipTransferResult extends OwnershipTransferPreview {
  status:
    | 'previewed'
    | 'applying'
    | 'completed'
    | 'rejected'
    | 'failed'
    | 'rolled-back'
  idempotencyKey: string | null
  completedAt: string | null
  auditRecordCount: number
}

export interface OwnershipTransferApiError {
  status: number
  code: string
  message: string
}

export async function previewOwnershipTransfer(
  targetEmail: string
): Promise<OwnershipTransferPreview> {
  return apiClient.post<OwnershipTransferPreview>(
    '/ownership-transfers/preview',
    {
      targetEmail: targetEmail.trim().toLowerCase(),
    }
  )
}

export async function applyOwnershipTransfer(
  transferId: string,
  previewHash: string,
  idempotencyKey: string
): Promise<OwnershipTransferResult> {
  return apiClient.post<OwnershipTransferResult>(
    `/ownership-transfers/${transferId}/apply`,
    { previewHash },
    { headers: { 'Idempotency-Key': idempotencyKey } }
  )
}

export async function getOwnershipTransfer(
  transferId: string
): Promise<OwnershipTransferResult> {
  return apiClient.get<OwnershipTransferResult>(
    `/ownership-transfers/${transferId}`
  )
}

export function mapOwnershipTransferError(
  error: unknown
): OwnershipTransferApiError {
  if (!(error instanceof ApiClientError)) {
    return {
      status: 0,
      code: 'NETWORK_ERROR',
      message: 'Không thể kết nối tới máy chủ API.',
    }
  }

  if (error.status === 403) {
    return {
      status: 403,
      code: 'FORBIDDEN',
      message: 'Bạn không có quyền thực hiện thao tác chuyển chủ nhà.',
    }
  }
  if (error.status === 409) {
    return {
      status: 409,
      code: error.body?.code ?? 'TRANSFER_CONFLICT',
      message: 'Preview đã thay đổi hoặc khóa idempotency đang bị xung đột.',
    }
  }
  if (error.status === 422) {
    return {
      status: 422,
      code: error.body?.code ?? 'TRANSACTION_UNAVAILABLE',
      message: 'Cơ sở dữ liệu chưa hỗ trợ transaction an toàn để apply.',
    }
  }

  return {
    status: error.status,
    code: error.body?.code ?? 'TRANSFER_REQUEST_FAILED',
    message: error.message,
  }
}
