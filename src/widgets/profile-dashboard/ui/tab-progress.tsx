'use client'

import * as React from 'react'
import { Button } from '@/shared/ui/button'
import { Badge } from '@/shared/ui/badge'
import { Card } from '@/shared/ui/card'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/shared/ui/select'
import { UseProfileReturn } from '../model/use-profile'
import {
  Sparkles,
  AlertTriangle,
  FileSignature,
  DollarSign,
  CheckSquare,
  CheckCircle2,
  ShieldCheck,
  Activity,
  Check,
} from 'lucide-react'
import { LandlordKpis } from './landlord-kpis'
import { LandlordAlerts } from './landlord-alerts'
import { LandlordTenantInfo } from './landlord-tenant-info'
import { LandlordContractSummary } from './landlord-contract-summary'
import { LandlordAppointments } from './landlord-appointments'
import { TenantAppointments } from './tenant-appointments'
import { LandlordAcceptedAppointments } from './landlord-accepted-appointments'

interface TabProgressProps {
  profile: UseProfileReturn
}

export function TabProgress({ profile }: TabProgressProps): React.ReactElement {
  const {
    role,
    activePropertyId,
    properties,
    handlePropertyChange,
    activeProperty,
    progressPercent,
    depositPaid,
    handlePayDeposit,
    contractSigned,
    handleOpenContractModal,
    firstMonthPaid,
    handlePayRent,
    setShowHandoverModal,
    handoverSigned,
    leaseTerminated,
    setShowHandoverArchiveModal,
    handleTerminateLease,
    damageDeductions,
    appointments,
    handleApproveAppointment,
    handleRejectAppointment,
    handleCancelAppointment,
    handleCompleteAppointment,
    handleViewSignedContract,
    portfolio,
  } = profile

  // Chủ nhà đã đăng nhập: chờ tải / lỗi / chưa có căn hộ thì chỉ hiện trạng thái, không hiện số liệu demo
  if (role === 'landlord' && portfolio.isLive) {
    const message = portfolio.isLoading
      ? 'Đang tải danh sách căn hộ và hợp đồng của bạn...'
      : portfolio.isError
        ? 'Không tải được dữ liệu căn hộ. Vui lòng tải lại trang sau ít phút.'
        : properties.length === 0
          ? 'Bạn chưa có căn hộ nào đang quản lý. Hãy đăng tin ở tab "Tin đăng của tôi" để bắt đầu.'
          : null
    if (message)
      return (
        <Card className="bg-white border border-border rounded-3xl p-8 shadow-sm text-center text-sm text-muted">
          {message}
        </Card>
      )
  }
  const liveContract = portfolio.contractByProperty[activeProperty.id]
  const depositLabel = `${(liveContract?.deposit ?? 18_000_000).toLocaleString('vi-VN')}đ`

  return (
    <div className="space-y-6 mt-0 outline-none">
      {/* Property Selector for Landlord (using generic UI Select) */}
      {role === 'landlord' && (
        <>
          <Card className="bg-white border border-border rounded-3xl p-5 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="space-y-1 text-left">
              <span className="text-xs text-muted font-bold uppercase tracking-wider block">
                Chọn căn hộ quản lý
              </span>
              <p className="text-xs text-muted">
                Chuyển đổi căn hộ để theo dõi tiến trình và dòng tiền tương ứng.
              </p>
            </div>
            <div className="w-full sm:w-64">
              <Select
                value={activePropertyId}
                onValueChange={handlePropertyChange}
              >
                <SelectTrigger className="w-full bg-white border border-border rounded-xl px-4 py-2.5 text-xs font-semibold text-fg focus:ring-1 focus:ring-primary">
                  <SelectValue placeholder="Chọn căn hộ" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-border">
                  {properties.map(p => (
                    <SelectItem key={p.id} value={p.id} className="text-xs">
                      {p.name} ({p.status})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </Card>

          {/* Landlord KPI cards */}
          <LandlordKpis
            stats={portfolio.isLive ? portfolio.stats : undefined}
            pendingIssues={portfolio.isLive ? null : undefined}
          />

          {/* Landlord alert notifications */}
          <LandlordAlerts
            appointments={appointments}
            alerts={portfolio.isLive ? portfolio.alerts : undefined}
          />
        </>
      )}

      {/* Progress Card */}
      <Card className="bg-white border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
          <h3 className="font-marketing text-lg font-bold text-fg flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            {role === 'tenant'
              ? 'Vinhomes Central Park - Căn hộ #102'
              : activeProperty.name}
          </h3>
          <Badge
            variant="outline"
            className="font-mono text-[11px] bg-secondary-soft text-secondary border-secondary/20"
          >
            Hợp đồng:{' '}
            {role === 'tenant' ? 'CTR-2026-0048' : activeProperty.code}
          </Badge>
        </div>

        {/* Progress Line */}
        <div className="space-y-2.5">
          <div className="flex justify-between text-xs text-muted font-bold uppercase tracking-wider">
            <span>Tiến độ hoàn thành</span>
            <span className="text-primary font-mono">{progressPercent()}%</span>
          </div>
          <div className="h-2.5 w-full bg-surface-muted rounded-full overflow-hidden p-0.5 border border-border/40">
            <div
              className="h-full bg-gradient-to-r from-primary/80 to-primary rounded-full transition-all duration-700 shadow-[0_0_8px_rgba(198,90,58,0.3)]"
              style={{ width: `${progressPercent()}%` }}
            />
          </div>
        </div>

        {/* Actions & Alerts */}
        {!depositPaid && (
          <div className="bg-warning-soft/20 border border-warning/30 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-pulse-subtle">
            <div className="space-y-1 text-left">
              <h4 className="font-marketing text-sm font-bold text-warning flex items-center gap-1.5">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                {role === 'tenant'
                  ? 'Yêu cầu thanh toán đặt cọc'
                  : 'Chờ khách thuê đặt cọc'}
              </h4>
              <p className="font-body text-xs text-muted">
                {role === 'tenant'
                  ? 'Vui lòng thanh toán khoản tiền đặt cọc để khóa giữ chỗ căn hộ và bắt đầu ký kết hợp đồng.'
                  : `Khách thuê đang tiến hành thanh toán khoản tiền cọc ${depositLabel} để khóa giữ chỗ căn hộ và lưu vết an toàn.`}
              </p>
            </div>
            {role === 'tenant' ? (
              <Button
                onClick={handlePayDeposit}
                className="h-10 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-full px-6 shadow-md cursor-pointer shrink-0 self-start md:self-auto"
              >
                Thanh toán cọc 18.000.000đ
              </Button>
            ) : (
              <Badge
                variant="secondary"
                className="px-4 py-2 text-muted font-bold rounded-full text-xs shrink-0 self-start md:self-auto"
              >
                Đang chờ đặt cọc...
              </Badge>
            )}
          </div>
        )}

        {depositPaid && !contractSigned && (
          <div className="bg-accent-soft/20 border border-accent/30 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 text-left">
            <div className="space-y-1">
              <h4 className="font-marketing text-sm font-bold text-fg flex items-center gap-1.5">
                <FileSignature className="h-4 w-4 text-primary shrink-0" />
                {role === 'tenant'
                  ? 'Hợp đồng chờ ký kết'
                  : 'Hợp đồng chờ chủ nhà ký duyệt'}
              </h4>
              <p className="font-body text-xs text-muted">
                {role === 'tenant'
                  ? 'Tiền cọc đã được lưu vết ký quỹ an toàn. Vui lòng đọc kỹ điều khoản và ký số hợp đồng điện tử.'
                  : 'Khách thuê đã nộp tiền cọc thành công. Vui lòng ký số duyệt hợp đồng điện tử để phê duyệt giao dịch.'}
              </p>
            </div>
            <Button
              onClick={handleOpenContractModal}
              className="h-10 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-full px-6 shadow-md cursor-pointer shrink-0 self-start md:self-auto"
            >
              {role === 'tenant' ? 'Ký hợp đồng số' : 'Ký duyệt hợp đồng'}
            </Button>
          </div>
        )}

        {contractSigned && !firstMonthPaid && (
          <div className="bg-success-soft/20 border border-success/30 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-pulse-subtle text-left">
            <div className="space-y-1">
              <h4 className="font-marketing text-sm font-bold text-success flex items-center gap-1.5">
                <DollarSign className="h-4 w-4 shrink-0" />
                {role === 'tenant'
                  ? 'Thanh toán tiền nhà tháng đầu tiên'
                  : 'Chờ khách thanh toán tháng tiền nhà đầu tiên'}
              </h4>
              <p className="font-body text-xs text-muted">
                {role === 'tenant'
                  ? 'Hợp đồng đã được ký kết thành công bởi cả hai bên. Vui lòng thanh toán tiền nhà tháng đầu để bàn giao khóa phòng.'
                  : 'Hợp đồng đã được ký số an toàn. Hệ thống đang đợi khách đóng tiền nhà tháng đầu tiên để hoàn tất thủ tục bàn giao.'}
              </p>
            </div>
            {role === 'tenant' ? (
              <Button
                onClick={handlePayRent}
                className="h-10 bg-success hover:bg-success/90 text-white text-xs font-bold rounded-full px-6 shadow-md cursor-pointer shrink-0 self-start md:self-auto"
              >
                Thanh toán tháng đầu 18.000.000đ
              </Button>
            ) : (
              <Badge
                variant="secondary"
                className="px-4 py-2 text-muted font-bold rounded-full text-xs shrink-0 self-start md:self-auto"
              >
                Đang chờ đóng tiền...
              </Badge>
            )}
          </div>
        )}

        {firstMonthPaid && !handoverSigned && (
          <div className="bg-primary-soft/30 border border-primary/20 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 text-left">
            <div className="space-y-1">
              <h4 className="font-marketing text-sm font-bold text-primary flex items-center gap-1.5">
                <CheckSquare className="h-4 w-4 shrink-0" />
                {role === 'tenant'
                  ? 'Ký biên bản bàn giao căn hộ'
                  : 'Bàn giao căn hộ & Ký xác nhận'}
              </h4>
              <p className="font-body text-xs text-muted">
                {role === 'tenant'
                  ? 'Vui lòng kiểm tra hiện trạng thực tế căn hộ cùng chủ nhà và ký biên bản bàn giao điện tử để nhận nhà.'
                  : 'Khách thuê đã nộp tiền thuê tháng đầu tiên. Vui lòng cùng kiểm kê phòng và ký biên bản bàn giao căn hộ điện tử.'}
              </p>
            </div>
            <Button
              onClick={() => setShowHandoverModal(true)}
              className="h-10 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-full px-6 shadow-md cursor-pointer shrink-0 self-start md:self-auto"
            >
              {role === 'tenant'
                ? 'Xem & Ký biên bản bàn giao'
                : 'Kiểm kê & Bàn giao phòng'}
            </Button>
          </div>
        )}

        {handoverSigned && !leaseTerminated && (
          <div className="bg-success-soft/20 border border-success/30 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 text-left">
            <div className="space-y-1">
              <h4 className="font-marketing text-sm font-bold text-success flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                Hợp đồng thuê nhà đang hoạt động
              </h4>
              <p className="font-body text-xs text-muted leading-relaxed">
                {role === 'tenant'
                  ? 'Mọi thủ tục đã hoàn tất. Bạn đang cư trú tại căn hộ. Khi kết thúc kỳ thuê, bạn có thể đề xuất thanh lý hợp đồng để nhận lại tiền cọc.'
                  : 'Mọi thủ tục hoàn tất. Khách thuê đang ở trong căn hộ. Khi kết thúc kỳ thuê, bạn hoặc khách thuê có thể kích hoạt quy trình thanh lý hợp đồng.'}
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5 shrink-0 self-start md:self-auto">
              <Button
                onClick={handleViewSignedContract}
                variant="secondary"
                className="h-10 text-xs font-bold rounded-full px-5 border border-primary/30 text-primary bg-primary-soft/20 hover:bg-primary-soft/40"
              >
                <FileSignature className="h-3.5 w-3.5 mr-1.5" />
                Xem hợp đồng đã ký
              </Button>
              <Button
                onClick={() => setShowHandoverArchiveModal(true)}
                variant="secondary"
                className="h-10 text-xs font-bold rounded-full px-5 border border-border text-fg"
              >
                Xem biên bản bàn giao đã ký
              </Button>
              <Button
                onClick={handleTerminateLease}
                variant="danger"
                className="h-10 text-xs font-bold rounded-full px-6 shadow-md cursor-pointer bg-danger hover:bg-danger-hover text-white border-none"
              >
                {role === 'tenant'
                  ? 'Yêu cầu thanh lý hợp đồng & Rút cọc'
                  : 'Xác nhận thanh lý & hoàn cọc'}
              </Button>
            </div>
          </div>
        )}

        {leaseTerminated && (
          <div className="bg-success-soft/20 border border-success/30 rounded-2xl p-5 flex items-start gap-3 text-left">
            <ShieldCheck className="h-5 w-5 text-success mt-0.5 shrink-0" />
            <div className="space-y-1">
              <h4 className="font-marketing text-sm font-bold text-success">
                Hợp đồng thuê nhà đã thanh lý thành công
              </h4>
              <p className="font-body text-xs text-muted leading-relaxed">
                {role === 'tenant'
                  ? `Số tiền đặt cọc ký quỹ (sau khi khấu trừ thiệt hại hao mòn ${damageDeductions.toLocaleString()}đ nếu có) đã được hoàn trả tự động về tài khoản của bạn.`
                  : `Tiền cọc (có khấu trừ thiệt hại hao mòn ${damageDeductions.toLocaleString()}đ nếu có) đã được hoàn trả cho khách thuê.`}
              </p>
            </div>
          </div>
        )}
      </Card>

      {/* Progress Steps Timeline */}
      <Card className="bg-white border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        <h3 className="font-marketing text-base font-bold text-fg flex items-center gap-2">
          <Activity className="h-4 w-4 text-primary" />
          Các bước hành trình của bạn (
          {role === 'tenant' ? 'Khách thuê' : 'Chủ nhà'})
        </h3>
        <div className="space-y-6 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-border/60">
          {/* Step 1 */}
          <div className="flex gap-4 relative text-left">
            <div className="h-7 w-7 rounded-full bg-success text-white flex items-center justify-center text-xs font-bold z-10 shrink-0">
              <Check className="h-3.5 w-3.5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-marketing text-sm font-bold text-fg">
                {role === 'tenant'
                  ? 'Đặt lịch hẹn xem nhà'
                  : 'Xác nhận lịch hẹn xem nhà'}
              </h4>
              <p className="font-body text-xs text-muted">
                {portfolio.isLive
                  ? 'Lịch hẹn xem nhà đã hoàn tất.'
                  : 'Lịch hẹn đã được xác nhận vào ngày 09/06/2026 lúc 14:00.'}
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-4 relative text-left">
            <div
              className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold z-10 shrink-0 ${
                depositPaid
                  ? 'bg-success text-white'
                  : 'bg-primary text-white animate-pulse'
              }`}
            >
              {depositPaid ? <Check className="h-3.5 w-3.5" /> : '2'}
            </div>
            <div className="space-y-1">
              <h4 className="font-marketing text-sm font-bold text-fg">
                {role === 'tenant'
                  ? 'Thanh toán tiền đặt cọc giữ chỗ'
                  : 'Nhận tiền đặt cọc giữ chỗ'}
              </h4>
              <p className="font-body text-xs text-muted">
                {depositPaid
                  ? 'Đã chuyển tiền ký quỹ cọc và lưu vết bảo mật chống sửa đổi.'
                  : 'Chờ khách thuê chuyển khoản tiền đặt cọc.'}
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-4 relative text-left">
            <div
              className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold z-10 shrink-0 ${
                contractSigned
                  ? 'bg-success text-white'
                  : depositPaid
                    ? 'bg-primary text-white animate-pulse'
                    : 'bg-surface-muted text-muted border border-border'
              }`}
            >
              {contractSigned ? <Check className="h-3.5 w-3.5" /> : '3'}
            </div>
            <div className="space-y-1">
              <h4 className="font-marketing text-sm font-bold text-fg">
                {role === 'tenant'
                  ? 'Ký kết Hợp đồng điện tử'
                  : 'Ký duyệt Hợp đồng điện tử'}
              </h4>
              <p className="font-body text-xs text-muted">
                {contractSigned
                  ? 'Hợp đồng đã được ký duyệt số bởi cả hai bên và lưu vết chống sửa đổi.'
                  : 'Đang chờ ký hợp đồng điện tử xác nhận hai bên.'}
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex gap-4 relative text-left">
            <div
              className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold z-10 shrink-0 ${
                handoverSigned
                  ? 'bg-success text-white'
                  : firstMonthPaid
                    ? 'bg-primary text-white animate-pulse'
                    : 'bg-surface-muted text-muted border border-border'
              }`}
            >
              {handoverSigned ? <Check className="h-3.5 w-3.5" /> : '4'}
            </div>
            <div className="space-y-1">
              <h4 className="font-marketing text-sm font-bold text-fg">
                {role === 'tenant'
                  ? 'Ký biên bản bàn giao căn hộ'
                  : 'Bàn giao phòng & Ký biên bản'}
              </h4>
              <p className="font-body text-xs text-muted">
                {handoverSigned
                  ? 'Đã hoàn tất bàn giao biên bản bàn giao điện tử và quyền khóa phòng.'
                  : 'Chờ kiểm tra hiện trạng thiết bị phòng và ký biên bản điện tử.'}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Landlord Additional Management Cards */}
      {role === 'landlord' && (
        <>
          <LandlordTenantInfo
            propertyId={activePropertyId}
            status={activeProperty.status}
            price={activeProperty.price}
            live={portfolio.isLive}
            liveInfo={portfolio.tenantInfo[activePropertyId]}
          />
          {activeProperty.status === 'Đang thuê' &&
            (!portfolio.isLive ||
              portfolio.contractSummary[activePropertyId]) && (
              <LandlordContractSummary
                summary={
                  portfolio.isLive
                    ? portfolio.contractSummary[activePropertyId]
                    : undefined
                }
              />
            )}
          <LandlordAppointments
            appointments={appointments}
            onApprove={handleApproveAppointment}
            onReject={handleRejectAppointment}
          />
          <LandlordAcceptedAppointments
            appointments={appointments}
            onComplete={handleCompleteAppointment}
          />
        </>
      )}

      {/* Tenant Additional Management Cards */}
      {role === 'tenant' && (
        <TenantAppointments
          appointments={appointments}
          onCancel={handleCancelAppointment}
        />
      )}
    </div>
  )
}
