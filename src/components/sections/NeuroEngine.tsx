import { motion } from 'framer-motion'
import { Brain, Lock, SlidersHorizontal } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { FadeIn } from '@/components/ui/TextReveal'

const pillars = [
    {
        icon: Brain,
        title: 'Local Learning',
        description: 'Analyzes your watch behavior locally to build a unique personality profile, breaking you out of algorithmic loops.'
    },
    {
        icon: SlidersHorizontal,
        title: 'Inspect & Adjust',
        description: 'See exactly what topics the algorithm associates with you. Manually adjust their weights or remove them entirely.'
    },
    {
        icon: Lock,
        title: 'Data Portability',
        description: 'Your data belongs to you. Export your entire recommendation profile or wipe it clean at any time with a single tap.'
    }
]

const interests = [
    { name: 'Programming', weight: 92 },
    { name: 'Cinematography', weight: 78 },
    { name: 'Science', weight: 65 },
    { name: 'Jazz Music', weight: 50 },
    { name: 'Architecture', weight: 45 },
]

export function NeuroEngine() {
    return (
        <Section id="neuro-engine" fullHeight={false} className="bg-bg-secondary border-b border-border-subtle py-24 md:py-32">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Header */}
                <FadeIn>
                    <div className="mb-16 md:mb-24 max-w-3xl">
                        <p className="kicker mb-4">03 &mdash; The Engine</p>
                        <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6 tracking-tight">
                            Intelligence without compromise.
                        </h2>
                        <p className="text-lg text-text-secondary leading-relaxed">
                            A recommendation algorithm that runs entirely on your device.
                            It learns your preferences without ever transmitting your data to a cloud server —
                            and you have total control over what it knows.
                        </p>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    {/* Pillars */}
                    <div className="lg:col-span-6">
                        {pillars.map((pillar, i) => (
                            <FadeIn key={pillar.title} delay={i * 0.1}>
                                <div className={`flex items-start gap-6 py-8 ${i > 0 ? 'border-t border-border-subtle' : ''}`}>
                                    <div className="w-12 h-12 rounded-xl bg-bg-elevated flex items-center justify-center flex-shrink-0">
                                        <pillar.icon className="w-5 h-5 text-text-primary" strokeWidth={1.75} />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-text-primary mb-1.5">{pillar.title}</h4>
                                        <p className="text-text-secondary text-sm leading-relaxed">{pillar.description}</p>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>

                    {/* Interest Profile Readout */}
                    <FadeIn delay={0.15} className="lg:col-span-6">
                        <div className="rounded-2xl border border-border-subtle bg-bg-primary overflow-hidden">
                            {/* Panel Header */}
                            <div className="flex items-center justify-between px-6 md:px-8 py-5 border-b border-border-subtle">
                                <span className="kicker">Interest Profile</span>
                                
                            </div>

                            {/* Topic Rows */}
                            <div className="px-6 md:px-8 py-6 space-y-5">
                                {interests.map((topic, i) => (
                                    <div key={topic.name}>
                                        <div className="flex items-baseline justify-between mb-2">
                                            <span className="text-sm font-medium text-text-primary">{topic.name}</span>
                                            <span className="text-xs font-semibold text-text-secondary tabular-nums">{topic.weight}%</span>
                                        </div>
                                        <div className="h-1.5 rounded-full bg-bg-elevated overflow-hidden">
                                            <motion.div
                                                className="h-full rounded-full bg-accent-primary"
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${topic.weight}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Panel Footer */}
                            <div className="flex items-baseline justify-between px-6 md:px-8 py-4 border-t border-border-subtle">
                                <p className="kicker">Nothing leaves this device</p>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </Section>
    )
}

export default NeuroEngine
