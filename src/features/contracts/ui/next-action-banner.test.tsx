import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { ContractFlowAction, ContractFlowView } from '../api/contracts-api'
import { NextActionBanner } from './next-action-banner'

const flow = (
  nextActions: ContractFlowAction[],
  activeStage: ContractFlowView['activeStage'] = 'document'
): ContractFlowView => ({
  version: 1,
  strategy: 'SIGN_FIRST',
  stages: [],
  activeStage,
  nextActions,
})

const action = (
  overrides: Partial<ContractFlowAction> = {}
): ContractFlowAction => ({
  action: 'CONSENT_DEPOSIT',
  actorRole: 'tenant',
  enabled: true,
  reasonCode: null,
  stage: 'deposit',
  ...overrides,
})

describe('NextActionBanner', () => {
  it('không render khi response chưa có flow', () => {
    const { container } = render(
      <NextActionBanner contractId="c-1" flow={undefined} />
    )
    expect(container).toBeEmptyDOMElement()
  })

  it('tenant thấy hành động đồng ý cọc và liên kết tới bước đặt cọc', () => {
    render(<NextActionBanner contractId="c-1" flow={flow([action()])} />)

    expect(screen.getByTestId('next-action-banner')).toHaveTextContent(
      'Đồng ý thỏa thuận cọc'
    )
    expect(screen.getByRole('link', { name: /Thực hiện/ })).toHaveAttribute(
      'href',
      '/contracts/c-1/steps/deposit'
    )
  })

  it('sau khi đồng ý cọc, banner chuyển sang thanh toán cọc', () => {
    render(
      <NextActionBanner
        contractId="c-1"
        flow={flow([action({ action: 'PAY_DEPOSIT' })], 'deposit')}
      />
    )

    expect(screen.getByTestId('next-action-banner')).toHaveTextContent(
      'Thanh toán cọc'
    )
  })

  it('landlord không có hành động thì thấy trạng thái chờ, không có nút', () => {
    render(<NextActionBanner contractId="c-1" flow={flow([])} />)

    expect(screen.getByTestId('next-action-banner')).toHaveTextContent(
      'Đang chờ bên còn lại hoặc hệ thống'
    )
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  it('hành động bị tắt hiển thị lý do thay vì nút', () => {
    render(
      <NextActionBanner
        contractId="c-1"
        flow={flow([
          action({
            action: 'SIGN_SMARTCA',
            enabled: false,
            reasonCode: 'ARTIFACT_NOT_LOCKED',
            stage: 'signing',
          }),
        ])}
      />
    )

    expect(screen.getByTestId('next-action-banner')).toHaveTextContent(
      'Bản PDF hợp đồng chưa được khóa'
    )
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  it('hợp đồng hoàn tất thì báo hoàn tất', () => {
    render(<NextActionBanner contractId="c-1" flow={flow([], 'completed')} />)

    expect(screen.getByTestId('next-action-banner')).toHaveTextContent(
      'Hợp đồng đã hoàn tất các bước'
    )
  })
})
