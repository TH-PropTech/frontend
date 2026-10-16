'use client'

import {
  createContext,
  useContext,
  type ReactElement,
  type ReactNode,
} from 'react'
import { useContractWorkspace } from './use-contract-workspace'

export type ContractWorkspaceState = ReturnType<typeof useContractWorkspace>

const ContractWorkspaceContext = createContext<ContractWorkspaceState | null>(
  null
)

/**
 * Giữ MỘT bản dữ liệu hợp đồng cho mọi bước (`/contracts/[id]/steps/*`). Layout của nhóm route
 * không remount khi đổi bước nên đổi tab không tải lại view, không hiện màn hình chờ, và các
 * bước cùng thấy kết quả `refresh()` sau mỗi thao tác.
 */
export function ContractWorkspaceProvider({
  contractId,
  children,
}: {
  contractId: string
  children: ReactNode
}): ReactElement {
  const workspace = useContractWorkspace({ contractId, enablePolling: false })
  return (
    <ContractWorkspaceContext.Provider value={workspace}>
      {children}
    </ContractWorkspaceContext.Provider>
  )
}

export function useSharedContractWorkspace(): ContractWorkspaceState {
  const workspace = useContext(ContractWorkspaceContext)
  if (!workspace) {
    throw new Error(
      'useSharedContractWorkspace phải nằm trong ContractWorkspaceProvider'
    )
  }
  return workspace
}
