import { useRef, useState, useEffect } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CounterProps {
    from?: number
    to: number
    duration?: number
    delay?: number
    className?: string
    prefix?: string
    suffix?: string
    decimals?: number
}

export function Counter({
    from = 0,
    to,
    duration = 2,
    delay = 0,
    className,
    prefix = '',
    suffix = '',
    decimals = 0,
}: CounterProps) {
    const ref = useRef<HTMLSpanElement>(null)
    const isInView = useInView(ref, { once: true, margin: '-50px' })
    const [value, setValue] = useState(from)

    useEffect(() => {
        if (isInView) {
            const timeout = setTimeout(() => {
                const controls = animate(from, to, {
                    duration,
                    ease: 'easeOut',
                    onUpdate: (latest) => setValue(latest),
                })
                return () => controls.stop()
            }, delay * 1000)

            return () => clearTimeout(timeout)
        }
    }, [isInView, from, to, duration, delay])

    return (
        <span ref={ref} className={cn('tabular-nums', className)}>
            {prefix}
            {value.toFixed(decimals)}
            {suffix}
        </span>
    )
}

interface ProgressBarProps {
    value: number
    max?: number
    className?: string
    barClassName?: string
    delay?: number
    showLabel?: boolean
}

export function ProgressBar({
    value,
    max = 100,
    className,
    barClassName,
    delay = 0,
    showLabel = false,
}: ProgressBarProps) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: '-50px' })
    const percentage = Math.min((value / max) * 100, 100)

    return (
        <div ref={ref} className={cn('relative', className)}>
            <div className="h-2 bg-bg-elevated rounded-full overflow-hidden">
                <motion.div
                    className={cn(
                        'h-full bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full',
                        barClassName
                    )}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
                    transition={{
                        duration: 1,
                        delay,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                />
            </div>
            {showLabel && (
                <span className="absolute right-0 -top-6 text-sm text-text-secondary">
                    {percentage.toFixed(0)}%
                </span>
            )}
        </div>
    )
}

export default Counter
