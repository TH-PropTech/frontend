import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ContractFlowGuide } from './contract-flow-guide'
import type {
  ContractFlowStageKey,
  ContractFlowStageStatus,
  ContractFlowView,
} from '../api/contracts-api'

describe('ContractFlowGuide', () => {
  // ---------------------------------------------------------------------------
  // Happy path — DEPOSIT_FIRST
  // ---------------------------------------------------------------------------
  describe('DEPOSIT_FIRST strategy', () => {
    it('renders with draft status — step document is active', () => {
      render(<ContractFlowGuide strategy="DEPOSIT_FIRST" status="draft" />)
      expect(screen.getByTestId('contract-flow-guide')).toBeInTheDocument()
      expect(screen.getByTestId('flow-step-document')).toHaveAttribute(
        'data-state',
        'active'
      )
      expect(screen.getByTestId('flow-step-deposit')).toHaveAttribute(
        'data-state',
        'upcoming'
      )
      expect(screen.getByTestId('flow-step-signing')).toHaveAttribute(
        'data-state',
        'upcoming'
      )
      expect(screen.getByTestId('flow-step-ledger')).toHaveAttribute(
        'data-state',
        'upcoming'
      )
    })

    it('renders deposit-pending — deposit step is active', () => {
      render(
        <ContractFlowGuide strategy="DEPOSIT_FIRST" status="deposit-pending" />
      )
      expect(screen.getByTestId('flow-step-document')).toHaveAttribute(
        'data-state',
        'done'
      )
      expect(screen.getByTestId('flow-step-deposit')).toHaveAttribute(
        'data-state',
        'active'
      )
      expect(screen.getByTestId('flow-step-signing')).toHaveAttribute(
        'data-state',
        'upcoming'
      )
      expect(screen.getByTestId('flow-step-ledger')).toHaveAttribute(
        'data-state',
        'upcoming'
      )
    })

    it('renders awaiting-signature — signing step is active', () => {
      render(
        <ContractFlowGuide
          strategy="DEPOSIT_FIRST"
          status="awaiting-signature"
        />
      )
      expect(screen.getByTestId('flow-step-document')).toHaveAttribute(
        'data-state',
        'done'
      )
      expect(screen.getByTestId('flow-step-deposit')).toHaveAttribute(
        'data-state',
        'done'
      )
      expect(screen.getByTestId('flow-step-signing')).toHaveAttribute(
        'data-state',
        'active'
      )
      expect(screen.getByTestId('flow-step-ledger')).toHaveAttribute(
        'data-state',
        'upcoming'
      )
    })
  })

  // ---------------------------------------------------------------------------
  // Happy path — SIGN_FIRST
  // ---------------------------------------------------------------------------
  describe('SIGN_FIRST strategy', () => {
    it('renders awaiting-signature (neither signed) — signing is active', () => {
      render(
        <ContractFlowGuide
          strategy="SIGN_FIRST"
          status="awaiting-signature"
          signedByTenant={false}
          signedByLandlord={false}
        />
      )
      expect(screen.getByTestId('flow-step-document')).toHaveAttribute(
        'data-state',
        'done'
      )
      expect(screen.getByTestId('flow-step-signing')).toHaveAttribute(
        'data-state',
        'active'
      )
      expect(screen.getByTestId('flow-step-deposit')).toHaveAttribute(
        'data-state',
        'upcoming'
      )
      expect(screen.getByTestId('flow-step-ledger')).toHaveAttribute(
        'data-state',
        'upcoming'
      )
    })

    it('renders fully-signed-pending-deposit — deposit is active', () => {
      render(
        <ContractFlowGuide
          strategy="SIGN_FIRST"
          status="fully-signed-pending-deposit"
          signedByTenant={true}
          signedByLandlord={true}
        />
      )
      expect(screen.getByTestId('flow-step-document')).toHaveAttribute(
        'data-state',
        'done'
      )
      expect(screen.getByTestId('flow-step-signing')).toHaveAttribute(
        'data-state',
        'done'
      )
      expect(screen.getByTestId('flow-step-deposit')).toHaveAttribute(
        'data-state',
        'active'
      )
      expect(screen.getByTestId('flow-step-ledger')).toHaveAttribute(
        'data-state',
        'upcoming'
      )
    })
  })

  // ---------------------------------------------------------------------------
  // Active / completed
  // ---------------------------------------------------------------------------
  it('renders active contract — ledger step is active', () => {
    render(<ContractFlowGuide strategy="DEPOSIT_FIRST" status="active" />)
    expect(screen.getByTestId('flow-step-ledger')).toHaveAttribute(
      'data-state',
      'active'
    )
  })

  it('renders completed contract — all steps done', () => {
    render(<ContractFlowGuide strategy="DEPOSIT_FIRST" status="completed" />)
    expect(screen.getByTestId('flow-step-document')).toHaveAttribute(
      'data-state',
      'done'
    )
    expect(screen.getByTestId('flow-step-deposit')).toHaveAttribute(
      'data-state',
      'done'
    )
    expect(screen.getByTestId('flow-step-signing')).toHaveAttribute(
      'data-state',
      'done'
    )
    expect(screen.getByTestId('flow-step-ledger')).toHaveAttribute(
      'data-state',
      'done'
    )
    expect(screen.getByText('Hợp đồng hoàn tất')).toBeInTheDocument()
  })

  // ---------------------------------------------------------------------------
  // Strategy badge
  // ---------------------------------------------------------------------------
  it('shows "Cọc trước → Ký sau" badge for DEPOSIT_FIRST', () => {
    render(<ContractFlowGuide strategy="DEPOSIT_FIRST" status="draft" />)
    expect(screen.getByText('Cọc trước → Ký sau')).toBeInTheDocument()
  })

  it('shows "Ký trước → Cọc sau" badge for SIGN_FIRST', () => {
    render(<ContractFlowGuide strategy="SIGN_FIRST" status="draft" />)
    expect(screen.getByText('Ký trước → Cọc sau')).toBeInTheDocument()
  })

  it('provides a link to the active step when a contract id is available', () => {
    render(
      <ContractFlowGuide
        contractId="contract-1"
        strategy="DEPOSIT_FIRST"
        status="deposit-pending"
      />
    )

    expect(
      screen.getByTestId('contract-flow-current-step-link')
    ).toHaveAttribute('href', '/contracts/contract-1/steps/deposit')
  })
})

describe('ContractFlowGuide with serverFlow', () => {
  const serverFlow = (
    strategy: ContractFlowView['strategy'],
    stages: Array<[ContractFlowStageKey, ContractFlowStageStatus]>
  ): ContractFlowView => ({
    version: 1,
    strategy,
    stages: stages.map(([key, status]) => ({
      key,
      status,
      blockers: [],
      completedAt: null,
    })),
    activeStage:
      stages.find(
        ([, status]) => status === 'active' || status === 'blocked'
      )?.[0] ?? 'completed',
    nextActions: [],
  })

  it('đánh dấu bước đặt cọc active dù status vẫn là draft', () => {
    render(
      <ContractFlowGuide
        strategy="DEPOSIT_FIRST"
        status="draft"
        serverFlow={serverFlow('DEPOSIT_FIRST', [
          ['document', 'done'],
          ['deposit', 'active'],
          ['signing', 'upcoming'],
          ['ledger', 'upcoming'],
        ])}
      />
    )

    expect(screen.getByTestId('flow-step-document')).toHaveAttribute(
      'data-state',
      'done'
    )
    expect(screen.getByTestId('flow-step-deposit')).toHaveAttribute(
      'data-state',
      'active'
    )
    expect(screen.getByText('Bước hiện tại: Đặt cọc')).toBeInTheDocument()
  })

  it('render theo thứ tự stage của server cho SIGN_FIRST và thêm bước nhận nhà', () => {
    render(
      <ContractFlowGuide
        strategy="SIGN_FIRST"
        status="active"
        serverFlow={serverFlow('SIGN_FIRST', [
          ['document', 'done'],
          ['signing', 'done'],
          ['deposit', 'done'],
          ['ledger', 'done'],
          ['move-in', 'active'],
        ])}
      />
    )

    expect(
      screen.getAllByRole('listitem').map(item => item.dataset.testid)
    ).toEqual([
      'flow-step-document',
      'flow-step-signing',
      'flow-step-deposit',
      'flow-step-ledger',
      'flow-step-move-in',
    ])
    expect(screen.getByText('Nhận nhà')).toBeInTheDocument()
  })

  it('hiển thị trạng thái blocked của server', () => {
    render(
      <ContractFlowGuide
        strategy="DEPOSIT_FIRST"
        status="active"
        serverFlow={serverFlow('DEPOSIT_FIRST', [
          ['document', 'done'],
          ['deposit', 'done'],
          ['signing', 'done'],
          ['ledger', 'blocked'],
        ])}
      />
    )

    expect(screen.getByTestId('flow-step-ledger')).toHaveAttribute(
      'data-state',
      'blocked'
    )
  })
})
