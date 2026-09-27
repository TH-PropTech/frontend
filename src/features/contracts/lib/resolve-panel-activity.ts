import type { ContractFlowView } from '../api/contracts-api'
import type { ContractActiveStep } from './resolve-contract-active-step'
import type { ContractRouteStep } from './contract-flow-steps'

/**
 * Panel được bật khi stage của nó đang active, hoặc khi server trả một hành
 * động `enabled` của user hiện tại thực hiện trong panel đó (ví dụ đồng ý cọc
 * lúc stage `document` còn active). `nextActions` đã được server lọc theo
 * danh tính JWT nên không cần so vai trò ở client.
 */
export function resolvePanelActivity(
  panel: ContractRouteStep,
  activeStep: ContractActiveStep,
  serverFlow: ContractFlowView | null | undefined
): boolean {
  if (activeStep === panel) return true
  if (!serverFlow) return false
  return serverFlow.nextActions.some(
    action => action.enabled && action.stage === panel
  )
}
