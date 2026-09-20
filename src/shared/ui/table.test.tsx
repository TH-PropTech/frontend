import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import * as React from 'react'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from './table'

describe('Table Component - Density & Spacing Refinement', () => {
  it('renders with compact density by default (Happy Path)', () => {
    render(
      <Table data-testid="test-table">
        <TableCaption>Danh sách căn hộ trống</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead data-testid="th-code">Mã căn</TableHead>
            <TableHead data-testid="th-price">Giá thuê</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell data-testid="td-code">A-101</TableCell>
            <TableCell data-testid="td-price">12.500.000 đ</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )

    const thCode = screen.getByTestId('th-code')
    const tdCode = screen.getByTestId('td-code')

    expect(thCode.className).toContain('h-10')
    expect(thCode.className).toContain('px-3.5')
    expect(tdCode.className).toContain('py-2.5')
    expect(tdCode.className).toContain('px-3.5')
  })

  it('renders with comfortable density when explicitly specified', () => {
    render(
      <Table density="comfortable" data-testid="comfortable-table">
        <TableHeader>
          <TableRow>
            <TableHead data-testid="th-comfortable">Tiêu chuẩn</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell data-testid="td-comfortable">Dữ liệu thoáng</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )

    const th = screen.getByTestId('th-comfortable')
    const td = screen.getByTestId('td-comfortable')

    expect(th.className).toContain('h-12')
    expect(th.className).toContain('px-4')
    expect(td.className).toContain('p-4')
  })

  it('allows custom className to override or extend styles (Boundary/Edge Case)', () => {
    render(
      <Table className="custom-table">
        <TableBody>
          <TableRow className="custom-row">
            <TableCell
              className="text-right custom-cell"
              data-testid="custom-cell"
            >
              100%
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )

    const cell = screen.getByTestId('custom-cell')
    expect(cell.className).toContain('text-right')
    expect(cell.className).toContain('custom-cell')
  })

  it('forwards ref properly to root HTMLTableElement', () => {
    const ref = React.createRef<HTMLTableElement>()
    render(
      <Table ref={ref}>
        <TableBody>
          <TableRow>
            <TableCell>Ref check</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
    expect(ref.current).not.toBeNull()
    expect(ref.current?.tagName).toBe('TABLE')
  })
})
