import type { KycOcrBackResult, KycOcrFrontResult } from '../api/kyc-api'

const RETAKE_TIP =
  'Hãy chụp lại ở nơi đủ sáng, cầm thẳng, đủ 4 góc thẻ, tránh chói hoặc mờ; hoặc nhập tay ở bước xác nhận.'

export interface OcrAttempt<T> {
  value: T | null
  /** User-facing message of the failure, when there was one. */
  error: string | null
}

/** OCR is a convenience: a failed read must never block the user from filling the form. */
export async function attemptOcr<T>(
  run: () => Promise<T>
): Promise<OcrAttempt<T>> {
  try {
    return { value: await run(), error: null }
  } catch (error) {
    console.warn('KYC OCR failed, falling back to manual entry', error)
    return {
      value: null,
      error: error instanceof Error ? error.message : null,
    }
  }
}

function missingFrontFields(front: KycOcrFrontResult): string[] {
  const checks: Array<[string, string]> = [
    ['Số CCCD', front.idNumber],
    ['Họ tên', front.fullName],
    ['Ngày sinh', front.dob],
    ['Giới tính', front.gender],
  ]
  return checks.filter(([, value]) => !value).map(([label]) => label)
}

function describeSide(
  label: string,
  attempt: OcrAttempt<unknown>,
  missing: string[]
): string | null {
  if (!attempt.value) {
    const reason = attempt.error ? ` (${attempt.error})` : ''
    return `${label}: không đọc được${reason}. ${RETAKE_TIP}`
  }
  if (missing.length > 0) {
    return `${label}: chưa đọc được ${missing.join(', ')}. ${RETAKE_TIP}`
  }
  return null
}

/** One warning per card side that was not fully read; empty when everything was. */
export function describeOcrIssues(
  front: OcrAttempt<KycOcrFrontResult>,
  back: OcrAttempt<KycOcrBackResult>
): string[] {
  const frontMissing = front.value ? missingFrontFields(front.value) : []
  const backMissing =
    back.value && !back.value.data?.issueDate ? ['Ngày cấp'] : []
  return [
    describeSide('Mặt trước', front, frontMissing),
    describeSide('Mặt sau', back, backMissing),
  ].filter((message): message is string => message !== null)
}
