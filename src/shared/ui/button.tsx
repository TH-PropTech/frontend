import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/shared/lib/utils'

export const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-control text-control-text hover:bg-primary-hover active:bg-primary-hover shadow-sm',
        primary:
          'bg-control text-control-text hover:bg-primary-hover active:bg-primary-hover shadow-sm',
        secondary:
          'bg-surface border border-border text-fg hover:bg-surface-muted active:bg-surface-muted',
        outline:
          'border border-border bg-transparent text-fg hover:bg-surface-muted active:bg-surface-muted',
        ghost:
          'bg-transparent text-fg hover:bg-surface-muted active:bg-surface-muted',
        danger:
          'bg-danger text-white hover:bg-danger/90 active:bg-danger/80 shadow-sm',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 text-sm gap-2 rounded-md',
        sm: 'h-8 px-3 text-xs gap-1.5 rounded-md',
        md: 'h-10 px-4 text-sm gap-2 rounded-md',
        lg: 'h-12 px-6 text-base gap-2 rounded-lg',
        icon: 'h-10 w-10 p-0 flex items-center justify-center rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    loading?: boolean
  }

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      asChild = false,
      variant = 'default',
      size = 'default',
      loading = false,
      disabled,
      className,
      type = 'button',
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'
    const isDisabled = disabled || loading

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        type={asChild ? undefined : type}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="mr-2 h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            {children}
          </>
        ) : (
          children
        )}
      </Comp>
    )
  }
)

Button.displayName = 'Button'
