import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { makeLegalSource } from '@/features/contracts/test-fixtures/legal-sources.fixture'
import {
  LegalSourceForm,
  validateLegalSource,
  type LegalSourceFormValues,
} from './legal-source-form'

const VALID: LegalSourceFormValues = {
  ...makeLegalSource(),
  key: 'residence-law-2020',
}

describe('validateLegalSource', () => {
  it('accepts a valid source', () => {
    expect(validateLegalSource(VALID, true)).toEqual([])
  })

  it.each([
    ['uppercase key', { key: 'Housing' }],
    ['reserved key', { key: 'admin' }],
    ['missing title', { title: ' ' }],
    ['http link', { externalUrl: 'http://x.vn' }],
    ['javascript link', { externalUrl: 'javascript:alert(1)' }],
    [
      'http legal ground url',
      { legalGrounds: [{ title: 'A', article: 'B', url: 'http://x.vn' }] },
    ],
  ])('rejects %s', (_label, patch) => {
    expect(
      validateLegalSource({ ...VALID, ...patch }, true).length
    ).toBeGreaterThan(0)
  })

  it('ignores key rules when editing', () => {
    expect(validateLegalSource({ ...VALID, key: 'Bad Key' }, false)).toEqual([])
  })
})

describe('LegalSourceForm', () => {
  it('drops blank rows, renumbers steps and strips empty urls on submit', () => {
    const onSubmit = vi.fn()
    render(
      <LegalSourceForm
        initial={makeLegalSource({
          steps: [
            { step: 5, title: 'Bước A', detail: '' },
            { step: 9, title: '  ', detail: '' },
            { step: 7, title: 'Bước B', detail: '' },
          ],
          legalGrounds: [{ title: 'Luật X', article: 'Điều 1', url: '' }],
          notes: ['', 'Giữ lại'],
        })}
        isSaving={false}
        serverError={null}
        onSubmit={onSubmit}
        onCancel={vi.fn()}
      />
    )

    fireEvent.click(screen.getByTestId('btn-save-legal-source'))

    expect(onSubmit).toHaveBeenCalledTimes(1)
    const values = onSubmit.mock.calls[0]![0] as LegalSourceFormValues
    expect(values.steps.map(s => [s.step, s.title])).toEqual([
      [1, 'Bước A'],
      [2, 'Bước B'],
    ])
    expect(values.legalGrounds).toEqual([
      { title: 'Luật X', article: 'Điều 1' },
    ])
    expect(values.notes).toEqual(['Giữ lại'])
  })

  it('adds and edits note rows', () => {
    const onSubmit = vi.fn()
    render(
      <LegalSourceForm
        initial={makeLegalSource({ notes: [] })}
        isSaving={false}
        serverError={null}
        onSubmit={onSubmit}
        onCancel={vi.fn()}
      />
    )

    fireEvent.click(screen.getByLabelText('Thêm dòng Lưu ý'))
    const noteInput = screen
      .getByLabelText('Xoá dòng 1 của Lưu ý')
      .previousElementSibling?.querySelector('input') as HTMLInputElement
    fireEvent.change(noteInput, { target: { value: 'Ghi chú mới' } })
    fireEvent.click(screen.getByTestId('btn-save-legal-source'))

    expect((onSubmit.mock.calls[0]![0] as LegalSourceFormValues).notes).toEqual(
      ['Ghi chú mới']
    )
  })

  it('shows server errors', () => {
    render(
      <LegalSourceForm
        initial={null}
        isSaving={false}
        serverError='Nguồn với key "1.004194" đã tồn tại'
        onSubmit={vi.fn()}
        onCancel={vi.fn()}
      />
    )

    expect(screen.getByRole('alert')).toHaveTextContent('đã tồn tại')
  })
})
