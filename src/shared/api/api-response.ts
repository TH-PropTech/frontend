export type ApiErrorBody = {
  code: string
  message: string
  details?: unknown
}

export type ApiMeta = {
  requestId?: string
  timestamp?: string
  page?: number
  limit?: number
  total?: number
}

export type ApiResponse<TData> = {
  success: boolean
  data: TData
  error: ApiErrorBody | null
  meta: ApiMeta | null
}
