import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/shared/lib/utils'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, className, type = 'button', ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        className={cn(
          'inline-flex items-center justify-center rounded-md bg-control px-4 py-2 text-sm font-medium text-control-foreground transition-colors hover:bg-control-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control focus-visible:ring-offset-2',
          className
        )}
        ref={ref}
        type={asChild ? undefined : type}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'
