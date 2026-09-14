import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  ApplyStepInfo,
  getTodayDateString,
  validateStepInfo,
  type ApplyStepInfoValues,
} from './apply-step-info'

describe('ApplyStepInfo Component', () => {
  afterEach(() => cleanup())

  const validValues: ApplyStepInfoValues = {
    occupants: 2,
    moveInDate: '2030-05-15',
    occupation: 'Kỹ sư phần mềm',
    hasPets: false,
    notes: 'Muốn dọn vào cuối tuần',
  }

  it('validates happy path inputs with zero errors', () => {
    const errors = validateStepInfo(validValues)
    expect(Object.keys(errors)).toHaveLength(0)
  })

  it('detects boundary & edge cases: occupants min (1), max (20), moveInDate today', () => {
    const todayStr = getTodayDateString()
    const edgeValues: ApplyStepInfoValues = {
      occupants: 1,
      moveInDate: todayStr,
      occupation: 'A',
      hasPets: true,
      notes: '',
    }
    const errors = validateStepInfo(edgeValues)
    expect(Object.keys(errors)).toHaveLength(0)

    const maxValues: ApplyStepInfoValues = {
      ...edgeValues,
      occupants: 20,
      occupation: 'x'.repeat(200),
      notes: 'y'.repeat(1000),
    }
    const maxErrors = validateStepInfo(maxValues)
    expect(Object.keys(maxErrors)).toHaveLength(0)
  })

  it('detects negative cases: invalid occupants, past moveInDate, blank occupation, excessive notes', () => {
    const invalidValues: ApplyStepInfoValues = {
      occupants: 0,
      moveInDate: '2020-01-01',
      occupation: '   ',
      hasPets: false,
      notes: 'z'.repeat(1001),
    }
    const errors = validateStepInfo(invalidValues)
    expect(errors.occupants).toBe('Số người ở phải từ 1 đến 20.')
    expect(errors.moveInDate).toBe('Ngày vào ở không được trước hôm nay.')
    expect(errors.occupation).toBe(
      'Vui lòng nhập nghề nghiệp (1 đến 200 ký tự).'
    )
    expect(errors.notes).toBe('Ghi chú không được vượt quá 1000 ký tự.')
  })

  it('submits form successfully and calls onNext when all inputs are valid', () => {
    const onNext = vi.fn()
    const onChange = vi.fn()

    render(
      <ApplyStepInfo
        values={validValues}
        apartmentArea={75}
        onChange={onChange}
        onNext={onNext}
      />
    )

    fireEvent.click(
      screen.getByRole('button', { name: /Tiếp tục chọn gói thuê/i })
    )
    expect(onNext).toHaveBeenCalledTimes(1)
  })

  it('prevents submission and displays inline errors when inputs are invalid', () => {
    const onNext = vi.fn()
    const onChange = vi.fn()
    const invalidValues: ApplyStepInfoValues = {
      occupants: 0,
      moveInDate: '',
      occupation: '',
      hasPets: false,
    }

    render(
      <ApplyStepInfo
        values={invalidValues}
        apartmentArea={60}
        onChange={onChange}
        onNext={onNext}
      />
    )

    fireEvent.click(
      screen.getByRole('button', { name: /Tiếp tục chọn gói thuê/i })
    )
    expect(onNext).not.toHaveBeenCalled()
    expect(screen.getByText('Số người ở phải từ 1 đến 20.')).toBeInTheDocument()
    expect(
      screen.getByText('Ngày vào ở không được trước hôm nay.')
    ).toBeInTheDocument()
    expect(
      screen.getByText('Vui lòng nhập nghề nghiệp (1 đến 200 ký tự).')
    ).toBeInTheDocument()
  })

  it('triggers onChange callbacks when user updates input fields and quick tags', () => {
    const onNext = vi.fn()
    const onChange = vi.fn()

    render(
      <ApplyStepInfo
        values={validValues}
        apartmentArea={70}
        onChange={onChange}
        onNext={onNext}
      />
    )

    // Quick date chip
    fireEvent.click(screen.getByRole('button', { name: /Hôm nay/i }))
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ moveInDate: expect.any(String) })
    )

    // Occupation input
    fireEvent.change(screen.getByLabelText(/Nghề nghiệp/i), {
      target: { value: 'Bác sĩ' },
    })
    expect(onChange).toHaveBeenCalledWith({ occupation: 'Bác sĩ' })

    // Quick profession tag
    fireEvent.click(
      screen.getByRole('button', { name: /Làm việc tự do \(Freelancer\)/i })
    )
    expect(onChange).toHaveBeenCalledWith({
      occupation: 'Làm việc tự do (Freelancer)',
    })

    // Pets switch
    fireEvent.click(screen.getByTestId('pets-switch'))
    expect(onChange).toHaveBeenCalledWith({ hasPets: true })

    // Quick note suggestion
    fireEvent.click(
      screen.getByRole('button', { name: /\+ Cần chỗ đỗ xe ô tô/i })
    )
    expect(onChange).toHaveBeenCalledWith({
      notes: 'Muốn dọn vào cuối tuần; Cần chỗ đỗ xe ô tô',
    })
  })
})
