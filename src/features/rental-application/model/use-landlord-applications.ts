'use client'

import * as React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  getReceivedRentalApplications,
  respondToRentalApplication,
  isApplicationRevisionStaleError,
  type RentalApplicationItem,
  type RentalApplicationList,
} from '../api/rental-application-api'
import { getRespondErrorMessage } from '../lib/application-labels'

export type ApplicationFilterStatus =
  | 'all'
  | 'pending'
  | 'accepted'
  | 'rejected'

export interface RespondApplicationParams {
  id: string
  status: 'accepted' | 'rejected'
  reasonCode: string
  note?: string | undefined
  expectedRevision?: number | undefined
  landlordFeeAck?: string | undefined
}

export function useLandlordApplications() {
  const queryClient = useQueryClient()
  const [filter, setFilter] = React.useState<ApplicationFilterStatus>('all')
  const [selectedApplication, setSelectedApplication] =
    React.useState<RentalApplicationItem | null>(null)

  const query = useQuery<RentalApplicationList>({
    queryKey: ['rental-applications', 'received'],
    queryFn: getReceivedRentalApplications,
  })

  const applications = React.useMemo(
    () => query.data?.items ?? [],
    [query.data?.items]
  )

  const counts = React.useMemo(() => {
    return {
      all: applications.length,
      pending: applications.filter(app => app.status === 'pending').length,
      accepted: applications.filter(app => app.status === 'accepted').length,
      rejected: applications.filter(app => app.status === 'rejected').length,
    }
  }, [applications])

  const filteredApplications = React.useMemo(() => {
    if (filter === 'all') return applications
    return applications.filter(app => app.status === filter)
  }, [applications, filter])

  const respondMutation = useMutation({
    mutationFn: async (params: RespondApplicationParams) => {
      const { id, ...input } = params
      return respondToRentalApplication(id, input)
    },
    onSuccess: updatedApp => {
      const isAccepted = updatedApp.status === 'accepted'
      toast.success(
        isAccepted
          ? 'Đã chấp thuận hồ sơ thuê! Hệ thống đã khởi tạo dự thảo hợp đồng.'
          : 'Đã từ chối hồ sơ thuê.'
      )
      queryClient.invalidateQueries({
        queryKey: ['rental-applications', 'received'],
      })
      setSelectedApplication(null)
    },
    onError: (err: unknown) => {
      toast.error(
        getRespondErrorMessage(err, isApplicationRevisionStaleError(err))
      )
      queryClient.invalidateQueries({
        queryKey: ['rental-applications', 'received'],
      })
    },
  })

  return {
    applications: filteredApplications,
    allApplications: applications,
    counts,
    filter,
    setFilter,
    selectedApplication,
    setSelectedApplication,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    respond: respondMutation.mutateAsync,
    isResponding: respondMutation.isPending,
  }
}
