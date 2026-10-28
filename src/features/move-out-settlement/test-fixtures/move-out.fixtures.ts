import type { DepositStatement, MoveOutHandover } from '../api/move-out-types'

export const HASH = 'a'.repeat(64)

export const makeHandover = (
  patch: Partial<MoveOutHandover> = {}
): MoveOutHandover => ({
  _id: 'h1',
  contractId: 'c1',
  revision: 1,
  handedBackAt: '2026-10-01T00:00:00.000Z',
  meterReadings: { electricity: 120, water: 30 },
  keyCount: 2,
  inventoryItems: [
    {
      name: 'Sofa',
      quantity: 1,
      conditionAtMoveIn: 'good',
      noteAtMoveIn: null,
      condition: 'damaged',
      note: 'Rách',
    },
  ],
  notes: null,
  discrepancies: [],
  responseDays: 3,
  responseDueAt: '2999-01-01T00:00:00.000Z',
  status: 'recorded',
  handoverHash: HASH,
  tenantConfirmation: null,
  landlordConfirmation: { at: '2026-10-01T00:00:00.000Z', hash: HASH },
  completedAt: null,
  completionReason: null,
  dispute: null,
  ...patch,
})

export const makeStatement = (
  patch: Partial<DepositStatement> = {}
): DepositStatement => ({
  _id: 's1',
  contractId: 'c1',
  status: 'awaiting-tenant',
  depositAmount: 10_000_000,
  lines: [
    {
      id: 'l1',
      reason: 'Sửa sofa',
      amount: 2_000_000,
      evidenceUrls: [],
      tenantResponse: null,
    },
    {
      id: 'l2',
      reason: 'Vệ sinh',
      amount: 500_000,
      evidenceUrls: [],
      tenantResponse: null,
    },
  ],
  refunds: [],
  responseDays: 3,
  submittedAt: '2026-10-02T00:00:00.000Z',
  responseDueAt: '2999-01-01T00:00:00.000Z',
  acceptedAt: null,
  acceptedReason: null,
  refundDueAt: null,
  refundOverdueAt: null,
  closedAt: null,
  closeReason: null,
  dispute: null,
  ...patch,
})

export const BANNED_TERMS =
  /escrow|ký quỹ|blockchain|hyperledger|ledger|sổ cái|on-chain|txid|artifact|snapshot|\bhash\b|mô phỏng/i
export const INTERNAL_CODE =
  /[A-Z]{3,}(_[A-Z0-9]+){1,}|awaiting-tenant|refund-recorded|tenant-no-response|both-confirmed/
