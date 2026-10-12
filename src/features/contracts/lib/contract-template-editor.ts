import type {
  ContractTemplateClauseDto,
  ContractTemplateDto,
  LegalReleasePayload,
} from '../api/contract-templates-api'

export type ClauseEdit = { heading: string; content: string }

const VARIABLE_PATTERN = /\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g

/** Các biến {{...}} có trong nội dung (không trùng lặp, theo thứ tự xuất hiện). */
export function extractVariables(content: string): string[] {
  const found: string[] = []
  for (const match of content.matchAll(VARIABLE_PATTERN)) {
    const name = match[1]
    if (name && !found.includes(name)) found.push(name)
  }
  return found
}

/** Biến dùng trong nội dung nhưng không nằm trong danh sách cho phép (sẽ bị hệ thống từ chối hoặc in rỗng). */
export function findUnknownVariables(
  content: string,
  allowed: readonly string[]
): string[] {
  return extractVariables(content).filter(name => !allowed.includes(name))
}

/** Điền giá trị mẫu để xem trước; biến không có giá trị giữ nguyên dạng {{tên}} để dễ phát hiện. */
export function renderTemplatePreview(
  content: string,
  values: Record<string, string>
): string {
  return content.replace(VARIABLE_PATTERN, (match, name: string) =>
    name in values ? (values[name] as string) : match
  )
}

export const SAMPLE_TEMPLATE_VALUES: Record<string, string> = {
  landlord: 'Nguyễn Văn Chủ',
  tenant: 'Trần Thị Khách',
  property: 'Căn hộ Sunrise 12A',
  propertyAddress: '213 Lê Lợi, Phường Phú Hội, Thành phố Huế',
  propertyArea: '68 m²',
  propertyFurniture: 'Theo biên bản bàn giao',
  startDate: '11/10/2026',
  endDate: '11/10/2027',
  durationMonths: '12',
  monthlyRent: '12.500.000 VNĐ (bằng chữ: mười hai triệu năm trăm nghìn đồng)',
  deposit: '25.000.000 VNĐ (bằng chữ: hai mươi lăm triệu đồng)',
  paymentDay: '5',
  latePenaltyRate: '10',
  terminationNoticeDays: '30',
}

export type ClauseChange = 'unchanged' | 'edited'

export function clauseChange(
  original: ContractTemplateClauseDto,
  edit: ClauseEdit | undefined
): ClauseChange {
  if (!edit) return 'unchanged'
  return edit.heading.trim() !== original.heading.trim() ||
    edit.content.trim() !== (original.content ?? '').trim()
    ? 'edited'
    : 'unchanged'
}

export function countChangedClauses(
  template: ContractTemplateDto,
  edits: Record<number, ClauseEdit>
): number {
  return template.clauses.filter(
    clause => clauseChange(clause, edits[clause.number]) === 'edited'
  ).length
}

/** Lỗi nhập liệu có thể phát hiện ngay ở trình duyệt trước khi gửi (backend vẫn kiểm tra lại). */
export function validateEdits(
  template: ContractTemplateDto,
  edits: Record<number, ClauseEdit>
): string[] {
  const errors: string[] = []
  for (const clause of template.clauses) {
    const edit = edits[clause.number]
    if (!edit) continue
    if (!edit.heading.trim())
      errors.push(`Điều ${clause.number}: thiếu tiêu đề`)
    if (!edit.content.trim())
      errors.push(`Điều ${clause.number}: thiếu nội dung`)
    const unknown = findUnknownVariables(
      edit.content,
      template.allowedVariables
    )
    if (unknown.length > 0) {
      errors.push(
        `Điều ${clause.number}: biến không được phép ${unknown.map(name => `{{${name}}}`).join(', ')}`
      )
    }
  }
  return errors
}

/** Dựng payload phát hành: điều đã sửa để trống contentHash cho backend tính lại, điều không sửa giữ nguyên. */
export function buildReleasePayload(
  template: ContractTemplateDto,
  edits: Record<number, ClauseEdit>,
  reviewReference: string
): LegalReleasePayload {
  return {
    legalProfile: template.legalProfile,
    clauses: template.clauses.map(clause => {
      const edit = edits[clause.number]
      if (clauseChange(clause, edit) !== 'edited' || !edit) return clause
      const content = edit.content.trim()
      return {
        ...clause,
        heading: edit.heading.trim(),
        content,
        variableRefs: extractVariables(content),
        contentHash: '',
      }
    }),
    allowedVariables: template.allowedVariables,
    addenda: template.addenda,
    citationIds: template.citationIds,
    annexDefinitions: template.annexDefinitions ?? [],
    schemaVersion: template.schemaVersion,
    referenceOnly: template.referenceOnly ?? false,
    reviewReference: reviewReference.trim(),
  }
}
