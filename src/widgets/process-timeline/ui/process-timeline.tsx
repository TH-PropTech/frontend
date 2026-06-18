'use client'

import * as React from 'react'
import { HomeHeader } from '@/widgets/home-dashboard/ui/home-header'
import { Footer } from '@/shared/ui/footer'
import { categories } from '../model/articles-data'
import { AiGuideBot } from './components/ai-guide-bot'

export function ProcessTimeline(): React.ReactElement {
  const [viewMode, setViewMode] = React.useState<'dashboard' | 'detail'>(
    'dashboard'
  )
  const [searchQuery, setSearchQuery] = React.useState('')
  const [activeArticleId, setActiveArticleId] = React.useState('post-desktop')
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

  const toggleCat = (catId: string): void => {
    setExpandedCats(prev => ({ ...prev, [catId]: !prev[catId] }))
  }

  const handleCategoryClick = (catId: string): void => {
    const cat = categories.find(c => c.id === catId)
    if (cat && cat.articles[0]) {
      setActiveArticleId(cat.articles[0].id)
    }
    setExpandedCats(prev => ({ ...prev, [catId]: true }))
    setViewMode('detail')
  }

  const handleSearchSubmit = (e?: React.FormEvent): void => {
    if (e) e.preventDefault()
    if (searchQuery.trim()) {
      setViewMode('detail')
    }
  }

  const handleBackToDashboard = (): void => {
    setViewMode('dashboard')
    setSearchQuery('')
  }

  const handleToggleAiGuide = (): void => {
    setShowAiGuide(prev => !prev)
  }

  // Get active article safely
  const allArticles = categories.flatMap(c => c.articles)
  const activeArticle = allArticles.find(a => a.id === activeArticleId) ||
    allArticles[0] || {
      id: 'fallback',
      title: 'Cẩm nang',
      breadcrumbs: ['Cẩm nang'],
      content: <p>Nội dung đang được cập nhật.</p>,
    }

  // Filter categories and articles based on search query or selected category
  const filteredCategories = categories
    .map(cat => {
      const matchingArticles = cat.articles.filter(art =>
        art.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      return { ...cat, articles: matchingArticles }
    })
    .filter(cat => cat.articles.length > 0)

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-bg text-fg selection:bg-primary/20 selection:text-primary">
      <HomeHeader />

      <main className="w-full text-left pb-20">
        {/* VIEW 1: DASHBOARD MODE (Search Hero & 6 big category cards) */}
        {viewMode === 'dashboard' && (
          <div className="space-y-16 animate-in fade-in duration-300">
            {/* Support Center Header */}
            <section className="relative flex flex-col items-center justify-center bg-gradient-to-b from-[#f5ece2] via-[#faf6f1] to-background pb-24 pt-36 text-center rounded-b-[40px] border-b border-border overflow-hidden">
              <div className="absolute inset-0 opacity-[0.08] pointer-events-none select-none overflow-hidden">
                <svg
                  className="w-full h-full min-w-[1440px] min-h-[300px]"
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

              <div className="mx-auto w-full max-w-4xl px-6 md:px-10 z-10 relative space-y-6">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary mb-1 block">
                  TRUNG TÂM HỖ TRỢ KHÁCH HÀNG TH PROPTECH
                </span>
                <h1 className="font-marketing text-3xl font-extrabold leading-tight sm:text-4xl text-fg">
                  Xin chào! TH PropTech có thể giúp gì cho bạn?
                </h1>

                {/* Interactive Search Bar */}
                <form
                  onSubmit={handleSearchSubmit}
                  className="relative mx-auto max-w-xl mt-6"
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
                    className="w-full rounded-full border border-border/80 bg-white py-4 pl-12 pr-16 text-sm text-fg shadow-sm outline-none placeholder:text-muted/65 transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/15"
                  />
                  <button
                    type="submit"
                    className="absolute inset-y-0 right-3 flex items-center"
                  >
                    <span className="rounded-md bg-surface-muted px-2 py-1 text-[10px] font-bold text-muted border border-border/80 shadow-sm select-none cursor-pointer hover:bg-border transition-colors">
                      Tìm kiếm
                    </span>
                  </button>
                </form>
              </div>
            </section>

            {/* Categories Section (2x3 Grid) */}
            <section className="mx-auto max-w-7xl px-6 -mt-10 md:px-10 relative z-20">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.id)}
                    className="bg-white border border-border/80 rounded-2xl p-6 text-left shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_35px_rgba(198,90,58,0.06)] hover:-translate-y-1 transition-all duration-300 flex items-start gap-4 group cursor-pointer"
                  >
                    <div className="h-11 w-11 rounded-xl bg-primary/5 group-hover:bg-primary/10 flex items-center justify-center transition-colors duration-300">
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
            <section className="border-b border-border bg-white pb-4 pt-28 shadow-sm">
              <div className="mx-auto max-w-7xl px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Breadcrumbs with click action to return back */}
                <div className="flex items-center gap-1.5 text-[11px] text-muted font-semibold">
                  <button
                    onClick={handleBackToDashboard}
                    className="hover:text-primary cursor-pointer text-left"
                  >
                    Cẩm nang
                  </button>
                  <svg
                    className="h-2.5 w-2.5 text-muted/60"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  {activeArticle.breadcrumbs.map((b, idx) => (
                    <React.Fragment key={idx}>
                      <span
                        className={
                          idx === activeArticle.breadcrumbs.length - 1
                            ? 'text-fg'
                            : 'hover:text-primary cursor-pointer'
                        }
                      >
                        {b}
                      </span>
                      {idx < activeArticle.breadcrumbs.length - 1 && (
                        <svg
                          className="h-2.5 w-2.5 text-muted/60"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="3"
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
                    className="w-full rounded-full border border-border bg-[#faf6f1]/40 py-2.5 pl-9 pr-14 text-[11px] text-fg outline-none focus:border-primary focus:bg-white transition-all duration-300"
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center">
                    <span className="rounded bg-surface-muted px-1.5 py-0.5 text-[8px] font-bold text-muted border border-border/80">
                      Ctrl+K
                    </span>
                  </div>
                </form>
              </div>
            </section>

            {/* Portal Layout Container */}
            <section className="mx-auto max-w-7xl px-6 md:px-10 mt-10">
              <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
                {/* LEFT SIDEBAR: Article Tree Directory */}
                <aside className="w-full bg-white border border-border rounded-2xl p-5 self-start space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Filter by name"
                      className="w-full rounded-xl border border-border bg-[#faf6f1]/20 py-2 px-3 pl-8 text-xs text-fg outline-none focus:border-primary focus:bg-white transition-all duration-200"
                    />
                    <svg
                      className="absolute top-3 left-2.5 h-3.5 w-3.5 text-muted"
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
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2.5 top-3 text-[10px] text-muted hover:text-fg"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Tree Menu List */}
                  <nav className="space-y-1">
                    {filteredCategories.map(cat => {
                      const isExpanded = !!expandedCats[cat.id]
                      return (
                        <div key={cat.id} className="space-y-1">
                          {/* Category Header */}
                          <button
                            onClick={() => toggleCat(cat.id)}
                            className="w-full flex items-center justify-between py-2 text-xs font-bold text-fg hover:text-primary transition-colors cursor-pointer text-left"
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
                            <div className="pl-3 border-l border-border/80 space-y-1.5 ml-1.5 py-1">
                              {cat.articles.map(art => {
                                const isArtActive = activeArticleId === art.id
                                return (
                                  <button
                                    key={art.id}
                                    onClick={() => setActiveArticleId(art.id)}
                                    className={`w-full text-left py-1 text-xs transition-colors cursor-pointer block ${
                                      isArtActive
                                        ? 'text-primary font-bold'
                                        : 'text-muted hover:text-fg'
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

                  <button
                    onClick={handleBackToDashboard}
                    className="w-full mt-4 bg-primary/5 hover:bg-primary/10 text-primary py-2 px-4 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <svg
                      className="h-3.5 w-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
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
                <article className="bg-white border border-border rounded-2xl p-6 md:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-6">
                  {/* Document Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-border/60 gap-4">
                    <div className="space-y-1">
                      <h1 className="font-marketing text-xl md:text-2xl font-extrabold text-fg tracking-tight">
                        {activeArticle.title}
                      </h1>
                      <p className="text-[10px] text-muted">
                        Cập nhật lần cuối: 15/06/2026
                      </p>
                    </div>

                    {/* Actions row */}
                    <div className="flex items-center gap-3 self-start md:self-center">
                      <button
                        onClick={handleToggleAiGuide}
                        className={`py-2 px-4 rounded-xl text-[11px] font-bold flex items-center gap-1.5 cursor-pointer border transition-all duration-300 ${
                          showAiGuide
                            ? 'bg-primary/10 border-primary/25 text-primary hover:bg-primary/15 shadow-sm'
                            : 'bg-surface border-border hover:bg-surface-muted text-muted'
                        }`}
                      >
                        <svg
                          className={`h-3.5 w-3.5 ${showAiGuide ? 'animate-pulse' : ''}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        Trợ lý AI: {showAiGuide ? 'Bật' : 'Tắt'}
                      </button>
                      <button className="bg-surface border border-border hover:bg-surface-muted py-2 px-4 rounded-xl text-[11px] font-bold text-fg flex items-center gap-1.5 cursor-pointer">
                        <svg
                          className="h-3.5 w-3.5 text-muted"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Theo dõi
                      </button>
                      <button className="h-9 w-9 bg-surface border border-border hover:bg-surface-muted flex items-center justify-center rounded-xl cursor-pointer">
                        <svg
                          className="h-4 w-4 text-muted"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.684 10.742l4.636-2.318m0 7.152l-4.636-2.318M21 12a3 3 0 11-6 0 3 3 0 016 0zm-6-9a3 3 0 11-6 0 3 3 0 016 0zm0 18a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
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
