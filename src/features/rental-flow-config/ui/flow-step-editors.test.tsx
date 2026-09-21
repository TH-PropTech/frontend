import * as React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { StepEditors } from './flow-step-editors'
import type { FlowProfileSteps } from '../api/rental-flow-api'

const mockSteps: FlowProfileSteps = {
  step1: {
    moveInDateLabel: 'Ngày dọn vào dự kiến',
    minMoveInLeadDays: 1,
    maxMoveInLeadDays: 90,
    minOccupants: 1,
    maxOccupants: 4,
    allowNotes: true,
    notesMaxLength: 500,
  },
  step2: {
    headerTitle: 'Thông tin tài chính minh bạch',
    depositNoticeBody: 'Khoản tiền cọc này được giữ bảo đảm theo luật.',
    badgeRules: [
      { durationMonths: 12, badgeText: 'Ưu đãi nhất', colorVariant: 'emerald' },
    ],
  },
  step3: {
    consentCheckboxLabel: 'Tôi đã đọc và đồng ý',
    consentStatement: 'Cam kết xác thực thông tin lưu trú.',
    disclosures: [
      {
        id: 'disc-legal',
        title: 'Quy định pháp lý',
        body: 'Nghị định 96/2024 bảo đảm cọc.',
        required: true,
        immutablePolicy: true,
      },
    ],
  },
  step4: {
    heroSuccessTitle: 'Hồ sơ đã được gửi thành công',
    timelineSteps: [
      {
        key: 'review',
        title: 'Chủ nhà xem xét',
        description: 'Trong vòng 24h làm việc',
      },
      {
        key: 'sign',
        title: 'Ký số hợp đồng',
        description: 'Xác thực OTP/CCCD',
      },
    ],
  },
}

describe('StepEditors Component', () => {
  it('renders Step 1 editor by default with initial values', () => {
    const onChange = vi.fn()
    render(<StepEditors steps={mockSteps} onChange={onChange} />)

    expect(screen.getByDisplayValue('Ngày dọn vào dự kiến')).toBeInTheDocument()
    expect(screen.getByDisplayValue('500')).toBeInTheDocument()
  })

  it('allows navigating to Step 2 and displays commercial protection notice', () => {
    const onChange = vi.fn()
    render(<StepEditors steps={mockSteps} onChange={onChange} />)

    fireEvent.click(screen.getByText('Tài chính'))
    expect(
      screen.getByText(/Bảo vệ tính toàn vẹn thương mại/i)
    ).toBeInTheDocument()
    expect(
      screen.getByDisplayValue('Thông tin tài chính minh bạch')
    ).toBeInTheDocument()
  })

  it('offers the 24-month duration while keeping the legacy one-month option disabled', async () => {
    const onChange = vi.fn()
    render(<StepEditors steps={mockSteps} onChange={onChange} />)

    fireEvent.click(screen.getByText('Tài chính'))

    // Open the combobox
    fireEvent.click(screen.getAllByRole('combobox')[0]!)

    expect(
      await screen.findByRole('option', { name: /24/ })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('option', { name: /1 tháng \(legacy\)/ })
    ).toHaveAttribute('aria-disabled', 'true')
  })

  it('triggers onChange when updating step 1 inputs', () => {
    const onChange = vi.fn()
    render(<StepEditors steps={mockSteps} onChange={onChange} />)

    const labelInput = screen.getByDisplayValue('Ngày dọn vào dự kiến')
    fireEvent.change(labelInput, {
      target: { value: 'Ngày nhận bàn giao căn hộ' },
    })

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        step1: expect.objectContaining({
          moveInDateLabel: 'Ngày nhận bàn giao căn hộ',
        }),
      })
    )
  })

  it('disables required toggle for immutablePolicy disclosures in Step 3', () => {
    const onChange = vi.fn()
    render(<StepEditors steps={mockSteps} onChange={onChange} />)

    fireEvent.click(screen.getByText('Pháp lý'))
    expect(screen.getByText(/Pháp lý bắt buộc/i)).toBeInTheDocument()

    // The checkbox for required should be disabled because immutablePolicy is true
    const requiredCheckbox = screen.getByRole('checkbox', {
      name: /Bắt buộc xác nhận/i,
    })
    expect(requiredCheckbox).toBeDisabled()
  })
})
