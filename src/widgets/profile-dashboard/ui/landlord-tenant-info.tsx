'use client'

import * as React from 'react'
import { Card } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import { Badge } from '@/shared/ui/badge'
import {
  User,
  Phone,
  Calendar,
  Award,
  Eye,
  Heart,
  Megaphone,
  Edit,
} from 'lucide-react'
import { DEMO_TENANT_INFO, DEMO_PROPERTY_STATS } from '../model/mock-data'

interface LandlordTenantInfoProps {
  propertyId: string
  status: 'Đang thuê' | 'Đang chờ cọc' | 'Trống'
  price: number
}

export function LandlordTenantInfo({
  propertyId,
  status,
  price,
}: LandlordTenantInfoProps): React.ReactElement {
  if (status === 'Đang thuê') {
    const info = DEMO_TENANT_INFO[propertyId] || {
      name: 'Khách thuê demo',
      phone: '0900 000 000',
      startDate: '10/06/2026',
      duration: '12 tháng',
      endDate: '10/06/2027',
      paymentStatus: 'Đúng hạn',
      creditScore: '750/850',
      creditRank: 'Hạng Vàng',
    }

    return (
      <Card className="bg-white border border-border rounded-3xl p-6 shadow-sm text-left space-y-4">
        <div className="flex items-center gap-2 border-b border-border/50 pb-3">
          <User className="h-4.5 w-4.5 text-primary" />
          <h4 className="font-marketing text-sm font-bold text-fg">
            Khách thuê hiện tại
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-subtle" />
              <span className="text-muted font-medium">Họ tên:</span>
              <span className="text-fg font-bold">{info.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-subtle" />
              <span className="text-muted font-medium">Số điện thoại:</span>
              <span className="text-fg font-semibold">{info.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-subtle" />
              <span className="text-muted font-medium">Thời hạn hợp đồng:</span>
              <span className="text-fg font-semibold">
                {info.startDate} → {info.endDate} ({info.duration})
              </span>
            </div>
          </div>

          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-subtle" />
              <span className="text-muted font-medium">Hạng tín dụng:</span>
              <Badge
                variant="outline"
                className="text-[10px] font-bold bg-secondary-soft text-secondary border-secondary/15"
              >
                {info.creditRank} ({info.creditScore})
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-subtle" />
              <span className="text-muted font-medium">
                Tình trạng đóng tiền:
              </span>
              <Badge
                variant="outline"
                className="text-[10px] font-bold bg-success-soft text-success border-success/15"
              >
                {info.paymentStatus}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            variant="outline"
            className="rounded-full px-5 h-9 text-xs font-bold border border-border text-fg cursor-pointer"
          >
            Liên hệ khách thuê
          </Button>
        </div>
      </Card>
    )
  }

  // If properties are empty or waiting for deposits
  const stats = DEMO_PROPERTY_STATS[propertyId] || { views: 45, favorites: 4 }
  return (
    <Card className="bg-white border border-border rounded-3xl p-6 shadow-sm text-left space-y-4">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-warning">
          <AlertCircleIcon className="h-4.5 w-4.5" />
          <h4 className="font-marketing text-sm font-bold text-fg">
            {status === 'Đang chờ cọc'
              ? 'Đang chờ khách thuê nộp cọc'
              : 'Căn hộ hiện tại đang trống'}
          </h4>
        </div>
        <p className="text-xs text-muted">
          {status === 'Đang chờ cọc'
            ? 'Khách thuê đã thỏa thuận nhưng chưa thực hiện đặt cọc ký quỹ lên Smart Contract.'
            : 'Căn hộ đang được niêm yết trên sàn giao dịch và sẵn sàng tiếp nhận khách hàng mới.'}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 border-y border-border/50 py-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-surface-muted flex items-center justify-center text-subtle">
            <Eye className="h-4.5 w-4.5" />
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] text-muted font-bold uppercase block">
              Lượt xem tin
            </span>
            <span className="text-sm font-bold text-fg font-mono">
              {stats.views}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-surface-muted flex items-center justify-center text-subtle">
            <Heart className="h-4.5 w-4.5 text-danger" />
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] text-muted font-bold uppercase block">
              Lượt yêu thích
            </span>
            <span className="text-sm font-bold text-fg font-mono">
              {stats.favorites}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2.5 pt-1">
        <Button className="rounded-full bg-primary hover:bg-primary-hover text-white text-xs font-bold px-5 h-9 cursor-pointer flex items-center gap-1.5 shadow-sm">
          <Megaphone className="h-3.5 w-3.5" />
          Đẩy tin đăng nổi bật
        </Button>
        <Button
          variant="outline"
          className="rounded-full border border-border text-fg text-xs font-bold px-5 h-9 cursor-pointer flex items-center gap-1.5"
        >
          <Edit className="h-3.5 w-3.5" />
          Điều chỉnh giá thuê ({price.toLocaleString()}đ)
        </Button>
      </div>
    </Card>
  )
}

function AlertCircleIcon(
  props: React.SVGProps<SVGSVGElement>
): React.ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  )
}
