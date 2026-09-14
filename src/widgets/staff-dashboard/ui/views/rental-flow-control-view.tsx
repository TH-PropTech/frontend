'use client'

import * as React from 'react'
import {
  Sliders,
  Layers,
  CheckCircle2,
  Eye,
  Send,
  RotateCcw,
  Save,
  AlertCircle,
  ShieldCheck,
  RefreshCw,
  Plus,
} from 'lucide-react'
import {
  getRentalFlowProfiles,
  saveRentalFlowProfileDraft,
  publishRentalFlowProfile,
  restoreRentalFlowProfileVersion,
  type RentalFlowProfile,
  type FlowProfileSteps,
} from '@/features/rental-flow-config/api/rental-flow-api'
import { StepEditors } from '@/features/rental-flow-config/ui/flow-step-editors'
import { FlowPreviewDrawer } from '@/features/rental-flow-config/ui/flow-preview-drawer'
import { AssignmentManager } from '@/features/rental-flow-config/ui/assignment-manager'

export function RentalFlowControlView(): React.ReactElement {
  const [activeMainTab, setActiveMainTab] = React.useState<
    'profiles' | 'assignments'
  >('profiles')
  const [profiles, setProfiles] = React.useState<RentalFlowProfile[]>([])
  const [selectedProfileId, setSelectedProfileId] = React.useState<
    string | null
  >(null)
  const [loading, setLoading] = React.useState(false)
  const [saving, setSaving] = React.useState(false)
  const [publishing, setPublishing] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false)

  // Working copy of profile being edited
  const [workingName, setWorkingName] = React.useState('')
  const [workingDescription, setWorkingDescription] = React.useState('')
  const [workingSteps, setWorkingSteps] =
    React.useState<FlowProfileSteps | null>(null)
  const [workingRevision, setWorkingRevision] = React.useState<number>(1)

  const selectedProfile =
    profiles.find(p => p.profileId === selectedProfileId) || null

  const applyProfileToWorkingState = React.useCallback(
    (prof: RentalFlowProfile | null): void => {
      if (!prof) return
      setSelectedProfileId(prof.profileId)
      setWorkingName(prof.name)
      setWorkingDescription(prof.description || '')
      setWorkingSteps(prof.steps)
      setWorkingRevision(prof.draftRevision || 1)
    },
    []
  )

  const fetchProfiles = React.useCallback(
    async (targetId?: string) => {
      setLoading(true)
      setError(null)
      try {
        const data = await getRentalFlowProfiles()
        setProfiles(data)
        if (data.length > 0) {
          const idToSelect = targetId || selectedProfileId || data[0]?.profileId
          const matched = data.find(p => p.profileId === idToSelect) || data[0]
          if (matched) {
            applyProfileToWorkingState(matched)
          }
        }
      } catch (err: unknown) {
        setError(
          err instanceof Error
            ? err.message
            : 'Không thể tải danh sách Flow Profiles'
        )
      } finally {
        setLoading(false)
      }
    },
    [selectedProfileId, applyProfileToWorkingState]
  )

  React.useEffect(() => {
    let isMounted = true
    getRentalFlowProfiles()
      .then(data => {
        if (isMounted) {
          setProfiles(data)
          if (data.length > 0) {
            const initial = data[0]
            if (initial) {
              applyProfileToWorkingState(initial)
            }
          }
          setLoading(false)
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err.message
              : 'Không thể tải danh sách Flow Profiles'
          )
          setLoading(false)
        }
      })
    return () => {
      isMounted = false
    }
  }, [applyProfileToWorkingState])

  const handleSaveDraft = async (): Promise<void> => {
    if (!workingSteps || !selectedProfile) return
    setSaving(true)
    setError(null)
    setSuccessMsg(null)
    try {
      const updated = await saveRentalFlowProfileDraft({
        profileId: selectedProfile.profileId,
        name: workingName,
        description: workingDescription,
        steps: workingSteps,
        expectedRevision: workingRevision,
      })
      setSuccessMsg('Đã lưu bản nháp cấu hình thành công!')
      setWorkingRevision(updated.draftRevision)
      await fetchProfiles()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Lưu bản nháp thất bại')
    } finally {
      setSaving(false)
    }
  }

  const handlePublish = async (): Promise<void> => {
    if (!selectedProfile) return
    setPublishing(true)
    setError(null)
    setSuccessMsg(null)
    try {
      const published = await publishRentalFlowProfile(
        selectedProfile.profileId,
        workingRevision
      )
      setSuccessMsg(
        `Xuất bản thành công phiên bản v${published.version}! Mã băm SHA-256 đã được khóa.`
      )
      await fetchProfiles()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Xuất bản hồ sơ thất bại')
    } finally {
      setPublishing(false)
    }
  }

  const handleCreateNewProfile = async (): Promise<void> => {
    if (!selectedProfile) return
    setSaving(true)
    try {
      const newId = `custom-profile-${Date.now().toString(36)}`
      await saveRentalFlowProfileDraft({
        profileId: newId,
        name: `Cấu hình mới ${new Date().toLocaleDateString('vi-VN')}`,
        description: 'Tạo từ mẫu hiện tại',
        steps: selectedProfile.steps,
      })
      await fetchProfiles()
      setSelectedProfileId(newId)
      setSuccessMsg('Đã tạo profile nháp mới!')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Tạo hồ sơ mới thất bại')
    } finally {
      setSaving(false)
    }
  }

  const handleRestore = async (ver: number): Promise<void> => {
    if (!selectedProfile) return
    setSaving(true)
    setError(null)
    try {
      await restoreRentalFlowProfileVersion(selectedProfile.profileId, ver)
      setSuccessMsg(`Đã khôi phục dữ liệu từ phiên bản v${ver}!`)
      await fetchProfiles()
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : 'Khôi phục phiên bản thất bại'
      )
    } finally {
      setSaving(false)
    }
  }

  const publishedProfiles = profiles.filter(
    p => p.status === 'published' || p.isSystemDefault
  )

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-fg flex items-center gap-2.5">
            <Sliders className="w-6 h-6 text-primary" />
            Điều khiển Quy trình Thuê (Rental Flow Control)
          </h2>
          <p className="text-xs text-muted mt-1">
            Quản trị phiên bản biểu mẫu nộp hồ sơ, kiểm soát điều khoản pháp lý
            và định tuyến gán luồng tự động
          </p>
        </div>

        {/* Navigation Switcher */}
        <div className="flex bg-surface-muted p-1 rounded-xl border border-border">
          <button
            type="button"
            onClick={() => setActiveMainTab('profiles')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeMainTab === 'profiles'
                ? 'bg-surface text-fg shadow-xs'
                : 'text-muted hover:text-fg'
            }`}
          >
            <Sliders className="w-4 h-4" />
            Hồ sơ Quy trình (Profiles)
          </button>
          <button
            type="button"
            onClick={() => setActiveMainTab('assignments')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeMainTab === 'assignments'
                ? 'bg-surface text-fg shadow-xs'
                : 'text-muted hover:text-fg'
            }`}
          >
            <Layers className="w-4 h-4" />
            Phân bổ & Kích hoạt (Assignments)
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-danger/10 border border-danger/20 rounded-xl text-xs text-danger flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* ═══ TAB 1: PROFILES MANAGEMENT ═══ */}
      {activeMainTab === 'profiles' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Profile Selector List */}
          <div className="lg:col-span-4 bg-surface p-4 rounded-2xl border border-border space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <span className="text-xs font-bold text-fg">
                Danh sách cấu hình
              </span>
              <button
                type="button"
                onClick={handleCreateNewProfile}
                disabled={saving}
                className="flex items-center gap-1 text-[11px] font-bold text-primary hover:text-primary-hover"
              >
                <Plus className="w-3.5 h-3.5" />
                Tạo mới
              </button>
            </div>

            {loading ? (
              <div className="py-8 text-center text-xs text-muted">
                <RefreshCw className="w-4 h-4 animate-spin inline mr-2 text-primary" />
                Đang tải danh sách hồ sơ...
              </div>
            ) : (
              <div className="space-y-2">
                {profiles.map(prof => {
                  const isSelected = prof.profileId === selectedProfileId
                  return (
                    <button
                      key={prof.profileId}
                      type="button"
                      onClick={() => applyProfileToWorkingState(prof)}
                      className={`w-full text-left p-3 rounded-xl border transition-all ${
                        isSelected
                          ? 'bg-primary/5 border-primary shadow-xs'
                          : 'bg-surface hover:bg-surface-muted border-border'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-fg truncate">
                          {prof.name}
                        </span>
                        {prof.status === 'published' ? (
                          <span className="text-[9px] font-bold text-emerald-600 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                            v{prof.version} Đã xuất bản
                          </span>
                        ) : (
                          <span className="text-[9px] font-bold text-amber-600 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                            Bản nháp (r{prof.draftRevision})
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-2 text-[10px] text-muted font-mono truncate">
                        <span>ID: {prof.profileId}</span>
                        {prof.isSystemDefault && (
                          <span className="text-[9px] text-indigo-600 font-sans font-semibold">
                            Mặc định an toàn
                          </span>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Right Column: Active Profile Editor */}
          <div className="lg:col-span-8 space-y-6">
            {selectedProfile && workingSteps ? (
              <div className="bg-surface p-6 rounded-2xl border border-border space-y-6">
                {/* Profile Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={workingName}
                        onChange={e => setWorkingName(e.target.value)}
                        className="text-base font-bold text-fg bg-transparent border-b border-transparent hover:border-border focus:border-primary focus:outline-none px-1"
                      />
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-surface-muted border border-border text-muted">
                        Rev #{workingRevision}
                      </span>
                    </div>
                    <input
                      type="text"
                      placeholder="Nhập mô tả hồ sơ..."
                      value={workingDescription}
                      onChange={e => setWorkingDescription(e.target.value)}
                      className="text-xs text-muted bg-transparent border-b border-transparent hover:border-border focus:border-primary focus:outline-none w-full px-1"
                    />
                  </div>

                  {/* Top Action Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsPreviewOpen(true)}
                      className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-surface-muted border border-border text-fg hover:border-primary/50 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-primary" />
                      Xem trước (Preview)
                    </button>

                    <button
                      type="button"
                      onClick={handleSaveDraft}
                      disabled={saving || publishing}
                      className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg bg-surface-muted border border-border text-fg hover:bg-surface-raised transition-colors disabled:opacity-50"
                    >
                      <Save className="w-3.5 h-3.5" />
                      {saving ? 'Đang lưu...' : 'Lưu bản nháp'}
                    </button>

                    <button
                      type="button"
                      onClick={handlePublish}
                      disabled={publishing || saving}
                      className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-primary text-white hover:bg-primary-hover shadow-xs transition-colors disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      {publishing ? 'Đang xuất bản...' : 'Xuất bản (Publish)'}
                    </button>
                  </div>
                </div>

                {/* Hash & Status Audit Pill */}
                <div className="p-3 bg-surface-muted rounded-xl border border-border flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2 font-mono text-[11px] text-muted">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>
                      SHA-256:{' '}
                      {selectedProfile.contentHash
                        ? selectedProfile.contentHash
                        : 'Chưa xuất bản'}
                    </span>
                  </div>
                  {selectedProfile.version > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRestore(selectedProfile.version - 1)}
                      className="flex items-center gap-1 text-[11px] text-muted hover:text-primary transition-colors"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Khôi phục về v{selectedProfile.version - 1}
                    </button>
                  )}
                </div>

                {/* 4-Step Editor Components */}
                <StepEditors steps={workingSteps} onChange={setWorkingSteps} />
              </div>
            ) : (
              <div className="p-12 text-center text-xs text-muted bg-surface rounded-2xl border border-border">
                Chọn một hồ sơ từ danh sách bên trái để bắt đầu chỉnh sửa.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═══ TAB 2: ASSIGNMENTS & ROUTING ═══ */}
      {activeMainTab === 'assignments' && (
        <AssignmentManager
          publishedProfiles={publishedProfiles}
          onAssignmentCreated={fetchProfiles}
        />
      )}

      {/* Live Preview Drawer */}
      {selectedProfile && workingSteps && (
        <FlowPreviewDrawer
          isOpen={isPreviewOpen}
          profileName={workingName}
          version={selectedProfile.version}
          steps={workingSteps}
          onClose={() => setIsPreviewOpen(false)}
        />
      )}
    </div>
  )
}
