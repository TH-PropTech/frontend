'use client'

import * as React from 'react'
import { LegalKnowledgeManager } from '@/features/legal-knowledge'

export function LegalKnowledgeView(): React.ReactElement {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold font-marketing text-fg">
          Kho tri thức luật & quy định
        </h1>
        <p className="text-xs text-muted mt-1">
          Dán liên kết văn bản: hệ thống tải trang một lần, chắt lọc nội dung
          chính rồi lưu vào cơ sở dữ liệu. Chatbot chỉ trả lời dựa trên bản đã
          lưu và đang áp dụng, không đọc lại trang gốc. Xem tab “Kho tri thức”
          để biết nội dung nào lấy từ liên kết nào.
        </p>
      </div>
      <LegalKnowledgeManager />
    </div>
  )
}
