import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Download, Github } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const ease = [0.16, 1, 0.3, 1] as const

export function Hero() {
    const [stats, setStats] = useState({ stars: '—', downloads: '—' })

    useEffect(() => {
        fetch('/stats.json')
            .then(res => res.json())
            .then(data => {
                if (data.stars) {
                    setStats({
                        stars: data.stars.toLocaleString(),
                        downloads: data.downloads >= 1000 ? (data.downloads / 1000).toFixed(1) + 'k' : data.downloads.toString()
                    })
                }
            })
            .catch(() => { })
    }, [])

    const scrollToSection = (href: string) => {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }

    const heroStats = [
        { label: 'GitHub Stars', value: stats.stars },
        { label: 'Downloads', value: stats.downloads },
        { label: 'License', value: 'GPL-3.0' },
    ]

    return (
        <section
            id="hero"
            className="relative min-h-[100svh] flex flex-col bg-bg-primary border-b border-border-subtle"
        >
            <div className="absolute inset-0 hero-glow pointer-events-none" aria-hidden="true" />

            {/* Centered Content */}
            <div className="relative z-10 flex-1 flex items-center justify-center py-16">
                <div className="max-w-3xl mx-auto px-4 md:px-8 flex flex-col items-center text-center">
                    {/* Logo */}
                    <motion.img
                        src="/flow-icon.svg"
                        alt="Flow logo"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05, duration: 0.6, ease }}
                        className="w-16 h-16 md:w-32 md:h-32 object-contain mb-4"
                    />

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.7, ease }}
                        className="text-[clamp(3.75rem,2.5vw,4.75rem)] font-extrabold tracking-tighter leading-[0.98] text-text-primary mb-6"
                    >
                        Watch on your terms, <span className="text-text-muted">not theirs.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.28, duration: 0.7, ease }}
                        className="text-base md:text-lg text-text-secondary max-w-xl mb-9 leading-relaxed"
                    >
                        An open-source YouTube and YouTube Music client. No ads, no tracking —
                        just a feed that learns on your device and nowhere else.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.36, duration: 0.7, ease }}
                        className="flex flex-wrap items-center justify-center gap-3 mb-2"
                    >
                        <a href="https://github.com/A-EDev/Flow/releases/latest" target="_blank" rel="noopener noreferrer">
                            <Button variant="primary" size="lg" icon={<Download className="w-4 h-4" />}>
                                Download APK
                            </Button>
                        </a>

                        <Button
                            variant="secondary"
                            size="lg"
                            icon={<ArrowRight className="w-4 h-4" />}
                            onClick={() => scrollToSection('#features')}
                        >
                            Explore Features
                        </Button>

                        <a href="https://github.com/A-EDev/Flow" target="_blank" rel="noopener noreferrer">
                            <Button variant="ghost" size="lg" icon={<Github className="w-4 h-4" />} iconPosition="left">
                                GitHub
                            </Button>
                        </a>
                    </motion.div>

                </div>
            </div>

            {/* Stats Bar */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.8, ease }}
                className="relative z-10 border-t border-border-subtle"
            >
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-3">
                        {heroStats.map((stat, i) => (
                            <div
                                key={stat.label}
                                className={`py-5 md:py-6 text-center ${i > 0 ? 'border-l border-border-subtle' : ''}`}
                            >
                                <div className="text-xl md:text-2xl font-bold tracking-tight text-text-primary tabular-nums">
                                    {stat.value}
                                </div>
                                <div className="kicker mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    )
}

export default Hero
