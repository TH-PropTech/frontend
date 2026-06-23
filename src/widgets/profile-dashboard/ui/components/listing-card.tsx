import * as React from 'react'
import type { LandlordApartmentItem } from '@/features/apartment-posting'
import { Card, CardContent } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import {
  Calendar,
  MapPin,
  Edit3,
  RotateCcw,
  AlertCircle,
  Building,
} from 'lucide-react'

interface ListingCardProps {
  item: LandlordApartmentItem
  onEdit: (item: LandlordApartmentItem) => void
  onRenew: (id: string) => void
  isRenewing: boolean
}

export function ListingCard({
  item,
  onEdit,
  onRenew,
  isRenewing,
}: ListingCardProps): React.ReactElement {
  const formattedPrice = item.priceMonthly.toLocaleString('vi-VN')

  const getStatusBadge = () => {
    switch (item.status) {
      case 'available':
        return (
          <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold">
            Đang hoạt động
          </Badge>
        )
      case 'pending':
        return (
          <Badge className="bg-amber-500 hover:bg-amber-600 text-white font-semibold">
            Chờ kiểm duyệt
          </Badge>
        )
      case 'rejected':
        return (
          <Badge className="bg-rose-500 hover:bg-rose-600 text-white font-semibold">
            Bị từ chối
          </Badge>
        )
      case 'unavailable':
        return (
          <Badge className="bg-zinc-500 hover:bg-zinc-600 text-white font-semibold">
            Hết hạn / Khóa
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <Card className="overflow-hidden border border-border/80 bg-background/50 hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
      {/* Cover Image */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {item.gallery && item.gallery.length > 0 ? (
          <img
            src={item.gallery[0]}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
            Không có hình ảnh
          </div>
        )}
        <div className="absolute top-3 left-3 z-10">{getStatusBadge()}</div>
      </div>

      <CardContent className="p-5 flex flex-col flex-1 justify-between gap-4">
        {/* Info */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] uppercase font-bold text-primary tracking-wider">
              {item.category}
            </span>
            <span className="text-sm font-bold text-primary">
              {formattedPrice} triệu/tháng
            </span>
          </div>

          <h4 className="text-base font-bold text-fg line-clamp-2 leading-snug group-hover:text-primary transition-colors">
            {item.title}
          </h4>

          {/* Area & Rooms */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
            <span>
              Diện tích: <strong className="text-fg">{item.area} m²</strong>
            </span>
            <span>•</span>
            <span>
              {item.bedrooms} PN / {item.bathrooms} WC
            </span>
          </div>

          {/* Location */}
          <div className="flex items-start gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-primary mt-0.5" />
            <span className="line-clamp-1">{item.address}</span>
          </div>

          {/* Projects / Buildings */}
          {(item.projectName || item.buildingName) && (
            <div className="flex items-center gap-1.5 pt-1">
              <Building className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <span className="text-[11px] text-muted-foreground font-medium">
                {[item.projectName, item.buildingName]
                  .filter(Boolean)
                  .join(' • ')}
              </span>
            </div>
          )}

          {/* Rejected Details */}
          {item.status === 'rejected' && item.rejectedReason && (
            <div className="mt-3 p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg flex items-start gap-2 text-rose-500 text-xs">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">Lý do từ chối:</strong>{' '}
                {item.rejectedReason}
              </div>
            </div>
          )}

          {/* Date info */}
          <div className="mt-3 pt-3 border-t border-border/50 text-[11px] text-muted-foreground flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
            <span>
              {item.status === 'available' && item.expiresAt ? (
                <>
                  Hết hạn vào:{' '}
                  {format(new Date(item.expiresAt), 'dd/MM/yyyy', {
                    locale: vi,
                  })}
                </>
              ) : item.submittedAt ? (
                <>
                  Ngày gửi:{' '}
                  {format(new Date(item.submittedAt), 'dd/MM/yyyy', {
                    locale: vi,
                  })}
                </>
              ) : (
                <>Chưa nộp duyệt</>
              )}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-2 border-t border-border/50">
          {item.status === 'rejected' && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onEdit(item)}
              className="w-full gap-1 border-rose-500/30 text-rose-500 hover:bg-rose-500/10"
            >
              <Edit3 className="h-3.5 w-3.5" />
              Sửa & Nộp lại
            </Button>
          )}

          {item.status === 'unavailable' && (
            <Button
              type="button"
              size="sm"
              onClick={() => onRenew(item.id)}
              disabled={isRenewing}
              className="w-full gap-1"
            >
              <RotateCcw className="h-3.5 w-3.5 animate-spin-slow" />
              Gia hạn 30 ngày
            </Button>
          )}

          {item.status === 'available' && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onEdit(item)}
              className="w-full gap-1 border-border"
            >
              <Edit3 className="h-3.5 w-3.5" />
              Chỉnh sửa
            </Button>
          )}

          {item.status === 'pending' && (
            <div className="w-full text-center text-xs text-muted-foreground py-2 font-medium bg-muted/40 rounded-md border border-border/40">
              Chờ duyệt...
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
