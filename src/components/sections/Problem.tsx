import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Section } from '@/components/layout/Section'
import { TextReveal, FadeIn } from '@/components/ui/TextReveal'

export function Problem() {
    const containerRef = useRef<HTMLElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    })


    const chaosOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0.8, 0.2])

    // Generate mock video thumbnails for the chaos effect
    const chaosThumbnails = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
        rotation: Math.random() * 30 - 15,
        scale: 0.5 + Math.random() * 0.5,
        delay: Math.random() * 0.5,
    }))

    return (
        <Section
            id="problem"
            className="relative py-32"
        >
            {/* Chaotic Background */}
            <motion.div
                className="absolute inset-0 overflow-hidden"
                style={{
                    opacity: chaosOpacity,
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-transparent to-bg-primary z-10" />

                {chaosThumbnails.map((thumb) => (
                    <motion.div
                        key={thumb.id}
                        className="absolute w-48 h-28 rounded-lg bg-gradient-to-br from-red-500/20 via-yellow-500/20 to-orange-500/20"
                        style={{
                            left: `${50 + thumb.x}%`,
                            top: `${50 + thumb.y}%`,
                            rotate: `${thumb.rotation}deg`,
                            scale: thumb.scale,
                        }}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 0.5, y: 0 }}
                        transition={{
                            delay: thumb.delay,
                            duration: 0.8,
                            ease: 'easeOut'
                        }}
                    >
                        {/* Mock video thumbnail */}
                        <div className="w-full h-full rounded-lg overflow-hidden">
                            <div className="w-full h-full bg-white/5 animate-pulse" />
                        </div>
                    </motion.div>
                ))}

                {/* Noise overlay */}
                <div className="absolute inset-0 bg-gradient-radial from-transparent via-bg-primary/50 to-bg-primary" />
            </motion.div>

            {/* Content */}
            <div className="relative z-10 section-content flex flex-col items-center justify-center min-h-screen text-center">
                {/* First message */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-display font-bold text-text-primary">
                        <TextReveal delay={0} staggerWords>
                            Today's algorithms
                        </TextReveal>
                    </h2>
                    <h2 className="text-display font-bold text-text-primary">
                        <TextReveal delay={0.2} staggerWords>
                            decide what you see.
                        </TextReveal>
                    </h2>
                </motion.div>

                {/* Second message */}
                <FadeIn delay={0.5} className="mb-16">
                    <p className="text-heading text-text-secondary">
                        And never explain why.
                    </p>
                </FadeIn>

                {/* Divider */}
                <FadeIn delay={0.8} className="mb-16">
                    <motion.div
                        className="w-24 h-px bg-gradient-to-r from-transparent via-accent-primary to-transparent"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                    />
                </FadeIn>

                {/* Resolution */}
                <FadeIn delay={1}>
                    <h3 className="text-display font-bold text-gradient">
                        Flow is different.
                    </h3>
                </FadeIn>
            </div>
        </Section>
    )
}

export default Problem
