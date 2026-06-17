'use client'

import * as React from 'react'
import { Shield, Brain, ShieldCheck, Upload } from 'lucide-react'
import { Button } from '@/shared/ui/button'

interface KycDetailsPanelProps {
  kycForm: {
    fullName?: string
    cccdNumber?: string
    dob?: string
    address?: string
    gender?: string
    nationality?: string
    placeOfOrigin?: string
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
    }>
  >
  cccdUploaded: boolean
  setCccdUploaded: (val: boolean) => void
  preferredDistrict: string
  setPreferredDistrict: (val: string) => void
  rooms: number
  setRooms: (val: number) => void
  income: number
  setIncome: (val: number) => void
  handleVerifyAndRecommend: () => void
  formatCurrency: (value: number) => string
}

export function KycDetailsPanel({
  kycForm,
  setKycForm,
  cccdUploaded,
  setCccdUploaded,
  preferredDistrict,
  setPreferredDistrict,
  rooms,
  setRooms,
  income,
  setIncome,
  handleVerifyAndRecommend,
  formatCurrency,
}: KycDetailsPanelProps): React.ReactElement {
  return (
    <div className="lg:col-span-4 border border-border rounded-2xl p-5 bg-white shadow-sm flex flex-col h-full overflow-y-auto scrollbar-thin text-left justify-between">
      <div className="space-y-4">
        <h4 className="text-xs font-bold text-primary uppercase pb-2 border-b border-border/40 flex items-center gap-1.5 shrink-0">
          <Shield className="h-4 w-4" /> Kết quả trích xuất tự động
        </h4>

        <div className="space-y-3">
          <div className="space-y-0.5">
            <label className="text-[9px] font-bold text-muted uppercase tracking-wider block">
              Số CCCD
            </label>
            <input
              type="text"
              placeholder="Nhận dạng tự động..."
              value={kycForm.cccdNumber || ''}
              onChange={e =>
                setKycForm(prev => ({ ...prev, cccdNumber: e.target.value }))
              }
              className="w-full border border-border rounded-xl px-3 py-1.5 text-xs text-fg focus:outline-none focus:border-primary bg-white font-semibold"
            />
          </div>
          <div className="space-y-0.5">
            <label className="text-[9px] font-bold text-muted uppercase tracking-wider block">
              Họ và tên
            </label>
            <input
              type="text"
              placeholder="Nhận dạng tự động..."
              value={kycForm.fullName || ''}
              onChange={e =>
                setKycForm(prev => ({ ...prev, fullName: e.target.value }))
              }
              className="w-full border border-border rounded-xl px-3 py-1.5 text-xs text-fg focus:outline-none focus:border-primary bg-white font-semibold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-0.5">
              <label className="text-[9px] font-bold text-muted uppercase tracking-wider block">
                Ngày sinh
              </label>
              <input
                type="text"
                placeholder="Tự động..."
                value={kycForm.dob || ''}
                onChange={e =>
                  setKycForm(prev => ({ ...prev, dob: e.target.value }))
                }
                className="w-full border border-border rounded-xl px-3 py-1.5 text-xs text-fg focus:outline-none focus:border-primary bg-white font-semibold"
              />
            </div>
            <div className="space-y-0.5">
              <label className="text-[9px] font-bold text-muted uppercase tracking-wider block">
                Giới tính
              </label>
              <input
                type="text"
                placeholder="Tự động..."
                value={kycForm.gender || ''}
                onChange={e =>
                  setKycForm(prev => ({ ...prev, gender: e.target.value }))
                }
                className="w-full border border-border rounded-xl px-3 py-1.5 text-xs text-fg focus:outline-none focus:border-primary bg-white font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-0.5">
              <label className="text-[9px] font-bold text-muted uppercase tracking-wider block">
                Quốc tịch
              </label>
              <input
                type="text"
                placeholder="Tự động..."
                value={kycForm.nationality || ''}
                onChange={e =>
                  setKycForm(prev => ({
                    ...prev,
                    nationality: e.target.value,
                  }))
                }
                className="w-full border border-border rounded-xl px-3 py-1.5 text-xs text-fg focus:outline-none focus:border-primary bg-white font-semibold"
              />
            </div>
            <div className="space-y-0.5">
              <label className="text-[9px] font-bold text-muted uppercase tracking-wider block">
                Quê quán
              </label>
              <input
                type="text"
                placeholder="Tự động..."
                value={kycForm.placeOfOrigin || ''}
                onChange={e =>
                  setKycForm(prev => ({
                    ...prev,
                    placeOfOrigin: e.target.value,
                  }))
                }
                className="w-full border border-border rounded-xl px-3 py-1.5 text-xs text-fg focus:outline-none focus:border-primary bg-white font-semibold"
              />
            </div>
          </div>

          <div className="space-y-0.5">
            <label className="text-[9px] font-bold text-muted uppercase tracking-wider block">
              Nơi thường trú
            </label>
            <input
              type="text"
              placeholder="Nhận dạng tự động..."
              value={kycForm.address || ''}
              onChange={e =>
                setKycForm(prev => ({ ...prev, address: e.target.value }))
              }
              className="w-full border border-border rounded-xl px-3 py-1.5 text-xs text-fg focus:outline-none focus:border-primary bg-white font-semibold"
            />
          </div>
        </div>

        {cccdUploaded && (
          <div className="border-t border-border pt-3 space-y-3 animate-fade-in">
            <h4 className="text-[11px] font-bold text-primary uppercase flex items-center gap-1">
              <Brain className="h-3.5 w-3.5" />
              AI Preferences
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-muted block">
                  Khu vực
                </label>
                <select
                  value={preferredDistrict}
                  onChange={e => setPreferredDistrict(e.target.value)}
                  className="w-full border border-border rounded-xl px-2.5 py-1 text-xs text-fg focus:outline-none focus:border-primary bg-white font-semibold"
                >
                  <option value="Bình Thạnh">Bình Thạnh</option>
                  <option value="Quận 1">Quận 1</option>
                  <option value="Quận 2">Quận 2</option>
                  <option value="Quận 7">Quận 7</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-muted block">
                  Số phòng
                </label>
                <select
                  value={rooms}
                  onChange={e => setRooms(Number(e.target.value))}
                  className="w-full border border-border rounded-xl px-2.5 py-1 text-xs text-fg focus:outline-none focus:border-primary bg-white font-semibold"
                >
                  <option value={1}>1 PN</option>
                  <option value={2}>2 PN</option>
                  <option value={3}>3 PN</option>
                </select>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-muted block">
                Thu nhập:{' '}
                <span className="text-primary font-bold">
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
                className="w-full h-1 bg-surface-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>
          </div>
        )}
      </div>

      {cccdUploaded ? (
        <div className="space-y-3 pt-3 border-t border-border shrink-0 mt-3">
          <div className="flex gap-2">
            <Button
              onClick={() => setCccdUploaded(false)}
              variant="secondary"
              className="flex-1 h-9 text-xs rounded-full font-bold cursor-pointer"
            >
              Quét lại
            </Button>
            <Button
              onClick={handleVerifyAndRecommend}
              className="flex-1 h-9 text-xs bg-success hover:bg-success/90 text-white rounded-full font-bold shadow-md flex items-center justify-center gap-1 border-none cursor-pointer"
            >
              <ShieldCheck className="h-3.5 w-3.5" /> Xác nhận & Ký
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-6 border border-dashed border-border rounded-2xl h-[120px] bg-surface/5 text-center mt-4">
          <Upload className="h-6 w-6 text-muted/40 mb-1" />
          <span className="text-[10px] font-bold text-muted">
            Chưa có kết quả OCR
          </span>
          <span className="text-[9px] text-muted/80 mt-0.5">
            Vui lòng hoàn tất tải ảnh CCCD ở cột bên trái và nhấn Trích xuất.
          </span>
        </div>
      )}
    </div>
  )
}
