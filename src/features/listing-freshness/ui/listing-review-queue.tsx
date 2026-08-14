'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Check, CircleAlert, RotateCcw, X } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import {
  getListingReviewQueue,
  reviewListingCase,
  type ListingReviewCase,
} from '../api/listing-freshness-api'

const TYPE_LABELS: Record<ListingReviewCase['type'], string> = {
  stale: 'Tin cũ',
  duplicate_photo: 'Trùng ảnh',
  duplicate_location: 'Trùng địa chỉ',
  duplicate_phone: 'Trùng số điện thoại',
  similar_content: 'Nội dung tương tự',
}

export function ListingReviewQueue(): React.ReactElement {
  const queryClient = useQueryClient()
  const queue = useQuery({
    queryKey: ['listing-review-queue', 'pending'],
    queryFn: () =>
      getListingReviewQueue({ status: 'pending', page: 1, limit: 20 }),
  })
  const review = useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string
      status: 'confirmed' | 'dismissed'
    }) => reviewListingCase(id, status),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['listing-review-queue'] }),
  })

  if (queue.isLoading) {
    return <div className="h-28 animate-pulse rounded-2xl bg-surface-muted" />
  }
  if (queue.isError) {
    return (
      <div className="rounded-2xl border border-danger/30 bg-danger/10 p-5">
        <p className="text-sm font-semibold text-danger">
          Không tải được hàng đợi
        </p>
        <Button
          className="mt-3"
          size="sm"
          variant="outline"
          onClick={() => queue.refetch()}
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Thử lại
        </Button>
      </div>
    )
  }
  if (!queue.data?.items.length) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-5 text-sm text-muted">
        Không có tín hiệu cần kiểm tra.
      </div>
    )
  }

  return (
    <section className="space-y-3" aria-labelledby="review-queue-title">
      <div>
        <h3 id="review-queue-title" className="text-base font-bold text-fg">
          Tín hiệu chất lượng tin đăng
        </h3>
        <p className="text-xs text-muted">
          Chỉ là tín hiệu để nhân viên kiểm tra; hệ thống không tự đổi tin.
        </p>
      </div>
      {queue.data.items.map(item => (
        <article
          key={item._id}
          className="rounded-2xl border border-border bg-surface p-4"
        >
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div className="min-w-0">
              <p className="flex items-center gap-2 text-sm font-semibold text-fg">
                <CircleAlert
                  className="h-4 w-4 text-warning"
                  aria-hidden="true"
                />
                {TYPE_LABELS[item.type]}
              </p>
              <p className="mt-1 text-xs text-muted">{item.evidence}</p>
              <p className="mt-1 truncate text-xs text-subtle">
                Tin: {item.apartmentId}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() =>
                  review.mutate({ id: item._id, status: 'confirmed' })
                }
              >
                <Check className="h-3.5 w-3.5" aria-hidden="true" /> Xác nhận
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  review.mutate({ id: item._id, status: 'dismissed' })
                }
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" /> Bỏ qua
              </Button>
            </div>
          </div>
        </article>
      ))}
      {review.isError ? (
        <p className="text-xs text-danger">
          Không thể cập nhật tín hiệu. Hãy thử lại.
        </p>
      ) : null}
    </section>
  )
}
