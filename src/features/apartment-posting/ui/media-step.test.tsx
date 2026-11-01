import * as React from 'react'
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import { useForm, type UseFormReturn } from 'react-hook-form'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { MediaStep } from './media-step'
import { uploadApartmentImages } from '../api/apartment-posting-api'
import type { ApartmentFormValues } from '../model/types'

vi.mock('../api/apartment-posting-api', () => ({
  uploadApartmentImages: vi.fn(),
}))

vi.mock('sonner', () => ({
  toast: {
    loading: vi.fn(() => 'toast-id'),
    success: vi.fn(),
    error: vi.fn(),
  },
}))

const upload = vi.mocked(uploadApartmentImages)

type Form = UseFormReturn<ApartmentFormValues, unknown, ApartmentFormValues>

function Harness({
  gallery = [],
  onForm,
}: {
  gallery?: string[]
  onForm: (form: Form) => void
}): React.ReactElement {
  const form = useForm<ApartmentFormValues>({
    defaultValues: { gallery } as Partial<ApartmentFormValues>,
  })
  onForm(form)
  return <MediaStep form={form} />
}

function renderStep(gallery: string[] = []): { current: () => Form } {
  let form: Form | undefined
  render(
    <Harness
      gallery={gallery}
      onForm={value => {
        form = value
      }}
    />
  )
  return {
    current: () => {
      if (!form) throw new Error('form not ready')
      return form
    },
  }
}

function pickFiles(count: number): void {
  const input = document.querySelector('input[type="file"]') as HTMLInputElement
  const files = Array.from(
    { length: count },
    (_, i) => new File(['x'], `p${i}.jpg`, { type: 'image/jpeg' })
  )
  fireEvent.change(input, { target: { files } })
}

describe('MediaStep', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  afterEach(() => cleanup())

  it('does not let the landlord enter a VR tour link or 360 images', () => {
    renderStep()

    expect(screen.queryByLabelText(/Matterport|VR 3D Tour/i)).toBeNull()
    expect(screen.queryByLabelText(/360/)).toBeNull()
    expect(screen.queryByPlaceholderText(/matterport/i)).toBeNull()
  })

  it('states the real upload limits: 5MB per image', () => {
    renderStep()

    expect(screen.getByText(/tối đa 5MB\/ảnh/)).toBeTruthy()
  })

  it('uploads the chosen photos and appends the returned urls', async () => {
    upload.mockResolvedValue([
      'https://thproptech-bucket.s3.ap-southeast-1.amazonaws.com/apartments/a.jpg',
    ])
    const form = renderStep([
      'https://thproptech-bucket.s3.ap-southeast-1.amazonaws.com/apartments/old.jpg',
    ])

    pickFiles(1)

    await waitFor(() =>
      expect(form.current().getValues('gallery')).toEqual([
        'https://thproptech-bucket.s3.ap-southeast-1.amazonaws.com/apartments/old.jpg',
        'https://thproptech-bucket.s3.ap-southeast-1.amazonaws.com/apartments/a.jpg',
      ])
    )
    expect(upload).toHaveBeenCalledTimes(1)
  })

  it('rejects more than 10 photos in one selection without calling the API', () => {
    renderStep()

    pickFiles(11)

    expect(upload).not.toHaveBeenCalled()
  })

  it('rejects a selection that would exceed 20 photos overall', () => {
    const existing = Array.from({ length: 18 }, (_, i) => `https://x/${i}.jpg`)
    renderStep(existing)

    pickFiles(3)

    expect(upload).not.toHaveBeenCalled()
  })

  it('keeps the gallery unchanged when the upload fails', async () => {
    upload.mockRejectedValue(new Error('503'))
    const form = renderStep(['https://x/keep.jpg'])

    pickFiles(1)

    await waitFor(() => expect(upload).toHaveBeenCalled())
    expect(form.current().getValues('gallery')).toEqual(['https://x/keep.jpg'])
  })
})
