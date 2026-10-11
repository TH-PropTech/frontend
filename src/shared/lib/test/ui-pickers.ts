import { fireEvent, screen, within } from '@testing-library/react'
import type { UserEvent } from '@testing-library/user-event'

/** Mở một `OptionSelect` (Radix) rồi chọn mục theo nhãn hiển thị. */
export async function chooseOption(
  user: UserEvent,
  trigger: HTMLElement,
  optionName: string | RegExp
): Promise<void> {
  await user.click(trigger)
  await user.click(await screen.findByRole('option', { name: optionName }))
}

/** Mở `DatePicker` qua nút kích hoạt và chọn ngày `yyyy-MM-dd`. */
export async function pickDate(
  user: UserEvent,
  trigger: HTMLElement,
  isoDate: string
): Promise<void> {
  const [year, month, day] = isoDate.split('-').map(Number) as [
    number,
    number,
    number,
  ]
  await user.click(trigger)
  const dialog = await screen.findByRole('dialog')
  const dropdowns = within(dialog).getAllByRole('combobox')
  // react-day-picker renders month then year native selects when captionLayout="dropdown".
  fireEvent.change(dropdowns[0] as HTMLElement, {
    target: { value: String(month - 1) },
  })
  fireEvent.change(dropdowns[1] as HTMLElement, {
    target: { value: String(year) },
  })
  const dayButton = within(dialog)
    .getAllByRole('gridcell')
    .filter(cell => !cell.hasAttribute('data-outside'))
    .map(cell => within(cell).getByRole('button'))
    .find(button => button.textContent?.trim() === String(day))
  if (!dayButton) throw new Error(`Không tìm thấy ngày ${isoDate} trong lịch`)
  await user.click(dayButton)
}
