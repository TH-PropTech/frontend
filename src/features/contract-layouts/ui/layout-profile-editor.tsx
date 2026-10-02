'use client'

import * as React from 'react'
import { ArrowDown, ArrowUp, Eye, Save } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Switch } from '@/shared/ui/switch'
import {
  previewContractLayout,
  saveContractLayoutDraft,
  type ContractLayoutBlock,
  type ContractLayoutProfile,
} from '../api/contract-layouts-api'

const REQUIRED_BLOCKS = new Set([
  'PARTIES',
  'PROPERTY',
  'COMMERCIAL_TERMS',
  'LEGAL_ARTICLES',
  'SIGNATURES',
])

export interface LayoutProfileEditorProps {
  profileKey?: string
  initialProfile?: ContractLayoutProfile | null
}

export function LayoutProfileEditor({
  profileKey = 'default',
  initialProfile = null,
}: LayoutProfileEditorProps): React.ReactElement {
  const [profile, setProfile] = React.useState<ContractLayoutProfile | null>(
    initialProfile
  )
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const move = (index: number, direction: -1 | 1): void => {
    setProfile(current => {
      if (!current) return current
      const target = index + direction
      if (target < 0 || target >= current.blocks.length) return current
      const blocks = [...current.blocks]
      const currentBlock = blocks[index]
      const targetBlock = blocks[target]
      if (!currentBlock || !targetBlock) return current
      blocks[index] = targetBlock
      blocks[target] = currentBlock
      return {
        ...current,
        blocks: blocks.map((block, order) => ({ ...block, order: order + 1 })),
      }
    })
  }

  const updateBlock = (blockId: string, visible: boolean): void => {
    if (REQUIRED_BLOCKS.has(blockId) && !visible) return
    setProfile(current =>
      current
        ? {
            ...current,
            blocks: current.blocks.map(block =>
              block.blockId === blockId ? { ...block, visible } : block
            ),
          }
        : current
    )
  }

  const handlePreview = async (): Promise<void> => {
    setLoading(true)
    setError(null)
    try {
      setProfile(await previewContractLayout(profileKey))
    } catch (cause: unknown) {
      setError(
        cause instanceof Error ? cause.message : 'Không tải được layout.'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (): Promise<void> => {
    if (!profile) return
    setLoading(true)
    setError(null)
    try {
      setProfile(
        await saveContractLayoutDraft(profileKey, {
          legalProfile: profile.legalProfile,
          templateKey: profile.templateKey ?? null,
          blocks: profile.blocks,
          supplementaryClauses: profile.supplementaryClauses,
          expectedRevision: profile.version,
        })
      )
    } catch (cause: unknown) {
      setError(
        cause instanceof Error ? cause.message : 'Không lưu được layout.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      data-testid="layout-profile-editor"
      className="space-y-4 rounded-xl border border-line bg-surface p-5"
    >
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-fg">Bố cục hợp đồng</h2>
          <p className="text-xs text-muted">
            Profile: {profileKey}. Các block pháp lý bắt buộc không thể ẩn.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            size="sm"
            variant="secondary"
            loading={loading}
            onClick={() => void handlePreview()}
          >
            <Eye className="h-4 w-4" /> Xem trước
          </Button>
          <Button
            type="button"
            size="sm"
            loading={loading}
            disabled={!profile}
            onClick={() => void handleSave()}
          >
            <Save className="h-4 w-4" /> Lưu nháp
          </Button>
        </div>
      </header>
      {error ? (
        <p role="alert" className="text-sm text-danger">
          {error}
        </p>
      ) : null}
      {!profile ? (
        <p className="rounded-lg border border-line p-4 text-sm text-muted">
          Chưa tải layout draft.
        </p>
      ) : (
        <div className="space-y-2">
          {profile.blocks.map((block: ContractLayoutBlock, index) => (
            <div
              key={block.blockId}
              className="flex items-center gap-3 rounded-lg border border-line p-3"
            >
              <div className="flex flex-col gap-1">
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  aria-label={`Đưa ${block.title} lên`}
                  disabled={index === 0}
                  onClick={() => move(index, -1)}
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  aria-label={`Đưa ${block.title} xuống`}
                  disabled={index === profile.blocks.length - 1}
                  onClick={() => move(index, 1)}
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-fg">{block.title}</p>
                <p className="text-xs text-muted">{block.blockId}</p>
              </div>
              <Switch
                aria-label={`Hiển thị ${block.title}`}
                checked={block.visible}
                disabled={REQUIRED_BLOCKS.has(block.blockId)}
                onCheckedChange={visible => updateBlock(block.blockId, visible)}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
