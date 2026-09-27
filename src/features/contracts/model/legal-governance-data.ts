/**
 * Kiểu dữ liệu nguồn pháp lý / Dịch vụ công và quy định nền tảng.
 * Dữ liệu do Admin quản trị ở backend (`/legal-sources`, `/platform-regulations`).
 */

export type LegalSourceKind = 'procedure' | 'legal_text'

export type LegalSourceIcon =
  | 'residence'
  | 'tax'
  | 'law'
  | 'decree'
  | 'fire'
  | 'building'
  | 'digital'

export const LEGAL_SOURCE_ICONS: readonly LegalSourceIcon[] = [
  'residence',
  'tax',
  'law',
  'decree',
  'fire',
  'building',
  'digital',
]

export interface DossierItem {
  title: string
  detail: string
  isPropTechExport?: boolean | undefined
}

export interface ExecutionStep {
  step: number
  title: string
  detail: string
}

export interface LegalGround {
  title: string
  article: string
  url?: string | undefined
}

/** Nội dung nguồn mà Admin nhập/sửa */
export interface LegalSourceInput {
  kind: LegalSourceKind
  code: string
  title: string
  subtitle: string
  agency: string
  duration: string
  fee: string
  externalUrl: string
  icon: LegalSourceIcon
  description: string
  dossierItems: DossierItem[]
  steps: ExecutionStep[]
  legalGrounds: LegalGround[]
  notes: string[]
  showInContractPanel?: boolean | undefined
  isActive?: boolean | undefined
}

export interface LegalSource extends LegalSourceInput {
  id: string
  key: string
  showInContractPanel: boolean
  isActive: boolean
  order: number
  updatedBy?: string | undefined
  updatedAt?: string | undefined
}

export type RegulationCategory =
  | 'residence'
  | 'tax-finance'
  | 'fire-safety'
  | 'building-operations'
  | 'digital-legal'
  | 'deposit-handover'

export type RegulationSeverity = 'mandatory' | 'recommended' | 'optional'

export type PropertyScope =
  | 'all'
  | 'apartment'
  | 'serviced-apartment'
  | 'villa-house'
  | 'room'

export interface RegulationChecklistItem {
  id: string
  label: string
  hint?: string | undefined
}

export interface PlatformRegulationInput {
  code: string
  title: string
  summary: string
  category: RegulationCategory
  severity: RegulationSeverity
  scope: PropertyScope[]
  linkedSourceKey: string | null
  checklistItems: RegulationChecklistItem[]
  isActive?: boolean | undefined
}

export interface PlatformRegulation extends PlatformRegulationInput {
  id: string
  order: number
  isActive: boolean
  isDefault: boolean
  updatedAt?: string | undefined
}

/** URL tuyệt đối `https://` — khớp validation phía backend */
export function isHttpsUrl(value: string): boolean {
  try {
    return new URL(value).protocol === 'https:'
  } catch {
    return false
  }
}
