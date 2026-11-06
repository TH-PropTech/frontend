import { render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import * as api from '../api/legal-source-api'
import { LegalReferences } from './legal-references'

vi.mock('../api/legal-source-api', async () => {
  const actual = await vi.importActual<typeof api>('../api/legal-source-api')
  return { ...actual, getPublicLegalSources: vi.fn() }
})

const source = (key: string, extra: Partial<api.PublicLegalSource> = {}) => ({
  key,
  code: `Mã ${key}`,
  title: `Nguồn ${key}`,
  externalUrl: `https://example.gov.vn/${key}`,
  legalGrounds: [{ title: 'Luật X', article: 'Điều 1' }],
  notes: [],
  ...extra,
})

describe('LegalReferences', () => {
  beforeEach(() => {
    vi.mocked(api.getPublicLegalSources).mockReset()
  })

  it('is collapsed by default and lists only the requested sources in order', async () => {
    vi.mocked(api.getPublicLegalSources).mockResolvedValue([
      source('a'),
      source('b'),
      source('c'),
    ])
    render(<LegalReferences sourceKeys={['b', 'a']} />)
    await screen.findByTestId('legal-references')
    const block = screen.getByTestId('legal-references') as HTMLDetailsElement
    expect(block.open).toBe(false)
    const links = screen.getAllByRole('link')
    expect(links.map(link => link.textContent)).toEqual([
      expect.stringContaining('Mã b'),
      expect.stringContaining('Mã a'),
    ])
    expect(links[0]).toHaveAttribute('target', '_blank')
    expect(links[0]).toHaveAttribute('rel', expect.stringContaining('noopener'))
  })

  it('shows the unverified-scope note of a source', async () => {
    vi.mocked(api.getPublicLegalSources).mockResolvedValue([
      source('tt16', {
        notes: ['Tham khảo, chưa kiểm chứng phạm vi áp dụng: ...'],
      }),
    ])
    render(<LegalReferences sourceKeys={['tt16']} />)
    expect(
      await screen.findByText(/chưa kiểm chứng phạm vi áp dụng/)
    ).toBeTruthy()
  })

  it('keeps the contextual note when the catalogue cannot be loaded', async () => {
    vi.mocked(api.getPublicLegalSources).mockRejectedValue(new Error('down'))
    render(
      <LegalReferences sourceKeys={['a']} note="8 m² là điều kiện thường trú" />
    )
    expect(screen.getByText('8 m² là điều kiện thường trú')).toBeTruthy()
    await waitFor(() => expect(api.getPublicLegalSources).toHaveBeenCalled())
    expect(screen.queryAllByRole('link')).toHaveLength(0)
  })

  it('renders nothing without sources and without a note', async () => {
    vi.mocked(api.getPublicLegalSources).mockRejectedValue(new Error('down'))
    const { container } = render(<LegalReferences sourceKeys={['a']} />)
    await waitFor(() => expect(api.getPublicLegalSources).toHaveBeenCalled())
    expect(container.querySelector('details')).toBeNull()
  })
})
