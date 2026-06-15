'use client'

import * as React from 'react'
import { HomeHeader } from '@/widgets/home-dashboard/ui/home-header'
import { Footer } from '@/shared/ui/footer'
import { useWebCommunity } from '../lib/use-web-community'
import { CommunityHero } from './components/community-hero'
import { PostCard } from './components/post-card'
import { CreatePostModal } from './components/create-post-modal'
import { StaffModerationPanel } from './components/staff-moderation-panel'
import { CommunitySidebar } from './components/community-sidebar'

const TOPIC_TABS = [
  { id: 'all' as const, label: 'Tất cả' },
  { id: 'qa' as const, label: 'Hỏi đáp' },
  { id: 'review' as const, label: 'Đánh giá' },
  { id: 'roommate' as const, label: 'Tìm bạn ở ghép' },
]

export function CommunityDashboard(): React.ReactElement {
  const state = useWebCommunity()
  const [activeTab, setActiveTab] = React.useState<
    'public' | 'my-posts' | 'moderation'
  >('public')

  React.useEffect(() => {
    if (state.showMyPosts && activeTab !== 'my-posts') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveTab('my-posts')
    } else if (!state.showMyPosts && activeTab === 'my-posts') {
      setActiveTab('public')
    }
  }, [state.showMyPosts, activeTab])

  React.useEffect(() => {
    if (!state.isStaffDemo && activeTab === 'moderation') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveTab('public')
    }
  }, [state.isStaffDemo, activeTab])

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
        <section className="mx-auto max-w-7xl px-6 md:px-10 mt-12 relative z-30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white border border-border/80 rounded-2xl p-4 shadow-sm">
            {/* Left side: Topics pills */}
            <div className="flex rounded-full bg-surface-muted p-1 border border-border/80 w-full md:w-auto max-w-md">
              {TOPIC_TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => state.setTopicFilter(tab.id)}
                  className={`flex-1 rounded-full py-2 px-4 text-xs font-bold transition-all duration-300 ${
                    state.topicFilter === tab.id
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-muted hover:text-fg'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Right side: Action Buttons */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                onClick={() => state.setShowMyPosts(!state.showMyPosts)}
                className={`flex-1 md:flex-initial rounded-xl py-3 px-5 text-xs font-bold transition-all border flex items-center justify-center gap-2 cursor-pointer ${
                  state.showMyPosts
                    ? 'bg-primary text-white border-primary shadow-sm'
                    : 'bg-white border-border text-muted hover:border-primary/30 hover:text-fg'
                }`}
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
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                {state.showMyPosts ? 'Hiển thị tất cả' : 'Bài viết của tôi'}
              </button>

              <button
                onClick={() => state.setShowCreateModal(true)}
                className="flex-1 md:flex-initial rounded-xl bg-primary py-3 px-5 text-xs font-bold text-white shadow-[0_8px_24px_rgba(198,90,58,0.15)] hover:bg-primary-hover hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Đăng bài mới
              </button>
            </div>
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
                {state.isStaffDemo && (
                  <button
                    onClick={() => {
                      setActiveTab('moderation')
                    }}
                    className={`pb-3 text-sm font-bold transition-all relative flex items-center gap-1.5 cursor-pointer ${
                      activeTab === 'moderation'
                        ? 'text-danger'
                        : 'text-muted hover:text-fg'
                    }`}
                  >
                    Quản lý duyệt bài
                    {state.pendingPosts.length > 0 && (
                      <span className="rounded-full bg-danger/10 px-2 py-0.5 text-[10px] font-bold text-danger">
                        {state.pendingPosts.length}
                      </span>
                    )}
                    {activeTab === 'moderation' && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-danger rounded-full" />
                    )}
                  </button>
                )}
              </div>

              {/* Staff moderation Banner Alert (only when demo toggle is on but not on the moderation tab) */}
              {state.isStaffDemo &&
                state.pendingPosts.length > 0 &&
                activeTab !== 'moderation' && (
                  <div className="rounded-2xl border border-dashed border-danger/30 bg-danger/[0.02] p-4 flex items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-danger/10">
                        <svg
                          className="h-4 w-4 text-danger"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                          />
                        </svg>
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold text-danger">
                          Có bài viết chờ phê duyệt
                        </p>
                        <p className="text-[11px] text-muted">
                          Có {state.pendingPosts.length} bài viết đang chờ nhân
                          viên kiểm duyệt trong hệ thống.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveTab('moderation')}
                      className="shrink-0 rounded-xl bg-danger px-4 py-2 text-xs font-bold text-white hover:bg-danger/90 active:scale-95 transition-all cursor-pointer shadow-sm"
                    >
                      Duyệt ngay
                    </button>
                  </div>
                )}

              {/* Feed Content rendering */}
              {activeTab === 'moderation' ? (
                state.pendingPosts.length === 0 ? (
                  <div className="text-center py-20 rounded-3xl border border-dashed border-border bg-surface-muted/40">
                    <div className="mx-auto h-12 w-12 rounded-full bg-success/10 flex items-center justify-center mb-3">
                      <svg
                        className="h-6 w-6 text-success"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 12.75 6 6 9-13.5"
                        />
                      </svg>
                    </div>
                    <h3 className="font-marketing text-sm font-bold text-fg">
                      Đã hoàn thành kiểm duyệt
                    </h3>
                    <p className="font-body text-xs text-muted mt-1">
                      Không còn bài viết nào đang chờ phê duyệt. Hệ thống đang
                      hoạt động ổn định.
                    </p>
                  </div>
                ) : (
                  <StaffModerationPanel
                    posts={state.pendingPosts}
                    onApprove={state.handleApprove}
                    onReject={state.handleReject}
                  />
                )
              ) : state.approvedPosts.length === 0 ? (
                <div className="text-center py-20 rounded-3xl border border-dashed border-border bg-surface-muted/40">
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
                  <p className="font-body text-sm text-muted">
                    Chưa có bài viết nào trong danh mục này.
                  </p>
                </div>
              ) : (
                <div className="space-y-5">
                  {state.approvedPosts.map(post => (
                    <PostCard
                      key={post.id}
                      post={post}
                      onUpvote={state.handleUpvote}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT: Sidebar */}
            <div>
              <CommunitySidebar
                isStaffDemo={state.isStaffDemo}
                setIsStaffDemo={state.setIsStaffDemo}
                pendingCount={state.pendingPosts.length}
                showMyPosts={state.showMyPosts}
                setShowMyPosts={state.setShowMyPosts}
                myTotalCount={state.myTotalCount}
                myPendingCount={state.myPendingCount}
                myApprovedCount={state.myApprovedCount}
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

      <Footer />
    </div>
  )
}
