import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    'flex h-9 w-full rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#4F6EF7] focus:ring-2 focus:ring-[#4F6EF7]/12 transition-all',
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Input.displayName = 'Input'

export { Input }
