'use client'

import * as React from 'react'
import type { KycRecord } from '../kyc-approvals-view'
import { CccdMockupCard } from './cccd-mockup-card'

interface KycComparisonModalProps {
  selectedRecord: KycRecord
  onClose: () => void
  onVerify: (id: string) => Promise<void>
  onShowReject: () => void
}

export function KycComparisonModal({
  selectedRecord,
  onClose,
  onVerify,
  onShowReject,
}: KycComparisonModalProps): React.ReactElement {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      <div
        className="absolute inset-0 bg-fg/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 flex flex-col w-full max-w-5xl h-[85vh] bg-surface rounded-xl border border-line shadow-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-line bg-surface-muted/30 flex justify-between items-center">
          <div>
            <span className="text-[10px] font-bold text-primary font-display">
              {selectedRecord.id}
            </span>
            <h2 className="text-sm font-bold text-fg font-marketing mt-0.5">
              Xác minh KYC: {selectedRecord.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-subtle hover:bg-fg/5 hover:text-fg transition-colors"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Split layout content workspace */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left Side: Uploaded CCCD & Selfie Images */}
          <div className="flex-1 bg-bg/50 p-6 overflow-y-auto space-y-6 border-r border-line">
            <h3 className="text-xs font-bold text-fg uppercase tracking-wider font-body mb-3">
              Hình ảnh CCCD & Selfie chân dung
            </h3>

            {/* Front side of CCCD */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-muted uppercase tracking-wider block">
                Mặt trước CCCD
              </span>
              {selectedRecord.frontCardUrl ? (
                <div className="relative aspect-[1.58/1] w-full max-w-sm mx-auto overflow-hidden rounded-xl border border-line bg-surface shadow-sm hover:border-primary/50 transition-colors">
                  <img
                    src={selectedRecord.frontCardUrl}
                    alt="Mặt trước CCCD"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <CccdMockupCard record={selectedRecord} side="front" />
              )}
            </div>

            {/* Back side of CCCD */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-muted uppercase tracking-wider block">
                Mặt sau CCCD
              </span>
              {selectedRecord.backCardUrl ? (
                <div className="relative aspect-[1.58/1] w-full max-w-sm mx-auto overflow-hidden rounded-xl border border-line bg-surface shadow-sm hover:border-primary/50 transition-colors">
                  <img
                    src={selectedRecord.backCardUrl}
                    alt="Mặt sau CCCD"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <CccdMockupCard record={selectedRecord} side="back" />
              )}
            </div>

            {/* Selfie Image */}
            {selectedRecord.selfieUrl && (
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-muted uppercase tracking-wider block">
                  Ảnh chân dung đối chiếu (Selfie)
                </span>
                <div className="relative aspect-[1/1] w-48 mx-auto overflow-hidden rounded-xl border border-line bg-surface shadow-sm hover:border-primary/50 transition-colors">
                  <img
                    src={selectedRecord.selfieUrl}
                    alt="Ảnh Selfie chân dung"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right Side: OCR Extracted Fields Side-by-side Form */}
          <div className="w-full md:w-[450px] p-6 overflow-y-auto space-y-5">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-fg uppercase tracking-wider font-body">
                Dữ liệu trích xuất từ OCR
              </h3>
              <span className="text-xs font-bold text-accent-2 bg-accent-2/10 px-2.5 py-1 rounded-lg border border-accent-2/20">
                Trùng khớp {selectedRecord.ocrScore}%
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-muted uppercase tracking-wider font-body">
                  Họ và tên (Full Name)
                </label>
                <input
                  type="text"
                  defaultValue={selectedRecord.name}
                  className="w-full mt-1.5 p-2.5 bg-bg/30 border border-line rounded-lg text-xs font-semibold text-fg focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-muted uppercase tracking-wider font-body">
                    Số CCCD (ID Number)
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedRecord.cccdNumber}
                    className="w-full mt-1.5 p-2.5 bg-bg/30 border border-line rounded-lg text-xs font-mono font-semibold text-fg focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-muted uppercase tracking-wider font-body">
                    Ngày sinh (Date of birth)
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedRecord.dob}
                    className="w-full mt-1.5 p-2.5 bg-bg/30 border border-line rounded-lg text-xs font-semibold text-fg focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-muted uppercase tracking-wider font-body">
                    Giới tính (Gender)
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedRecord.gender}
                    className="w-full mt-1.5 p-2.5 bg-bg/30 border border-line rounded-lg text-xs font-semibold text-fg focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-muted uppercase tracking-wider font-body">
                    Email liên kết
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedRecord.email}
                    className="w-full mt-1.5 p-2.5 bg-bg/30 border border-line rounded-lg text-xs font-semibold text-fg focus:outline-none"
                    disabled
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-muted uppercase tracking-wider font-body">
                  Quê quán (Place of origin)
                </label>
                <input
                  type="text"
                  defaultValue={selectedRecord.hometown}
                  className="w-full mt-1.5 p-2.5 bg-bg/30 border border-line rounded-lg text-xs font-semibold text-fg focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-muted uppercase tracking-wider font-body">
                  Nơi thường trú (Residence)
                </label>
                <textarea
                  defaultValue={selectedRecord.address}
                  rows={2}
                  className="w-full mt-1.5 p-2.5 bg-bg/30 border border-line rounded-lg text-xs font-semibold text-fg focus:outline-none resize-none"
                />
              </div>
            </div>

            {/* Verification footer */}
            {selectedRecord.status === 'pending' && (
              <div className="border-t border-line/60 pt-4 mt-6 flex gap-2">
                <button
                  onClick={onShowReject}
                  className="flex-1 py-2.5 bg-surface border border-accent hover:bg-accent/5 text-accent text-xs font-semibold rounded-lg transition-colors"
                >
                  Yêu cầu chụp lại
                </button>
                <button
                  onClick={() => handleVerifyLocal()}
                  className="flex-1 py-2.5 bg-accent-2 hover:bg-accent-2/95 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
                >
                  Xác nhận KYC
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  function handleVerifyLocal(): void {
    void onVerify(selectedRecord.id)
  }
}
