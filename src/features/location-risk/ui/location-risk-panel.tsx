'use client'

import * as React from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Layers3, ShieldAlert } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import {
  getLocationRiskScore,
  type RiskLayerItem,
} from '../api/location-risk-api'
import { RiskMap } from './risk-map'

export function LocationRiskPanel({
  apartmentId,
}: {
  apartmentId: string
}): React.ReactElement {
  const isRealId = /^[0-9a-f]{24}$/i.test(apartmentId)
  const [weights, setWeights] = React.useState<Record<string, number>>({})
  const initial = useQuery({
    queryKey: ['location-risk', apartmentId],
    queryFn: () => getLocationRiskScore(apartmentId),
    enabled: isRealId,
  })
  const recalculate = useMutation({
    mutationFn: () => getLocationRiskScore(apartmentId, weights),
  })
  const result = recalculate.data ?? initial.data
  const visibleLayers = (result?.layers ?? []).filter(
    layer => (weights[layer.layerType] ?? 1) > 0
  )
  const hasGeometry = visibleLayers.some(layer => layer.geoJson !== null)

  return (
    <Card className="border-border bg-surface">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base text-fg">
          <ShieldAlert className="h-4 w-4 text-primary" aria-hidden="true" />
          Rủi ro khu vực
        </CardTitle>
        <p className="text-sm text-muted">
          Điểm tham khảo từ các nguồn được ghi rõ; không dùng để loại căn hộ.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {initial.isLoading ? (
          <div className="h-32 animate-pulse rounded-2xl bg-surface-muted" />
        ) : null}
        {initial.isError || recalculate.isError ? (
          <p className="rounded-xl border border-danger/30 bg-danger/10 p-3 text-sm text-danger">
            Không tải được dữ liệu rủi ro khu vực.
          </p>
        ) : null}
        {result?.status === 'insufficient_data' ? (
          <p className="rounded-xl border border-border bg-surface-muted p-3 text-sm text-muted">
            Chưa đủ dữ liệu để tính điểm cho khu vực này.
          </p>
        ) : null}
        {result?.status === 'available' && result.score !== null ? (
          <div className="flex items-center justify-between rounded-2xl bg-primary-soft p-4">
            <div>
              <p className="text-xs text-muted">Điểm rủi ro tổng hợp</p>
              <p className="text-2xl font-semibold text-primary">
                {result.score}/100
              </p>
            </div>
            <span className="text-sm font-medium text-fg">
              {result.district}
            </span>
          </div>
        ) : null}

        {result?.layers.length ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-fg">
              <Layers3 className="h-4 w-4 text-primary" aria-hidden="true" />
              Lớp dữ liệu và trọng số
            </div>
            {result.layers.map(layer => (
              <RiskLayerControl
                key={layer._id}
                layer={layer}
                weight={weights[layer.layerType] ?? 1}
                onWeightChange={weight =>
                  setWeights(current => ({
                    ...current,
                    [layer.layerType]: weight,
                  }))
                }
              />
            ))}
            <Button
              variant="secondary"
              loading={recalculate.isPending}
              onClick={() => recalculate.mutate()}
            >
              Tính lại theo trọng số
            </Button>
          </div>
        ) : null}

        {hasGeometry ? <RiskMap layers={visibleLayers} /> : null}
        {result?.layers.length && !hasGeometry ? (
          <p className="text-xs text-subtle">
            Nguồn hiện chưa cung cấp dữ liệu hình học để hiển thị bản đồ.
          </p>
        ) : null}
      </CardContent>
    </Card>
  )
}

function RiskLayerControl({
  layer,
  weight,
  onWeightChange,
}: {
  layer: RiskLayerItem
  weight: number
  onWeightChange: (weight: number) => void
}): React.ReactElement {
  return (
    <div className="rounded-xl border border-border p-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-fg">{layer.layerType}</p>
          <p className="text-xs text-muted">
            Nguồn: {layer.source} · Tin cậy {Math.round(layer.confidence * 100)}
            %
          </p>
          <p className="text-xs text-subtle">
            Cập nhật: {new Date(layer.timestamp).toLocaleDateString('vi-VN')}
          </p>
        </div>
        <span className="text-sm font-semibold text-warning">
          {layer.severity}/100
        </span>
      </div>
      <label className="mt-3 block text-xs text-muted">
        Trọng số: {weight.toFixed(1)}
        <input
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={weight}
          onChange={event => onWeightChange(Number(event.target.value))}
          className="mt-1 w-full accent-primary"
        />
      </label>
    </div>
  )
}
