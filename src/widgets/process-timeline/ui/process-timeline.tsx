'use client'

import * as React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { HomeHeader } from '@/widgets/home-dashboard/ui/home-header'
import { Footer } from '@/shared/ui/footer'
import type { Article } from '../model/articles-data'
import { categories } from '../model/articles-data'
import { AiGuideBot } from './components/ai-guide-bot'

const ALL_ARTICLES = categories.flatMap(c => c.articles)

export function ProcessTimeline(): React.ReactElement {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [viewMode, setViewMode] = React.useState<'dashboard' | 'detail'>(
    'dashboard'
  )
  const [searchQuery, setSearchQuery] = React.useState('')
  const [activeArticleId, setActiveArticleId] = React.useState('smart-contract')
  const [showAiGuide, setShowAiGuide] = React.useState(true)

  const [expandedCats, setExpandedCats] = React.useState<
    Record<string, boolean>
  >({
    posting: true,
    services: true,
    accounts: true,
    payments: true,
    vrtour: true,
    policies: true,
  })

  // Đồng bộ hóa URL qua query parameters (?article=...)
  const articleFromUrl = searchParams.get('article')

  React.useEffect(() => {
    if (articleFromUrl) {
      const found = ALL_ARTICLES.find(a => a.id === articleFromUrl)
      if (found) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setActiveArticleId(found.id)
        setViewMode('detail')
        const parentCat = categories.find(c =>
          c.articles.some(a => a.id === found.id)
        )
        if (parentCat) {
          setExpandedCats(prev => ({ ...prev, [parentCat.id]: true }))
        }
      }
    } else {
      setViewMode('dashboard')
    }
  }, [articleFromUrl])

  const toggleCat = (catId: string): void => {
    setExpandedCats(prev => ({ ...prev, [catId]: !prev[catId] }))
  }

  const handleCategoryClick = (catId: string): void => {
    const cat = categories.find(c => c.id === catId)
    const targetArtId = cat?.articles[0]?.id || 'smart-contract'
    setActiveArticleId(targetArtId)
    setExpandedCats(prev => ({ ...prev, [catId]: true }))
    setViewMode('detail')
    router.push(`/process?article=${encodeURIComponent(targetArtId)}`, {
      scroll: false,
    })
  }

  const handleArticleSelect = (artId: string): void => {
    setActiveArticleId(artId)
    setViewMode('detail')
    router.push(`/process?article=${encodeURIComponent(artId)}`, {
      scroll: false,
    })
  }

  const handleSearchSubmit = (e?: React.FormEvent): void => {
    if (e) e.preventDefault()
    if (searchQuery.trim()) {
      setViewMode('detail')
      const firstMatch =
        suggestedArticles[0] || filteredCategories[0]?.articles[0]
      if (firstMatch) {
        handleArticleSelect(firstMatch.id)
      }
    }
  }

  const handleBackToDashboard = (): void => {
    setViewMode('dashboard')
    setSearchQuery('')
    router.push('/process', { scroll: false })
  }

  const handleToggleAiGuide = (): void => {
    setShowAiGuide(prev => !prev)
  }

  // Get active article safely
  const activeArticle: Article = ALL_ARTICLES.find(
    a => a.id === activeArticleId
  ) ||
    ALL_ARTICLES[0] || {
      id: 'fallback',
      title: 'Cẩm nang',
      breadcrumbs: ['Cẩm nang'],
      updatedAt: '24/10/2026',
      content: <p>Nội dung đang được cập nhật.</p>,
    }

  const searchQueryClean = searchQuery.toLowerCase().trim()

  // Live suggestions for hero search
  const suggestedArticles = searchQueryClean
    ? ALL_ARTICLES.filter(
        art =>
          art.title.toLowerCase().includes(searchQueryClean) ||
          art.breadcrumbs.some(b => b.toLowerCase().includes(searchQueryClean))
      ).slice(0, 5)
    : []

  // Lọc theo ô tìm kiếm
  const filteredCategories = !searchQueryClean
    ? categories
    : categories
        .map(cat => ({
          ...cat,
          articles: cat.articles.filter(
            art =>
              art.title.toLowerCase().includes(searchQueryClean) ||
              cat.title.toLowerCase().includes(searchQueryClean)
          ),
        }))
        .filter(cat => cat.articles.length > 0)

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-bg text-fg selection:bg-primary/20 selection:text-primary">
      <HomeHeader />

      <main className="w-full text-left pb-20">
        {/* VIEW 1: DASHBOARD MODE (Search Hero & 6 big category cards) */}
        {viewMode === 'dashboard' && (
          <div className="space-y-16 animate-in fade-in duration-300">
            {/* Support Center Header */}
            <section className="relative flex flex-col items-center justify-center bg-gradient-to-b from-[#f5ece2] via-[#faf6f1] to-background pb-20 md:pb-24 pt-28 md:pt-36 text-center rounded-b-[32px] md:rounded-b-[40px] border-b border-border overflow-hidden px-4 sm:px-6 md:px-10">
              <div className="absolute inset-0 opacity-[0.08] pointer-events-none select-none overflow-hidden">
                <svg
                  className="w-full h-full max-w-full"
                  viewBox="0 0 1440 300"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M-100 80 C 300 10, 600 150, 1000 60 C 1200 30, 1500 100, 1600 80"
                    stroke="currentColor"
                    className="text-primary"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <path
                    d="M-100 140 C 300 70, 600 210, 1000 120 C 1200 90, 1500 160, 1600 140"
                    stroke="currentColor"
                    className="text-primary"
                    strokeWidth="1.5"
                    fill="none"
                  />
                </svg>
              </div>

              <div className="mx-auto w-full max-w-4xl z-10 relative space-y-4 md:space-y-6">
                <span className="font-mono text-[11px] md:text-xs font-bold uppercase tracking-widest text-primary mb-1 block">
                  TRUNG TÂM HỖ TRỢ KHÁCH HÀNG TH PROPTECH
                </span>
                <h1 className="font-marketing text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight text-fg">
                  Xin chào! TH PropTech có thể giúp gì cho bạn?
                </h1>

                {/* Interactive Search Bar */}
                <form
                  onSubmit={handleSearchSubmit}
                  className="relative mx-auto w-full max-w-xl mt-4 md:mt-6"
                >
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <svg
                      className="h-5 w-5 text-muted/80"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Mời bạn nhập câu hỏi hoặc từ khóa cần tìm..."
                    className="w-full rounded-full border border-border/80 bg-white py-3.5 md:py-4 pl-11 md:pl-12 pr-24 text-xs md:text-sm text-fg shadow-sm outline-none placeholder:text-muted/65 transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/15"
                  />
                  <button
                    type="submit"
                    aria-label="Tìm kiếm"
                    className="absolute inset-y-0 right-2 md:right-2.5 flex items-center"
                  >
                    <span className="rounded-full bg-primary hover:bg-primary-hover text-white px-3 md:px-4 py-1.5 md:py-2 text-[11px] md:text-xs font-bold shadow-sm select-none cursor-pointer transition-colors">
                      Tìm kiếm
                    </span>
                  </button>

                  {/* Auto-suggest dropdown when typing */}
                  {searchQuery.trim().length > 0 && (
                    <div className="absolute left-0 right-0 top-full mt-2 z-30 bg-white border border-border rounded-2xl shadow-xl overflow-hidden text-left divide-y divide-border/50 animate-in fade-in-50 zoom-in-95 duration-150">
                      {suggestedArticles.length > 0 ? (
                        <>
                          <div className="px-4 py-2.5 bg-surface-muted/60 text-[11px] font-bold text-muted uppercase tracking-wider flex items-center justify-between">
                            <span>
                              Gợi ý bài viết ({suggestedArticles.length})
                            </span>
                            <span className="text-[10px] lowercase font-normal">
                              Nhấn để xem ngay
                            </span>
                          </div>
                          {suggestedArticles.map(art => (
                            <button
                              key={art.id}
                              type="button"
                              onClick={() => handleArticleSelect(art.id)}
                              className="w-full px-4 py-3 text-left hover:bg-primary/5 transition-colors flex items-center justify-between gap-3 group cursor-pointer"
                            >
                              <div className="min-w-0">
                                <div className="text-xs font-semibold text-fg group-hover:text-primary transition-colors truncate">
                                  {art.title}
                                </div>
                                <div className="text-[11px] text-muted truncate">
                                  {art.breadcrumbs.join(' › ')}
                                </div>
                              </div>
                              <svg
                                className="w-4 h-4 text-muted group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </button>
                          ))}
                        </>
                      ) : (
                        <div className="p-4 text-center text-xs text-muted">
                          Không tìm thấy bài viết phù hợp với từ khóa &ldquo;
                          {searchQuery}&rdquo;.
                        </div>
                      )}
                    </div>
                  )}
                </form>
              </div>
            </section>

            {/* Categories Section (2x3 Grid) */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 -mt-6 md:-mt-10 relative z-20">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.id)}
                    className="bg-white border border-border/80 rounded-2xl p-5 md:p-6 text-left shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_35px_rgba(198,90,58,0.06)] hover:-translate-y-1 transition-all duration-300 flex items-start gap-4 group cursor-pointer"
                  >
                    <div className="h-11 w-11 rounded-xl bg-primary/5 group-hover:bg-primary/10 flex items-center justify-center shrink-0 transition-colors duration-300">
                      {cat.icon}
                    </div>
                    <div className="flex-1 space-y-1">
                      <h3 className="font-marketing text-sm font-bold text-fg group-hover:text-primary transition-colors">
                        {cat.title}
                      </h3>
                      <p className="font-body text-xs text-muted leading-relaxed">
                        {cat.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* VIEW 2: DETAIL MODE (Sidebar Tree & Right Reader Pane) */}
        {viewMode === 'detail' && (
          <div className="animate-in fade-in duration-300">
            {/* Header Breadcrumbs & Search Area */}
            <section className="border-b border-border bg-white pb-4 pt-24 md:pt-28 shadow-sm">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                {/* Breadcrumbs with click action to return back */}
                <div className="flex items-center gap-2 text-xs text-muted font-semibold overflow-x-auto whitespace-nowrap py-1 scrollbar-none">
                  <button
                    type="button"
                    onClick={handleBackToDashboard}
                    className="hover:text-primary cursor-pointer text-left shrink-0 transition-colors"
                  >
                    Cẩm nang
                  </button>
                  <svg
                    className="h-3 w-3 text-muted/60 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  {activeArticle.breadcrumbs.map((b: string, idx: number) => (
                    <React.Fragment key={idx}>
                      <span
                        className={`shrink-0 ${
                          idx === activeArticle.breadcrumbs.length - 1
                            ? 'text-fg font-bold'
                            : 'hover:text-primary cursor-pointer transition-colors'
                        }`}
                      >
                        {b}
                      </span>
                      {idx < activeArticle.breadcrumbs.length - 1 && (
                        <svg
                          className="h-3 w-3 text-muted/60 shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Float Search Bar */}
                <form
                  onSubmit={handleSearchSubmit}
                  className="relative w-full md:w-80"
                >
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                      className="h-4 w-4 text-muted"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Mời bạn nhập câu hỏi..."
                    className="w-full rounded-full border border-border bg-[#faf6f1]/40 py-2.5 pl-9 pr-14 text-xs text-fg outline-none focus:border-primary focus:bg-white transition-all duration-300"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted hover:text-fg p-1"
                      aria-label="Xóa nội dung tìm kiếm"
                    >
                      ✕
                    </button>
                  )}
                </form>
              </div>
            </section>

            {/* Portal Layout Container */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 mt-6 md:mt-10">
              <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 md:gap-8">
                {/* LEFT SIDEBAR: Article Tree Directory */}
                <aside className="w-full bg-white border border-border rounded-2xl p-4 sm:p-5 self-start space-y-4 shadow-sm">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Lọc theo tên..."
                      className="w-full rounded-xl border border-border bg-[#faf6f1]/20 py-2.5 px-3 pl-8 text-xs text-fg outline-none focus:border-primary focus:bg-white transition-all duration-200"
                    />
                    <svg
                      className="absolute top-3 left-2.5 h-3.5 w-3.5 text-muted"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2.5 top-2.5 text-xs text-muted hover:text-fg p-0.5"
                        aria-label="Xóa bộ lọc"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Empty state when no categories match */}
                  {filteredCategories.length === 0 ? (
                    <div className="py-6 px-3 text-center space-y-3 bg-[#faf6f1]/40 rounded-xl border border-dashed border-border/80">
                      <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm text-muted">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-fg">
                          Không tìm thấy bài viết
                        </p>
                        <p className="text-[11px] text-muted leading-relaxed">
                          Không có kết quả nào khớp với &quot;{searchQuery}
                          &quot;
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg bg-white border border-border text-[11px] font-bold text-primary hover:bg-surface-muted transition-colors shadow-sm cursor-pointer"
                      >
                        Xóa bộ lọc
                      </button>
                    </div>
                  ) : (
                    /* Tree Menu List */
                    <nav className="space-y-1" aria-label="Danh mục hướng dẫn">
                      {filteredCategories.map(cat => {
                        const isExpanded = !!expandedCats[cat.id]
                        return (
                          <div key={cat.id} className="space-y-1">
                            {/* Category Header */}
                            <button
                              type="button"
                              onClick={() => toggleCat(cat.id)}
                              aria-expanded={isExpanded}
                              aria-controls={`cat-panel-${cat.id}`}
                              className="w-full flex items-center justify-between py-2 text-xs font-bold text-fg hover:text-primary transition-colors cursor-pointer text-left rounded-md px-1"
                            >
                              <span>{cat.title}</span>
                              <svg
                                className={`h-3 w-3 text-muted transition-transform duration-200 ${
                                  isExpanded ? 'rotate-90' : ''
                                }`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="3"
                                aria-hidden="true"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </button>

                            {/* Category Sub-Articles */}
                            {isExpanded && (
                              <div
                                id={`cat-panel-${cat.id}`}
                                className="pl-2 border-l border-border/80 space-y-1 ml-1.5 py-1"
                              >
                                {cat.articles.map(art => {
                                  const isArtActive = activeArticleId === art.id
                                  return (
                                    <button
                                      type="button"
                                      key={art.id}
                                      onClick={() =>
                                        handleArticleSelect(art.id)
                                      }
                                      className={`w-full text-left px-2.5 py-2 text-xs transition-colors cursor-pointer rounded-lg min-h-[36px] flex items-center ${
                                        isArtActive
                                          ? 'text-primary font-bold bg-primary/10 shadow-sm'
                                          : 'text-muted hover:text-fg hover:bg-surface-muted'
                                      }`}
                                    >
                                      {art.title}
                                    </button>
                                  )
                                })}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </nav>
                  )}

                  <button
                    type="button"
                    onClick={handleBackToDashboard}
                    className="w-full mt-4 bg-primary/5 hover:bg-primary/10 text-primary py-2.5 px-4 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer min-h-[40px]"
                  >
                    <svg
                      className="h-3.5 w-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    Quay về danh mục
                  </button>
                </aside>

                {/* RIGHT MAIN CONTENT: Rich Document Reader */}
                <article className="bg-white border border-border rounded-2xl p-5 md:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-6">
                  {/* Document Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-border/60 gap-4">
                    <div className="space-y-1">
                      <h1 className="font-marketing text-xl md:text-2xl font-extrabold text-fg tracking-tight">
                        {activeArticle.title}
                      </h1>
                      <p className="text-[11px] text-muted">
                        Cập nhật lần cuối:{' '}
                        {activeArticle.updatedAt || '24/10/2026'}
                      </p>
                    </div>

                    {/* Actions row */}
                    <div className="flex items-center gap-3 self-start md:self-center flex-wrap">
                      <button
                        type="button"
                        onClick={handleToggleAiGuide}
                        aria-pressed={showAiGuide}
                        className={`py-2 px-4 rounded-xl text-[11px] font-bold flex items-center gap-1.5 cursor-pointer border transition-all duration-300 min-h-[38px] ${
                          showAiGuide
                            ? 'bg-primary/10 border-primary/25 text-primary hover:bg-primary/15 shadow-sm'
                            : 'bg-surface border-border hover:bg-surface-muted text-muted'
                        }`}
                      >
                        <svg
                          className="h-3.5 w-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        Hướng dẫn: {showAiGuide ? 'Bật' : 'Tắt'}
                      </button>
                    </div>
                  </div>

                  {/* Rich Content View */}
                  <div className="py-2">
                    <AiGuideBot
                      articleId={activeArticle.id}
                      isVisible={showAiGuide}
                    />
                    {activeArticle.content}
                  </div>
                </article>
              </div>
            </section>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
