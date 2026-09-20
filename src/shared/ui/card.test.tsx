import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import * as React from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './card'

describe('Card Component - Density & Spacing Refinement', () => {
  it('renders with compact density by default (Happy Path)', () => {
    render(
      <Card data-testid="test-card">
        <CardHeader data-testid="card-header">
          <CardTitle data-testid="card-title">Căn hộ Sunrise</CardTitle>
          <CardDescription>Mô tả ngắn</CardDescription>
        </CardHeader>
        <CardContent data-testid="card-content">
          <p>Nội dung chi tiết</p>
        </CardContent>
        <CardFooter data-testid="card-footer">
          <button type="button">Hành động</button>
        </CardFooter>
      </Card>
    )

    const header = screen.getByTestId('card-header')
    const title = screen.getByTestId('card-title')
    const content = screen.getByTestId('card-content')
    const footer = screen.getByTestId('card-footer')

    expect(header.className).toContain('p-4')
    expect(title.className).toContain('text-lg')
    expect(content.className).toContain('p-4 pt-0')
    expect(footer.className).toContain('p-4 pt-0')
  })

  it('renders with comfortable density when explicitly specified', () => {
    render(
      <Card density="comfortable" data-testid="comfortable-card">
        <CardHeader data-testid="card-header">
          <CardTitle data-testid="card-title">Căn hộ Penthouse</CardTitle>
        </CardHeader>
        <CardContent data-testid="card-content">
          <p>Nội dung rộng rãi</p>
        </CardContent>
      </Card>
    )

    const header = screen.getByTestId('card-header')
    const title = screen.getByTestId('card-title')
    const content = screen.getByTestId('card-content')

    expect(header.className).toContain('p-6')
    expect(title.className).toContain('text-2xl')
    expect(content.className).toContain('p-6 pt-0')
  })

  it('allows custom className to override or extend styles (Boundary/Edge Case)', () => {
    render(
      <Card className="custom-shadow p-2" data-testid="custom-card">
        <CardHeader className="custom-header">
          <CardTitle>Tiêu đề</CardTitle>
        </CardHeader>
      </Card>
    )

    const card = screen.getByTestId('custom-card')
    expect(card.className).toContain('custom-shadow')
    expect(card.className).toContain('rounded-xl')
  })

  it('forwards ref properly to root HTMLDivElement', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Card ref={ref}>Ref Card</Card>)
    expect(ref.current).not.toBeNull()
    expect(ref.current?.tagName).toBe('DIV')
  })
})
