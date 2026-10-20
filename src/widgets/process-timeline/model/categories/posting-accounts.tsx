import * as React from 'react'
import { Category } from '../articles-data'
import { accountArticles, postingArticles } from './articles-accounts-policies'

export const postingAccountsCategories: Category[] = [
  {
    id: 'posting',
    title: 'Hướng dẫn và quy định đăng tin',
    desc: 'Cách đăng tin cho thuê căn hộ, định giá tài sản và quy trình kiểm duyệt.',
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
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
    ),
    articles: postingArticles,
  },
  {
    id: 'accounts',
    title: 'Tài khoản người dùng',
    desc: 'Xác minh danh tính KYC bằng CCCD và bảo mật tài khoản.',
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
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
    articles: accountArticles,
  },
]
