import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ContractTemplatesView } from './contract-templates-view'

vi.mock('@/features/contract-layouts', () => ({
  LayoutProfileEditor: () => <div data-testid="layout-editor" />,
}))
vi.mock('./components/contract-templates/active-template-tab', () => ({
  ActiveTemplateTab: () => <div data-testid="lease-template-body" />,
}))
vi.mock('./components/contract-templates/handover-template-tab', () => ({
  HandoverTemplateTab: () => <div data-testid="handover-template-body" />,
}))

describe('ContractTemplatesView', () => {
  afterEach(cleanup)

  it('starts on the layout tab and switches between the sub-tabs', () => {
    render(<ContractTemplatesView />)
    expect(screen.getByTestId('layout-editor')).toBeTruthy()

    fireEvent.click(screen.getByTestId('tab-lease-template'))
    expect(screen.getByTestId('lease-template-body')).toBeTruthy()
    expect(screen.queryByTestId('layout-editor')).toBeNull()

    fireEvent.click(screen.getByTestId('tab-handover-template'))
    expect(screen.getByTestId('handover-template-body')).toBeTruthy()
  })
})
