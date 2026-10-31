import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ApiClientError } from '@/shared/api'
import * as legalApi from '@/features/contracts/api/legal-sources-api'
import type { LegalSource } from '@/features/contracts/model/legal-governance-data'
import {
  HOUSING_LAW_SOURCE,
  PANEL_SOURCES,
} from '@/features/contracts/test-fixtures/legal-sources.fixture'
import { LegalSourcesAdminTab } from './legal-sources-admin-tab'

vi.mock('@/features/contracts/api/legal-sources-api', async () => {
  const actual = await vi.importActual<typeof legalApi>(
    '@/features/contracts/api/legal-sources-api'
  )
  return {
    ...actual,
    getAdminLegalSources: vi.fn(),
    createLegalSource: vi.fn(),
    updateLegalSource: vi.fn(),
    deleteLegalSource: vi.fn(),
    reorderLegalSources: vi.fn(),
  }
})

async function renderLoaded(): Promise<void> {
  render(<LegalSourcesAdminTab />)
  await screen.findByTestId('legal-sources-admin-tab')
}

function fieldByLabel(label: string): HTMLInputElement {
  return screen.getByLabelText(label) as HTMLInputElement
}

describe('LegalSourcesAdminTab', () => {
  beforeEach(() => {
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    vi.mocked(legalApi.getAdminLegalSources).mockResolvedValue(PANEL_SOURCES)
    vi.mocked(legalApi.updateLegalSource).mockImplementation((key, patch) =>
      Promise.resolve({
        ...PANEL_SOURCES.find(s => s.key === key)!,
        ...patch,
      } as LegalSource)
    )
  })

  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
    vi.restoreAllMocks()
  })

  it('lists every source including inactive ones with their links', async () => {
    vi.mocked(legalApi.getAdminLegalSources).mockResolvedValue([
      ...PANEL_SOURCES,
      { ...HOUSING_LAW_SOURCE, key: 'tax-law-2019', isActive: false },
    ])
    await renderLoaded()

    expect(screen.getByTestId('legal-source-row-tax-law-2019')).toBeDefined()
    const row = screen.getByTestId('legal-source-row-1.004194')
    expect(within(row).getByRole('link')).toHaveAttribute(
      'href',
      PANEL_SOURCES[0]!.externalUrl
    )
  })

  it('shows load error with retry', async () => {
    vi.mocked(legalApi.getAdminLegalSources).mockRejectedValueOnce(
      new Error('Không kết nối được')
    )
    render(<LegalSourcesAdminTab />)

    const error = await screen.findByTestId('legal-sources-admin-error')
    fireEvent.click(within(error).getByRole('button', { name: 'Thử lại' }))

    expect(await screen.findByTestId('legal-sources-admin-tab')).toBeDefined()
  })

  it('toggles contract panel visibility and active state via PATCH', async () => {
    await renderLoaded()

    fireEvent.click(screen.getByTestId('toggle-panel-housing-law-2023'))
    await waitFor(() =>
      expect(legalApi.updateLegalSource).toHaveBeenCalledWith(
        'housing-law-2023',
        { showInContractPanel: false }
      )
    )
    await waitFor(() =>
      expect(
        screen.getByTestId('toggle-panel-housing-law-2023')
      ).toHaveAttribute('aria-checked', 'false')
    )

    fireEvent.click(screen.getByTestId('toggle-active-1.007689'))
    await waitFor(() =>
      expect(legalApi.updateLegalSource).toHaveBeenCalledWith('1.007689', {
        isActive: false,
      })
    )
  })

  it('creates a source after client-side https validation', async () => {
    vi.mocked(legalApi.createLegalSource).mockImplementation(input =>
      Promise.resolve({
        ...HOUSING_LAW_SOURCE,
        ...input,
        id: 'new',
        order: 4,
        showInContractPanel: input.showInContractPanel ?? false,
        isActive: input.isActive ?? true,
      })
    )
    await renderLoaded()

    fireEvent.click(screen.getByTestId('btn-add-legal-source'))
    fireEvent.change(fieldByLabel('Key (định danh cố định)'), {
      target: { value: 'residence-law-2020' },
    })
    fireEvent.change(fieldByLabel('Mã hiệu'), {
      target: { value: 'Luật 68/2020/QH14' },
    })
    fireEvent.change(fieldByLabel('Tiêu đề'), {
      target: { value: 'Luật Cư trú 2020' },
    })
    fireEvent.change(fieldByLabel('Link gốc (https://)'), {
      target: { value: 'http://vanban.chinhphu.vn/' },
    })
    fireEvent.click(screen.getByTestId('btn-save-legal-source'))

    expect(
      await screen.findByText(
        'Link gốc phải là URL đầy đủ bắt đầu bằng https://'
      )
    ).toBeDefined()
    expect(legalApi.createLegalSource).not.toHaveBeenCalled()

    fireEvent.change(fieldByLabel('Link gốc (https://)'), {
      target: { value: 'https://vanban.chinhphu.vn/?docid=200519' },
    })
    fireEvent.click(screen.getByLabelText('Hiển thị trên panel hợp đồng'))
    fireEvent.click(screen.getByTestId('btn-save-legal-source'))

    expect(
      await screen.findByTestId('legal-source-row-residence-law-2020')
    ).toBeDefined()
    expect(legalApi.createLegalSource).toHaveBeenCalledWith(
      expect.objectContaining({
        key: 'residence-law-2020',
        externalUrl: 'https://vanban.chinhphu.vn/?docid=200519',
        showInContractPanel: true,
      })
    )
  })

  it('edits without sending the immutable key', async () => {
    await renderLoaded()

    fireEvent.click(screen.getByTestId('btn-edit-source-1.004194'))
    expect(fieldByLabel('Key (định danh cố định)')).toBeDisabled()
    fireEvent.change(fieldByLabel('Tiêu đề'), {
      target: { value: 'Đăng ký tạm trú (cập nhật)' },
    })
    fireEvent.click(screen.getByTestId('btn-save-legal-source'))

    await waitFor(() => expect(legalApi.updateLegalSource).toHaveBeenCalled())
    const [key, patch] = vi.mocked(legalApi.updateLegalSource).mock.calls[0]!
    expect(key).toBe('1.004194')
    expect(patch).not.toHaveProperty('key')
    expect(patch).toMatchObject({ title: 'Đăng ký tạm trú (cập nhật)' })
  })

  it('shows referencing regulation codes when delete is blocked', async () => {
    vi.mocked(legalApi.deleteLegalSource).mockRejectedValue(
      new ApiClientError('conflict', 409, {
        code: 'HTTP_409',
        message: 'in use',
        details: {
          code: 'LEGAL_SOURCE_IN_USE',
          regulationCodes: ['REG-RES-01'],
        },
      })
    )
    await renderLoaded()

    fireEvent.click(screen.getByTestId('btn-delete-source-1.004194'))
    fireEvent.click(screen.getByRole('button', { name: 'Xoá' }))

    expect(await screen.findByTestId('legal-sources-notice')).toHaveTextContent(
      'REG-RES-01'
    )
    expect(screen.getByTestId('legal-source-row-1.004194')).toBeDefined()
  })

  it('deletes an unreferenced source', async () => {
    vi.mocked(legalApi.deleteLegalSource).mockResolvedValue()
    await renderLoaded()

    fireEvent.click(screen.getByTestId('btn-delete-source-housing-law-2023'))
    fireEvent.click(screen.getByRole('button', { name: 'Xoá' }))

    await waitFor(() =>
      expect(
        screen.queryByTestId('legal-source-row-housing-law-2023')
      ).toBeNull()
    )
  })

  it('reorders with the full key list', async () => {
    vi.mocked(legalApi.reorderLegalSources).mockImplementation(keys =>
      Promise.resolve(keys.map(k => PANEL_SOURCES.find(s => s.key === k)!))
    )
    await renderLoaded()

    fireEvent.click(screen.getByLabelText('Đưa TTHC 1.004194 xuống'))

    await waitFor(() =>
      expect(legalApi.reorderLegalSources).toHaveBeenCalledWith([
        '1.007689',
        '1.004194',
        'housing-law-2023',
      ])
    )
  })

  it('previews a source in the detail modal', async () => {
    await renderLoaded()

    fireEvent.click(screen.getByLabelText('Xem trước TTHC 1.004194'))

    expect(
      within(screen.getByRole('dialog')).getByText(PANEL_SOURCES[0]!.agency)
    ).toBeDefined()
  })
})
