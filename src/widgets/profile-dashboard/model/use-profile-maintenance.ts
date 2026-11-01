import * as React from 'react'
import { toast } from 'sonner'
import { MaintenanceTicket, EventType, ProfileDataStatus } from './types'

export function useProfileMaintenance(
  addBlockchainLog: (event: EventType, hash: string) => void
) {
  const [maintenanceTickets, setMaintenanceTickets] = React.useState<
    MaintenanceTicket[]
  >([])
  const [status, setStatus] = React.useState<ProfileDataStatus>('ready')
  const [newTicketTitle, setNewTicketTitle] = React.useState('')
  const [newTicketDesc, setNewTicketDesc] = React.useState('')

  const retry = React.useCallback(() => {
    setStatus('ready')
  }, [])

  const handleNewMaintenanceTicket = (e: React.FormEvent): void => {
    e.preventDefault()
    if (!newTicketTitle.trim() || !newTicketDesc.trim()) return
    const ticket: MaintenanceTicket = {
      id: `TCK-${Date.now()}`,
      title: newTicketTitle,
      description: newTicketDesc,
      status: 'pending',
      createdAt: 'Vừa xong',
    }
    setMaintenanceTickets(prev => [ticket, ...prev])
    setNewTicketTitle('')
    setNewTicketDesc('')
    toast.success('Đã gửi yêu cầu bảo trì sự cố thiết bị!', {
      description:
        'Chủ nhà và đội ngũ kỹ thuật sẽ được thông báo ngay lập tức.',
    })
  }

  const handleApproveTicket = (id: string): void => {
    setMaintenanceTickets(prev =>
      prev.map(t =>
        t.id === id ? { ...t, status: 'processing', cost: t.cost || 350000 } : t
      )
    )
    const hash =
      Math.random().toString(16).substring(2, 10) +
      '27e3d09a25b18920138d89f2c1e8aa2206b7d8e9f0a1b2c3d4e5f6g7h8i9'
    addBlockchainLog('MAINTENANCE_APPROVED_BY_LANDLORD', hash)
    toast.success('Đã phê duyệt yêu cầu sửa chữa!', {
      description:
        'Hệ thống đã tự động liên hệ kỹ thuật viên đến bảo trì thiết bị.',
    })
  }

  return {
    maintenanceTickets,
    setMaintenanceTickets,
    status,
    retry,
    newTicketTitle,
    setNewTicketTitle,
    newTicketDesc,
    setNewTicketDesc,
    handleNewMaintenanceTicket,
    handleApproveTicket,
  }
}
