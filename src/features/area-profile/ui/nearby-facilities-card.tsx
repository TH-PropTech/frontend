import {
  Bus,
  GraduationCap,
  Heart,
  Landmark,
  Mail,
  ShoppingCart,
  Store,
  TreePine,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import type { AreaProfileItem, FacilityType } from '../api/area-profile-api'
import { AreaDisclaimer } from './area-disclaimer'

const ICONS: Record<FacilityType, typeof Bus> = {
  school: GraduationCap,
  hospital: Heart,
  market: ShoppingCart,
  bus_stop: Bus,
  park: TreePine,
  gym: Store,
  bank: Landmark,
  police: Landmark,
  post_office: Mail,
  supermarket: Store,
}

export function NearbyFacilitiesCard({
  profile,
}: {
  profile: AreaProfileItem
}): React.ReactElement {
  return (
    <Card className="border-border bg-surface">
      <CardHeader>
        <CardTitle className="text-base text-fg">Khu vực xung quanh</CardTitle>
        <p className="text-sm text-muted">{profile.overview}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {profile.facilities.map(item => {
          const Icon = ICONS[item.type]
          return (
            <div
              key={`${item.type}-${item.name}`}
              className="flex items-center gap-3"
            >
              <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
              <span className="flex-1 text-sm text-fg">{item.name}</span>
              <span className="rounded-full bg-surface-muted px-2 py-1 text-xs text-muted">
                {item.distanceMeters} m
              </span>
            </div>
          )
        })}
        <AreaDisclaimer
          source={profile.source}
          disclaimer={profile.disclaimer}
          lastSurveyedAt={profile.lastSurveyedAt}
        />
      </CardContent>
    </Card>
  )
}
