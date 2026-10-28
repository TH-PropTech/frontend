import type { ContractFlowView } from '../api/contracts-api'
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

/** Chỉ xuất hiện khi server trả stage `move-in` (hợp đồng có quyết toán). */
export const MOVE_IN_FLOW_STEP = {
  key: 'move-in',
  label: 'Nhận nhà',
  shortLabel: 'Quyết toán & bàn giao',
  pathSegment: 'move-in',
} as const satisfies ContractFlowStepDefinition

/** Chỉ xuất hiện khi server trả stage `move-out`. */
export const MOVE_OUT_FLOW_STEP = {
  key: 'move-out',
  label: 'Trả nhà',
  shortLabel: 'Trả nhà & hoàn cọc',
  pathSegment: 'move-out',
} as const satisfies ContractFlowStepDefinition

const ALL_FLOW_STEPS: readonly ContractFlowStepDefinition[] = [
  ...CONTRACT_FLOW_STEPS,
  MOVE_IN_FLOW_STEP,
  MOVE_OUT_FLOW_STEP,
]

/** Luồng duy nhất: ký trước, cọc sau. */
const SIGN_FIRST_ORDER: readonly ContractRouteStep[] = [
  'document',
  'signing',
  'deposit',
  'ledger',
]

export function isContractRouteStep(value: string): value is ContractRouteStep {
  return ALL_FLOW_STEPS.some(step => step.key === value)
}

/** Thứ tự bước lấy từ `flow` của server khi có, ngược lại theo luồng ký trước. */
export function getContractFlowSteps(
  serverFlow?: ContractFlowView | null
): readonly ContractFlowStepDefinition[] {
  const order: readonly ContractRouteStep[] = serverFlow
    ? serverFlow.stages.map(stage => stage.key)
    : SIGN_FIRST_ORDER
  return order.map(stepKey => {
    const definition = ALL_FLOW_STEPS.find(step => step.key === stepKey)
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
  serverFlow?: ContractFlowView | null
): ContractRouteStep | null {
  const steps = getContractFlowSteps(serverFlow)
  const index = steps.findIndex(item => item.key === step)
  return index > 0 ? (steps[index - 1]?.key ?? null) : null
}

export function getNextContractStep(
  step: ContractRouteStep,
  serverFlow?: ContractFlowView | null
): ContractRouteStep | null {
  const steps = getContractFlowSteps(serverFlow)
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
