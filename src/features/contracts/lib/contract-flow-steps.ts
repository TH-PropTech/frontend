import type { ContractActiveStep } from './resolve-contract-active-step'

export type ContractRouteStep = Exclude<ContractActiveStep, 'completed'>
export type ContractStepState = 'done' | 'active' | 'upcoming'

export interface ContractFlowStepDefinition {
  readonly key: ContractRouteStep
  readonly label: string
  readonly shortLabel: string
  readonly pathSegment: ContractRouteStep
}

export const CONTRACT_FLOW_STEPS = [
  {
    key: 'document',
    label: 'Hợp đồng',
    shortLabel: 'Đọc hợp đồng',
    pathSegment: 'document',
  },
  {
    key: 'deposit',
    label: 'Đặt cọc',
    shortLabel: 'Thanh toán cọc',
    pathSegment: 'deposit',
  },
  {
    key: 'signing',
    label: 'Ký số',
    shortLabel: 'Ký SmartCA',
    pathSegment: 'signing',
  },
  {
    key: 'ledger',
    label: 'Kích hoạt',
    shortLabel: 'Xác nhận Fabric',
    pathSegment: 'ledger',
  },
] as const satisfies readonly ContractFlowStepDefinition[]

const SIGN_FIRST_ORDER: readonly ContractRouteStep[] = [
  'document',
  'signing',
  'deposit',
  'ledger',
]

const DEPOSIT_FIRST_ORDER: readonly ContractRouteStep[] = [
  'document',
  'deposit',
  'signing',
  'ledger',
]

export function isContractRouteStep(value: string): value is ContractRouteStep {
  return CONTRACT_FLOW_STEPS.some(step => step.key === value)
}

export function getContractFlowSteps(
  strategy: 'DEPOSIT_FIRST' | 'SIGN_FIRST'
): readonly ContractFlowStepDefinition[] {
  const order =
    strategy === 'SIGN_FIRST' ? SIGN_FIRST_ORDER : DEPOSIT_FIRST_ORDER
  return order.map(stepKey => {
    const definition = CONTRACT_FLOW_STEPS.find(step => step.key === stepKey)
    if (!definition) {
      throw new Error(`Unknown contract flow step: ${stepKey}`)
    }
    return definition
  })
}

export function getContractStepState(
  step: ContractRouteStep,
  activeStep: ContractActiveStep,
  steps: readonly ContractFlowStepDefinition[]
): ContractStepState {
  if (activeStep === 'completed') return 'done'

  const activeIndex = steps.findIndex(item => item.key === activeStep)
  const stepIndex = steps.findIndex(item => item.key === step)
  if (activeIndex < 0 || stepIndex < 0) return 'upcoming'
  if (stepIndex < activeIndex) return 'done'
  if (stepIndex === activeIndex) return 'active'
  return 'upcoming'
}

export function getPreviousContractStep(
  step: ContractRouteStep,
  strategy: 'DEPOSIT_FIRST' | 'SIGN_FIRST'
): ContractRouteStep | null {
  const steps = getContractFlowSteps(strategy)
  const index = steps.findIndex(item => item.key === step)
  return index > 0 ? (steps[index - 1]?.key ?? null) : null
}

export function getNextContractStep(
  step: ContractRouteStep,
  strategy: 'DEPOSIT_FIRST' | 'SIGN_FIRST'
): ContractRouteStep | null {
  const steps = getContractFlowSteps(strategy)
  const index = steps.findIndex(item => item.key === step)
  return index >= 0 && index < steps.length - 1
    ? (steps[index + 1]?.key ?? null)
    : null
}

export function toContractStepHref(
  contractId: string,
  step: ContractRouteStep
): string {
  return `/contracts/${encodeURIComponent(contractId)}/steps/${step}`
}
