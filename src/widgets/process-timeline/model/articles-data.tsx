import * as React from 'react'
import { servicesPaymentsCategories } from './categories/services-payments'
import { postingAccountsCategories } from './categories/posting-accounts'
import { vrtourPoliciesCategories } from './categories/vrtour-policies'

export interface Article {
  id: string
  title: string
  breadcrumbs: string[]
  content: React.ReactNode
}

export interface Category {
  id: string
  title: string
  desc: string
  icon: React.ReactNode
  articles: Article[]
}

export const categories: Category[] = [
  ...servicesPaymentsCategories,
  ...postingAccountsCategories,
  ...vrtourPoliciesCategories,
]
