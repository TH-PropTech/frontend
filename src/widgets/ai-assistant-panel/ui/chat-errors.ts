/** What went wrong with a chat request, from the backend's `errorCode` or the HTTP status. */
export type ChatErrorKind =
  | 'quota'
  | 'timeout'
  | 'upstream'
  | 'config'
  | 'tooLong'
  | 'network'

export interface ChatErrorInfo {
  kind: ChatErrorKind
  message: string
  /** Sending the same message again can help (not for a message that is too long or a broken setup). */
  retryable: boolean
}

const INFO: Record<ChatErrorKind, Omit<ChatErrorInfo, 'kind'>> = {
  quota: {
    message:
      'Trợ lý AI đang nhận quá nhiều yêu cầu nên tạm thời chưa trả lời được. Bạn thử lại sau ít phút nhé.',
    retryable: true,
  },
  timeout: {
    message: 'Trợ lý AI phản hồi quá chậm. Bạn thử lại nhé.',
    retryable: true,
  },
  upstream: {
    message: 'Trợ lý AI đang gặp sự cố. Bạn thử lại sau ít phút nhé.',
    retryable: true,
  },
  config: {
    message:
      'Trợ lý AI hiện chưa sẵn sàng. Vui lòng liên hệ bộ phận hỗ trợ nếu lỗi kéo dài.',
    retryable: false,
  },
  tooLong: {
    message: 'Tin nhắn quá dài (tối đa 2000 ký tự). Bạn hãy rút gọn lại nhé.',
    retryable: false,
  },
  network: {
    message:
      'Không thể kết nối đến Trợ lý AI. Vui lòng kiểm tra lại kết nối mạng.',
    retryable: true,
  },
}

function info(kind: ChatErrorKind): ChatErrorInfo {
  return { kind, ...INFO[kind] }
}

/** From the `errorCode` the backend puts in a 200 reply when the model call failed. */
export function chatErrorFromCode(
  code: string | undefined
): ChatErrorInfo | null {
  if (
    code === 'quota' ||
    code === 'timeout' ||
    code === 'upstream' ||
    code === 'config'
  ) {
    return info(code)
  }
  return code ? info('upstream') : null
}

/** From a non-2xx HTTP status (the throttler answers 429, validation 400), or no status at all. */
export function chatErrorFromStatus(status: number | undefined): ChatErrorInfo {
  if (status === undefined) return info('network')
  if (status === 429) return info('quota')
  if (status === 400) return info('tooLong')
  if (status === 401 || status === 403) return info('config')
  return info('upstream')
}
