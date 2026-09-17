import { describe, it, expect } from 'vitest'
import fixture from '../test-fixtures/canonical-contract-view.fixture.json'
import type { ContractViewDto } from './contracts-api'

describe('Canonical ContractViewDto Fixture Contract', () => {
  it('strictly validates against the canonical Backend ContractViewDto interface', () => {
    const view = fixture as unknown as ContractViewDto

    // 1. Contract Overview
    expect(view.contract.id).toBe('658c149d5a892b112c3d4e5f')
    expect(view.contract.code).toBe('HD-2026-00123')
    expect(view.contract.status).toBe('awaiting-signature')
    expect(view.contract.executionMethod).toBe('POC_ECONSENT')

    // 2. Signing Eligibility canonical property is `eligible`, not `canSign`
    expect(view.actions.signingEligibility.eligible).toBe(true)
    expect(view.actions.signingEligibility.reasonCode).toBeNull()

    // 3. Deposit canonical property is `agreementId`, not `depositAgreementId`
    expect(view.deposit).not.toBeNull()
    expect(view.deposit?.agreementId).toBe('dep-agree-999')
    expect(view.deposit?.amount).toBe(36000000)
    expect(view.deposit?.status).toBe('paid')
    expect(view.deposit?.consentGiven).toBe(true)

    // 4. Artifact and Deposit Actions
    expect(view.actions.canDownloadArtifact).toBe(true)
    expect(view.actions.canPayDeposit).toBe(false)
    expect(view.actions.paymentReasonCode).toBe('DEPOSIT_ALREADY_PAID')
    expect(view.actions.canEditContent).toBe(false)
    expect(view.actions.canLockContent).toBe(false)

    // 5. Parties info and Masked CCCD
    expect(view.parties.tenant.role).toBe('tenant')
    expect(view.parties.tenant.maskedCccd).toBe('079***789')
    expect(view.parties.tenant.hasSigned).toBe(false)
    expect(view.parties.landlord.role).toBe('landlord')
    expect(view.parties.landlord.hasSigned).toBe(true)

    // 6. Ledger Summary
    expect(view.ledger.networkMode).toBe('fabric')
    expect(view.ledger.connectionState).toBe('connected')
    expect(view.ledger.status).toBe('confirmed-fabric')
    expect(view.ledger.txHash).toBe('0xfabric_tx_confirmed_abc123')
    expect(view.ledger.blockNumber).toBe(105)
  })
})
