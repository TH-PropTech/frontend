export interface GroqModelInfo {
  id: string
  owner: string
  ctx: number
}

export interface GroqRateLimits {
  tokensLimit?: number
  tokensRemaining?: number
  tokensReset?: string
  requestsLimit?: number
  requestsRemaining?: number
  requestsReset?: string
}

export interface GroqKeyCheck {
  at: number
  ok: boolean
  error?: string
  models: GroqModelInfo[]
  probeModel?: string
  limited?: boolean
  message?: string
  limits?: GroqRateLimits
}

export type GroqKeyStatus = 'active' | 'invalid' | 'disabled'

export interface GroqKeyItem {
  _id: string
  /** Masked key, e.g. "gsk_abcd...wxyz". The plaintext key is never returned. */
  key: string
  status: GroqKeyStatus
  /** Epoch ms. 0 means ready. */
  cooldownUntil: number
  usageCount: number
  failCount: number
  /** Epoch ms. 0 means never used. */
  lastUsedAt: number
  lastError?: string
  /** Epoch ms. */
  createdAt: number
  check?: GroqKeyCheck
}

/** Derived display state of a saved key. */
export type GroqKeyKind = 'ready' | 'rest' | 'invalid' | 'off'

export type GroqKeyAction = 'disable' | 'enable' | 'reset'

export interface GroqKeyAddResult {
  added: number
  duplicated: number
}

export interface GroqKeyCheckInput {
  key?: string
  id?: string
}

/** One row of the "Kiểm tra" results for keys typed in the add box. */
export interface GroqKeyCheckRow {
  key: string
  res: GroqKeyCheck
}
