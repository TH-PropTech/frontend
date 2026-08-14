import { apiClient } from '@/shared/api'

export interface ViewingNoteInput {
  apartmentId: string
  bookingId?: string
  noise?: number
  lighting?: number
  smell?: string
  signal?: number
  waterPressure?: number
  parking?: number
  neighbors?: number
  extraFees?: string[]
  questions?: string[]
  photos?: string[]
}

export type ViewingNoteUpdate = Omit<
  Partial<ViewingNoteInput>,
  'apartmentId' | 'bookingId'
>

export interface ViewingNote {
  _id: string
  userId: string
  apartmentId: string
  bookingId: string | null
  noise: number | null
  lighting: number | null
  smell: string | null
  signal: number | null
  waterPressure: number | null
  parking: number | null
  neighbors: number | null
  extraFees: string[]
  questions: string[]
  photos: string[]
  isPrivate: true
  createdAt: string
  updatedAt: string
}

export interface ViewingNoteList {
  items: ViewingNote[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export async function getViewingNotes(
  apartmentId: string
): Promise<ViewingNoteList> {
  const search = new URLSearchParams({
    apartmentId,
    page: '1',
    limit: '20',
  })
  return apiClient.get<ViewingNoteList>(`/viewing-notes?${search.toString()}`)
}

export async function createViewingNote(
  input: ViewingNoteInput
): Promise<ViewingNote> {
  return apiClient.post<ViewingNote>('/viewing-notes', input)
}

export async function updateViewingNote(
  noteId: string,
  input: ViewingNoteUpdate
): Promise<ViewingNote> {
  return apiClient.patch<ViewingNote>(`/viewing-notes/${noteId}`, input)
}

export async function deleteViewingNote(noteId: string): Promise<void> {
  return apiClient.delete<void>(`/viewing-notes/${noteId}`)
}
