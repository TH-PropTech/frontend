'use client'

import * as React from 'react'

interface KycRecordData {
  cccdNumber: string
  name: string
  dob: string
  hometown: string
  address: string
}

interface CccdMockupCardProps {
  record: KycRecordData
  side: 'front' | 'back'
}

export function CccdMockupCard({
  record,
  side,
}: CccdMockupCardProps): React.ReactElement {
  if (side === 'front') {
    return (
      <div className="relative aspect-[1.58/1] w-full max-w-sm mx-auto bg-surface-muted/60 border border-line rounded-xl p-4 shadow-sm overflow-hidden flex flex-col justify-between">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              'radial-gradient(circle at 50% 50%, var(--border) 2px, transparent 0)',
            backgroundSize: '12px 12px',
          }}
        />
        <div className="relative flex justify-between items-start">
          <div className="text-[8px] font-bold text-fg font-body leading-tight">
            CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
            <br />
            Độc lập - Tự do - Hạnh phúc
          </div>
          <span className="text-[9px] font-bold text-fg border border-line px-1 py-0.5 rounded bg-surface/50">
            CCCD
          </span>
        </div>

        <div className="relative flex gap-3 my-2 items-center">
          {/* Simulated avatar */}
          <div className="h-14 w-11 bg-surface-muted rounded border border-line flex items-center justify-center text-muted font-mono text-[8px]">
            ảnh 3x4
          </div>
          {/* Key identity text */}
          <div className="text-[8px] space-y-1 font-body text-fg">
            <div>
              <span className="text-muted">Số/No:</span>{' '}
              <strong className="font-mono text-[10px]">
                {record.cccdNumber}
              </strong>
            </div>
            <div>
              <span className="text-muted">Họ và tên/Full name:</span>{' '}
              <strong>{record.name}</strong>
            </div>
            <div>
              <span className="text-muted">Ngày sinh/Date of birth:</span>{' '}
              <strong>{record.dob}</strong>
            </div>
            <div>
              <span className="text-muted">Quê quán/Place of origin:</span>{' '}
              <strong>{record.hometown}</strong>
            </div>
          </div>
        </div>

        <div className="text-[6px] text-muted font-body text-right border-t border-line pt-1.5">
          CỤC TRƯỞNG CỤC CẢNH SÁT QUẢN LÝ HÀNH CHÍNH VỀ TRẬT TỰ XÃ HỘI
        </div>
      </div>
    )
  }

  return (
    <div className="relative aspect-[1.58/1] w-full max-w-sm mx-auto bg-surface-muted/60 border border-line rounded-xl p-4 shadow-sm overflow-hidden flex flex-col justify-between">
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 50%, var(--border) 2px, transparent 0)',
          backgroundSize: '12px 12px',
        }}
      />
      <div className="relative flex justify-between items-start">
        <span className="text-[7px] text-fg font-body">
          MẶT SAU / BACK SIDE
        </span>
        <span className="text-[8px] font-mono text-fg">MRZ ZONE CODE</span>
      </div>

      <div className="relative flex gap-4 my-2 items-center">
        {/* Fingerprint block */}
        <div className="h-10 w-10 border border-dashed border-line bg-surface/40 rounded flex items-center justify-center text-[6px] text-muted font-body">
          vân tay
        </div>
        {/* Address info */}
        <div className="text-[8px] font-body text-fg flex-1 space-y-0.5">
          <div>
            <span className="text-muted">Nơi thường trú:</span>
            <br />
            <strong>{record.address}</strong>
          </div>
        </div>
      </div>

      {/* MRZ bar */}
      <div className="bg-surface-muted border border-line p-1 rounded font-mono text-[7px] text-fg tracking-wider">
        I<span className="text-primary">VNM</span>
        {record.cccdNumber}
        &lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
        <br />
        0208154M&lt;&lt;&lt;&lt;&lt;&lt;&lt;VNM&lt;&lt;&lt;&lt;&lt;&lt;&lt;NGUYEN&lt;&lt;VAN&lt;A
      </div>
    </div>
  )
}
