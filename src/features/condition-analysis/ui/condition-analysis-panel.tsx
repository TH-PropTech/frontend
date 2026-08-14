'use client'

import * as React from 'react'
import Image from 'next/image'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AlertTriangle, CheckCircle2, Eye, Upload } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import {
  analyzeConditionImage,
  getConditionAnalysisImage,
  getMyConditionAnalyses,
  type ConditionAnalysisItem,
  type ConditionFindingStatus,
} from '../api/condition-analysis-api'

const STATUS_LABELS: Record<ConditionFindingStatus, string> = {
  detected: 'Phát hiện',
  uncertain: 'Chưa chắc chắn',
  not_detected: 'Không phát hiện',
}

export function ConditionAnalysisPanel({
  apartmentId,
}: {
  apartmentId: string
}): React.ReactElement {
  const queryClient = useQueryClient()
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [file, setFile] = React.useState<File | null>(null)
  const analyses = useQuery({
    queryKey: ['condition-analyses', apartmentId],
    queryFn: () => getMyConditionAnalyses(apartmentId),
    retry: false,
  })
  const analyze = useMutation({
    mutationFn: (selected: File) =>
      analyzeConditionImage(apartmentId, selected),
    onSuccess: async () => {
      setFile(null)
      if (inputRef.current) inputRef.current.value = ''
      await queryClient.invalidateQueries({
        queryKey: ['condition-analyses', apartmentId],
      })
    },
  })
  const latest: ConditionAnalysisItem | undefined =
    analyze.data ?? analyses.data?.[0]

  return (
    <Card className="border-border bg-surface">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base text-fg">
          <Eye className="h-4 w-4 text-primary" aria-hidden="true" />
          Kiểm tra tình trạng qua ảnh
        </CardTitle>
        <p className="text-sm text-muted">
          Kết quả AI chỉ là quan sát hỗ trợ, không thay thế kiểm định kỹ thuật.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <label className="flex cursor-pointer flex-col items-center gap-2 rounded-2xl border border-dashed border-border bg-surface-muted p-5 text-center">
          <Upload className="h-5 w-5 text-primary" aria-hidden="true" />
          <span className="text-sm font-medium text-fg">
            {file?.name ?? 'Chọn ảnh JPEG, PNG hoặc WebP (tối đa 4 MB)'}
          </span>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            onChange={event => setFile(event.target.files?.[0] ?? null)}
          />
        </label>
        <Button
          type="button"
          disabled={!file}
          loading={analyze.isPending}
          onClick={() => {
            if (file) analyze.mutate(file)
          }}
        >
          Phân tích ảnh
        </Button>

        {analyses.isLoading ? (
          <div className="h-24 animate-pulse rounded-2xl bg-surface-muted" />
        ) : null}
        {analyses.isError || analyze.isError ? (
          <p className="rounded-xl border border-danger/30 bg-danger/10 p-3 text-sm text-danger">
            Không thể phân tích hoặc tải kết quả. Vui lòng thử lại.
          </p>
        ) : null}
        {!analyses.isLoading && !latest && !analyses.isError ? (
          <p className="text-sm text-muted">Chưa có lần phân tích nào.</p>
        ) : null}
        {latest ? <AnalysisResult analysis={latest} /> : null}
      </CardContent>
    </Card>
  )
}

function AnalysisResult({
  analysis,
}: {
  analysis: ConditionAnalysisItem
}): React.ReactElement {
  const image = useQuery({
    queryKey: ['condition-analysis-image', analysis._id],
    queryFn: () => getConditionAnalysisImage(analysis.imageUrl),
  })
  const imageObjectUrl = React.useMemo(() => {
    if (!image.data) return null
    return URL.createObjectURL(image.data)
  }, [image.data])

  React.useEffect(() => {
    if (!imageObjectUrl) return
    return () => URL.revokeObjectURL(imageObjectUrl)
  }, [imageObjectUrl])
  const attentionItems = analysis.findings.filter(
    finding => finding.status !== 'not_detected'
  )

  return (
    <div className="space-y-3 rounded-2xl border border-border p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-fg">Kết quả gần nhất</span>
        <span className="rounded-full bg-primary-soft px-2.5 py-1 text-xs font-medium text-primary">
          {analysis.overallCondition === 'good'
            ? 'Tốt'
            : analysis.overallCondition === 'attention_needed'
              ? 'Cần chú ý'
              : 'Chưa chắc chắn'}
        </span>
      </div>
      {imageObjectUrl ? (
        <div className="relative aspect-video overflow-hidden rounded-xl bg-surface-muted">
          <Image
            src={imageObjectUrl}
            alt="Ảnh căn hộ đã phân tích"
            fill
            unoptimized
            className="object-contain"
          />
          {attentionItems.map((finding, index) =>
            finding.boundingBox ? (
              <span
                key={`${finding.label}-box-${index}`}
                className="absolute border-2 border-danger bg-danger/10"
                style={{
                  left: `${finding.boundingBox.x * 100}%`,
                  top: `${finding.boundingBox.y * 100}%`,
                  width: `${finding.boundingBox.width * 100}%`,
                  height: `${finding.boundingBox.height * 100}%`,
                }}
                aria-label={`Vùng ảnh: ${finding.label}`}
              />
            ) : null
          )}
        </div>
      ) : null}
      {image.isError ? (
        <p className="text-xs text-danger">Không tải được ảnh phân tích.</p>
      ) : null}
      {attentionItems.length === 0 ? (
        <p className="flex items-center gap-2 text-sm text-success">
          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
          Không thấy vấn đề rõ ràng trong ảnh này.
        </p>
      ) : (
        <ul className="space-y-2">
          {attentionItems.map((finding, index) => (
            <li
              key={`${finding.label}-${index}`}
              className="flex gap-2 rounded-xl bg-surface-muted p-3"
            >
              <AlertTriangle
                className="mt-0.5 h-4 w-4 shrink-0 text-warning"
                aria-hidden="true"
              />
              <div>
                <p className="text-sm font-medium text-fg">
                  {finding.label} · {STATUS_LABELS[finding.status]}
                </p>
                <p className="text-xs text-muted">{finding.description}</p>
                <p className="mt-1 text-xs text-subtle">
                  Độ tin cậy {Math.round(finding.confidence * 100)}%
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
      {analysis.checklist.length > 0 ? (
        <div className="border-t border-border pt-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
            Việc nên kiểm tra thêm
          </p>
          <ul className="space-y-1.5">
            {analysis.checklist.map((item, index) => (
              <li
                key={`${item}-${index}`}
                className="flex items-start gap-2 text-sm text-fg"
              >
                <CheckCircle2
                  className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}
