import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ContractStatusTimeline } from './contract-status-timeline'

describe('ContractStatusTimeline', () => {
  it('renders all 4 workflow progression steps', () => {
    render(<ContractStatusTimeline status="draft" />)
    expect(screen.getByText('Khởi tạo dự thảo')).toBeInTheDocument()
    expect(screen.getByText('Đặt cọc bảo đảm')).toBeInTheDocument()
    expect(screen.getByText('Ký số e-Consent')).toBeInTheDocument()
    expect(screen.getByText('Ghi nhận sổ cái & Kích hoạt')).toBeInTheDocument()
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
})
