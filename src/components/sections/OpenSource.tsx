import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Github, Users, GitFork, Star, ExternalLink, Code2, AlertCircle, Eye } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { TextReveal, FadeIn } from '@/components/ui/TextReveal'
import { Button } from '@/components/ui/Button'
import { Counter } from '@/components/ui/Counter'
import { GlowOrb } from '@/components/effects/GlowOrb'
import { RoadmapModal } from './RoadmapModal'

export function OpenSource() {
    const [isRoadmapOpen, setIsRoadmapOpen] = useState(false)
    const [stats, setStats] = useState([
        { icon: Star, label: 'GitHub Stars', value: 2450, suffix: '+' },
        { icon: GitFork, label: 'Forks', value: 340, suffix: '' },
        { icon: Users, label: 'Contributors', value: 48, suffix: '+' },
        { icon: AlertCircle, label: 'Open Issues', value: 12, suffix: '' },
        { icon: Eye, label: 'Watchers', value: 45, suffix: '' },
    ])

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch from local generated JSON file
                const response = await fetch('/stats.json')
                if (response.ok) {
                    const data = await response.json()

                    setStats([
                        { icon: Star, label: 'GitHub Stars', value: data.stars, suffix: '' },
                        { icon: GitFork, label: 'Forks', value: data.forks, suffix: '' },
                        { icon: Users, label: 'Contributors', value: data.contributors, suffix: '' },
                        { icon: AlertCircle, label: 'Open Issues', value: data.issues, suffix: '' },
                        { icon: Eye, label: 'Watchers', value: data.watchers, suffix: '' },
                    ])
                }
            } catch (error) {
                console.error('Failed to fetch local stats:', error)
            }
        }

        fetchStats()
    }, [])

    return (
        <>
            <Section id="open-source" className="py-32 relative">
                <GlowOrb className="absolute bottom-1/4 left-1/4" color="primary" size="lg" />

                <div className="section-content">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <FadeIn>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-text-secondary mb-6">
                                <Code2 className="w-4 h-4" />
                                <span>GPL v3.0 Licensed</span>
                            </div>
                        </FadeIn>

                        <h2 className="text-display font-bold mb-6">
                            <TextReveal staggerWords>
                                A Living Project
                            </TextReveal>
                        </h2>

                        <FadeIn delay={0.3}>
                            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                                Built in the open. Improved by everyone.
                                <br />
                                Flow is community-driven and always will be.
                            </p>
                        </FadeIn>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto mb-16 px-4">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                className="glass rounded-2xl p-6 text-center flex-1 min-w-[200px] max-w-[250px]"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 + index * 0.1 }}
                            >
                                <stat.icon className="w-8 h-8 mx-auto mb-4 text-accent-primary" />
                                <p className="text-2xl font-bold text-text-primary mb-1">
                                    <Counter from={0} to={stat.value} delay={0.4 + index * 0.1} suffix={stat.suffix} />
                                </p>
                                <p className="text-xs text-text-secondary">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* GitHub Card */}
                    <FadeIn delay={0.5}>
                        <div className="max-w-2xl mx-auto">
                            <motion.a
                                href="https://github.com/A-EDev/Flow"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block glass rounded-2xl p-8 group"
                                whileHover={{ y: -4 }}
                            >
                                <div className="flex items-start gap-6">
                                    <div className="p-4 rounded-2xl bg-white/5 group-hover:bg-white/10 transition-colors">
                                        <Github className="w-12 h-12 text-text-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <h3 className="text-xl font-semibold text-text-primary">A-EDev/Flow</h3>
                                            <ExternalLink className="w-4 h-4 text-text-muted group-hover:text-accent-primary transition-colors" />
                                        </div>
                                        <p className="text-text-secondary mb-4">
                                            A modern, feature-rich YouTube client for Android built with Jetpack Compose
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-medium">
                                                Kotlin
                                            </span>
                                            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium">
                                                Jetpack Compose
                                            </span>
                                            <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-medium">
                                                ExoPlayer
                                            </span>
                                            <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-medium">
                                                Neural Engine
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.a>
                        </div>
                    </FadeIn>

                    {/* CTAs */}
                    <FadeIn delay={0.6}>
                        <div className="flex flex-wrap items-center justify-center gap-4 mt-12">
                            <Button
                                href="https://github.com/A-EDev/Flow"
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="secondary"
                                size="lg"
                                icon={<Github className="w-5 h-5" />}
                                iconPosition="left"
                            >
                                View on GitHub
                            </Button>
                            <Button
                                href="https://github.com/A-EDev/Flow/blob/master/CONTRIBUTING.md"
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="ghost"
                                size="lg"
                            >
                                Contribute
                            </Button>
                            <Button
                                onClick={() => setIsRoadmapOpen(true)}
                                variant="ghost"
                                size="lg"
                            >
                                Roadmap
                            </Button>
                        </div>
                    </FadeIn>
                </div>
            </Section>

            <RoadmapModal
                isOpen={isRoadmapOpen}
                onClose={() => setIsRoadmapOpen(false)}
            />
        </>
    )
}

export default OpenSource
