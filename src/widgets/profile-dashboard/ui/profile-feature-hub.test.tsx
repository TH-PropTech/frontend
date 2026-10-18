import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ProfileFeatureHub } from './profile-feature-hub'

vi.mock('@/features/saved-searches', () => ({
  SavedSearchesList: () => <div>saved-searches-content</div>,
  AlertList: () => <div>alerts-content</div>,
}))
vi.mock('@/features/safety-reports', () => ({
  MyReportsList: () => <div>reports-content</div>,
}))
vi.mock('@/features/support-tickets', () => ({
  CreateTicketDialog: ({ trigger }: { trigger: React.ReactNode }) => (
    <>{trigger}</>
  ),
  TicketList: ({
    onSelectTicket,
  }: {
    onSelectTicket: (ticket: { _id: string }) => void
  }) => (
    <button onClick={() => onSelectTicket({ _id: 'ticket-1' })}>
      select-ticket
    </button>
  ),
  TicketDetailPanel: ({ ticketId }: { ticketId: string }) => (
    <div>detail-{ticketId}</div>
  ),
}))

describe('ProfileFeatureHub', () => {
  it('shows saved searches and alerts together', () => {
    render(<ProfileFeatureHub feature="saved-searches" />)

    expect(screen.getByText('saved-searches-content')).toBeInTheDocument()
    expect(screen.getByText('alerts-content')).toBeInTheDocument()
  })

  it('opens the selected support ticket detail', () => {
    render(<ProfileFeatureHub feature="support-tickets" />)
    fireEvent.click(screen.getByText('select-ticket'))

    expect(screen.getByText('detail-ticket-1')).toBeInTheDocument()
  })
})
