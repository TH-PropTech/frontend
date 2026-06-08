import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { HomeDashboard } from './home-dashboard'

describe('HomeDashboard', () => {
  it('renders the platform foundation signal', () => {
    render(<HomeDashboard />)

    expect(
      screen.getByRole('heading', {
        name: /frontend foundation for scalable property workflows/i,
      })
    ).toBeInTheDocument()
    expect(
      screen.getByText(/typed api boundary configured/i)
    ).toBeInTheDocument()
  })
})
