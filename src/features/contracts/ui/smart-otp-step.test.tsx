import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { SmartOtpStep } from './smart-otp-step'

describe('SmartOtpStep', () => {
  it('renders challenge code and 6 digit inputs', () => {
    render(<SmartOtpStep challenge="CHAL-9999" onSubmit={vi.fn()} />)
    expect(screen.getByText('CHAL-9999')).toBeInTheDocument()
    expect(screen.getAllByRole('textbox')).toHaveLength(6)
  })

  it('displays test code hint and enables quick fill', () => {
    const onSubmit = vi.fn()
    render(
      <SmartOtpStep
        challenge="CHAL-9999"
        otpCodeHint="654321"
        onSubmit={onSubmit}
      />
    )

    expect(screen.getByTestId('otp-hint-banner')).toBeInTheDocument()
    expect(screen.getByText('654321')).toBeInTheDocument()

    const quickFillBtn = screen.getByLabelText('Điền nhanh mã OTP')
    fireEvent.click(quickFillBtn)

    expect(onSubmit).toHaveBeenCalledWith('654321')
  })

  it('auto-submits when 6 digits are typed', () => {
    const onSubmit = vi.fn()
    render(<SmartOtpStep challenge="CHAL-9999" onSubmit={onSubmit} />)

    const inputs = screen.getAllByRole('textbox')
    expect(inputs.length).toBe(6)
    fireEvent.change(inputs[0]!, { target: { value: '1' } })
    fireEvent.change(inputs[1]!, { target: { value: '2' } })
    fireEvent.change(inputs[2]!, { target: { value: '3' } })
    fireEvent.change(inputs[3]!, { target: { value: '4' } })
    fireEvent.change(inputs[4]!, { target: { value: '5' } })
    fireEvent.change(inputs[5]!, { target: { value: '6' } })

    expect(onSubmit).toHaveBeenCalledWith('123456')
  })

  it('displays error message when provided', () => {
    render(
      <SmartOtpStep
        challenge="CHAL-9999"
        onSubmit={vi.fn()}
        error="Mã OTP không đúng hoặc đã hết hạn"
      />
    )
    expect(
      screen.getByText('Mã OTP không đúng hoặc đã hết hạn')
    ).toBeInTheDocument()
  })
})
