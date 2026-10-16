import * as React from 'react'
import { ContractWorkspaceProvider } from '@/widgets/contract-workspace'

interface ContractStepsLayoutProps {
  children: React.ReactNode
  params: Promise<{ id: string }>
}

/** Layout không remount khi đổi bước, nên dữ liệu hợp đồng chỉ tải một lần cho cả 4 bước. */
export default async function ContractStepsLayout({
  children,
  params,
}: ContractStepsLayoutProps): Promise<React.ReactElement> {
  const { id } = await params
  return (
    <ContractWorkspaceProvider contractId={id}>
      {children}
    </ContractWorkspaceProvider>
  )
}
