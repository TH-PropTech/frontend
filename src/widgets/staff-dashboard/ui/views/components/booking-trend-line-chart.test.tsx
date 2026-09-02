import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { BookingTrendLineChart } from './booking-trend-line-chart'

describe('BookingTrendLineChart', () => {
  it('preserves SVG geometry inside a responsive container', () => {
    // Arrange
    const data = [{ label: 'T2', bookings: 4, approved: 3 }]

    // Act
    const { container } = render(<BookingTrendLineChart data={data} />)

    // Assert
    expect(container.querySelector('svg')).toHaveAttribute(
      'preserveAspectRatio',
      'xMidYMid meet'
    )
  })

  it('renders the empty state without an invalid SVG', () => {
    // Arrange / Act
    const { container } = render(<BookingTrendLineChart data={[]} />)

    // Assert
    expect(screen.getByText('Không có dữ liệu')).toBeInTheDocument()
    expect(container.querySelector('svg')).not.toBeInTheDocument()
  })

  it('renders a single boundary data point without invalid coordinates', () => {
    // Arrange
    const data = [{ label: 'T2', bookings: 0, approved: 0 }]

    // Act
    const { container } = render(<BookingTrendLineChart data={data} />)

    // Assert
    expect(container.innerHTML).not.toContain('NaN')
  })

  it('shows and hides the tooltip when a data column is hovered', () => {
    // Arrange
    const data = [{ label: 'T2', bookings: 4, approved: 3 }]
    const { container } = render(<BookingTrendLineChart data={data} />)
    const hoverArea = container.querySelector('rect.cursor-pointer')

    // Act
    if (hoverArea) fireEvent.mouseEnter(hoverArea)

    // Assert
    expect(screen.getByText('4 hẹn')).toBeInTheDocument()

    // Act
    if (hoverArea) fireEvent.mouseLeave(hoverArea)

    // Assert
    expect(screen.queryByText('4 hẹn')).not.toBeInTheDocument()
  })
})
