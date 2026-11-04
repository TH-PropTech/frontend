import { fireEvent, render, screen } from '@testing-library/react'
import * as React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useVietnamLocations } from '@/shared/lib/use-vietnam-locations'
import { KycStep2 } from './kyc-step2'

vi.mock('@/shared/lib/use-vietnam-locations', () => ({
  useVietnamLocations: vi.fn(),
}))

type Props = React.ComponentProps<typeof KycStep2>
type Form = Props['kycForm']

const VALID: Form = {
  fullName: 'TỐNG PHAN KIM THẠCH',
  cccdNumber: '054204004683',
  dob: '22/10/2004',
  address: '12 Lê Lợi, Thành phố Hồ Chí Minh',
  gender: 'Nam',
  nationality: 'Việt Nam',
  placeOfOrigin: '',
  issueDate: '',
  placeOfIssue: '',
}

function renderStep(form: Form) {
  const handleConfirmAndSubmitKyc = vi.fn()
  const props: Props = {
    kycForm: form,
    setKycForm: vi.fn(),
    isProcessing: false,
    setCurrentStep: vi.fn(),
    handleConfirmAndSubmitKyc,
  }
  render(<KycStep2 {...props} />)
  return { handleConfirmAndSubmitKyc }
}

describe('KycStep2 form', () => {
  beforeEach(() => {
    vi.mocked(useVietnamLocations).mockReturnValue({
      provinces: [
        {
          name: 'Thành phố Hồ Chí Minh',
          code: 79,
          division_type: 'thành phố trung ương',
          codename: 'ho_chi_minh',
          phone_code: 28,
        },
      ],
      districts: [],
      wards: [],
      isLoadingProvinces: false,
      isLoadingDistricts: false,
      isLoadingWards: false,
    })
  })

  it('blocks the submit and names what is missing when the form is incomplete', () => {
    const { handleConfirmAndSubmitKyc } = renderStep({
      ...VALID,
      dob: '',
      gender: '',
      cccdNumber: '123',
    })

    fireEvent.click(screen.getByRole('button', { name: /Xác nhận & Nộp/ }))

    expect(handleConfirmAndSubmitKyc).not.toHaveBeenCalled()
    expect(screen.getByText('Vui lòng chọn ngày sinh')).toBeVisible()
    expect(screen.getByText('Vui lòng chọn giới tính')).toBeVisible()
    expect(screen.getByText(/9 hoặc 12 chữ số/)).toBeVisible()
    expect(screen.getByText(/kiểm tra lại các trường/)).toBeVisible()
  })

  it('shows no errors before the first attempt', () => {
    renderStep({ ...VALID, dob: '' })

    expect(screen.queryByText('Vui lòng chọn ngày sinh')).toBeNull()
  })

  it('submits when the form is complete', () => {
    const { handleConfirmAndSubmitKyc } = renderStep(VALID)

    fireEvent.click(screen.getByRole('button', { name: /Xác nhận & Nộp/ }))

    expect(handleConfirmAndSubmitKyc).toHaveBeenCalledOnce()
  })

  it('has no AI preferences panel', () => {
    renderStep(VALID)

    expect(screen.queryByText(/AI Preferences/i)).toBeNull()
    expect(screen.queryByText('Khu vực thuê')).toBeNull()
  })

  it('prefills the birth date from the OCR value', () => {
    renderStep(VALID)

    expect(screen.getByText('22/10/2004')).toBeVisible()
  })
  it('lists the fields the OCR could not read', () => {
    renderStep({ ...VALID, dob: '', gender: '' })

    expect(screen.getByRole('status')).toHaveTextContent(/ngày sinh, giới tính/)
  })

  it('keeps nationality fixed to Việt Nam whatever the OCR read', () => {
    renderStep({ ...VALID, nationality: 'ham' })

    const field = screen.getByLabelText('Quốc tịch')
    expect(field).toHaveValue('Việt Nam')
    expect(field).toHaveAttribute('readonly')
  })
})
