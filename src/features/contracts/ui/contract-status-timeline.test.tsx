import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ContractStatusTimeline } from './contract-status-timeline'

describe('ContractStatusTimeline', () => {
  it('renders all 4 workflow progression steps', () => {
    render(<ContractStatusTimeline status="draft" />)
    expect(screen.getByText('Khởi tạo dự thảo')).toBeInTheDocument()
    expect(screen.getByText('Đặt cọc bảo đảm')).toBeInTheDocument()
    expect(screen.getByText('Ký số VNPT SmartCA')).toBeInTheDocument()
    expect(screen.getByText('Ghi nhận sổ cái & Kích hoạt')).toBeInTheDocument()
  })

  it('marks draft creation as the current step for a draft contract', () => {
    render(<ContractStatusTimeline status="draft" />)

    expect(screen.getByTestId('step-draft')).toHaveAttribute(
      'data-state',
      'current'
    )
    expect(screen.getByTestId('step-deposit')).toHaveAttribute(
      'data-state',
      'upcoming'
    )
    expect(screen.getByTestId('step-sign')).toHaveAttribute(
      'data-state',
      'upcoming'
    )
  })

  it('marks deposit step current when deposit-pending', () => {
    render(
      <ContractStatusTimeline
        status="deposit-pending"
        depositStatus="pending"
      />
    )
    const depositStep = screen.getByTestId('step-deposit')
    expect(depositStep).toBeInTheDocument()
    expect(screen.getByText('Chờ thanh toán cọc')).toBeInTheDocument()
  })

  it('marks signing step current when awaiting-signature', () => {
    render(
      <ContractStatusTimeline
        status="awaiting-signature"
        depositStatus="paid"
        signedByTenant={true}
        signedByLandlord={false}
      />
    )
    expect(screen.getByText('Bên thuê đã ký, chờ chủ nhà')).toBeInTheDocument()
  })

  it('marks all completed when contract is active with txHash', () => {
    render(
      <ContractStatusTimeline
        status="active"
        depositStatus="paid"
        signedByTenant={true}
        signedByLandlord={true}
        txHash="0xledger123456"
      />
    )
    expect(
      screen.getByText('Đã kích hoạt & neo hash sổ cái')
    ).toBeInTheDocument()
  })

  it('handles terminated status', () => {
    render(<ContractStatusTimeline status="terminated" />)
    expect(screen.getByText('Hợp đồng đã chấm dứt')).toBeInTheDocument()
  })

  it('orders the workflow as deposit first by default', () => {
    render(<ContractStatusTimeline status="draft" />)

    const stepIds = within(screen.getByTestId('contract-status-timeline'))
      .getAllByTestId(/^step-/)
      .map(step => step.getAttribute('data-testid'))

    expect(stepIds).toEqual([
      'step-draft',
      'step-deposit',
      'step-sign',
      'step-ledger',
    ])
  })

  it('orders signing before deposit for SIGN_FIRST contracts', () => {
    render(
      <ContractStatusTimeline
        status="awaiting-signature"
        strategy="SIGN_FIRST"
      />
    )

    const stepIds = within(screen.getByTestId('contract-status-timeline'))
      .getAllByTestId(/^step-/)
      .map(step => step.getAttribute('data-testid'))

    expect(stepIds).toEqual([
      'step-draft',
      'step-sign',
      'step-deposit',
      'step-ledger',
    ])
  })

  it('marks signing complete and deposit current after SIGN_FIRST signatures', () => {
    render(
      <ContractStatusTimeline
        status="fully-signed-pending-deposit"
        strategy="SIGN_FIRST"
        depositStatus="pending"
        signedByTenant={true}
        signedByLandlord={true}
      />
    )

    expect(screen.getByTestId('step-sign')).toHaveAttribute(
      'data-state',
      'completed'
    )
    expect(screen.getByTestId('step-deposit')).toHaveAttribute(
      'data-state',
      'current'
    )
    expect(screen.getByTestId('step-ledger')).toHaveAttribute(
      'data-state',
      'upcoming'
    )
    expect(
      screen.getByText('Chờ thanh toán cọc để kích hoạt')
    ).toBeInTheDocument()
  })
})
