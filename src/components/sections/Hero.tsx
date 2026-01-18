import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Github, Download } from 'lucide-react'
import { NeuralMesh } from '@/components/effects/NeuralMesh'
import { GlowOrb } from '@/components/effects/GlowOrb'
import { Button } from '@/components/ui/Button'
import { TextReveal, FadeIn } from '@/components/ui/TextReveal'

export function Hero() {
    const containerRef = useRef<HTMLElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    })

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
    const y = useTransform(scrollYProgress, [0, 0.5], [0, -100])
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])

    const scrollToSection = (href: string) => {
        const element = document.querySelector(href)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <section
            ref={containerRef}
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Background Elements */}
            <div className="absolute inset-0 bg-bg-primary" />
            <NeuralMesh className="absolute inset-0 z-0" />

            {/* Glow Orbs */}
            <GlowOrb
                className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2"
                color="primary"
                size="xl"
            />
            <GlowOrb
                className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2"
                color="secondary"
                size="lg"
            />

            {/* Content */}
            <motion.div
                className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20"
                style={{ opacity, y, scale }}
            >
                {/* Badge */}
                <FadeIn delay={0} className="mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-text-secondary">
                        <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
                        <span>Open Source • Privacy First</span>
                    </div>
                </FadeIn>

                {/* Main Title */}
                <div className="mb-6">
                    <h1 className="text-hero font-bold tracking-tight">
                        <TextReveal delay={0.1} staggerWords>
                            Flow
                        </TextReveal>
                    </h1>
                </div>

                {/* Subtitle */}
                <div className="mb-4">
                    <h2 className="text-heading text-text-primary font-medium">
                        <TextReveal delay={0.3} staggerWords>
                            A YouTube client that learns with you.
                        </TextReveal>
                    </h2>
                </div>

                {/* Description */}
                <FadeIn delay={0.5} className="mb-12">
                    <p className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto">
                        No ads. No tracking. Local intelligence.
                    </p>
                </FadeIn>

                {/* CTAs */}
                <FadeIn delay={0.7}>
                    <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
                        <Button
                            variant="primary"
                            size="lg"
                            icon={<ArrowRight className="w-5 h-5" />}
                            onClick={() => scrollToSection('#features')}
                        >
                            Explore Flow
                        </Button>

                        <a href="https://github.com/A-EDev/Flow/releases" target="_blank" rel="noopener noreferrer">
                            <Button
                                variant="secondary"
                                size="lg"
                                icon={<Download className="w-5 h-5" />}
                            >
                                Download for Android
                            </Button>
                        </a>

                        <a href="https://github.com/A-EDev/Flow" target="_blank" rel="noopener noreferrer">
                            <Button
                                variant="ghost"
                                size="lg"
                                icon={<Github className="w-5 h-5" />}
                                iconPosition="left"
                            >
                                View on GitHub
                            </Button>
                        </a>
                    </div>
                </FadeIn>
            </motion.div>

            {/* Scroll Indicator - positioned relative to section, not content */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
            >
                <motion.div
                    className="flex flex-col items-center gap-2 text-text-muted cursor-pointer"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    onClick={() => scrollToSection('#problem')}
                >
                    <span className="text-sm">Scroll to explore</span>
                    <div className="w-6 h-10 rounded-full border-2 border-text-muted/30 flex items-start justify-center p-1">
                        <motion.div
                            className="w-1.5 h-3 rounded-full bg-accent-primary"
                            animate={{ y: [0, 16, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    )
}

export default Hero
