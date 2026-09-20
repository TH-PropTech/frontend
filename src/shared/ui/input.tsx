'use client'

import * as React from 'react'
import { cn } from '@/shared/lib/utils'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
  icon?: React.ReactNode
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-fg">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-subtle">
              {icon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              'w-full rounded-md border border-border bg-surface px-3.5 py-2.5 text-sm text-fg',
              'placeholder:text-subtle',
              'outline-none transition-all duration-150',
              'focus:border-primary focus:ring-2 focus:ring-primary-soft',
              'hover:border-border-strong',
              'disabled:cursor-not-allowed disabled:opacity-50',
              className,
              icon && 'pl-10',
              error &&
                'border-danger focus:border-danger focus:ring-danger-soft'
            )}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...props}
          />
        </div>
        {error && (
          <p
            id={`${inputId}-error`}
            className="text-xs text-danger"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
