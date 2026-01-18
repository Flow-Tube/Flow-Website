import { ReactNode, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

interface BentoGridProps {
    children: ReactNode
    className?: string
}

export function BentoGrid({ children, className }: BentoGridProps) {
    return (
        <div className={cn('grid gap-4 md:gap-6', className)}>
            {children}
        </div>
    )
}

interface BentoCardProps {
    children: ReactNode
    className?: string
    colSpan?: 1 | 2 | 3 | 4 | 6 | 12
    rowSpan?: 1 | 2 | 3
    delay?: number
    hover?: boolean
    glow?: boolean
}

export function BentoCard({
    children,
    className,
    colSpan = 1,
    rowSpan = 1,
    delay = 0,
    hover = true,
    glow = false,
}: BentoCardProps) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: '-50px' })

    const colSpanClasses = {
        1: 'col-span-12 md:col-span-6 lg:col-span-4',
        2: 'col-span-12 md:col-span-6',
        3: 'col-span-12 md:col-span-6 lg:col-span-4',
        4: 'col-span-12 md:col-span-6 lg:col-span-4',
        6: 'col-span-12 lg:col-span-6',
        12: 'col-span-12',
    }

    const rowSpanClasses = {
        1: 'row-span-1',
        2: 'row-span-1 md:row-span-2',
        3: 'row-span-1 md:row-span-3',
    }

    return (
        <motion.div
            ref={ref}
            className={cn(
                'relative rounded-2xl p-6 md:p-8',
                'bg-bg-card/60 backdrop-blur-xl',
                'border border-white/5',
                'overflow-hidden',
                colSpanClasses[colSpan],
                rowSpanClasses[rowSpan],
                glow && 'glow-border',
                className
            )}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
            transition={{
                duration: 0.6,
                delay,
                ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={hover ? {
                y: -4,
                scale: 1.01,
                transition: { duration: 0.3 }
            } : undefined}
        >
            {children}
        </motion.div>
    )
}

interface BentoCardHeaderProps {
    icon?: ReactNode
    title: string
    subtitle?: string
    className?: string
}

export function BentoCardHeader({
    icon,
    title,
    subtitle,
    className,
}: BentoCardHeaderProps) {
    return (
        <div className={cn('mb-4', className)}>
            {icon && (
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-accent-primary/10 text-accent-primary mb-3">
                    {icon}
                </div>
            )}
            <h3 className="text-lg md:text-xl font-semibold text-text-primary">
                {title}
            </h3>
            {subtitle && (
                <p className="text-sm text-text-secondary mt-1">
                    {subtitle}
                </p>
            )}
        </div>
    )
}

export default BentoGrid
