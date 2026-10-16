import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import {
  ContractWorkspaceProvider,
  useSharedContractWorkspace,
} from './contract-workspace-provider'

const mockUseContractWorkspace = vi.hoisted(() => vi.fn())

vi.mock('./use-contract-workspace', () => ({
  useContractWorkspace: mockUseContractWorkspace,
}))

function StepProbe({ step }: { step: string }) {
  const workspace = useSharedContractWorkspace()
  return <p>{`${step}:${workspace.currentUserId}`}</p>
}

describe('ContractWorkspaceProvider', () => {
  it('tải dữ liệu hợp đồng một lần và chia sẻ cho mọi bước', () => {
    mockUseContractWorkspace.mockReturnValue({ currentUserId: 'user-1' })

    const { rerender } = render(
      <ContractWorkspaceProvider contractId="contract-1">
        <StepProbe step="document" />
      </ContractWorkspaceProvider>
    )
    expect(screen.getByText('document:user-1')).toBeInTheDocument()
    expect(mockUseContractWorkspace).toHaveBeenCalledTimes(1)
    expect(mockUseContractWorkspace).toHaveBeenCalledWith({
      contractId: 'contract-1',
      enablePolling: false,
    })

    // Đổi bước = chỉ đổi children bên trong provider cùng contractId.
    rerender(
      <ContractWorkspaceProvider contractId="contract-1">
        <StepProbe step="deposit" />
      </ContractWorkspaceProvider>
    )
    expect(screen.getByText('deposit:user-1')).toBeInTheDocument()
    expect(
      mockUseContractWorkspace.mock.calls.every(
        ([options]) => options.contractId === 'contract-1'
      )
    ).toBe(true)
  })

  it('báo lỗi rõ ràng khi dùng ngoài provider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => undefined)
    expect(() => render(<StepProbe step="document" />)).toThrow(
      /ContractWorkspaceProvider/
    )
    spy.mockRestore()
  })
})
