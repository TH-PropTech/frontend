import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { HelpTip } from './help-tip'

describe('HelpTip', () => {
  it('opens a plain-language explanation on click', () => {
    render(<HelpTip term="contentHash" />)

    expect(screen.queryByText(/dấu vân tay/)).toBeNull()

    fireEvent.click(
      screen.getByRole('button', { name: 'Giải thích: Mã xác thực nội dung' })
    )

    expect(screen.getByText(/dấu vân tay/)).toBeInTheDocument()
  })
})
