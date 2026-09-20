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
  LayoutGrid,
  List,
  Search,
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

// Shared UI Components
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table'
import { Badge } from '@/shared/ui/badge'

export function RentalFlowControlView(): React.ReactElement {
  const [activeMainTab, setActiveMainTab] = React.useState<
    'profiles' | 'assignments'
  >('profiles')
  const [viewMode, setViewMode] = React.useState<'split' | 'table'>('split')
  const [searchQuery, setSearchQuery] = React.useState('')

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
      setViewMode('split') // Auto-switch to split mode when editing
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
          if (matched && viewMode === 'split') {
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
    [selectedProfileId, applyProfileToWorkingState, viewMode]
  )

  React.useEffect(() => {
    let isMounted = true
    getRentalFlowProfiles()
      .then(data => {
        if (isMounted) {
          setProfiles(data)
          if (data.length > 0 && viewMode === 'split') {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Intentional single run

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
    if (!selectedProfile && profiles.length === 0) return
    setSaving(true)
    try {
      const baseProfile = selectedProfile || profiles[0]
      if (!baseProfile) return

      const newId = `custom-profile-${Date.now().toString(36)}`
      await saveRentalFlowProfileDraft({
        profileId: newId,
        name: `Cấu hình mới ${new Date().toLocaleDateString('vi-VN')}`,
        description: 'Tạo từ mẫu hiện tại',
        steps: baseProfile.steps,
      })
      await fetchProfiles()
      setSelectedProfileId(newId)
      setViewMode('split')
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

  const filteredProfiles = profiles.filter(
    p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.profileId.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-fg flex items-center gap-2.5">
            <Sliders className="w-6 h-6 text-primary" />
            Điều khiển Quy trình Thuê (Rental Flow Control)
          </h2>
          <p className="text-sm text-muted mt-1.5">
            Quản trị phiên bản biểu mẫu nộp hồ sơ, kiểm soát điều khoản pháp lý
            và định tuyến gán luồng tự động
          </p>
        </div>

        {/* Navigation Switcher */}
        <div className="flex bg-surface-muted p-1 rounded-xl border border-border overflow-x-auto w-full md:w-auto shrink-0">
          <button
            type="button"
            onClick={() => setActiveMainTab('profiles')}
            className={`flex items-center gap-2 px-4 py-2.5 md:py-2 text-sm font-semibold rounded-lg transition-all flex-1 md:flex-none justify-center ${
              activeMainTab === 'profiles'
                ? 'bg-surface text-fg shadow-sm border border-border/50'
                : 'text-muted hover:text-fg'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span className="whitespace-nowrap">Hồ sơ Quy trình</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveMainTab('assignments')}
            className={`flex items-center gap-2 px-4 py-2.5 md:py-2 text-sm font-semibold rounded-lg transition-all flex-1 md:flex-none justify-center ${
              activeMainTab === 'assignments'
                ? 'bg-surface text-fg shadow-sm border border-border/50'
                : 'text-muted hover:text-fg'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span className="whitespace-nowrap">Phân bổ & Kích hoạt</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-danger/10 border border-danger/20 rounded-xl text-sm font-medium text-danger flex items-start md:items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 md:mt-0" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-sm font-medium text-emerald-600 dark:text-emerald-400 flex items-start md:items-center gap-3">
          <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 md:mt-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* ═══ TAB 1: PROFILES MANAGEMENT ═══ */}
      {activeMainTab === 'profiles' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <Input
                placeholder="Tìm kiếm hồ sơ..."
                className="pl-9"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="flex bg-surface-muted p-1 rounded-lg border border-border shrink-0">
                <button
                  type="button"
                  onClick={() => setViewMode('table')}
                  className={`p-1.5 rounded transition-colors ${
                    viewMode === 'table'
                      ? 'bg-surface shadow-sm text-primary'
                      : 'text-muted hover:text-fg'
                  }`}
                  title="Dạng bảng"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('split')}
                  className={`p-1.5 rounded transition-colors ${
                    viewMode === 'split'
                      ? 'bg-surface shadow-sm text-primary'
                      : 'text-muted hover:text-fg'
                  }`}
                  title="Dạng chia cột"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
              <Button
                onClick={handleCreateNewProfile}
                disabled={saving}
                className="flex-1 sm:flex-none whitespace-nowrap"
              >
                <Plus className="w-4 h-4 mr-2 shrink-0" />
                Tạo mới
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="py-20 text-center text-sm text-muted">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-3 text-primary" />
              Đang tải danh sách hồ sơ...
            </div>
          ) : (
            <>
              {/* TABLE VIEW MODE */}
              {viewMode === 'table' && (
                <Card>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Tên cấu hình</TableHead>
                          <TableHead>ID</TableHead>
                          <TableHead>Phiên bản / Bản nháp</TableHead>
                          <TableHead>Trạng thái</TableHead>
                          <TableHead className="text-right">
                            Hành động
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredProfiles.length > 0 ? (
                          filteredProfiles.map(prof => (
                            <TableRow key={prof.profileId}>
                              <TableCell className="font-semibold">
                                {prof.name}
                              </TableCell>
                              <TableCell className="font-mono text-xs text-muted">
                                {prof.profileId}
                              </TableCell>
                              <TableCell>
                                {prof.status === 'published' ? (
                                  <Badge
                                    variant="outline"
                                    className="text-emerald-600 bg-emerald-500/10 border-emerald-500/20"
                                  >
                                    v{prof.version}
                                  </Badge>
                                ) : (
                                  <Badge
                                    variant="outline"
                                    className="text-amber-600 bg-amber-500/10 border-amber-500/20"
                                  >
                                    Rev {prof.draftRevision}
                                  </Badge>
                                )}
                              </TableCell>
                              <TableCell>
                                {prof.status === 'published' ? (
                                  <span className="inline-flex items-center gap-1.5 text-emerald-600 font-medium text-xs">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    Đã xuất bản
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1.5 text-amber-600 font-medium text-xs">
                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                    Chưa xuất bản
                                  </span>
                                )}
                              </TableCell>
                              <TableCell className="text-right">
                                <Button
                                  variant="secondary"
                                  size="sm"
                                  onClick={() =>
                                    applyProfileToWorkingState(prof)
                                  }
                                >
                                  Chỉnh sửa
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell
                              colSpan={5}
                              className="h-24 text-center text-muted"
                            >
                              Không tìm thấy cấu hình nào.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </Card>
              )}

              {/* SPLIT / GRID VIEW MODE */}
              {viewMode === 'split' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Left Column: Profile Selector List */}
                  <Card className="lg:col-span-4 h-full border-border shadow-sm">
                    <CardHeader className="pb-3 border-b border-border">
                      <CardTitle className="text-base font-bold text-fg">
                        Danh sách cấu hình
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 space-y-2 max-h-[800px] overflow-y-auto">
                      {filteredProfiles.length > 0 ? (
                        filteredProfiles.map(prof => {
                          const isSelected =
                            prof.profileId === selectedProfileId
                          return (
                            <button
                              key={prof.profileId}
                              type="button"
                              onClick={() => applyProfileToWorkingState(prof)}
                              className={`w-full text-left p-3 rounded-xl border transition-all ${
                                isSelected
                                  ? 'bg-primary/5 border-primary shadow-sm'
                                  : 'bg-surface hover:bg-surface-muted border-border'
                              }`}
                            >
                              <div className="flex items-start sm:items-center justify-between mb-2 flex-col sm:flex-row gap-1.5">
                                <span className="text-sm font-bold text-fg line-clamp-2 sm:truncate">
                                  {prof.name}
                                </span>
                                {prof.status === 'published' ? (
                                  <Badge
                                    variant="outline"
                                    className="text-[10px] py-0 px-1.5 text-emerald-600 bg-emerald-500/10 border-emerald-500/20 whitespace-nowrap shrink-0"
                                  >
                                    v{prof.version} Đã xuất bản
                                  </Badge>
                                ) : (
                                  <Badge
                                    variant="outline"
                                    className="text-[10px] py-0 px-1.5 text-amber-600 bg-amber-500/10 border-amber-500/20 whitespace-nowrap shrink-0"
                                  >
                                    Nháp r{prof.draftRevision}
                                  </Badge>
                                )}
                              </div>
                              <div className="flex flex-wrap items-center justify-between mt-1 gap-2 text-xs text-muted font-mono">
                                <span className="truncate max-w-[200px]">
                                  ID: {prof.profileId}
                                </span>
                                {prof.isSystemDefault && (
                                  <span className="text-[10px] text-indigo-600 font-sans font-semibold shrink-0">
                                    Mặc định
                                  </span>
                                )}
                              </div>
                            </button>
                          )
                        })
                      ) : (
                        <div className="py-8 text-center text-sm text-muted">
                          Không có cấu hình nào.
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Right Column: Active Profile Editor */}
                  <div className="lg:col-span-8">
                    {selectedProfile && workingSteps ? (
                      <Card className="shadow-sm border-border">
                        <CardHeader className="pb-4 border-b border-border space-y-0 gap-4 flex flex-col xl:flex-row xl:items-start justify-between">
                          <div className="space-y-2 flex-1 w-full min-w-0">
                            <div className="flex items-center gap-2 w-full">
                              <Input
                                type="text"
                                value={workingName}
                                onChange={e => setWorkingName(e.target.value)}
                                className="text-lg font-bold text-fg border-transparent hover:border-border focus:border-primary shadow-none h-auto py-1 px-2 -ml-2"
                              />
                              <Badge
                                variant="secondary"
                                className="font-mono shrink-0"
                              >
                                Rev #{workingRevision}
                              </Badge>
                            </div>
                            <Input
                              type="text"
                              placeholder="Nhập mô tả hồ sơ..."
                              value={workingDescription}
                              onChange={e =>
                                setWorkingDescription(e.target.value)
                              }
                              className="text-sm text-muted bg-transparent border-transparent hover:border-border focus:border-primary shadow-none h-auto py-1 px-2 -ml-2 w-full"
                            />
                          </div>

                          {/* Top Action Buttons */}
                          <div className="flex flex-wrap items-center gap-2 shrink-0 w-full xl:w-auto">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setIsPreviewOpen(true)}
                              className="flex-1 xl:flex-none"
                            >
                              <Eye className="w-4 h-4 mr-2 text-primary" />
                              Xem trước
                            </Button>

                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={handleSaveDraft}
                              disabled={saving || publishing}
                              className="flex-1 xl:flex-none"
                            >
                              <Save className="w-4 h-4 mr-2" />
                              {saving ? 'Đang lưu...' : 'Lưu nháp'}
                            </Button>

                            <Button
                              size="sm"
                              onClick={handlePublish}
                              disabled={publishing || saving}
                              className="flex-1 xl:flex-none w-full xl:w-auto mt-2 xl:mt-0"
                            >
                              <Send className="w-4 h-4 mr-2" />
                              {publishing ? 'Đang xuất bản...' : 'Xuất bản'}
                            </Button>
                          </div>
                        </CardHeader>

                        <CardContent className="p-4 sm:p-6 space-y-6">
                          {/* Hash & Status Audit Pill */}
                          <div className="p-3.5 bg-surface-muted rounded-xl border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
                            <div className="flex items-center gap-2.5 font-mono text-muted overflow-hidden">
                              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                              <span className="truncate">
                                SHA-256:{' '}
                                {selectedProfile.contentHash
                                  ? selectedProfile.contentHash
                                  : 'Chưa xuất bản'}
                              </span>
                            </div>
                            {selectedProfile.version > 1 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleRestore(selectedProfile.version - 1)
                                }
                                className="text-muted hover:text-primary shrink-0 self-start sm:self-auto h-8 px-2"
                              >
                                <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                                Khôi phục v{selectedProfile.version - 1}
                              </Button>
                            )}
                          </div>

                          {/* 4-Step Editor Components */}
                          <StepEditors
                            steps={workingSteps}
                            onChange={setWorkingSteps}
                          />
                        </CardContent>
                      </Card>
                    ) : (
                      <Card className="h-[400px] flex items-center justify-center bg-surface-muted/50 border-dashed">
                        <div className="text-center text-sm text-muted px-4">
                          Chọn một hồ sơ từ danh sách bên trái để bắt đầu chỉnh
                          sửa.
                        </div>
                      </Card>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
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
