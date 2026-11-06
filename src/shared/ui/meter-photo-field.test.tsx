import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MeterPhotoField } from './meter-photo-field'

const file = (name: string, type = 'image/jpeg', size = 1000): File =>
  new File([new Uint8Array(size)], name, { type })

function renderField(
  props: Partial<React.ComponentProps<typeof MeterPhotoField>> = {}
) {
  const onChange = vi.fn()
  const upload = vi.fn().mockResolvedValue(['https://cdn.example.com/new.jpg'])
  render(
    <MeterPhotoField
      id="meter-e"
      label="Ảnh công tơ điện"
      urls={[]}
      onChange={onChange}
      upload={upload}
      {...props}
    />
  )
  return { onChange, upload }
}

describe('MeterPhotoField', () => {
  it('uploads a valid image and reports the new url list', async () => {
    const { onChange, upload } = renderField({
      urls: ['https://cdn.example.com/old.jpg'],
    })
    fireEvent.change(screen.getByLabelText('Chọn ảnh công tơ điện'), {
      target: { files: [file('a.jpg')] },
    })
    await waitFor(() => expect(onChange).toHaveBeenCalled())
    expect(upload).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith([
      'https://cdn.example.com/old.jpg',
      'https://cdn.example.com/new.jpg',
    ])
  })

  it('rejects non-image and oversized files without calling the API', () => {
    const { upload } = renderField()
    const input = screen.getByLabelText('Chọn ảnh công tơ điện')
    fireEvent.change(input, {
      target: { files: [file('a.pdf', 'application/pdf')] },
    })
    expect(screen.getByRole('alert').textContent).toContain('JPEG hoặc PNG')
    fireEvent.change(input, {
      target: { files: [file('big.png', 'image/png', 6 * 1024 * 1024)] },
    })
    expect(screen.getByRole('alert').textContent).toContain('5 MB')
    expect(upload).not.toHaveBeenCalled()
  })

  it('keeps existing photos and shows a retry message when the upload fails', async () => {
    const onChange = vi.fn()
    const upload = vi.fn().mockRejectedValue(new Error('boom'))
    renderField({ onChange, upload, urls: ['https://cdn.example.com/old.jpg'] })
    fireEvent.change(screen.getByLabelText('Chọn ảnh công tơ điện'), {
      target: { files: [file('a.jpg')] },
    })
    await waitFor(() =>
      expect(screen.getByRole('alert').textContent).toContain(
        'Vui lòng thử lại'
      )
    )
    expect(onChange).not.toHaveBeenCalled()
  })

  it('removes a photo and hides the picker at the limit', () => {
    const { onChange } = renderField({
      urls: ['https://cdn.example.com/1.jpg', 'https://cdn.example.com/2.jpg'],
      max: 2,
    })
    expect(screen.queryByLabelText('Chọn ảnh công tơ điện')).toBeNull()
    fireEvent.click(screen.getByLabelText('Xóa ảnh công tơ điện 1'))
    expect(onChange).toHaveBeenCalledWith(['https://cdn.example.com/2.jpg'])
  })

  it('shows the error passed down by the form', () => {
    renderField({ error: 'Vui lòng tải ảnh công tơ điện.' })
    expect(screen.getByRole('alert').textContent).toBe(
      'Vui lòng tải ảnh công tơ điện.'
    )
  })
})
