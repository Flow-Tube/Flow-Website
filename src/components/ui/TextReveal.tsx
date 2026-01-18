import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TextRevealProps {
    children: string
    className?: string
    delay?: number
    duration?: number
    once?: boolean
    staggerWords?: boolean
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
}

export function TextReveal({
    children,
    className,
    delay = 0,
    duration = 0.8,
    once = true,
    staggerWords = false,
    as: Component = 'span',
}: TextRevealProps) {
    const ref = useRef<HTMLElement>(null)
    const isInView = useInView(ref, { once, margin: '-50px' })

    if (staggerWords) {
        const words = children.split(' ')

        return (
            <Component ref={ref as any} className={cn('inline-block', className)}>
                {words.map((word, index) => (
                    <span key={index} className="inline-block overflow-hidden mr-[0.25em]">
                        <motion.span
                            className="inline-block"
                            initial={{ y: '100%', opacity: 0 }}
                            animate={isInView ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
                            transition={{
                                duration,
                                delay: delay + index * 0.05,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                        >
                            {word}
                        </motion.span>
                    </span>
                ))}
            </Component>
        )
    }

    return (
        <Component ref={ref as any} className={cn('overflow-hidden inline-block', className)}>
            <motion.span
                className="inline-block"
                initial={{ y: '100%', opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
                transition={{
                    duration,
                    delay,
                    ease: [0.16, 1, 0.3, 1],
                }}
            >
                {children}
            </motion.span>
        </Component>
    )
}

interface FadeInProps {
    children: React.ReactNode
    className?: string
    delay?: number
    duration?: number
    direction?: 'up' | 'down' | 'left' | 'right' | 'none'
    once?: boolean
}

export function FadeIn({
    children,
    className,
    delay = 0,
    duration = 0.8,
    direction = 'up',
    once = true,
}: FadeInProps) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once, margin: '-50px' })

    const directions = {
        up: { y: 30, x: 0 },
        down: { y: -30, x: 0 },
        left: { y: 0, x: 30 },
        right: { y: 0, x: -30 },
        none: { y: 0, x: 0 },
    }

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{
                opacity: 0,
                y: directions[direction].y,
                x: directions[direction].x
            }}
            animate={isInView ? { opacity: 1, y: 0, x: 0 } : {
                opacity: 0,
                y: directions[direction].y,
                x: directions[direction].x
            }}
            transition={{
                duration,
                delay,
                ease: [0.16, 1, 0.3, 1],
            }}
        >
            {children}
        </motion.div>
    )
}

export default TextReveal
