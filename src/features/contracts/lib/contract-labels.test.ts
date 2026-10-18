import { describe, expect, it } from 'vitest'
import {
  getContractStatusLabel,
  getDepositEscrowLabel,
  isDepositPaid,
  getExecutionStrategyLabel,
  getLedgerStatusLabel,
  getLegalBasisLabel,
  getLegalBasisSourceUrl,
  getLegalProfileLabel,
  getTemplateLabel,
  humanizeCode,
} from './contract-labels'

describe('contract labels', () => {
  it('maps known statuses to Vietnamese and passes unknown through', () => {
    expect(getContractStatusLabel('awaiting-signature')).toBe('Chờ ký')
    expect(getContractStatusLabel('something-new')).toBe('something-new')
  })

  it('maps execution strategies', () => {
    expect(getExecutionStrategyLabel('DEPOSIT_FIRST')).toBe('Cọc trước, ký sau')
    expect(getExecutionStrategyLabel('SIGN_FIRST')).toBe('Ký trước, cọc sau')
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

  describe('getDepositEscrowLabel', () => {
    const held = {
      status: 'HELD',
      autoRefundAt: '2026-12-01T00:00:00Z',
      heldAt: '2026-10-01T00:00:00Z',
    }

    it('labels a held escrow', () => {
      expect(
        getDepositEscrowLabel({
          status: 'paid',
          escrow: { ...held, settlement: null },
        })
      ).toBe('Đang ký quỹ')
    })

    it('labels in-flight settlements by direction, including failed ones', () => {
      const settlement = (
        kind: 'release' | 'refund',
        state: 'requested' | 'failed'
      ) => ({
        status: 'applied',
        escrow: { ...held, settlement: { kind, state, settledAt: null } },
      })
      expect(
        getDepositEscrowLabel(settlement('release', 'requested') as never)
      ).toBe('Đang chuyển cho chủ nhà')
      expect(
        getDepositEscrowLabel(settlement('release', 'failed') as never)
      ).toBe('Đang chuyển cho chủ nhà')
      expect(
        getDepositEscrowLabel(settlement('refund', 'requested') as never)
      ).toBe('Đang hoàn cho khách thuê')
    })

    it('labels terminal states from the agreement status', () => {
      expect(getDepositEscrowLabel({ status: 'released' })).toBe(
        'Đã chuyển cho chủ nhà'
      )
      expect(getDepositEscrowLabel({ status: 'refunded' })).toBe(
        'Đã hoàn cho khách thuê'
      )
    })

    it('returns null for legacy deposits and escrow not yet funded', () => {
      expect(getDepositEscrowLabel({ status: 'paid', escrow: null })).toBeNull()
      expect(getDepositEscrowLabel({ status: 'paid' })).toBeNull()
      expect(
        getDepositEscrowLabel({
          status: 'pending',
          escrow: { ...held, status: 'AWAITING_PAYMENT', settlement: null },
        })
      ).toBeNull()
    })

    // D12: mã kỹ thuật (escrowId "ESC_...", transactionCode "TX_...") chỉ
    // hiện trong "Chi tiết kỹ thuật" của UI; nhãn người dùng không bao giờ
    // lộ các mã này dù escrow có chứa chúng.
    it('never leaks ESC_/TX_ technical codes into the user-facing label', () => {
      const scenarios = [
        { status: 'paid' as const, escrow: held },
        {
          status: 'applied' as const,
          escrow: {
            ...held,
            settlement: {
              kind: 'release' as const,
              state: 'requested' as const,
              settledAt: null,
            },
          },
        },
        {
          status: 'applied' as const,
          escrow: {
            ...held,
            settlement: {
              kind: 'refund' as const,
              state: 'failed' as const,
              settledAt: null,
            },
          },
        },
        { status: 'released' as const },
        { status: 'refunded' as const },
      ]
      for (const scenario of scenarios) {
        const label = getDepositEscrowLabel(scenario as never)
        expect(label).not.toBeNull()
        expect(label).not.toMatch(/ESC_|TX_/)
      }
    })
  })
})
