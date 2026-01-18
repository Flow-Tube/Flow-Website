import { cn } from '@/lib/utils'

interface GrainOverlayProps {
    className?: string
    opacity?: number
}

export function GrainOverlay({ className, opacity = 0.03 }: GrainOverlayProps) {
    return (
        <div
            className={cn('grain-overlay', className)}
            style={{ opacity }}
            aria-hidden="true"
        />
    )
}

export default GrainOverlay
