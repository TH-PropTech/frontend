import type { Route } from 'next'
import { redirect } from 'next/navigation'

export default function AdminPage(): never {
  redirect('/admin/overview' as Route)
}
