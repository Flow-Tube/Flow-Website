import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart, ArrowUpRight } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { FinalCTA } from '@/components/sections/FinalCTA'
import { FadeIn } from '@/components/ui/TextReveal'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface Patron {
    name: string
    note?: string
}

interface Tier {
    id: string
    name: string
    price: string
    cadence?: string
    kind?: string
    description?: string
    color: ColorKey
    hidden?: boolean
    patrons: Patron[]
}

type ColorKey = 'amber' | 'violet' | 'sky' | 'emerald' | 'slate'

const colorStyles: Record<ColorKey, {
    avatar: string
    price: string
    dot: string
    cardHover: string
}> = {
    amber: {
        avatar: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 ring-1 ring-inset ring-amber-500/25',
        price: 'text-amber-600 dark:text-amber-400',
        dot: 'bg-amber-500',
        cardHover: 'hover:border-amber-500/40 hover:bg-amber-500/[0.045]',
    },
    violet: {
        avatar: 'bg-violet-500/15 text-violet-700 dark:text-violet-300 ring-1 ring-inset ring-violet-500/25',
        price: 'text-violet-600 dark:text-violet-400',
        dot: 'bg-violet-500',
        cardHover: 'hover:border-violet-500/40 hover:bg-violet-500/[0.045]',
    },
    sky: {
        avatar: 'bg-sky-500/15 text-sky-700 dark:text-sky-300 ring-1 ring-inset ring-sky-500/25',
        price: 'text-sky-600 dark:text-sky-400',
        dot: 'bg-sky-500',
        cardHover: 'hover:border-sky-500/40 hover:bg-sky-500/[0.045]',
    },
    emerald: {
        avatar: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 ring-1 ring-inset ring-emerald-500/25',
        price: 'text-emerald-600 dark:text-emerald-400',
        dot: 'bg-emerald-500',
        cardHover: 'hover:border-emerald-500/40 hover:bg-emerald-500/[0.045]',
    },
    slate: {
        avatar: 'bg-slate-500/15 text-slate-700 dark:text-slate-300 ring-1 ring-inset ring-slate-500/25',
        price: 'text-slate-500 dark:text-slate-300',
        dot: 'bg-slate-400',
        cardHover: 'hover:border-slate-400/40 hover:bg-slate-500/[0.045]',
    },
}

function getInitials(name: string): string {
    const parts = name.split(/[\s_\-.]+/).filter(Boolean)
    if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase()
    }
    const word = parts[0] ?? name
    const caps = word.match(/[A-Z0-9]/g)
    if (caps && caps.length >= 2) {
        return (caps[0] + caps[1]).toUpperCase()
    }
    return word.slice(0, 1).toUpperCase()
}

function Avatar({ name, className, sizeClass }: { name: string; className: string; sizeClass: string }) {
    return (
        <div
            className={cn(
                'flex items-center justify-center rounded-full font-semibold tracking-tight select-none shrink-0',
                sizeClass,
                className,
            )}
            aria-hidden="true"
        >
            {getInitials(name)}
        </div>
    )
}

export function Patrons() {
    const [tiers, setTiers] = useState<Tier[]>([])
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        fetch('/patrons.json')
            .then(res => res.json())
            .then(data => {
                if (data && Array.isArray(data.tiers)) {
                    setTiers(data.tiers)
                }
            })
            .catch(() => { })
            .finally(() => setLoaded(true))
    }, [])

    const visibleTiers = tiers.filter(t => !t.hidden && t.patrons.length > 0)


    const seen = new Set<string>()
    const uniquePatrons: { name: string; color: ColorKey }[] = []
    for (const tier of visibleTiers) {
        for (const p of tier.patrons) {
            const key = p.name.toLowerCase()
            if (!seen.has(key)) {
                seen.add(key)
                uniquePatrons.push({ name: p.name, color: tier.color })
            }
        }
    }

    return (
        <div className="relative min-h-screen bg-bg-primary text-text-primary flex flex-col">
            <Header />

            <main className="flex-1 w-full pt-32 pb-24">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Page Header */}
                    <div className="mb-14">
                        <FadeIn>
                            <p className="kicker mb-4">Supporters</p>
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
                                The people behind Flow
                            </h1>
                            <p className="text-lg text-text-secondary max-w-2xl leading-relaxed">
                                Flow is free, open-source, and funded entirely by the people who use it —
                                no ads, no telemetry, no paywall. A standing thank-you to everyone below
                                for keeping it independent.
                            </p>
                        </FadeIn>

                        {/* Summary strip: avatar stack + count */}
                        {uniquePatrons.length > 0 && (
                            <FadeIn delay={0.1}>
                                <div className="mt-9 flex items-center gap-4">
                                    <div className="flex items-center -space-x-2.5">
                                        {uniquePatrons.slice(0, 8).map((p, i) => (
                                            <Avatar
                                                key={p.name + i}
                                                name={p.name}
                                                sizeClass="w-9 h-9 text-[11px] border-2 border-bg-primary"
                                                className={colorStyles[p.color].avatar}
                                            />
                                        ))}
                                        {uniquePatrons.length > 8 && (
                                            <div className="w-9 h-9 rounded-full border-2 border-bg-primary bg-bg-elevated text-text-secondary text-[11px] font-semibold flex items-center justify-center">
                                                +{uniquePatrons.length - 8}
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-sm text-text-secondary">
                                        <span className="font-semibold text-text-primary">{uniquePatrons.length}</span>{' '}
                                        {uniquePatrons.length === 1 ? 'supporter' : 'supporters'}
                                        <span className="text-text-muted"> · </span>
                                        <span className="font-semibold text-text-primary">{visibleTiers.length}</span>{' '}
                                        {visibleTiers.length === 1 ? 'tier' : 'tiers'}
                                    </p>
                                </div>
                            </FadeIn>
                        )}
                    </div>

                    {/* Tier sections */}
                    {loaded && visibleTiers.length === 0 ? (
                        <div className="rounded-2xl border border-border-subtle bg-bg-secondary px-8 py-16 text-center">
                            <Heart className="w-8 h-8 text-text-muted mx-auto mb-5" strokeWidth={1.5} />
                            <h2 className="text-xl font-bold text-text-primary mb-3">Be the first.</h2>
                            <p className="text-text-secondary max-w-md mx-auto leading-relaxed">
                                No patrons to show just yet — support Flow on Patreon and your name
                                will land right here.
                            </p>
                        </div>
                    ) : (
                        <div>
                            {visibleTiers.map((tier, tierIdx) => {
                                const styles = colorStyles[tier.color] ?? colorStyles.slate
                                return (
                                    <FadeIn key={tier.id} delay={0.04 * tierIdx}>
                                        <section className={cn(
                                            'grid gap-x-10 gap-y-6 pb-11 md:grid-cols-[8.5rem_1fr]',
                                            tierIdx > 0 ? 'border-t border-border-subtle pt-11' : 'pt-0',
                                        )}>
                                            {/* Left rail — price as the anchor */}
                                            <div className="flex flex-row items-baseline gap-x-3 gap-y-1 md:flex-col md:items-end md:text-right md:pt-0.5">
                                                <div className={cn('text-3xl font-bold tracking-tight leading-none', styles.price)}>
                                                    {tier.price}
                                                    {tier.cadence === 'per month' && (
                                                        <span className="text-sm font-medium text-text-muted"> /mo</span>
                                                    )}
                                                </div>
                                                {tier.kind && <span className="kicker">{tier.kind}</span>}
                                            </div>

                                            {/* Right — tier meta + patrons */}
                                            <div className="min-w-0">
                                                <div className="flex items-baseline justify-between gap-4 mb-1.5">
                                                    <h2 className="flex items-center gap-2.5 text-lg font-bold text-text-primary">
                                                        <span className={cn('w-2 h-2 rounded-full shrink-0', styles.dot)} aria-hidden="true" />
                                                        {tier.name}
                                                    </h2>
                                                    <span className="kicker shrink-0">
                                                        {tier.patrons.length} {tier.patrons.length === 1 ? 'Member' : 'Members'}
                                                    </span>
                                                </div>
                                                {tier.description && (
                                                    <p className="text-sm text-text-secondary leading-relaxed max-w-xl mb-5 pl-[18px]">
                                                        {tier.description}
                                                    </p>
                                                )}

                                                <div className="grid gap-3 sm:grid-cols-2">
                                                    {tier.patrons.map((patron, i) => (
                                                        <motion.div
                                                            key={patron.name + i}
                                                            initial={{ opacity: 0, y: 10 }}
                                                            whileInView={{ opacity: 1, y: 0 }}
                                                            viewport={{ once: true, margin: '-40px' }}
                                                            transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.2), ease: [0.16, 1, 0.3, 1] }}
                                                            className={cn(
                                                                'flex items-center gap-3 rounded-xl border border-border-subtle bg-bg-card px-3.5 py-3 transition-all duration-200 hover:-translate-y-0.5',
                                                                styles.cardHover,
                                                            )}
                                                        >
                                                            <Avatar
                                                                name={patron.name}
                                                                sizeClass="w-10 h-10 text-[13px]"
                                                                className={styles.avatar}
                                                            />
                                                            <div className="min-w-0">
                                                                <p className="font-semibold text-text-primary text-sm leading-tight truncate">{patron.name}</p>
                                                                {patron.note && (
                                                                    <span className="mt-1 inline-flex items-center gap-1.5 text-[11px] font-medium text-text-muted">
                                                                        <span className={cn('w-1 h-1 rounded-full', styles.dot)} aria-hidden="true" />
                                                                        {patron.note}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                        </section>
                                    </FadeIn>
                                )
                            })}
                        </div>
                    )}

                    {/* Closing CTA */}
                    <FadeIn delay={0.1}>
                        <div className="mt-16 rounded-2xl border border-border-subtle bg-bg-secondary p-7 md:p-9 flex flex-col sm:flex-row sm:items-center gap-6">
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-text-primary mb-1.5">Want your name on this page?</h3>
                                <p className="text-sm text-text-secondary max-w-xl leading-relaxed">
                                    Recurring tiers start at $3/month and one-time store purchases count too.
                                    Every bit keeps Flow ad-free, private, and moving.
                                </p>
                            </div>
                            <a
                                href="https://patreon.com/A_EDev"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="shrink-0"
                            >
                                <Button variant="primary" size="md" className="gap-1.5">
                                    Support on Patreon
                                    <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
                                </Button>
                            </a>
                        </div>
                    </FadeIn>

                </div>
            </main>

            <FinalCTA />
        </div>
    )
}

export default Patrons
