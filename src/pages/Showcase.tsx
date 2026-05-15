import { ShowcaseSlider } from '@/components/showcase/ShowcaseSlider'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowLeft } from 'lucide-react'

export function Showcase() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start']
    })

    const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95])

    return (
        <div ref={containerRef} className="relative min-h-screen bg-[#050505] text-white overflow-x-hidden selection:bg-white/20">
            {/* Ambient Background & Noise */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-accent-primary/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[150px]" />
                <div className="absolute inset-0 bg-[url(%22data:image/svg+xml,%3Csvg%20viewBox=%270%200%20200%20200%27%20xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter%20id=%27noiseFilter%27%3E%3CfeTurbulence%20type=%27fractalNoise%27%20baseFrequency=%270.65%27%20numOctaves=%273%27%20stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect%20width=%27100%25%27%20height=%27100%25%27%20filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E%22)] opacity-[0.04] mix-blend-overlay" />
            </div>

            {/* Header / Nav */}
            <nav className="absolute top-0 left-0 w-full z-50 p-6 md:p-10 flex justify-between items-center">
                <Link to="/" className="group flex items-center gap-3 text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Overview
                </Link>
                <div className="text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-white/30">
                    Showcase
                </div>
            </nav>

            <main className="relative z-10 pt-32 md:pt-40 pb-20 min-h-screen flex flex-col items-center">
                {/* Hero Header Section */}
                <motion.div 
                    style={{ y, opacity, scale }}
                    className="text-center px-4 mb-16 md:mb-24 flex flex-col items-center w-full max-w-5xl mx-auto"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h1 className="text-6xl md:text-8xl lg:text-[11rem] font-bold tracking-tighter leading-[0.9] mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/10 pb-4">
                            Inside Flow
                        </h1>
                    </motion.div>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-white/50 text-lg md:text-2xl font-light max-w-2xl mx-auto tracking-wide leading-relaxed"
                    >
                        A guided look into how Flow thinks, adapts, and feels. Explore the intersection of clean design and local intelligence.
                    </motion.p>
                </motion.div>

                {/* Slider Section */}
                <div className="w-full relative z-20 flex-1 flex flex-col justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <ShowcaseSlider />
                    </motion.div>
                </div>
                
                {/* Scroll Indicator */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
                >
                    <span className="text-[10px] tracking-[0.3em] uppercase">Drag to explore</span>
                </motion.div>
            </main>
        </div>
    )
}
