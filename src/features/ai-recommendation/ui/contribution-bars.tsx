import * as React from 'react'
import { Landmark, MapPin, Users, Sparkles } from 'lucide-react'

interface ContributionBarsProps {
  contributions: {
    finance: number
    location: number
    demographics: number
    amenities: number
  }
}

export function ContributionBars({
  contributions,
}: ContributionBarsProps): React.ReactElement {
  const pillars = [
    {
      key: 'finance',
      label: 'Tài chính',
      value: contributions.finance,
      icon: Landmark,
      color: 'bg-[#9F3F2A]', // primary cam đất
    },
    {
      key: 'location',
      label: 'Vị trí',
      value: contributions.location,
      icon: MapPin,
      color: 'bg-[#6B8E4E]', // secondary olive
    },
    {
      key: 'demographics',
      label: 'Nhân khẩu',
      value: contributions.demographics,
      icon: Users,
      color: 'bg-[#E9A23B]', // warning gold
    },
    {
      key: 'amenities',
      label: 'Tiện ích',
      value: contributions.amenities,
      icon: Sparkles,
      color: 'bg-[#8A7968]', // neutral taupe
    },
  ]

  return (
    <div className="space-y-3">
      <h5 className="text-xs font-bold uppercase tracking-wider text-[#8A7968] mb-2 font-display">
        Trụ cột phù hợp
      </h5>
      {pillars.map(p => {
        const Icon = p.icon
        return (
          <div key={p.key} className="space-y-1">
            <div className="flex items-center justify-between text-xs font-medium">
              <div className="flex items-center gap-1.5 text-fg/80">
                <Icon className="w-3.5 h-3.5 stroke-[2]" />
                <span className="font-body">{p.label}</span>
              </div>
              <span className="font-mono text-[#8A7968]">{p.value}%</span>
            </div>
            <div className="h-1.5 w-full bg-[#E3D8D0]/40 rounded-full overflow-hidden">
              <div
                className={`h-full ${p.color} rounded-full transition-all duration-700 ease-out`}
                style={{ width: `${p.value}%` }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
