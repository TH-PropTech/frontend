import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { EscrowLineChart } from './escrow-line-chart'

describe('EscrowLineChart', () => {
  it('preserves SVG geometry inside its responsive card', () => {
    // Arrange / Act
    const { container } = render(<EscrowLineChart />)

    // Assert
    expect(container.querySelector('svg')).toHaveAttribute(
      'preserveAspectRatio',
      'xMidYMid meet'
    )
  })

  it('keeps the escrow tooltip interaction working', () => {
    // Arrange
    const { container } = render(<EscrowLineChart />)
    const firstPoint = container.querySelector('g.cursor-pointer')

    // Act
    if (firstPoint) fireEvent.mouseEnter(firstPoint)

    // Assert
    expect(screen.getByText('1.20 tỷ VNĐ')).toBeInTheDocument()

    // Act
    if (firstPoint) fireEvent.mouseLeave(firstPoint)

    // Assert
    expect(screen.queryByText('1.20 tỷ VNĐ')).not.toBeInTheDocument()
  })
})
