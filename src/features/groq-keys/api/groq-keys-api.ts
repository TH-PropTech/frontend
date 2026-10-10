import { apiClient } from '@/shared/api'
import type {
  GroqKeyAction,
  GroqKeyAddResult,
  GroqKeyCheck,
  GroqKeyCheckInput,
  GroqKeyItem,
} from '../model/groq-keys.types'

const BASE = '/groq-keys/admin'

export function listGroqKeys(): Promise<GroqKeyItem[]> {
  return apiClient.get<GroqKeyItem[]>(BASE)
}

export function addGroqKeys(input: {
  keys: string[]
  checks?: Record<string, GroqKeyCheck>
}): Promise<GroqKeyAddResult> {
  return apiClient.post<GroqKeyAddResult>(BASE, input)
}

export function checkGroqKey(input: GroqKeyCheckInput): Promise<GroqKeyCheck> {
  return apiClient.post<GroqKeyCheck>(`${BASE}/check`, input)
}

export function setGroqKeyStatus(
  id: string,
  action: GroqKeyAction
): Promise<{ ok: boolean }> {
  return apiClient.patch<{ ok: boolean }>(`${BASE}/${encodeURIComponent(id)}`, {
    action,
  })
}

export function deleteGroqKey(id: string): Promise<{ ok: boolean }> {
  return apiClient.delete<{ ok: boolean }>(`${BASE}/${encodeURIComponent(id)}`)
}
