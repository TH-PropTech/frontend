'use client'

import * as React from 'react'
import { HomeHeader } from '@/widgets/home-dashboard/ui/home-header'
import { Footer } from '@/shared/ui/footer'
import { useCan } from '@/shared/lib/permissions'
import { useWebCommunity } from '../lib/use-web-community'
import { AuthRequiredModal } from './components/auth-required-modal'
import { CommunityFeed } from './components/community-feed'
import { CommunityHero } from './components/community-hero'
import { CommunitySidebar } from './components/community-sidebar'
import { CommunityToolbar } from './components/community-toolbar'
import { CreatePostModal } from './components/create-post-modal'
import { TopographyBackdrop } from './components/topography-backdrop'

const PAGE_BACKDROP_PATHS = [
  'M-100 100 C 300 20, 600 180, 1000 80 C 1200 40, 1500 120, 1600 100',
  'M-100 160 C 300 80, 600 240, 1000 140 C 1200 100, 1500 180, 1600 160',
  'M-50 450 C 400 320, 700 480, 1100 380 C 1300 340, 1500 420, 1600 400',
  'M-50 510 C 400 380, 700 540, 1100 440 C 1300 400, 1500 480, 1600 460',
] as const

export function CommunityDashboard(): React.ReactElement {
  const can = useCan()
  const community = useWebCommunity()
  const { filters, isAuthenticated, isModerator, posts } = community
  const [showCreateModal, setShowCreateModal] = React.useState(false)
  const [showAuthModal, setShowAuthModal] = React.useState(false)

  const openAuthModal = React.useCallback(() => setShowAuthModal(true), [])
  const showCreateButton = !isAuthenticated || can('create', 'CommunityPost')
  const hasActiveFilters = Boolean(filters.project || filters.search)

  const handleDeletePost = (postId: string): void => {
    const post = posts.find(item => item.id === postId)
    community.deletePost({
      id: postId,
      asModerator: isModerator && !post?.isOwn,
    })
  }

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-bg text-fg selection:bg-primary/20 selection:text-primary">
      <TopographyBackdrop
        paths={PAGE_BACKDROP_PATHS}
        viewBox="0 0 1440 900"
        className="fixed inset-0 z-[1] opacity-[0.06]"
      />

      <HomeHeader />

      <main className="relative z-[2] w-full pb-10">
        <CommunityHero
          contributorCount={community.stats?.contributorCount}
          projectCount={community.stats?.projectCount}
        />

        <section className="relative z-30 mx-auto mt-8 max-w-7xl px-4 sm:mt-12 sm:px-6 md:px-10">
          <CommunityToolbar
            filters={filters}
            onTopicChange={community.setTopic}
            onSearchChange={community.setSearchInput}
            onProjectClear={() => community.setProject(null)}
            onReset={community.resetFilters}
            showCreateButton={showCreateButton}
            onCreateClick={() =>
              isAuthenticated ? setShowCreateModal(true) : openAuthModal()
            }
          />
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:px-10">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
            <CommunityFeed
              tab={community.feedTab}
              onTabChange={community.setFeedTab}
              isAuthenticated={isAuthenticated}
              isModerator={isModerator}
              pendingCount={community.pendingCount}
              posts={posts}
              status={community.feedStatus}
              hasActiveFilters={hasActiveFilters}
              onResetFilters={community.resetFilters}
              currentUser={community.currentUser}
              onAuthRequired={openAuthModal}
              onUpvote={community.upvotePost}
              onDeletePost={handleDeletePost}
              isDeletingPost={community.isDeletingPost}
              onCommentAdded={id => community.adjustCommentCount(id, 1)}
              onCommentRemoved={(id, removed) =>
                community.adjustCommentCount(id, -removed)
              }
              onSelectProject={community.setProject}
              onApprove={id =>
                community.moderatePost({ id, status: 'approved' })
              }
              onReject={id =>
                community.moderatePost({ id, status: 'rejected' })
              }
              isModerating={community.isModerating}
            />

            <CommunitySidebar
              isAuthenticated={isAuthenticated}
              myCounts={community.myCounts}
              projects={community.stats?.projects ?? null}
              selectedProject={filters.project}
              onSelectProject={community.setProject}
            />
          </div>
        </section>
      </main>

      <CreatePostModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={community.createPost}
      />

      <AuthRequiredModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />

      <Footer />
    </div>
  )
}
