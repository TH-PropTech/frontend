import * as React from 'react'
import { notFound } from 'next/navigation'
import { isContractRouteStep } from '@/features/contracts'
import { ContractStepFlow } from '@/widgets/contract-workspace'

interface ContractStepPageProps {
  params: Promise<{ id: string; step: string }>
}

export default async function ContractStepPage({
  params,
}: ContractStepPageProps): Promise<React.ReactElement> {
  const { id, step } = await params

  if (!isContractRouteStep(step)) {
    notFound()
  }

  return <ContractStepFlow contractId={id} step={step} />
}
