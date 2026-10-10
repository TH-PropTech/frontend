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
          Chatbot chỉ trả lời các câu hỏi pháp lý dựa trên những văn bản đang áp
          dụng bên dưới. Dán liên kết văn bản, rà soát nội dung đã chắt lọc rồi
          xuất bản.
        </p>
      </div>
      <LegalKnowledgeManager />
    </div>
  )
}
