import { ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface PhoneMockupProps {
    children: ReactNode
    className?: string
}

export function PhoneMockup({ children, className }: PhoneMockupProps) {
    return (
        <div className={cn("relative mx-auto aspect-[9/19.5] w-full max-w-[320px] md:max-w-[380px]", className)}>
            {/* Device Frame */}
            <div className="absolute inset-0 z-20 pointer-events-none rounded-[3rem] border-8 border-neutral-900/90 shadow-2xl bg-transparent" />

            {/* Inner Border/Bezel */}
            <div className="absolute inset-2 z-10 pointer-events-none rounded-[2.5rem] border-2 border-white/5 opacity-50" />

            {/* Screen Content */}
            <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] bg-black">
                {children}
            </div>

            {/* Reflection/Glare (Subtle) */}
            <div className="absolute inset-0 z-30 pointer-events-none rounded-[3rem] bg-gradient-to-tr from-white/5 to-transparent opacity-20" />
        </div>
    )
}
