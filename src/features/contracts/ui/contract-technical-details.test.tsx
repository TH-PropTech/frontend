import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ContractTechnicalDetails } from './contract-technical-details'

const items = [
  { label: 'Mã hợp đồng', value: 'HD-APP-001' },
  { label: 'Mã xác thực nội dung', value: 'abc123' },
]

afterEach(() => vi.restoreAllMocks())

describe('ContractTechnicalDetails', () => {
  it('đóng sẵn và chứa các mã nội bộ', () => {
    render(<ContractTechnicalDetails items={items} />)
    const details = screen.getByTestId('contract-meta-technical-details')
    expect(details.hasAttribute('open')).toBe(false)
    expect(screen.getByText('Chi tiết kỹ thuật')).toBeDefined()
    expect(screen.getByText('HD-APP-001')).toBeDefined()
  })

  it('không render gì khi không có mục', () => {
    const { container } = render(<ContractTechnicalDetails items={[]} />)
    expect(container.innerHTML).toBe('')
  })

  it('sao chép giá trị vào bộ nhớ tạm', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.assign(navigator, { clipboard: { writeText } })
    render(<ContractTechnicalDetails items={items} />)
    fireEvent.click(screen.getByLabelText('Sao chép Mã hợp đồng'))
    await waitFor(() => expect(writeText).toHaveBeenCalledWith('HD-APP-001'))
  })

  it('ghi cảnh báo thay vì nuốt lỗi khi sao chép thất bại', async () => {
    const writeText = vi.fn().mockRejectedValue(new Error('denied'))
    Object.assign(navigator, { clipboard: { writeText } })
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    render(<ContractTechnicalDetails items={items} />)
    fireEvent.click(screen.getByLabelText('Sao chép Mã hợp đồng'))
    await waitFor(() => expect(warn).toHaveBeenCalled())
  })
})
