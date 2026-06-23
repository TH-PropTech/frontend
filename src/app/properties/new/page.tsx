'use client'

import * as React from 'react'
import { ApartmentPostingForm } from '@/features/apartment-posting'

export default function NewPropertyPage(): React.ReactElement {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 min-h-screen">
      <ApartmentPostingForm mode="create" />
    </div>
  )
}
