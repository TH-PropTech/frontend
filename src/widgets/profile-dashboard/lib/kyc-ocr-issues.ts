import type { KycOcrBackResult, KycOcrFrontResult } from '../api/kyc-api'

const RETAKE_TIP =
  'Nên chụp lại ở nơi đủ sáng, cầm thẳng, đủ 4 góc thẻ, tránh chói hoặc mờ.'

export type OcrSide = 'front' | 'back'

export interface OcrIssue {
  side: OcrSide
  message: string
}

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
  side: OcrSide,
  attempt: OcrAttempt<unknown>,
  missing: string[]
): OcrIssue | null {
  const label = side === 'front' ? 'Mặt trước' : 'Mặt sau'
  if (!attempt.value) {
    const reason = attempt.error ? ` (${attempt.error})` : ''
    return { side, message: `${label}: không đọc được${reason}. ${RETAKE_TIP}` }
  }
  if (missing.length > 0) {
    return {
      side,
      message: `${label}: chưa đọc được ${missing.join(', ')}. ${RETAKE_TIP}`,
    }
  }
  return null
}

/** One issue per card side that was not fully read; empty when everything was. */
export function describeOcrIssues(
  front: OcrAttempt<KycOcrFrontResult>,
  back: OcrAttempt<KycOcrBackResult>
): OcrIssue[] {
  const frontMissing = front.value ? missingFrontFields(front.value) : []
  const backMissing =
    back.value && !back.value.data?.issueDate ? ['Ngày cấp'] : []
  return [
    describeSide('front', front, frontMissing),
    describeSide('back', back, backMissing),
  ].filter((issue): issue is OcrIssue => issue !== null)
}
