import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { SystemLoadBarChart } from './system-load-bar-chart'

describe('SystemLoadBarChart', () => {
  it('preserves SVG geometry inside a responsive full-width card', () => {
    // Arrange / Act
    const { container } = render(<SystemLoadBarChart />)

    // Assert
    expect(container.querySelector('svg')).toHaveAttribute(
      'preserveAspectRatio',
      'xMidYMid meet'
    )
  })

  it('keeps the transaction tooltip interaction working', () => {
    // Arrange
    const { container } = render(<SystemLoadBarChart />)
    const firstBar = container.querySelector('g.cursor-pointer')

    // Act
    if (firstBar) fireEvent.mouseEnter(firstBar)

    // Assert
    expect(screen.getByText('12 giao dịch')).toBeInTheDocument()

    // Act
    if (firstBar) fireEvent.mouseLeave(firstBar)

    // Assert
    expect(screen.queryByText('12 giao dịch')).not.toBeInTheDocument()
  })
})
