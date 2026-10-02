import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { FeeScheduleEditor } from './fee-schedule-editor'

const saveDraft = vi.fn()
const validateSchedule = vi.fn()
const publishSchedule = vi.fn()

vi.mock('../api/platform-fees-api', () => ({
  savePlatformFeeDraft: (...args: unknown[]) => saveDraft(...args),
  validatePlatformFeeSchedule: (...args: unknown[]) =>
    validateSchedule(...args),
  publishPlatformFeeSchedule: (...args: unknown[]) => publishSchedule(...args),
}))

describe('FeeScheduleEditor', () => {
  it('requires legal review reference before publishing', async () => {
    render(<FeeScheduleEditor />)

    fireEvent.click(screen.getByRole('button', { name: 'Publish biểu phí' }))

    expect(
      await screen.findByRole('alert', {
        name: '',
      })
    ).toHaveTextContent('Cần mã tham chiếu rà soát pháp lý')
    expect(publishSchedule).not.toHaveBeenCalled()
  })

  it('edits tiers and saves a draft', async () => {
    saveDraft.mockResolvedValueOnce({
      scheduleId: 'platform-fee-default',
      version: 1,
      status: 'draft',
    })
    render(<FeeScheduleEditor />)

    fireEvent.click(screen.getByRole('button', { name: 'Thêm bậc' }))
    expect(screen.getAllByRole('spinbutton').length).toBeGreaterThan(7)
    fireEvent.click(screen.getByRole('button', { name: 'Lưu nháp' }))

    await waitFor(() => expect(saveDraft).toHaveBeenCalledTimes(1))
    expect(screen.getByRole('status')).toHaveTextContent('Đã lưu nháp')
  })
})
