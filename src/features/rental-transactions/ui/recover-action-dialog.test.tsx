import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RecoverActionDialog } from './recover-action-dialog'

describe('RecoverActionDialog', () => {
  it('requires a reason before submitting recovery', async () => {
    const user = userEvent.setup()
    render(
      <RecoverActionDialog
        contractId="contract-1"
        action="RETRY_LEDGER"
        open
        onClose={() => undefined}
      />
    )
    await user.click(screen.getByRole('button', { name: 'Xác nhận recovery' }))
    expect(screen.getByRole('alert')).toHaveTextContent('tối thiểu 5 ký tự')
  })
})
