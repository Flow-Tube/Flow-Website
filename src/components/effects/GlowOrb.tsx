import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlowOrbProps {
    className?: string
    color?: 'primary' | 'secondary' | 'light'
    size?: 'sm' | 'md' | 'lg' | 'xl'
    blur?: number
    animate?: boolean
}

const colorMap = {
    primary: 'from-accent-primary/25',
    secondary: 'from-accent-secondary/25',
    light: 'from-accent-glow/20',
}

const sizeMap = {
    sm: 'w-[300px] h-[300px]',
    md: 'w-[500px] h-[500px]',
    lg: 'w-[700px] h-[700px]',
    xl: 'w-[900px] h-[900px]',
}

export function GlowOrb({
    className,
    color = 'primary',
    size = 'md',
    blur = 100,
    animate = true,
}: GlowOrbProps) {
    const Comp = animate ? motion.div : 'div'

    return (
        <Comp
            className={cn(
                'absolute rounded-full bg-gradient-radial to-transparent pointer-events-none',
                colorMap[color],
                sizeMap[size],
                className
            )}
            style={{ filter: `blur(${blur}px)` }}
            {...(animate && {
                animate: {
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                },
                transition: {
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                },
            })}
            aria-hidden="true"
        />
    )
}

export default GlowOrb
