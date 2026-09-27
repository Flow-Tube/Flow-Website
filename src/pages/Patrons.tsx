import { useState, useEffect } from 'react'
import { Heart, ArrowUpRight, ArrowRight } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FadeIn } from '@/components/ui/TextReveal'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface Patron {
    name: string
    note?: string
}

type ColorKey = 'amber' | 'violet' | 'sky' | 'emerald' | 'slate'

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

const tierDot: Record<ColorKey, string> = {
    amber: 'bg-[#D98A00]',
    violet: 'bg-[#7A5AC8]',
    sky: 'bg-[#3A86C8]',
    emerald: 'bg-[#2E8B5E]',
    slate: 'bg-text-muted',
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

function Initials({ name, className }: { name: string; className?: string }) {
    return (
        <span
            className={cn(
                'grid place-items-center shrink-0 rounded-full bg-bg-elevated font-display font-semibold tracking-[-0.01em] text-text-primary select-none',
                className,
            )}
            aria-hidden="true"
        >
            {getInitials(name)}
        </span>
    )
}

function cadenceLabel(cadence?: string) {
    if (!cadence) return null
    if (cadence === 'per month') return '/month'
    return cadence.toLowerCase()
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
    const uniquePatrons: string[] = []
    for (const tier of visibleTiers) {
        for (const p of tier.patrons) {
            const key = p.name.toLowerCase()
            if (!seen.has(key)) {
                seen.add(key)
                uniquePatrons.push(p.name)
            }
        }
    }

    return (
        <div className="relative min-h-screen bg-bg-primary text-text-primary flex flex-col">
            <Header />

            <main className="flex-1 w-full pt-32 md:pt-40 pb-24">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeIn>
                        <p className="kicker mb-5">Patrons</p>
                        <h1 className="text-5xl md:text-7xl font-semibold tracking-[-0.035em] leading-[0.98] mb-6">
                            The people behind{' '}
                            <span className="whitespace-nowrap font-serif italic font-normal tracking-[-0.01em] text-text-muted">Flow.</span>
                        </h1>
                        <p className="text-lg text-text-secondary max-w-2xl leading-relaxed">
                            Flow is free, open-source, and funded entirely by the people who use it.
                            No ads, no telemetry, no paywall. A standing thank-you to everyone below
                            for keeping it independent.
                        </p>
                    </FadeIn>

                    {uniquePatrons.length > 0 && (
                        <FadeIn delay={0.1}>
                            <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3">
                                <div className="flex items-center -space-x-2">
                                    {uniquePatrons.slice(0, 8).map(name => (
                                        <Initials key={name} name={name} className="w-9 h-9 text-[12px] ring-2 ring-bg-primary" />
                                    ))}
                                    {uniquePatrons.length > 8 && (
                                        <span className="grid place-items-center w-9 h-9 rounded-full bg-bg-secondary ring-2 ring-bg-primary text-[11px] font-semibold text-text-secondary">
                                            +{uniquePatrons.length - 8}
                                        </span>
                                    )}
                                </div>
                                <p className="kicker flex flex-wrap gap-x-5 gap-y-1">
                                    <span><span className="text-text-primary">{uniquePatrons.length}</span> {uniquePatrons.length === 1 ? 'supporter' : 'supporters'}</span>
                                    <span><span className="text-text-primary">{visibleTiers.length}</span> {visibleTiers.length === 1 ? 'tier' : 'tiers'}</span>
                                </p>
                            </div>
                        </FadeIn>
                    )}

                    <div className="mt-16 md:mt-24">
                        {loaded && visibleTiers.length === 0 ? (
                            <div className="rounded-2xl border-2 border-text-primary px-8 py-16 text-center">
                                <Heart className="w-7 h-7 text-accent-primary fill-accent-primary mx-auto mb-5" />
                                <h2 className="text-3xl font-semibold tracking-[-0.025em] text-text-primary mb-3">
                                    Be the <span className="font-serif italic font-normal">first.</span>
                                </h2>
                                <p className="text-text-secondary max-w-md mx-auto leading-relaxed">
                                    No patrons to show just yet. Support Flow on Patreon and your name
                                    will land right here.
                                </p>
                            </div>
                        ) : (
                            visibleTiers.map((tier, tierIdx) => {
                                const cadence = cadenceLabel(tier.cadence)
                                return (
                                    <FadeIn key={tier.id} delay={0.04 * tierIdx}>
                                        <section className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 py-12 md:py-16 border-t border-border-subtle">
                                            <div className="md:col-span-4">
                                                {tier.kind && <p className="kicker mb-3">{tier.kind}</p>}
                                                <p className="font-display text-5xl font-semibold tracking-[-0.035em] leading-none text-text-primary">
                                                    {tier.price}
                                                    {cadence && (
                                                        <span className="ml-1.5 font-serif italic font-normal text-2xl tracking-normal text-text-muted">{cadence}</span>
                                                    )}
                                                </p>
                                                <h2 className="mt-4 flex items-center gap-2.5 text-2xl font-semibold tracking-[-0.02em] text-text-primary">
                                                    <span className={cn('w-2 h-2 rounded-full shrink-0', tierDot[tier.color] ?? tierDot.slate)} aria-hidden="true" />
                                                    {tier.name}
                                                </h2>
                                            </div>

                                            <div className="md:col-span-8 min-w-0">
                                                <div className="flex items-baseline justify-between gap-6 mb-6">
                                                    {tier.description && (
                                                        <p className="text-text-secondary leading-relaxed max-w-lg">{tier.description}</p>
                                                    )}
                                                    <span className="kicker shrink-0">
                                                        {tier.patrons.length} {tier.patrons.length === 1 ? 'member' : 'members'}
                                                    </span>
                                                </div>

                                                <ul className="grid gap-2 sm:grid-cols-2">
                                                    {tier.patrons.map((patron, i) => (
                                                        <li
                                                            key={patron.name + i}
                                                            className="flex items-center gap-3 rounded-xl border border-border-subtle bg-bg-card px-4 py-3 transition-colors duration-200 hover:border-text-primary"
                                                        >
                                                            <Initials name={patron.name} className="w-10 h-10 text-[13px]" />
                                                            <span className="min-w-0">
                                                                <span className="block truncate font-display text-[17px] font-semibold tracking-[-0.01em] text-text-primary">
                                                                    {patron.name}
                                                                </span>
                                                                {patron.note && <span className="kicker block mt-0.5">{patron.note}</span>}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </section>
                                    </FadeIn>
                                )
                            })
                        )}
                    </div>

                    <FadeIn delay={0.1}>
                        <div className="mt-8 rounded-2xl border-2 border-text-primary p-8 md:p-12 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
                            <div>
                                <p className="kicker mb-4">Join them</p>
                                <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.03em] leading-tight text-text-primary mb-3">
                                    Want your name on{' '}
                                    <span className="whitespace-nowrap font-serif italic font-normal tracking-[-0.01em] text-text-muted">this page?</span>
                                </h2>
                                <p className="text-text-secondary max-w-xl leading-relaxed">
                                    Recurring tiers start at $3/month and one-time store purchases count too.
                                    Every bit keeps Flow ad-free, private, and moving.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <Button
                                    href="https://patreon.com/A_EDev"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    variant="primary"
                                    size="md"
                                    icon={<ArrowUpRight className="w-4 h-4" />}
                                >
                                    Support on Patreon
                                </Button>
                                <Button to="/#support" variant="outline" size="md" icon={<ArrowRight className="w-4 h-4" />}>
                                    Other ways to help
                                </Button>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default Patrons
