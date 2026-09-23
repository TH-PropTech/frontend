'use client'

import React, { useEffect, useState } from 'react'
import { Loader2, Trash2 } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { appToast } from '@/shared/ui/app-toast'
import {
  deleteLivingCostProfile,
  getLivingCostProfiles,
  type LivingCostProfileItem,
} from '../api/living-cost-api'

export function LivingCostProfilesList(): React.ReactElement {
  const [profiles, setProfiles] = useState<LivingCostProfileItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    getLivingCostProfiles()
      .then(result => {
        if (active) setProfiles(result.items)
      })
      .catch((requestError: unknown) => {
        const message =
          requestError instanceof Error
            ? requestError.message
            : 'KhÃ´ng thá»ƒ táº£i há»“ sÆ¡ chi phÃ­'
        if (active) setError(message)
        appToast.error(message)
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  const removeProfile = async (profileId: string): Promise<void> => {
    try {
      await deleteLivingCostProfile(profileId)
      setProfiles(current =>
        current.filter(profile => profile._id !== profileId)
      )
      appToast.success('ÄÃ£ xÃ³a há»“ sÆ¡ chi phÃ­')
    } catch (requestError: unknown) {
      appToast.error(
        requestError instanceof Error
          ? requestError.message
          : 'KhÃ´ng thá»ƒ xÃ³a há»“ sÆ¡ chi phÃ­'
      )
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 p-4 text-sm text-muted">
        <Loader2 className="h-4 w-4 animate-spin" /> Äang táº£i há»“ sÆ¡...
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-xl bg-primary-soft p-4 text-sm text-danger">
        {error}
      </div>
    )
  }

  if (profiles.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border p-4 text-sm text-muted">
        ChÆ°a cÃ³ há»“ sÆ¡ chi phÃ­ Ä‘Ã£ lÆ°u.
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {profiles.map(profile => (
        <article
          key={profile._id}
          className="flex items-center justify-between gap-3 rounded-xl border border-border bg-surface-muted p-3"
        >
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-fg">
              {profile.name}
            </h3>
            <p className="mt-1 text-xs text-muted">
              Æ¯á»›c tÃ­nh trung bÃ¬nh:{' '}
              {profile.totalEstimate.mid.toLocaleString('vi-VN')} VND/thÃ¡ng
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            aria-label="XÃ³a há»“ sÆ¡ chi phÃ­"
            onClick={() => void removeProfile(profile._id)}
          >
            <Trash2 className="h-4 w-4 text-danger" />
          </Button>
        </article>
      ))}
    </div>
  )
}
