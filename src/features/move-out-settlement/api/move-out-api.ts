import { ApiClientError, apiClient } from '@/shared/api'
import type {
  DeductionLineInput,
  DepositStatement,
  LineResponseInput,
  MoveOutHandover,
  MoveOutHandoverInput,
  RefundInput,
} from './move-out-types'

const handoverPath = (contractId: string): string =>
  `/move-out-handovers/contract/${encodeURIComponent(contractId)}`
const statementPath = (contractId: string): string =>
  `/deposit-settlement-statements/contract/${encodeURIComponent(contractId)}`

/** 404 nghĩa là chưa lập: trả null, các lỗi khác ném tiếp. */
async function getOrNull<T>(path: string): Promise<T | null> {
  try {
    return await apiClient.get<T>(path)
  } catch (error) {
    if (error instanceof ApiClientError && error.status === 404) return null
    throw error
  }
}

export const getMoveOutHandover = (
  contractId: string
): Promise<MoveOutHandover | null> =>
  getOrNull<MoveOutHandover>(handoverPath(contractId))

export const recordMoveOutHandover = (
  contractId: string,
  input: MoveOutHandoverInput
): Promise<MoveOutHandover> =>
  apiClient.post<MoveOutHandover>(handoverPath(contractId), input)

export const reviseMoveOutHandover = (
  contractId: string,
  input: MoveOutHandoverInput
): Promise<MoveOutHandover> =>
  apiClient.put<MoveOutHandover>(handoverPath(contractId), input)

export const confirmMoveOutHandover = (
  contractId: string,
  handoverHash: string
): Promise<MoveOutHandover> =>
  apiClient.post<MoveOutHandover>(`${handoverPath(contractId)}/confirm`, {
    handoverHash,
  })

export const objectMoveOutHandover = (
  contractId: string,
  handoverHash: string,
  note: string
): Promise<MoveOutHandover> =>
  apiClient.post<MoveOutHandover>(`${handoverPath(contractId)}/discrepancy`, {
    handoverHash,
    note,
  })

export const disputeMoveOutHandover = (
  contractId: string,
  note: string
): Promise<MoveOutHandover> =>
  apiClient.post<MoveOutHandover>(`${handoverPath(contractId)}/dispute`, {
    note,
  })

export const downloadMoveOutHandoverPdf = (contractId: string): Promise<Blob> =>
  apiClient.getBlob(`${handoverPath(contractId)}/pdf`)

export const getDepositStatement = (
  contractId: string
): Promise<DepositStatement | null> =>
  getOrNull<DepositStatement>(statementPath(contractId))

export const saveDepositStatementDraft = (
  contractId: string,
  lines: DeductionLineInput[]
): Promise<DepositStatement> =>
  apiClient.put<DepositStatement>(statementPath(contractId), { lines })

export const submitDepositStatement = (
  contractId: string
): Promise<DepositStatement> =>
  apiClient.post<DepositStatement>(`${statementPath(contractId)}/submit`, {})

export const respondDepositStatement = (
  contractId: string,
  responses: LineResponseInput[]
): Promise<DepositStatement> =>
  apiClient.post<DepositStatement>(`${statementPath(contractId)}/respond`, {
    responses,
  })

export const disputeDepositStatement = (
  contractId: string,
  note: string
): Promise<DepositStatement> =>
  apiClient.post<DepositStatement>(`${statementPath(contractId)}/dispute`, {
    note,
  })

export const recordDepositRefund = (
  contractId: string,
  input: RefundInput
): Promise<DepositStatement> =>
  apiClient.post<DepositStatement>(
    `${statementPath(contractId)}/refunds`,
    input
  )

export const acknowledgeDepositRefund = (
  contractId: string,
  refundId: string
): Promise<DepositStatement> =>
  apiClient.post<DepositStatement>(
    `${statementPath(contractId)}/refunds/${encodeURIComponent(refundId)}/acknowledge`,
    {}
  )

/** Tải ảnh chứng từ qua luồng tải ảnh căn hộ có sẵn; trả về danh sách URL. */
export async function uploadEvidencePhotos(files: File[]): Promise<string[]> {
  const formData = new FormData()
  files.forEach(file => formData.append('images', file))
  const response = await apiClient.post<{ urls: string[] }>(
    '/apartments/upload',
    formData
  )
  return response.urls
}
