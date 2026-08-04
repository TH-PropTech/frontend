'use client'

import {
  SaveSearchDialog,
  type SavedSearchFilters,
} from '@/features/saved-searches'

interface SavedSearchControlProps {
  filters: SavedSearchFilters
}

export function SavedSearchControl({
  filters,
}: SavedSearchControlProps): React.ReactElement {
  return (
    <div className="mx-auto mt-5 flex max-w-6xl justify-end px-6 md:px-10">
      <SaveSearchDialog currentFilters={filters} />
    </div>
  )
}
