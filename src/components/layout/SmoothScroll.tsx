import { useEffect, useRef, ReactNode } from 'react'
import Lenis from '@studio-freight/lenis'

interface SmoothScrollProps {
    children: ReactNode
}

export function SmoothScroll({ children }: SmoothScrollProps) {
    const lenisRef = useRef<Lenis | null>(null)

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        })

        lenisRef.current = lenis

        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

            // Add lenis to window for GSAP integration
            ; (window as any).lenis = lenis

        return () => {
            lenis.destroy()
        }
    }, [])

    return <>{children}</>
}

export default SmoothScroll
