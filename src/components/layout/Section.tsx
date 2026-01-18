import { useEffect, useRef, ReactNode } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionProps {
    id?: string
    className?: string
    children: ReactNode
    fullHeight?: boolean
    delay?: number
}

export function Section({
    id,
    className,
    children,
    fullHeight = true,
    delay = 0
}: SectionProps) {
    const ref = useRef<HTMLElement>(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })
    const controls = useAnimation()

    useEffect(() => {
        if (isInView) {
            controls.start('visible')
        }
    }, [isInView, controls])

    return (
        <motion.section
            ref={ref}
            id={id}
            className={cn(
                'relative overflow-hidden',
                fullHeight && 'min-h-screen',
                className
            )}
            initial="hidden"
            animate={controls}
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        delay,
                        duration: 0.8,
                        staggerChildren: 0.1,
                    },
                },
            }}
        >
            {children}
        </motion.section>
    )
}

export default Section
