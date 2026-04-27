import { forwardRef } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children' | 'ref'> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
    size?: 'sm' | 'md' | 'lg'
    children: React.ReactNode
    icon?: React.ReactNode
    iconPosition?: 'left' | 'right'
    href?: string
    target?: string
    rel?: string
}

const variantStyles = {
    primary: 'bg-accent-primary text-white hover:bg-accent-hover',
    secondary: 'bg-bg-elevated text-text-primary border border-border-subtle hover:bg-bg-secondary hover:border-text-secondary',
    ghost: 'text-text-secondary hover:text-text-primary hover:bg-black/5 dark:hover:bg-white/5',
    outline: 'border border-border-subtle text-text-primary hover:border-text-primary',
}

const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
    ({
        className,
        variant = 'primary',
        size = 'md',
        children,
        icon,
        iconPosition = 'right',
        ...props
    }, ref) => {
        const Component = (props as any).href ? motion.a : motion.button

        return (
            <Component
                ref={ref as any}
                className={cn(
                    'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 cursor-pointer',
                    variantStyles[variant],
                    sizeStyles[size],
                    className
                )}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                {...(props as any)}
            >
                {icon && iconPosition === 'left' && icon}
                {children}
                {icon && iconPosition === 'right' && icon}
            </Component>
        )
    }
)

Button.displayName = 'Button'

export default Button
