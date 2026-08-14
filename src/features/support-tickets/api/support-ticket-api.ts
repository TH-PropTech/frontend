import { apiClient } from '@/shared/api'

export type TicketCategory =
  | 'account'
  | 'listing'
  | 'booking'
  | 'payment'
  | 'kyc'
  | 'technical'
  | 'feedback'

export type TicketPriority = 'low' | 'normal' | 'high' | 'urgent'
export type TicketStatus =
  | 'open'
  | 'in_progress'
  | 'waiting_customer'
  | 'waiting_staff'
  | 'escalated'
  | 'resolved'
  | 'closed'

export interface SupportTicketItem {
  _id: string
  requesterId: string
  category: TicketCategory
  subject: string
  description: string
  priority: TicketPriority
  status: TicketStatus
  assignedTo?: string
  slaDeadline: string
  firstResponseAt?: string
  resolvedAt?: string
  closedAt?: string
  createdAt: string
  updatedAt: string
}

export interface TicketMessageItem {
  _id: string
  ticketId: string
  senderId: string
  senderRole: string
  content: string
  attachmentUrls: string[]
  isInternal: boolean
  createdAt: string
}

export interface CreateTicketPayload {
  category: TicketCategory
  subject: string
  description: string
  priority?: TicketPriority
  linkedEntityType?: 'apartment' | 'booking' | 'contract' | 'payment'
  linkedEntityId?: string
}

export async function createSupportTicket(
  payload: CreateTicketPayload
): Promise<SupportTicketItem> {
  return apiClient.post<SupportTicketItem>('/support-tickets', payload)
}

export async function getMySupportTickets(): Promise<{
  items: SupportTicketItem[]
  total: number
}> {
  return apiClient.get<{ items: SupportTicketItem[]; total: number }>(
    '/support-tickets/my'
  )
}

export async function getTicketQueue(): Promise<{
  items: SupportTicketItem[]
  total: number
}> {
  return apiClient.get<{ items: SupportTicketItem[]; total: number }>(
    '/support-tickets/queue'
  )
}

export async function getTicketDetail(id: string): Promise<{
  ticket: SupportTicketItem
  messages: TicketMessageItem[]
}> {
  return apiClient.get<{
    ticket: SupportTicketItem
    messages: TicketMessageItem[]
  }>(`/support-tickets/${id}`)
}

export async function addTicketMessage(
  ticketId: string,
  content: string,
  isInternal = false
): Promise<TicketMessageItem> {
  return apiClient.post<TicketMessageItem>(
    `/support-tickets/${ticketId}/messages`,
    {
      content,
      isInternal,
    }
  )
}

export async function resolveSupportTicket(
  ticketId: string,
  resolutionNote: string
): Promise<SupportTicketItem> {
  return apiClient.patch<SupportTicketItem>(
    `/support-tickets/${ticketId}/resolve`,
    {
      resolutionNote,
    }
  )
}

export async function closeSupportTicket(
  ticketId: string
): Promise<SupportTicketItem> {
  return apiClient.patch<SupportTicketItem>(
    `/support-tickets/${ticketId}/close`,
    {}
  )
}
