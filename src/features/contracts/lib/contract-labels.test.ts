import { describe, expect, it } from 'vitest'
import {
  getContractStatusLabel,
  isDepositPaid,
  getLedgerStatusLabel,
  getLegalBasisLabel,
  getLegalBasisSourceUrl,
  getLegalProfileLabel,
  getTemplateLabel,
  getFlowReasonLabel,
  getMoveOutPhaseLabel,
  humanizeCode,
} from './contract-labels'

describe('contract labels', () => {
  it('maps known statuses to Vietnamese and passes unknown through', () => {
    expect(getContractStatusLabel('awaiting-signature')).toBe('Chờ ký')
    expect(getContractStatusLabel('something-new')).toBe('something-new')
  })

  it('resolves legal basis names and sources, humanizing unknown ids', () => {
    expect(
      getLegalBasisLabel('DECREE_96_2024_APPENDIX_II_RESIDENTIAL_LEASE')
    ).toContain('Nghị định 96/2024/NĐ-CP')
    expect(
      getLegalBasisSourceUrl('DECREE_96_2024_APPENDIX_II_RESIDENTIAL_LEASE')
    ).toMatch(/^https:\/\//)
    expect(getLegalBasisLabel('NEW_UNKNOWN_BASIS')).toBe('New unknown basis')
    expect(getLegalBasisSourceUrl('NEW_UNKNOWN_BASIS')).toBeNull()
  })

  it('labels legal profile, template and ledger status', () => {
    expect(getLegalProfileLabel('PRIVATE_CIVIL_APARTMENT_LEASE')).toBe(
      'Thuê căn hộ giữa cá nhân'
    )
    expect(getTemplateLabel('VN_INDIVIDUAL_RESIDENTIAL_LEASE', 7)).toBe(
      'Mẫu thuê nhà ở cá nhân (bản 7)'
    )
    expect(getLedgerStatusLabel('failed-retryable')).toBe('Lỗi, đang thử lại')
    expect(humanizeCode('SOME_RAW_CODE')).toBe('Some raw code')
  })

  it('treats paid, transferred and released deposits as paid', () => {
    expect(isDepositPaid('paid')).toBe(true)
    expect(isDepositPaid('transferred')).toBe(true)
    expect(isDepositPaid('released')).toBe(true)
    expect(isDepositPaid('refunded')).toBe(false)
    expect(isDepositPaid('pending')).toBe(false)
    expect(isDepositPaid(undefined)).toBe(false)
  })
  it('names the move-out phases in plain Vietnamese', () => {
    expect(getMoveOutPhaseLabel('awaiting-move-out')).toBe('Chờ trả nhà')
    expect(getMoveOutPhaseLabel('awaiting-deposit-settlement')).toBe(
      'Chờ quyết toán cọc'
    )
    expect(getMoveOutPhaseLabel('settled')).toBe('Đã quyết toán')
    expect(getMoveOutPhaseLabel('NEW_PHASE_X')).toBe('New phase x')
  })

  it('translates flow reason codes and never prints a raw UPPER_SNAKE code', () => {
    expect(getFlowReasonLabel('MOVE_OUT_HANDOVER_NOT_COMPLETED')).toMatch(
      /biên bản trả nhà/
    )
    expect(getFlowReasonLabel('SOMETHING_NEW_HERE')).not.toMatch(/[A-Z]{3,}_/)
    expect(getFlowReasonLabel(null)).toMatch(/Đang chờ/)
  })
})
