import * as React from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: 'new' | 'progress' | 'followup' | 'review' | 'cold'
}

const variantMap: Record<string, string> = {
    new: 'badge-new',
    progress: 'badge-progress',
    followup: 'badge-followup',
    review: 'badge-review',
    cold: 'badge-cold',
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
    ({ className, variant = 'cold', children, ...props }, ref) => (
        <span
            ref={ref}
            className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[14px] font-bold whitespace-nowrap',
                variantMap[variant],
                className
            )}
            {...props}
        >
            {children}
        </span>
    )
)
Badge.displayName = 'Badge'

export { Badge }
