import * as React from 'react'
import { Category } from '../articles-data'
import { paymentsArticles, servicesArticles } from './articles-services'

export const servicesPaymentsCategories: Category[] = [
  {
    id: 'services',
    title: 'Sản phẩm & Dịch vụ',
    desc: 'Quy trình thuê nhà, hợp đồng điện tử, ký bằng VNPT SmartCA và gợi ý căn hộ.',
    icon: (
      <svg
        className="h-6 w-6 text-primary"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012 2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    ),
    articles: servicesArticles,
  },
  {
    id: 'payments',
    title: 'Thanh toán & Giao dịch',
    desc: 'Hướng dẫn thanh toán tiền đặt cọc, tiền thuê và xem hóa đơn.',
    icon: (
      <svg
        className="h-6 w-6 text-primary"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    articles: paymentsArticles,
  },
]
