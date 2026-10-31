import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { AiConfigView } from './ai-config-view'

vi.mock('./recommendation-engine-view', () => ({
  RecommendationEngineView: () => (
    <div data-testid="engine-view">Engine View</div>
  ),
}))

vi.mock('./groq-keys-view', () => ({
  GroqKeysView: () => <div data-testid="keys-view">Groq Keys View</div>,
}))

describe('AiConfigView', () => {
  it('renders default tab and switches on click', () => {
    render(<AiConfigView />)

    const engineTab = screen.getByRole('tab', { name: 'Cấu hình AI Engine' })
    const keysTab = screen.getByRole('tab', { name: 'Cấu hình API Key' })

    expect(engineTab).toHaveAttribute('aria-selected', 'true')
    expect(engineTab).toHaveAttribute('tabIndex', '0')
    expect(keysTab).toHaveAttribute('aria-selected', 'false')
    expect(keysTab).toHaveAttribute('tabIndex', '-1')
    expect(screen.getByTestId('engine-view')).toBeInTheDocument()

    fireEvent.click(keysTab)

    expect(keysTab).toHaveAttribute('aria-selected', 'true')
    expect(keysTab).toHaveAttribute('tabIndex', '0')
    expect(screen.getByTestId('keys-view')).toBeInTheDocument()
  })

  it('supports arrow key navigation between tabs', () => {
    render(<AiConfigView />)

    const engineTab = screen.getByRole('tab', { name: 'Cấu hình AI Engine' })
    const keysTab = screen.getByRole('tab', { name: 'Cấu hình API Key' })

    engineTab.focus()
    fireEvent.keyDown(engineTab, { key: 'ArrowRight' })

    expect(keysTab).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByTestId('keys-view')).toBeInTheDocument()

    fireEvent.keyDown(keysTab, { key: 'ArrowLeft' })
    expect(engineTab).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByTestId('engine-view')).toBeInTheDocument()
  })

  it('supports Home and End key navigation', () => {
    render(<AiConfigView />)

    const engineTab = screen.getByRole('tab', { name: 'Cấu hình AI Engine' })
    const keysTab = screen.getByRole('tab', { name: 'Cấu hình API Key' })

    engineTab.focus()
    fireEvent.keyDown(engineTab, { key: 'End' })

    expect(keysTab).toHaveAttribute('aria-selected', 'true')

    fireEvent.keyDown(keysTab, { key: 'Home' })
    expect(engineTab).toHaveAttribute('aria-selected', 'true')
  })
})
