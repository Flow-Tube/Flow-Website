import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Heart } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useStats, formatCompact } from '@/lib/useStats'
import { useLatestVersion } from '@/lib/useLatestVersion'

const ease = [0.16, 1, 0.3, 1] as const

const heroScreens = [
    { src: '/screenshots/VideoPlayer.webp', alt: 'Flow video player', side: true },
    { src: '/screenshots/Home.webp', alt: 'Flow home feed', side: false },
    { src: '/screenshots/MusicPlayer.webp', alt: 'Flow music player', side: true },
]

export function Hero() {
    const stats = useStats()
    const latestVersion = useLatestVersion()
    const reduceMotion = useReducedMotion()

    const proof = [
        { value: stats ? stats.stars.toLocaleString() : '...', label: 'stars' },
        { value: stats ? formatCompact(stats.downloads) : '...', label: 'downloads' },
        { value: stats ? stats.contributors.toString() : '...', label: 'contributors' },
    ]

    return (
        <section
            id="hero"
            className="relative h-[100svh] min-h-[680px] flex flex-col overflow-hidden bg-bg-primary border-b border-border-subtle"
        >
            <div className="absolute inset-0 hero-glow pointer-events-none" aria-hidden="true" />

            <div className="relative z-10 flex flex-col items-center text-center px-4 md:px-8 pt-28 md:pt-40">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.7, ease }}
                    className="text-[clamp(2.75rem,6vw,4.75rem)] font-semibold tracking-[-0.035em] leading-[0.98] text-text-primary mb-6"
                >
                    Watch on your terms,
                    <br />
                    <span className="whitespace-nowrap font-serif italic font-normal tracking-[-0.01em] text-text-muted">not theirs.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.18, duration: 0.7, ease }}
                    className="text-base md:text-lg text-text-secondary max-w-xl mb-8 leading-relaxed"
                >
                    An open-source YouTube and YouTube Music client. No ads, no tracking,
                    just a feed that learns on your device and nowhere else.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.26, duration: 0.7, ease }}
                    className="flex flex-wrap items-center justify-center gap-3"
                >
                    <Button to="/changelog" variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
                        {latestVersion ? `What's new in ${latestVersion}` : "What's new"}
                    </Button>
                    <Button href="#support" variant="outline" size="md" icon={<Heart className="w-4 h-4 text-accent-primary fill-accent-primary" />}>
                        Support Flow
                    </Button>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.34, duration: 0.7, ease }}
                    className="kicker mt-6 flex flex-wrap justify-center gap-x-5 gap-y-1"
                >
                    {proof.map(item => (
                        <span key={item.label}>
                            <span className="text-text-primary tabular-nums">{item.value}</span> {item.label}
                        </span>
                    ))}
                </motion.p>
            </div>

            <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 20, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: 0.45, duration: 0.9, ease }}
                className="relative z-10 flex-1 flex justify-center items-start gap-7 mt-12 md:mt-14 px-4"
                aria-hidden="true"
            >
                {heroScreens.map(screen => (
                    <div
                        key={screen.src}
                        className={
                            screen.side
                                ? 'hidden md:block shrink-0 w-[232px] mt-16 rounded-[34px] bg-[#1a1716] p-[7px] border border-border-subtle shadow-[0_30px_60px_-30px_rgba(0,0,0,0.45)]'
                                : 'shrink-0 w-[min(66vw,268px)] rounded-[34px] bg-[#1a1716] p-[7px] border border-border-subtle shadow-[0_30px_60px_-30px_rgba(0,0,0,0.45)]'
                        }
                    >
                        <img
                            src={screen.src}
                            alt=""
                            width={575}
                            height={1280}
                            className="block w-full h-auto rounded-[27px]"
                        />
                    </div>
                ))}
            </motion.div>
        </section>
    )
}

export default Hero
