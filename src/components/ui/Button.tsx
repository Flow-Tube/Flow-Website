import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children' | 'ref'> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'brand'
    size?: 'sm' | 'md' | 'lg'
    children: React.ReactNode
    icon?: React.ReactNode
    iconPosition?: 'left' | 'right'
    href?: string
    target?: string
    rel?: string
    to?: string
}

const MotionLink = motion.create(Link)

const variantStyles = {
    primary: 'bg-text-primary text-bg-primary shadow-[0_8px_18px_-10px_rgba(0,0,0,0.55)] hover:opacity-90',
    secondary: 'bg-bg-elevated text-text-primary border border-border-subtle hover:border-text-muted',
    ghost: 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated',
    outline: 'border border-border-subtle text-text-primary hover:border-text-primary',
    brand: 'bg-[#E00000] text-white shadow-[0_8px_18px_-10px_rgba(224,0,0,0.6)] hover:bg-[#C80000]',
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
        to,
        ...props
    }, ref) => {
        const Component: any = to ? MotionLink : props.href ? motion.a : motion.button

        return (
            <Component
                ref={ref as any}
                to={to}
                className={cn(
                    'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-[background-color,border-color,color,opacity] duration-200 cursor-pointer',
                    variantStyles[variant],
                    sizeStyles[size],
                    className
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
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
