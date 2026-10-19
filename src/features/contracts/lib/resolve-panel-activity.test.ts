import { describe, expect, it } from 'vitest'
import type { ContractFlowAction, ContractFlowView } from '../api/contracts-api'
import { resolvePanelActivity } from './resolve-panel-activity'

const flow = (
  activeStage: ContractFlowView['activeStage'],
  nextActions: ContractFlowAction[] = []
): ContractFlowView => ({
  version: 1,
  strategy: 'SIGN_FIRST',
  stages: [],
  activeStage,
  nextActions,
})

const consentAction = (enabled: boolean): ContractFlowAction => ({
  action: 'CONSENT_DEPOSIT',
  actorRole: 'tenant',
  enabled,
  reasonCode: enabled ? null : 'DEPOSIT_AGREEMENT_METADATA_MISSING',
  stage: 'deposit',
})

describe('resolvePanelActivity', () => {
  it('Ở stage document: panel cọc active khi tenant có CONSENT_DEPOSIT bật', () => {
    expect(
      resolvePanelActivity(
        'deposit',
        'document',
        flow('document', [consentAction(true)])
      )
    ).toBe(true)
  })

  it('landlord (không có hành động) thì panel cọc không active khi stage chưa tới', () => {
    expect(resolvePanelActivity('deposit', 'document', flow('document'))).toBe(
      false
    )
  })

  it('hành động bị tắt không kích hoạt panel', () => {
    expect(
      resolvePanelActivity(
        'deposit',
        'document',
        flow('document', [consentAction(false)])
      )
    ).toBe(false)
  })

  it('panel của stage đang active luôn active', () => {
    expect(resolvePanelActivity('signing', 'signing', flow('signing'))).toBe(
      true
    )
  })

  it('không có flow thì so với bước suy luận ở client', () => {
    expect(resolvePanelActivity('deposit', 'deposit', undefined)).toBe(true)
    expect(resolvePanelActivity('deposit', 'document', null)).toBe(false)
  })
})
