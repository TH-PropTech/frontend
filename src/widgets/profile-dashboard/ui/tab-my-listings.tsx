'use client'

import * as React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getMyListings,
  renewApartment,
  ApartmentPostingForm,
  type LandlordApartmentItem,
} from '@/features/apartment-posting'
import {
  useMyDesignRequests,
  type DesignRequestStatus,
} from '@/features/design-requests'
import { ListingCard } from './components/listing-card'
import { Button } from '@/shared/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/tabs'
import { toast } from 'sonner'
import { Plus, ArrowLeft, Loader2, Building } from 'lucide-react'
import { useCan } from '@/shared/lib/permissions'

const ACTIVE_DESIGN_STATUSES: DesignRequestStatus[] = [
  'submitted',
  'needs_info',
  'escalated',
  'in_progress',
  'delivered',
  'changes_requested',
]

export function TabMyListings(): React.ReactElement {
  const can = useCan()
  const canPost = can('create', 'Apartment')
  const queryClient = useQueryClient()
  const [filter, setFilter] = React.useState<
    'all' | 'pending' | 'available' | 'rejected' | 'unavailable'
  >('all')
  const [editingListing, setEditingListing] =
    React.useState<LandlordApartmentItem | null>(null)
  const [isCreating, setIsCreating] = React.useState(false)

  // Fetch landlord's listings
  const {
    data: listings = [],
    isLoading,
    error,
  } = useQuery<LandlordApartmentItem[]>({
    queryKey: ['my-listings'],
    queryFn: getMyListings,
  })

  // Trạng thái yêu cầu thiết kế 3D đang xử lý theo căn hộ (mỗi căn hộ tối đa một).
  const designRequests = useMyDesignRequests({
    statuses: ACTIVE_DESIGN_STATUSES,
    limit: 100,
  })
  const designStatusByApartment = React.useMemo(() => {
    const map = new Map<string, DesignRequestStatus>()
    for (const request of designRequests.data?.items ?? []) {
      map.set(request.apartmentId, request.status)
    }
    return map
  }, [designRequests.data])

  // Renew listing mutation
  const renewMutation = useMutation({
    mutationFn: renewApartment,
    onSuccess: () => {
      toast.success('Gia hạn bài đăng thành công thêm 30 ngày!')
      queryClient.invalidateQueries({ queryKey: ['my-listings'] })
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Gia hạn bài đăng thất bại.')
    },
  })

  // Filter listings based on status
  const filteredListings = React.useMemo(() => {
    if (filter === 'all') return listings
    return listings.filter(item => item.status === filter)
  }, [listings, filter])

  // Count states
  const counts = React.useMemo(() => {
    return {
      all: listings.length,
      pending: listings.filter(i => i.status === 'pending').length,
      available: listings.filter(i => i.status === 'available').length,
      rejected: listings.filter(i => i.status === 'rejected').length,
      unavailable: listings.filter(i => i.status === 'unavailable').length,
    }
  }, [listings])

  // Reset to list view
  const handleBackToList = () => {
    setEditingListing(null)
    setIsCreating(false)
    queryClient.invalidateQueries({ queryKey: ['my-listings'] })
  }

  // If in create or edit mode, display the form
  if (isCreating) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleBackToList}
            className="gap-2 border-border bg-background/50 hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại danh sách
          </Button>
        </div>
        <ApartmentPostingForm mode="create" />
      </div>
    )
  }

  if (editingListing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleBackToList}
            className="gap-2 border-border bg-background/50 hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại danh sách
          </Button>
        </div>
        <ApartmentPostingForm initialData={editingListing} mode="edit" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header and Add button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-fg flex items-center gap-2">
            <Building className="h-5 w-5 text-primary animate-pulse" />
            Danh sách bài đăng của tôi
          </h2>
          <p className="text-sm text-muted">
            Quản lý các tin đăng cho thuê căn hộ, theo dõi trạng thái duyệt và
            gia hạn tin.
          </p>
        </div>

        {canPost ? (
          <Button
            onClick={() => setIsCreating(true)}
            className="gap-1.5 font-semibold shadow-lg"
          >
            <Plus className="h-4 w-4" />
            Đăng tin mới
          </Button>
        ) : null}
      </div>

      {/* Tabs Filter Bar */}
      <Tabs
        value={filter}
        onValueChange={val => setFilter(val as typeof filter)}
        className="w-full"
      >
        <TabsList className="flex bg-muted/40 p-1 rounded-lg border border-border/60 max-w-full overflow-x-auto whitespace-nowrap h-auto scrollbar-none justify-start">
          <TabsTrigger
            value="all"
            className="rounded-md px-4 py-2 text-xs font-semibold"
          >
            Tất cả ({counts.all})
          </TabsTrigger>
          <TabsTrigger
            value="pending"
            className="rounded-md px-4 py-2 text-xs font-semibold"
          >
            Chờ duyệt ({counts.pending})
          </TabsTrigger>
          <TabsTrigger
            value="available"
            className="rounded-md px-4 py-2 text-xs font-semibold"
          >
            Đang hiển thị ({counts.available})
          </TabsTrigger>
          <TabsTrigger
            value="rejected"
            className="rounded-md px-4 py-2 text-xs font-semibold"
          >
            Bị từ chối ({counts.rejected})
          </TabsTrigger>
          <TabsTrigger
            value="unavailable"
            className="rounded-md px-4 py-2 text-xs font-semibold"
          >
            Hết hạn ({counts.unavailable})
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Main Grid View */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16 space-y-4">
          <Loader2 className="h-10 w-10 text-primary animate-spin" />
          <p className="text-sm text-muted font-medium">
            Đang tải danh sách bài đăng...
          </p>
        </div>
      ) : error ? (
        <div className="text-center py-16 bg-muted/20 border border-border rounded-xl">
          <p className="text-sm text-destructive font-medium">
            Lỗi tải dữ liệu. Vui lòng tải lại trang!
          </p>
        </div>
      ) : filteredListings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center bg-muted/20 border border-dashed border-border rounded-xl space-y-4">
          <Building className="h-12 w-12 text-muted-foreground/60" />
          <div>
            <p className="text-base font-bold text-fg">Không có bài đăng nào</p>
            <p className="text-sm text-muted max-w-md mt-1">
              {filter === 'all'
                ? 'Bạn chưa đăng tin cho thuê căn hộ nào trên hệ thống.'
                : `Không có tin đăng nào ở trạng thái này.`}
            </p>
          </div>
          {filter === 'all' && canPost && (
            <Button
              onClick={() => setIsCreating(true)}
              variant="outline"
              className="border-border"
            >
              Đăng bài viết đầu tiên
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredListings.map(item => (
            <ListingCard
              key={item.id}
              item={item}
              onEdit={setEditingListing}
              onRenew={id => renewMutation.mutate(id)}
              isRenewing={renewMutation.isPending}
              {...(designStatusByApartment.has(item.id)
                ? { designRequestStatus: designStatusByApartment.get(item.id)! }
                : {})}
            />
          ))}
        </div>
      )}
    </div>
  )
}
