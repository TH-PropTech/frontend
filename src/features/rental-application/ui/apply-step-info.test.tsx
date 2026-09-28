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

  it('collects optional occupant, vehicle, emergency-contact, and viewing details', () => {
    const onChange = vi.fn()
    render(
      <ApplyStepInfo
        values={validValues}
        onChange={onChange}
        onNext={vi.fn()}
      />
    )

    fireEvent.click(
      screen.getByRole('button', { name: 'Thêm thông tin người ở' })
    )
    expect(onChange).toHaveBeenCalledWith({
      occupantsDetail: [
        { fullName: '', birthYear: 0, relationship: '' },
        { fullName: '', birthYear: 0, relationship: '' },
      ],
    })
    fireEvent.change(screen.getByLabelText('Tên liên hệ khẩn cấp'), {
      target: { value: 'Nguyễn An' },
    })
    expect(onChange).toHaveBeenCalledWith({
      emergencyContact: { fullName: 'Nguyễn An', relationship: '', phone: '' },
    })
    fireEvent.change(screen.getByLabelText('Số lượng xe máy'), {
      target: { value: '1' },
    })
    expect(onChange).toHaveBeenCalledWith({
      vehicles: [{ type: 'motorbike', quantity: 1 }],
    })
    fireEvent.change(screen.getByLabelText('Mã lịch xem căn hộ'), {
      target: { value: 'booking-1' },
    })
    expect(onChange).toHaveBeenCalledWith({ viewingBookingId: 'booking-1' })
  })

  describe('Dynamic step1Config integration', () => {
    const customConfig = {
      moveInDateLabel: 'Thời điểm nhận chìa khóa',
      minMoveInLeadDays: 5,
      maxMoveInLeadDays: 60,
      minOccupants: 2,
      maxOccupants: 5,
      allowNotes: false,
      notesMaxLength: 300,
    }

    it('renders custom moveInDateLabel and lead days bounds from step1Config', () => {
      render(
        <ApplyStepInfo
          values={validValues}
          apartmentArea={80}
          step1Config={customConfig}
          onChange={vi.fn()}
          onNext={vi.fn()}
        />
      )

      expect(screen.getByText('Thời điểm nhận chìa khóa')).toBeInTheDocument()
      expect(screen.getByText('+5 đến +60 ngày')).toBeInTheDocument()
      // Since allowNotes is false, notes textarea should not be rendered
      expect(screen.queryByLabelText(/Ghi chú & Thỏa thuận riêng/i)).toBeNull()
    })

    it('enforces min/max occupants and min/max lead days in validateStepInfo according to step1Config', () => {
      // 1 occupant is below minOccupants (2)
      const errOccupants = validateStepInfo(
        { ...validValues, occupants: 1 },
        customConfig
      )
      expect(errOccupants.occupants).toBe('Số người ở phải từ 2 đến 5.')

      // 6 occupants is above maxOccupants (5)
      const errMaxOccupants = validateStepInfo(
        { ...validValues, occupants: 6 },
        customConfig
      )
      expect(errMaxOccupants.occupants).toBe('Số người ở phải từ 2 đến 5.')

      // Move-in date only 2 days ahead (min is 5)
      const now = new Date()
      const earlyDate = new Date(now)
      earlyDate.setDate(now.getDate() + 2)
      const earlyStr = earlyDate.toISOString().split('T')[0]!

      const errEarly = validateStepInfo(
        { ...validValues, occupants: 2, moveInDate: earlyStr },
        customConfig
      )
      expect(errEarly.moveInDate).toBe(
        'Ngày vào ở phải sau hôm nay ít nhất 5 ngày.'
      )

      // Move-in date 70 days ahead (max is 60)
      const lateDate = new Date(now)
      lateDate.setDate(now.getDate() + 70)
      const lateStr = lateDate.toISOString().split('T')[0]!

      const errLate = validateStepInfo(
        { ...validValues, occupants: 2, moveInDate: lateStr },
        customConfig
      )
      expect(errLate.moveInDate).toBe(
        'Ngày vào ở không được vượt quá 60 ngày tính từ hôm nay.'
      )
    })
  })
})
