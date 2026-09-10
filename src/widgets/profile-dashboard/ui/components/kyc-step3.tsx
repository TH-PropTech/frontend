'use client'

import * as React from 'react'
import { FileText, BadgeCheck, Brain, Loader2, ShieldCheck } from 'lucide-react'
import { Button } from '@/shared/ui/button'

interface KycStep3Props {
  kycForm: {
    fullName: string
    cccdNumber: string
    dob: string
    address: string
    gender: string
    nationality: string
    placeOfOrigin: string
    issueDate: string
    placeOfIssue: string
  }
  setKycForm: React.Dispatch<
    React.SetStateAction<{
      fullName: string
      cccdNumber: string
      dob: string
      address: string
      gender: string
      nationality: string
      placeOfOrigin: string
      issueDate: string
      placeOfIssue: string
    }>
  >
  verifyResults: {
    verified: boolean
    faceMatch: boolean
    liveness: boolean
    realConfidence: number | null
  }
  preferredDistrict: string
  setPreferredDistrict: (val: string) => void
  rooms: number
  setRooms: (val: number) => void
  income: number
  setIncome: (val: number) => void
  formatCurrency: (v: number) => string
  isProcessing: boolean
  setCurrentStep: (step: 1 | 2 | 3) => void
  handleConfirmAndSubmitKyc: () => void
}

export function KycStep3({
  kycForm,
  setKycForm,
  verifyResults,
  preferredDistrict,
  setPreferredDistrict,
  rooms,
  setRooms,
  income,
  setIncome,
  formatCurrency,
  isProcessing,
  setCurrentStep,
  handleConfirmAndSubmitKyc,
}: KycStep3Props): React.ReactElement {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch flex-1 overflow-y-auto pr-1">
      {/* Form fields editor */}
      <div className="md:col-span-8 border border-slate-200 rounded-2xl p-5 bg-white shadow-sm space-y-4">
        <h4 className="text-xs font-bold text-[#9F3F2A] uppercase pb-2 border-b border-slate-100 flex items-center gap-1.5">
          <FileText className="h-4.5 w-4.5" /> Kiểm tra thông tin trích xuất
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
              Số CCCD
            </label>
            <input
              type="text"
              value={kycForm.cccdNumber || ''}
              onChange={e =>
                setKycForm(prev => ({ ...prev, cccdNumber: e.target.value }))
              }
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-fg focus:outline-none focus:border-[#9F3F2A] bg-white font-semibold"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
              Họ và tên
            </label>
            <input
              type="text"
              value={kycForm.fullName || ''}
              onChange={e =>
                setKycForm(prev => ({ ...prev, fullName: e.target.value }))
              }
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-fg focus:outline-none focus:border-[#9F3F2A] bg-white font-semibold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                Ngày sinh
              </label>
              <input
                type="text"
                value={kycForm.dob || ''}
                onChange={e =>
                  setKycForm(prev => ({ ...prev, dob: e.target.value }))
                }
                className="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-fg focus:outline-none focus:border-[#9F3F2A] bg-white font-semibold"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                Giới tính
              </label>
              <input
                type="text"
                value={kycForm.gender || ''}
                onChange={e =>
                  setKycForm(prev => ({ ...prev, gender: e.target.value }))
                }
                className="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-fg focus:outline-none focus:border-[#9F3F2A] bg-white font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                Quốc tịch
              </label>
              <input
                type="text"
                value={kycForm.nationality || ''}
                onChange={e =>
                  setKycForm(prev => ({ ...prev, nationality: e.target.value }))
                }
                className="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-fg focus:outline-none focus:border-[#9F3F2A] bg-white font-semibold"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                Quê quán
              </label>
              <input
                type="text"
                value={kycForm.placeOfOrigin || ''}
                onChange={e =>
                  setKycForm(prev => ({
                    ...prev,
                    placeOfOrigin: e.target.value,
                  }))
                }
                className="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-fg focus:outline-none focus:border-[#9F3F2A] bg-white font-semibold"
              />
            </div>
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
              Nơi thường trú
            </label>
            <input
              type="text"
              value={kycForm.address || ''}
              onChange={e =>
                setKycForm(prev => ({ ...prev, address: e.target.value }))
              }
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-fg focus:outline-none focus:border-[#9F3F2A] bg-white font-semibold"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
              Ngày cấp
            </label>
            <input
              type="text"
              value={kycForm.issueDate || ''}
              onChange={e =>
                setKycForm(prev => ({ ...prev, issueDate: e.target.value }))
              }
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-fg focus:outline-none focus:border-[#9F3F2A] bg-white font-semibold"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
              Nơi cấp
            </label>
            <input
              type="text"
              value={kycForm.placeOfIssue || ''}
              onChange={e =>
                setKycForm(prev => ({ ...prev, placeOfIssue: e.target.value }))
              }
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-fg focus:outline-none focus:border-[#9F3F2A] bg-white font-semibold"
            />
          </div>
        </div>
      </div>

      {/* AI Preferences & Match Results Card */}
      <div className="md:col-span-4 border border-slate-200 rounded-2xl p-5 bg-white shadow-sm flex flex-col justify-between">
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-[#9F3F2A] uppercase pb-2 border-b border-slate-100 flex items-center gap-1.5">
            <BadgeCheck className="h-4.5 w-4.5" /> Kết quả kiểm tra AI
          </h4>

          {/* Result chips */}
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-emerald-800 font-medium">
                Đối khớp khuôn mặt:
              </span>
              <span className="font-bold text-emerald-700">
                {verifyResults.faceMatch ? 'TRÙNG KHỚP' : 'KHÔNG KHỚP'}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-emerald-800 font-medium">
                Thực thể sống (Liveness):
              </span>
              <span className="font-bold text-emerald-700">
                {verifyResults.liveness ? 'CHÍNH CHỦ' : 'GIẢ MẠO'}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs border-t border-emerald-200/50 pt-1.5">
              <span className="text-emerald-800 font-medium">
                Chỉ số Spoof Score:
              </span>
              <span className="font-bold text-emerald-700">
                {verifyResults.realConfidence === null
                  ? 'Không có dữ liệu'
                  : `${(verifyResults.realConfidence * 100).toFixed(0)}%`}
              </span>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-3 space-y-3">
            <h4 className="text-[11px] font-bold text-[#9F3F2A] uppercase flex items-center gap-1">
              <Brain className="h-3.5 w-3.5" /> AI Preferences (Gợi ý)
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-500 block">
                  Khu vực thuê
                </label>
                <select
                  value={preferredDistrict}
                  onChange={e => setPreferredDistrict(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-2 py-1 text-xs text-fg focus:outline-none bg-white font-semibold"
                >
                  <option value="Bình Thạnh">Bình Thạnh</option>
                  <option value="Quận 1">Quận 1</option>
                  <option value="Quận 2">Quận 2</option>
                  <option value="Quận 7">Quận 7</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-500 block">
                  Số phòng ngủ
                </label>
                <select
                  value={rooms}
                  onChange={e => setRooms(Number(e.target.value))}
                  className="w-full border border-slate-200 rounded-lg px-2 py-1 text-xs text-fg focus:outline-none bg-white font-semibold"
                >
                  <option value={1}>1 PN</option>
                  <option value={2}>2 PN</option>
                  <option value={3}>3 PN</option>
                </select>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-slate-500 block">
                Thu nhập hàng tháng:{' '}
                <span className="text-[#9F3F2A] font-bold">
                  {formatCurrency(income)}
                </span>
              </label>
              <input
                type="range"
                min={8000000}
                max={150000000}
                step={1000000}
                value={income}
                onChange={e => setIncome(Number(e.target.value))}
                className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#9F3F2A]"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 space-y-2.5">
          {isProcessing ? (
            <div className="flex items-center justify-center gap-2 py-2">
              <Loader2 className="h-5 w-5 text-[#9F3F2A] animate-spin" />
              <span className="text-xs font-bold text-slate-500">
                Đang đẩy giao dịch CA lên Ledger...
              </span>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button
                onClick={() => setCurrentStep(2)}
                variant="outline"
                className="flex-1 h-10 text-xs border-slate-200 text-slate-600 rounded-full font-bold"
              >
                Quay lại
              </Button>
              <Button
                onClick={handleConfirmAndSubmitKyc}
                className="flex-1 h-10 text-xs text-white rounded-full font-bold shadow-md border-none flex items-center justify-center gap-1 cursor-pointer transition-colors"
                style={{ backgroundColor: '#9F3F2A' }}
              >
                <ShieldCheck className="h-4 w-4" /> Xác nhận & Nộp
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
