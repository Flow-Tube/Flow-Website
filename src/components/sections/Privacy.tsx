import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Shield, Check, Lock, Trash2 } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { TextReveal, FadeIn } from '@/components/ui/TextReveal'
import { GlowOrb } from '@/components/effects/GlowOrb'

const privacyFeatures = [
    { icon: Lock, text: 'No Google account required' },
    { icon: Shield, text: 'No advertisements' },
    { icon: Check, text: 'No tracking or analytics' },
    { icon: Trash2, text: 'Fully resettable at any time' },
]

export function Privacy() {
    const containerRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    })

    const deviceScale = useTransform(scrollYProgress, [0.2, 0.5], [1.2, 1])
    const neuralOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0.5, 0])
    const deviceOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1])

    return (
        <Section id="privacy" className="py-32 relative">
            <GlowOrb className="absolute top-1/3 right-1/4" color="light" size="md" />

            <div className="section-content" ref={containerRef}>
                {/* Header */}
                <div className="text-center mb-16">
                    <FadeIn>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-accent-cyan mb-6">
                            <Shield className="w-4 h-4" />
                            <span>Privacy First</span>
                        </div>
                    </FadeIn>

                    <h2 className="text-display font-bold mb-6">
                        <TextReveal staggerWords>
                            Quietly Powerful
                        </TextReveal>
                    </h2>

                    <FadeIn delay={0.3}>
                        <p className="text-2xl text-text-primary font-medium mb-2">
                            Your data never leaves your device.
                        </p>
                        <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                            Everything Flow learns stays with you. Always.
                        </p>
                    </FadeIn>
                </div>

                {/* Visual Demo */}
                <div className="relative max-w-lg mx-auto mb-16">
                    {/* Neural lines collapsing */}
                    <motion.div
                        className="absolute inset-0"
                        style={{ opacity: neuralOpacity }}
                    >
                        {Array.from({ length: 8 }).map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-full h-px bg-gradient-to-r from-transparent via-accent-primary/30 to-transparent"
                                style={{
                                    top: `${20 + i * 10}%`,
                                    transform: `rotate(${i % 2 === 0 ? 5 : -5}deg)`,
                                }}
                            />
                        ))}
                    </motion.div>

                    {/* Device */}
                    <FadeIn delay={0.4}>
                        <motion.div
                            className="relative mx-auto w-48 h-80"
                            style={{ scale: deviceScale, opacity: deviceOpacity }}
                        >
                            {/* Phone frame */}
                            <div className="absolute inset-0 rounded-[2.5rem] border-4 border-text-muted/30 bg-bg-card/80 backdrop-blur-xl overflow-hidden">
                                {/* Screen */}
                                <div className="absolute inset-2 rounded-[2rem] bg-bg-primary overflow-hidden">
                                    {/* Status bar */}
                                    <div className="h-6 flex items-center justify-center">
                                        <div className="w-20 h-4 rounded-full bg-black" />
                                    </div>

                                    {/* Content */}
                                    <div className="p-4 flex flex-col items-center justify-center h-full -mt-6">
                                        <motion.div
                                            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center mb-4"
                                            animate={{ scale: [1, 1.05, 1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            <Lock className="w-8 h-8 text-white" />
                                        </motion.div>
                                        <p className="text-sm font-medium text-text-primary text-center">
                                            All data stored locally
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Shield icon */}
                            <motion.div
                                className="absolute -right-8 -top-4 w-16 h-16 rounded-2xl bg-accent-cyan/10 border border-accent-cyan/30 flex items-center justify-center"
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                <Shield className="w-8 h-8 text-accent-cyan" />
                            </motion.div>
                        </motion.div>
                    </FadeIn>
                </div>

                {/* Checklist */}
                <div className="max-w-xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {privacyFeatures.map((feature, index) => (
                            <motion.div
                                key={feature.text}
                                className="flex items-center gap-3 p-4 rounded-xl glass"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                            >
                                <motion.div
                                    className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center"
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.7 + index * 0.1, type: 'spring' }}
                                >
                                    <Check className="w-4 h-4 text-green-400" />
                                </motion.div>
                                <span className="text-text-primary">{feature.text}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    )
}

export default Privacy
