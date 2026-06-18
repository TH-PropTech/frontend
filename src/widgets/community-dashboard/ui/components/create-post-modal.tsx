'use client'

import * as React from 'react'
import { apiClient } from '@/shared/api/api-client'

interface CreatePostModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  setTitle: (v: string) => void
  content: string
  setContent: (v: string) => void
  topic: 'qa' | 'review' | 'roommate'
  setTopic: (v: 'qa' | 'review' | 'roommate') => void
  projectName: string
  setProjectName: (v: string) => void
  images: string[]
  errorMsg: string
  successMsg: string
  onAddImage: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRemoveImage: (index: number) => void
  onSubmit: (e: React.FormEvent) => void
}

export function CreatePostModal({
  isOpen,
  onClose,
  title,
  setTitle,
  content,
  setContent,
  topic,
  setTopic,
  projectName,
  setProjectName,
  images,
  errorMsg,
  successMsg,
  onAddImage,
  onRemoveImage,
  onSubmit,
}: CreatePostModalProps): React.ReactElement | null {
  const [projectsList, setProjectsList] = React.useState<string[]>([])
  const [showDropdown, setShowDropdown] = React.useState(false)

  React.useEffect(() => {
    let active = true
    if (isOpen) {
      apiClient
        .get<{ name: string }[]>('/projects')
        .then(data => {
          if (active && data && Array.isArray(data)) {
            const names = data.map(p => p.name).filter(Boolean)
            if (names.length > 0) {
              setProjectsList(names)
            }
          }
        })
        .catch(err => {
          console.warn('Failed to fetch projects, using fallback list', err)
        })
    }
    return () => {
      active = false
    }
  }, [isOpen])

  const FALLBACK_PROJECTS = React.useMemo(
    () => [
      'Vinhomes Central Park',
      'Masteri Thảo Điền',
      'Sunrise City',
      'Discovery Complex',
      'Vinhomes Smart City',
      'The Sun Avenue',
    ],
    []
  )

  const filteredProjects = React.useMemo(() => {
    const list = projectsList.length > 0 ? projectsList : FALLBACK_PROJECTS
    if (!projectName.trim()) return list
    return list.filter(p => p.toLowerCase().includes(projectName.toLowerCase()))
  }, [projectName, projectsList, FALLBACK_PROJECTS])

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      <div
        className="relative w-full max-w-xl rounded-2xl border border-border bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/60 pb-3 mb-5">
          <div className="flex items-center gap-2">
            <svg
              className="h-5 w-5 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            <h3 className="font-display text-base font-bold text-fg">
              Đăng bài thảo luận mới
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted hover:bg-surface-muted hover:text-fg transition-colors"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-4">
          {errorMsg && (
            <div className="rounded-xl border border-danger/20 bg-danger/5 p-3 text-xs text-danger font-semibold flex items-center gap-2">
              <svg
                className="h-4 w-4 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="rounded-xl border border-success/20 bg-success/5 p-3 text-xs text-success font-semibold flex items-center gap-2">
              <svg
                className="h-4 w-4 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {successMsg}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-muted uppercase tracking-wider">
              Tiêu đề
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Nhập tiêu đề ngắn gọn hoặc câu hỏi cốt lõi..."
              className="w-full rounded-xl border border-border bg-surface-muted/30 px-4 py-2.5 text-xs text-fg font-semibold placeholder-subtle focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-muted uppercase tracking-wider">
              Nội dung
            </label>
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Mô tả câu hỏi, chia sẻ kinh nghiệm chi tiết..."
              rows={4}
              className="w-full rounded-xl border border-border bg-surface-muted/30 px-4 py-2.5 text-xs text-fg placeholder-subtle focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-muted uppercase tracking-wider">
                Chủ đề
              </label>
              <div className="flex gap-1">
                {[
                  { key: 'qa' as const, label: 'Hỏi đáp' },
                  { key: 'review' as const, label: 'Đánh giá' },
                  { key: 'roommate' as const, label: 'Ở ghép' },
                ].map(item => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setTopic(item.key)}
                    className={`flex-1 rounded-lg py-2 text-[10px] font-bold transition-all duration-200 border cursor-pointer ${
                      topic === item.key
                        ? 'bg-primary text-white border-primary shadow-sm'
                        : 'bg-white border-border text-muted hover:border-primary/30 hover:text-fg'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5 relative">
              <label className="text-[11px] font-bold text-muted uppercase tracking-wider">
                Tên dự án / Chung cư
              </label>
              <input
                type="text"
                value={projectName}
                onChange={e => {
                  setProjectName(e.target.value)
                  setShowDropdown(true)
                }}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                placeholder="Ví dụ: Landmark 81..."
                className="w-full rounded-xl border border-border bg-surface-muted/30 px-4 py-2.5 text-xs text-fg font-semibold placeholder-subtle focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
              />
              {showDropdown && filteredProjects.length > 0 && (
                <div className="absolute left-0 right-0 z-50 mt-1 max-h-48 overflow-y-auto rounded-xl border border-border bg-white p-1 shadow-lg animate-in fade-in slide-in-from-top-1 duration-150">
                  {filteredProjects.map((proj, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onMouseDown={() => {
                        setProjectName(proj)
                        setShowDropdown(false)
                      }}
                      className="w-full rounded-lg px-3 py-2 text-left text-xs font-semibold hover:bg-surface-muted transition-colors text-fg"
                    >
                      {proj}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Image upload */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-[11px] font-bold text-muted uppercase tracking-wider">
                Hình ảnh ({images.length}/5)
              </label>
              <span className="text-[10px] text-subtle">Tối đa 5MB/ảnh</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative h-14 w-14 rounded-lg border border-border overflow-hidden group"
                >
                  <img
                    src={img}
                    alt="preview"
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => onRemoveImage(idx)}
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold cursor-pointer"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              ))}
              {images.length < 5 && (
                <label className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-lg border border-dashed border-border bg-surface-muted/30 hover:bg-surface-muted/60 hover:border-primary/30 transition-all">
                  <svg
                    className="h-5 w-5 text-muted"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
                    />
                  </svg>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={onAddImage}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-border py-3 text-xs font-bold text-muted hover:bg-surface-muted transition-all cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex-1 rounded-xl bg-primary py-3 text-xs font-bold text-white shadow-[0_12px_32px_rgba(198,90,58,0.15)] hover:bg-primary-hover hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
            >
              Gửi bài viết (Chờ duyệt)
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
