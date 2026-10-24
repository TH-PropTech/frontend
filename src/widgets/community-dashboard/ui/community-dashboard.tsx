'use client'

import * as React from 'react'
import { HomeHeader } from '@/widgets/home-dashboard/ui/home-header'
import { Footer } from '@/shared/ui/footer'
import { useWebCommunity } from '../lib/use-web-community'
import { CommunityHero } from './components/community-hero'
import { PostCard } from './components/post-card'
import { CreatePostModal } from './components/create-post-modal'
import { CommunitySidebar } from './components/community-sidebar'
import { AuthRequiredModal } from './components/auth-required-modal'
import { useCan } from '@/shared/lib/permissions'

const TOPIC_TABS = [
  { id: 'all' as const, label: 'Tất cả' },
  { id: 'qa' as const, label: 'Hỏi đáp' },
  { id: 'review' as const, label: 'Đánh giá' },
  { id: 'roommate' as const, label: 'Tìm bạn ở ghép' },
]

export function CommunityDashboard(): React.ReactElement {
  const can = useCan()
  const canPost = can('create', 'CommunityPost')
  const state = useWebCommunity()
  const isAuthenticated = !!state.currentUser
  const [activeTab, setActiveTab] = React.useState<'public' | 'my-posts'>(
    'public'
  )
  const [showAuthModal, setShowAuthModal] = React.useState(false)

  React.useEffect(() => {
    if (state.showMyPosts && activeTab !== 'my-posts') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveTab('my-posts')
    } else if (!state.showMyPosts && activeTab === 'my-posts') {
      setActiveTab('public')
    }
  }, [state.showMyPosts, activeTab])

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-bg text-fg selection:bg-primary/20 selection:text-primary">
      {/* Topography vector lines background */}
      <div
        className="fixed inset-0 opacity-[0.06] pointer-events-none select-none overflow-hidden z-[1]"
        style={{
          willChange: 'transform',
          transform: 'translate3d(0,0,0)',
          backfaceVisibility: 'hidden',
        }}
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M-100 100 C 300 20, 600 180, 1000 80 C 1200 40, 1500 120, 1600 100"
            stroke="currentColor"
            className="text-primary"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M-100 160 C 300 80, 600 240, 1000 140 C 1200 100, 1500 180, 1600 160"
            stroke="currentColor"
            className="text-primary"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M-50 450 C 400 320, 700 480, 1100 380 C 1300 340, 1500 420, 1600 400"
            stroke="currentColor"
            className="text-primary"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M-50 510 C 400 380, 700 540, 1100 440 C 1300 400, 1500 480, 1600 460"
            stroke="currentColor"
            className="text-primary"
            strokeWidth="1.2"
            fill="none"
          />
        </svg>
      </div>

      <HomeHeader />

      <main className="w-full relative z-[2] pb-10">
        <CommunityHero />

        {/* Action Header & Tabs */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 mt-8 sm:mt-12 relative z-30">
          <div className="bg-white border border-border/80 rounded-2xl p-4 shadow-sm space-y-4">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              {/* Left side: Topics pills with horizontal scroll on mobile */}
              <div
                role="tablist"
                aria-label="Chủ đề thảo luận"
                className="flex items-center overflow-x-auto no-scrollbar scroll-smooth rounded-full bg-surface-muted p-1 border border-border/80 w-full lg:w-auto"
              >
                {TOPIC_TABS.map(tab => (
                  <button
                    key={tab.id}
                    role="tab"
                    aria-selected={state.topicFilter === tab.id}
                    onClick={() => state.setTopicFilter(tab.id)}
                    className={`rounded-full py-2 px-4 text-xs font-bold transition-all duration-300 whitespace-nowrap cursor-pointer shrink-0 ${
                      state.topicFilter === tab.id
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-muted hover:text-fg'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Middle: Search input bar */}
              <div className="relative flex-1 min-w-[200px] max-w-md w-full">
                <svg
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted/70 pointer-events-none"
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
                <input
                  type="text"
                  value={state.searchQuery}
                  onChange={e => state.setSearchQuery(e.target.value)}
                  placeholder="Tìm bài viết, dự án, nội dung..."
                  className="w-full pl-10 pr-9 py-2 bg-surface-muted/60 border border-border/80 rounded-full text-xs text-fg placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
                {state.searchQuery && (
                  <button
                    type="button"
                    onClick={() => state.setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-fg text-xs p-1"
                    title="Xóa tìm kiếm"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Right side: Action Buttons */}
              <div className="flex items-center gap-3 shrink-0">
                {isAuthenticated ? (
                  <>
                    <button
                      onClick={() => state.setShowMyPosts(!state.showMyPosts)}
                      className={`flex-1 lg:flex-initial rounded-xl py-2.5 px-4 text-xs font-bold transition-all border flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap ${
                        state.showMyPosts
                          ? 'bg-primary text-white border-primary shadow-sm'
                          : 'bg-white border-border text-muted hover:border-primary/30 hover:text-fg'
                      }`}
                    >
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
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                      <span>
                        {state.showMyPosts
                          ? 'Hiển thị tất cả'
                          : 'Bài viết của tôi'}
                      </span>
                    </button>

                    {canPost ? (
                      <button
                        onClick={() => state.setShowCreateModal(true)}
                        className="flex-1 lg:flex-initial rounded-xl bg-primary py-2.5 px-5 text-xs font-bold text-white shadow-[0_8px_24px_rgba(198,90,58,0.15)] hover:bg-primary-hover hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
                      >
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
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                        <span>Đăng bài mới</span>
                      </button>
                    ) : null}
                  </>
                ) : (
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="w-full lg:w-auto rounded-xl bg-primary py-2.5 px-5 text-xs font-bold text-white shadow-[0_8px_24px_rgba(198,90,58,0.15)] hover:bg-primary-hover hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
                  >
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
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    <span>Đăng bài mới</span>
                  </button>
                )}
              </div>
            </div>

            {/* Active Filter Chips */}
            {(state.selectedProject || state.searchQuery) && (
              <div className="flex items-center gap-2 flex-wrap text-xs text-muted pt-2 border-t border-border/40">
                <span className="font-medium">Đang lọc:</span>
                {state.selectedProject && (
                  <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 px-2.5 py-1 rounded-full font-bold text-[11px]">
                    Dự án: {state.selectedProject}
                    <button
                      type="button"
                      onClick={() => state.setSelectedProject(null)}
                      className="hover:opacity-75 cursor-pointer ml-1"
                      title="Bỏ lọc dự án"
                    >
                      ✕
                    </button>
                  </span>
                )}
                {state.searchQuery && (
                  <span className="inline-flex items-center gap-1.5 bg-surface-muted text-fg border border-border px-2.5 py-1 rounded-full text-[11px]">
                    Từ khóa: &quot;{state.searchQuery}&quot;
                    <button
                      type="button"
                      onClick={() => state.setSearchQuery('')}
                      className="hover:opacity-75 cursor-pointer ml-1"
                      title="Xóa từ khóa"
                    >
                      ✕
                    </button>
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => {
                    state.setSelectedProject(null)
                    state.setSearchQuery('')
                  }}
                  className="text-[11px] text-primary hover:underline font-bold cursor-pointer ml-auto"
                >
                  Đặt lại bộ lọc
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Main Grid Content: 1fr and 320px sidebar */}
        <section className="mx-auto max-w-7xl px-6 py-8 md:px-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
            {/* LEFT: Feed */}
            <div className="space-y-6">
              {/* Tab Menu Header */}
              <div className="flex border-b border-border/60 gap-6 mb-6">
                <button
                  onClick={() => {
                    setActiveTab('public')
                    state.setShowMyPosts(false)
                  }}
                  className={`pb-3 text-sm font-bold transition-all relative cursor-pointer ${
                    activeTab === 'public'
                      ? 'text-primary'
                      : 'text-muted hover:text-fg'
                  }`}
                >
                  Bài viết cộng đồng
                  {activeTab === 'public' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                </button>
                {isAuthenticated && (
                  <button
                    onClick={() => {
                      setActiveTab('my-posts')
                      state.setShowMyPosts(true)
                    }}
                    className={`pb-3 text-sm font-bold transition-all relative cursor-pointer ${
                      activeTab === 'my-posts'
                        ? 'text-primary'
                        : 'text-muted hover:text-fg'
                    }`}
                  >
                    Bài viết của tôi
                    {activeTab === 'my-posts' && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                    )}
                  </button>
                )}
              </div>

              {/* Feed Content rendering */}
              {state.approvedPosts.length === 0 ? (
                <div className="text-center py-16 sm:py-20 rounded-3xl border border-dashed border-border bg-surface-muted/40 p-6">
                  <svg
                    className="mx-auto h-10 w-10 text-muted/60 mb-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <p className="font-body text-sm font-semibold text-fg">
                    Không tìm thấy bài viết nào
                  </p>
                  <p className="font-body text-xs text-muted mt-1 max-w-sm mx-auto">
                    {state.searchQuery || state.selectedProject
                      ? 'Thử xóa bộ lọc hoặc tìm kiếm với từ khóa khác.'
                      : 'Hãy là người đầu tiên chia sẻ câu hỏi hoặc trải nghiệm cùng cộng đồng.'}
                  </p>
                  {(state.searchQuery || state.selectedProject) && (
                    <button
                      type="button"
                      onClick={() => {
                        state.setSearchQuery('')
                        state.setSelectedProject(null)
                      }}
                      className="mt-4 px-4 py-2 bg-white border border-border text-xs font-bold rounded-xl text-primary hover:border-primary transition-all cursor-pointer shadow-sm"
                    >
                      Xóa tất cả bộ lọc
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-5">
                  {state.approvedPosts.map(post => (
                    <PostCard
                      key={post.id}
                      post={post}
                      onUpvote={state.handleUpvote}
                      onCommentAdded={state.handleCommentAdded}
                      onDeletePost={state.handleDeletePost}
                      onCommentRemoved={state.handleCommentRemoved}
                      onSelectProject={state.setSelectedProject}
                      currentUser={state.currentUser}
                      isAuthenticated={isAuthenticated}
                      onAuthRequired={() => setShowAuthModal(true)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT: Sidebar */}
            <div>
              <CommunitySidebar
                showMyPosts={state.showMyPosts}
                setShowMyPosts={state.setShowMyPosts}
                myTotalCount={state.myTotalCount}
                myPendingCount={state.myPendingCount}
                myApprovedCount={state.myApprovedCount}
                projectStats={state.projectStats}
                selectedProject={state.selectedProject}
                onSelectProject={proj => {
                  if (state.selectedProject === proj) {
                    state.setSelectedProject(null)
                  } else {
                    state.setSelectedProject(proj)
                  }
                }}
              />
            </div>
          </div>
        </section>
      </main>

      {/* Modal Dialog for Post Creation */}
      <CreatePostModal
        isOpen={state.showCreateModal}
        onClose={() => state.setShowCreateModal(false)}
        title={state.title}
        setTitle={state.setTitle}
        content={state.content}
        setContent={state.setContent}
        topic={state.topic}
        setTopic={state.setTopic}
        projectName={state.projectName}
        setProjectName={state.setProjectName}
        images={state.images}
        errorMsg={state.errorMsg}
        successMsg={state.successMsg}
        onAddImage={state.handleAddImage}
        onRemoveImage={state.handleRemoveImage}
        onSubmit={state.handleSubmit}
      />

      {/* Auth Required Modal for unauthenticated users */}
      <AuthRequiredModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />

      <Footer />
    </div>
  )
}
