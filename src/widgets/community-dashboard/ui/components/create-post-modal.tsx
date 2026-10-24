'use client'

import * as React from 'react'
import { useQuery } from '@tanstack/react-query'
import { AlertTriangle, Loader2, PencilLine } from 'lucide-react'
import { apiClient } from '@/shared/api/api-client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog'
import { TOPIC_LABELS, type CommunityTopic } from '../../lib/community-types'
import {
  toErrorMessage,
  type CreatePostPayload,
} from '../../lib/use-community-actions'

const TITLE_MAX_LENGTH = 150
const CONTENT_MAX_LENGTH = 5000
const PROJECT_MAX_LENGTH = 120
const TOPIC_KEYS = Object.keys(TOPIC_LABELS) as CommunityTopic[]
const PROJECT_LIST_ID = 'community-project-options'

const FIELD_CLASSES =
  'w-full rounded-xl border border-border bg-surface-muted/40 px-4 py-2.5 text-sm text-fg placeholder:text-subtle transition-all focus:border-primary focus:bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20'
const LABEL_CLASSES =
  'text-[11px] font-bold uppercase tracking-wider text-muted'

interface CreatePostModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (payload: CreatePostPayload) => Promise<unknown>
}

function useProjectSuggestions(enabled: boolean): string[] {
  const { data } = useQuery({
    queryKey: ['projects', 'names'],
    queryFn: () => apiClient.get<{ name?: string }[]>('/projects'),
    enabled,
    staleTime: 5 * 60_000,
  })
  return React.useMemo(
    () =>
      (data ?? [])
        .map(project => project.name)
        .filter((name): name is string => Boolean(name)),
    [data]
  )
}

export function CreatePostModal({
  isOpen,
  onClose,
  onSubmit,
}: CreatePostModalProps): React.ReactElement {
  const [title, setTitle] = React.useState('')
  const [content, setContent] = React.useState('')
  const [topic, setTopic] = React.useState<CommunityTopic>('qa')
  const [projectName, setProjectName] = React.useState('')
  const [errorMessage, setErrorMessage] = React.useState('')
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const projects = useProjectSuggestions(isOpen)

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault()
    if (isSubmitting) return
    setErrorMessage('')

    if (!title.trim() || !content.trim()) {
      setErrorMessage('Vui lòng nhập đầy đủ tiêu đề và nội dung.')
      return
    }
    if (!projectName.trim()) {
      setErrorMessage('Vui lòng gắn thẻ tên dự án/chung cư.')
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit({
        title: title.trim(),
        content: content.trim(),
        projectName: projectName.trim(),
        topic,
      })
      setTitle('')
      setContent('')
      setProjectName('')
      onClose()
    } catch (error) {
      setErrorMessage(
        toErrorMessage(
          error,
          'Không thể đăng bài viết lúc này. Vui lòng thử lại sau.'
        )
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-xl overflow-y-auto rounded-2xl border-border bg-surface p-6">
        <DialogHeader className="border-b border-border/60 pb-3">
          <DialogTitle className="flex items-center gap-2 font-display text-base font-bold text-fg">
            <PencilLine className="h-5 w-5 text-primary" aria-hidden />
            Đăng bài thảo luận mới
          </DialogTitle>
          <DialogDescription className="text-xs text-muted">
            Bài viết sẽ hiển thị công khai sau khi được đội ngũ TH PropTech kiểm
            duyệt.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {errorMessage && (
            <div
              role="alert"
              className="flex items-center gap-2 rounded-xl border border-danger/20 bg-danger-soft p-3 text-xs font-semibold text-danger"
            >
              <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden />
              {errorMessage}
            </div>
          )}

          <div className="space-y-1.5">
            <label htmlFor="community-post-title" className={LABEL_CLASSES}>
              Tiêu đề
            </label>
            <input
              id="community-post-title"
              type="text"
              value={title}
              maxLength={TITLE_MAX_LENGTH}
              onChange={event => setTitle(event.target.value)}
              placeholder="Nhập tiêu đề ngắn gọn hoặc câu hỏi cốt lõi..."
              className={`${FIELD_CLASSES} min-h-11 font-semibold`}
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="community-post-content" className={LABEL_CLASSES}>
              Nội dung
            </label>
            <textarea
              id="community-post-content"
              value={content}
              maxLength={CONTENT_MAX_LENGTH}
              onChange={event => setContent(event.target.value)}
              placeholder="Mô tả câu hỏi, chia sẻ kinh nghiệm chi tiết..."
              rows={4}
              className={`${FIELD_CLASSES} resize-none`}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <fieldset className="space-y-1.5">
              <legend className={LABEL_CLASSES}>Chủ đề</legend>
              <div className="flex gap-1">
                {TOPIC_KEYS.map(key => (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={topic === key}
                    onClick={() => setTopic(key)}
                    className={`min-h-11 flex-1 rounded-lg border py-2 text-[11px] font-bold transition-colors ${
                      topic === key
                        ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                        : 'border-border bg-surface text-muted hover:border-primary/30 hover:text-fg'
                    }`}
                  >
                    {TOPIC_LABELS[key]}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="space-y-1.5">
              <label htmlFor="community-post-project" className={LABEL_CLASSES}>
                Tên dự án / Chung cư
              </label>
              <input
                id="community-post-project"
                type="text"
                list={PROJECT_LIST_ID}
                value={projectName}
                maxLength={PROJECT_MAX_LENGTH}
                onChange={event => setProjectName(event.target.value)}
                placeholder="Ví dụ: Landmark 81..."
                className={`${FIELD_CLASSES} min-h-11 font-semibold`}
              />
              <datalist id={PROJECT_LIST_ID}>
                {projects.map(name => (
                  <option key={name} value={name} />
                ))}
              </datalist>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="min-h-11 flex-1 rounded-xl border border-border py-3 text-xs font-bold text-muted transition-colors hover:bg-surface-muted"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3 text-xs font-bold text-primary-foreground shadow-md transition-all hover:bg-primary-hover disabled:opacity-60"
            >
              {isSubmitting && (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              )}
              Gửi bài viết (Chờ duyệt)
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
