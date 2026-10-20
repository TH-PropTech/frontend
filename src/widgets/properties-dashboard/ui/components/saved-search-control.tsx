'use client'

import {
  SaveSearchDialog,
  type SavedSearchFilters,
} from '@/features/saved-searches'
import { useCan } from '@/shared/lib/permissions'

interface SavedSearchControlProps {
  filters: SavedSearchFilters
}

export function SavedSearchControl({
  filters,
}: SavedSearchControlProps): React.ReactElement {
  const can = useCan()
  if (!can('create', 'SavedSearch')) return <></>

  return (
    <div className="mx-auto mt-5 flex max-w-6xl justify-end px-4 sm:px-6 md:px-10">
      <SaveSearchDialog currentFilters={filters} />
    </div>
  )
}
