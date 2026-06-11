'use client'

import * as React from 'react'

export function TaskDoughnutChart(): React.ReactElement {
  return (
    <div className="bg-surface border border-line rounded-xl p-5 shadow-sm flex flex-col justify-between">
      <div>
        <h4 className="text-xs font-bold text-fg font-body uppercase tracking-wider">
          Phân bổ Công việc
        </h4>
        <p className="text-[11px] text-muted mt-1">
          Tỉ lệ phần trạng các loại hồ sơ tồn đọng.
        </p>
      </div>

      <div className="flex justify-center items-center py-2 relative">
        <svg width="120" height="120" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r="75"
            fill="transparent"
            stroke="var(--line)"
            strokeWidth="16"
          />
          <circle
            cx="100"
            cy="100"
            r="75"
            fill="transparent"
            stroke="#c65a3a"
            strokeWidth="18"
            strokeDasharray="235.6 471.2"
            strokeDashoffset="0"
            strokeLinecap="round"
            transform="rotate(-90 100 100)"
          />
          <circle
            cx="100"
            cy="100"
            r="75"
            fill="transparent"
            stroke="#6b8e4e"
            strokeWidth="18"
            strokeDasharray="164.9 471.2"
            strokeDashoffset="-235.6"
            strokeLinecap="round"
            transform="rotate(-90 100 100)"
          />
          <circle
            cx="100"
            cy="100"
            r="75"
            fill="transparent"
            stroke="#d64545"
            strokeWidth="18"
            strokeDasharray="70.7 471.2"
            strokeDashoffset="-400.5"
            strokeLinecap="round"
            transform="rotate(-90 100 100)"
          />
          <text
            x="100"
            y="96"
            fill="var(--fg)"
            fontSize="24"
            fontWeight="bold"
            textAnchor="middle"
            className="font-display"
          >
            43
          </text>
          <text
            x="100"
            y="116"
            fill="var(--muted)"
            fontSize="9"
            fontWeight="bold"
            textAnchor="middle"
            className="tracking-wider uppercase"
          >
            TÁC VỤ
          </text>
        </svg>
      </div>

      <div className="space-y-1.5 pt-3 border-t border-line">
        <div className="flex justify-between items-center text-[10px] font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#c65a3a]" />
            <span className="text-muted">Duyệt tin bđs</span>
          </div>
          <span className="text-fg">21 căn (50%)</span>
        </div>
        <div className="flex justify-between items-center text-[10px] font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#6b8e4e]" />
            <span className="text-muted">Định danh KYC</span>
          </div>
          <span className="text-fg">15 hs (35%)</span>
        </div>
        <div className="flex justify-between items-center text-[10px] font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#d64545]" />
            <span className="text-muted">Tranh chấp cọc</span>
          </div>
          <span className="text-fg">7 hs (15%)</span>
        </div>
      </div>
    </div>
  )
}
