interface CreatePostFormProps {
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

export function CreatePostForm({
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
}: CreatePostFormProps): React.ReactElement {
  return (
    <div className="sticky top-28 rounded-2xl border border-border bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <h3 className="font-display text-sm font-bold text-fg border-b border-border/60 pb-3 mb-5">
        Đăng bài thảo luận mới
      </h3>

      <form onSubmit={onSubmit} className="space-y-4">
        {errorMsg && (
          <div className="rounded-xl border border-danger/20 bg-danger/5 p-3 text-xs text-danger font-semibold">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="rounded-xl border border-success/20 bg-success/5 p-3 text-xs text-success font-semibold animate-pulse-subtle">
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
            placeholder="Nhập tiêu đề hoặc câu hỏi..."
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
            placeholder="Mô tả câu hỏi hoặc chia sẻ trải nghiệm..."
            rows={3}
            className="w-full rounded-xl border border-border bg-surface-muted/30 px-4 py-2.5 text-xs text-fg placeholder-subtle focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all resize-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-muted uppercase tracking-wider">
            Chủ đề
          </label>
          <div className="flex gap-1.5">
            {[
              { key: 'qa' as const, label: 'Hỏi đáp' },
              { key: 'review' as const, label: 'Đánh giá' },
              { key: 'roommate' as const, label: 'Ở ghép' },
            ].map(item => (
              <button
                key={item.key}
                type="button"
                onClick={() => setTopic(item.key)}
                className={`flex-1 rounded-lg py-2 text-[11px] font-bold transition-all duration-200 border cursor-pointer ${
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

        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-muted uppercase tracking-wider">
            Tên dự án / Chung cư
          </label>
          <input
            type="text"
            value={projectName}
            onChange={e => setProjectName(e.target.value)}
            placeholder="Ví dụ: Vinhomes Central Park"
            className="w-full rounded-xl border border-border bg-surface-muted/30 px-4 py-2.5 text-xs text-fg font-semibold placeholder-subtle focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
          />
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
                  ×
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

        <button
          type="submit"
          className="w-full rounded-xl bg-primary py-3 text-xs font-bold text-white shadow-[0_12px_32px_rgba(198,90,58,0.15)] hover:bg-primary-hover hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
        >
          Gửi bài viết (Chờ duyệt)
        </button>
      </form>
    </div>
  )
}
