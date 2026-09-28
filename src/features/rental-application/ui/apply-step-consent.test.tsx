import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ApplyStepConsent } from './apply-step-consent'
import type { PublicLegalTermsResponse } from '@/features/legal-terms'
import type {
  RentalApplicationDisclosure,
  RentalExecutionPolicyRef,
} from '../api/rental-application-api'

const mockDisclosure: RentalApplicationDisclosure = {
  version: 'disclosure-v1',
  hash: 'disc-hash-123',
  items: [
    {
      id: 'req-1',
      title: 'Cam kết thông tin',
      body: 'Thông tin cá nhân cung cấp là chính xác.',
      required: true,
    },
    {
      id: 'opt-1',
      title: 'Nhận thông báo qua SMS',
      body: 'Đồng ý nhận tin nhắn cập nhật trạng thái.',
      required: false,
    },
  ],
}

const mockTerms: PublicLegalTermsResponse = {
  key: 'rental-terms-canonical',
  version: 3,
  title: 'Quy chế thuê nhà tiêu chuẩn',
  summary: 'Tóm tắt điều khoản pháp lý.',
  contentHash: 'hash333444555666777',
  publishedAt: '2026-09-01T00:00:00Z',
  sections: [],
}

const mockExecutionPolicy: RentalExecutionPolicyRef = {
  policyId: 'sign-first',
  version: 1,
  strategy: 'SIGN_FIRST',
  contentHash: 'policy-hash',
}

describe('ApplyStepConsent Component', () => {
  afterEach(() => cleanup())

  it('disables submit when required disclosures or terms acceptance are missing', () => {
    render(
      <ApplyStepConsent
        disclosure={mockDisclosure}
        terms={mockTerms}
        acknowledgedDisclosures={[]}
        termsAccepted={false}
        onToggleDisclosure={vi.fn()}
        onToggleTermsAccepted={vi.fn()}
        onBack={vi.fn()}
        onSubmit={vi.fn()}
      />
    )

    const submitBtn = screen.getByRole('button', {
      name: /Gửi hồ sơ đặt thuê/i,
    })
    expect(submitBtn).toBeDisabled()
  })

  it('enables submit when all required disclosures are acknowledged and terms accepted (optional unchecked)', () => {
    const onSubmit = vi.fn()

    render(
      <ApplyStepConsent
        disclosure={mockDisclosure}
        terms={mockTerms}
        acknowledgedDisclosures={['req-1']} // opt-1 is optional
        termsAccepted={true}
        onToggleDisclosure={vi.fn()}
        onToggleTermsAccepted={vi.fn()}
        onBack={vi.fn()}
        onSubmit={onSubmit}
      />
    )

    const submitBtn = screen.getByRole('button', {
      name: /Gửi hồ sơ đặt thuê/i,
    })
    expect(submitBtn).not.toBeDisabled()
    fireEvent.click(submitBtn)
    expect(onSubmit).toHaveBeenCalledTimes(1)
  })

  it('requires tenant acknowledgement when the fee quote contains a service fee', () => {
    const feeSnapshot = {
      scheduleId: 'fee-1',
      version: 2,
      contentHash: 'fee-hash',
      quote: [
        {
          feeKind: 'TENANT_SERVICE' as const,
          payerRole: 'tenant' as const,
          amountBeforeVat: 100_000,
          vatAmount: 10_000,
          amount: 110_000,
        },
      ],
    }
    render(
      <ApplyStepConsent
        disclosure={mockDisclosure}
        terms={mockTerms}
        acknowledgedDisclosures={['req-1']}
        termsAccepted
        feeSnapshot={feeSnapshot}
        onToggleDisclosure={vi.fn()}
        onToggleTermsAccepted={vi.fn()}
        onBack={vi.fn()}
        onSubmit={vi.fn()}
      />
    )
    expect(
      screen.getByRole('button', { name: /Gửi hồ sơ đặt thuê/i })
    ).toBeDisabled()
    expect(screen.getByTestId('tenant-fee-acknowledgement')).toBeInTheDocument()
  })

  it('triggers onToggleDisclosure and onToggleTermsAccepted when checkboxes are toggled', () => {
    const onToggleDisclosure = vi.fn()
    const onToggleTerms = vi.fn()

    render(
      <ApplyStepConsent
        disclosure={mockDisclosure}
        terms={mockTerms}
        acknowledgedDisclosures={[]}
        termsAccepted={false}
        onToggleDisclosure={onToggleDisclosure}
        onToggleTermsAccepted={onToggleTerms}
        onBack={vi.fn()}
        onSubmit={vi.fn()}
      />
    )

    fireEvent.click(screen.getByTestId('disclosure-item-req-1'))
    expect(onToggleDisclosure).toHaveBeenCalledWith('req-1')

    fireEvent.click(screen.getByTestId('terms-acceptance-checkbox'))
    expect(onToggleTerms).toHaveBeenCalledWith(true)
  })

  it('shows loading state and disables submit when submitting is true', () => {
    render(
      <ApplyStepConsent
        disclosure={mockDisclosure}
        terms={mockTerms}
        acknowledgedDisclosures={['req-1']}
        termsAccepted={true}
        submitting={true}
        onToggleDisclosure={vi.fn()}
        onToggleTermsAccepted={vi.fn()}
        onBack={vi.fn()}
        onSubmit={vi.fn()}
      />
    )

    expect(screen.getByText('Đang gửi hồ sơ…')).toBeInTheDocument()
    const submitBtn = screen.getByRole('button', { name: /Đang gửi hồ sơ…/i })
    expect(submitBtn).toBeDisabled()
  })

  it('triggers onBack when back button is clicked', () => {
    const onBack = vi.fn()

    render(
      <ApplyStepConsent
        disclosure={mockDisclosure}
        terms={mockTerms}
        acknowledgedDisclosures={[]}
        termsAccepted={false}
        onToggleDisclosure={vi.fn()}
        onToggleTermsAccepted={vi.fn()}
        onBack={onBack}
        onSubmit={vi.fn()}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: /Quay lại chọn gói/i }))
    expect(onBack).toHaveBeenCalledTimes(1)
  })

  it('requires explicit execution-policy consent before submission', () => {
    const onTogglePolicy = vi.fn()
    render(
      <ApplyStepConsent
        disclosure={mockDisclosure}
        terms={mockTerms}
        executionPolicy={mockExecutionPolicy}
        executionPolicyAccepted={false}
        acknowledgedDisclosures={['req-1']}
        termsAccepted={true}
        onToggleDisclosure={vi.fn()}
        onToggleTermsAccepted={vi.fn()}
        onToggleExecutionPolicyAccepted={onTogglePolicy}
        onBack={vi.fn()}
        onSubmit={vi.fn()}
      />
    )

    expect(screen.getByRole('button', { name: /Gửi hồ sơ/i })).toBeDisabled()
    fireEvent.click(screen.getByTestId('execution-policy-acceptance-checkbox'))
    expect(onTogglePolicy).toHaveBeenCalledWith(true)
  })
})
