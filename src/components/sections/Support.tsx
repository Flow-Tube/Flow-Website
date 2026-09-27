import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Check, Copy } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { FadeIn } from '@/components/ui/TextReveal'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const cryptoAddresses = [
    { label: 'Bitcoin', address: 'bc1qgmkkxxvzvsymtpfazqfl93jw6k4jgy0xmrtnv8' },
    { label: 'USDT · TRC20', address: 'TRz7VDrTWwCLCfQmYBEJakqcZgbFNWfUMP' },
    { label: 'Monero', address: '8AgaxZnpEvT8VXJpczpL7BQejwSEw97saJmKYqq4zKErbe9bkYSwUhJ813msPPbdYhF11oz4N7tfEj4Zi6k27fKD83ca1if' },
]

const timeLinks = [
    { title: 'Report a bug', description: 'Opens the bug report form on GitHub.', href: 'https://github.com/A-EDev/Flow/issues/new?template=bug_report.yml' },
    { title: 'Suggest a feature', description: 'Opens the feature request form.', href: 'https://github.com/A-EDev/Flow/issues/new?template=feature_request.yml' },
    { title: 'Translate Flow', description: 'Help Flow speak your language on Weblate.', href: 'https://hosted.weblate.org/engage/flow/' },
    { title: 'Contribute code', description: 'Read the contributing guide and send a pull request.', href: 'https://github.com/A-EDev/Flow/blob/main/CONTRIBUTING.md' },
]

function useCommunityCounts() {
    const [counts, setCounts] = useState<{ supporters: number | null; contributors: number | null }>({ supporters: null, contributors: null })

    useEffect(() => {
        let active = true
        fetch('/patrons.json')
            .then(res => res.json())
            .then(data => {
                const tiers: { hidden?: boolean; patrons: { name: string }[] }[] = Array.isArray(data?.tiers) ? data.tiers : []
                const names = new Set(tiers.filter(t => !t.hidden).flatMap(t => t.patrons.map(p => p.name.toLowerCase())))
                if (active) setCounts(c => ({ ...c, supporters: names.size }))
            })
            .catch(() => { })
        fetch('/contributors.json')
            .then(res => res.json())
            .then(data => {
                if (active && Array.isArray(data?.contributors)) setCounts(c => ({ ...c, contributors: data.contributors.length }))
            })
            .catch(() => { })
        return () => { active = false }
    }, [])

    return counts
}

export function Support() {
    const [coin, setCoin] = useState(0)
    const [copied, setCopied] = useState(false)
    const addressRef = useRef<HTMLElement>(null)
    const counts = useCommunityCounts()

    useEffect(() => setCopied(false), [coin])

    const copyAddress = async () => {
        try {
            await navigator.clipboard.writeText(cryptoAddresses[coin].address)
            setCopied(true)
            window.setTimeout(() => setCopied(false), 2000)
        } catch {
            const node = addressRef.current
            if (!node) return
            const range = document.createRange()
            range.selectNodeContents(node)
            const selection = window.getSelection()
            selection?.removeAllRanges()
            selection?.addRange(range)
        }
    }

    return (
        <Section id="support" fullHeight={false} className="py-24 md:py-32 bg-bg-secondary border-b border-border-subtle">
            <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                <FadeIn className="lg:col-span-5">
                    <p className="kicker mb-4">05 &middot; Support</p>
                    <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.035em] leading-[1.02] text-text-primary mb-6">
                        Free forever.{' '}
                        <span className="whitespace-nowrap font-serif italic font-normal tracking-[-0.01em] text-text-muted">Funded by you.</span>
                    </h2>
                    <p className="text-lg text-text-secondary leading-relaxed">
                        Flow has no ads, no telemetry and no paid tier, so there's no revenue except what the
                        community chooses to give back. Time or money, both move it forward.
                    </p>
                    {(counts.supporters !== null || counts.contributors !== null) && (
                        <p className="kicker mt-6 flex flex-wrap gap-x-5 gap-y-1">
                            {counts.supporters !== null && (
                                <span><span className="text-text-primary">{counts.supporters}</span> {counts.supporters === 1 ? 'supporter' : 'supporters'}</span>
                            )}
                            {counts.contributors !== null && (
                                <span><span className="text-text-primary">{counts.contributors}</span> contributors</span>
                            )}
                        </p>
                    )}
                    <Link
                        to="/patrons"
                        className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-semibold text-text-primary underline underline-offset-4 decoration-text-muted hover:decoration-text-primary"
                    >
                        Meet the patrons
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                </FadeIn>

                <FadeIn delay={0.1} className="lg:col-span-7 flex flex-col gap-4">
                    <div className="rounded-2xl border-2 border-text-primary bg-bg-primary p-6 md:p-8">
                        <p className="kicker mb-3">Give money</p>
                        <h3 className="text-2xl font-semibold tracking-[-0.02em] text-text-primary mb-2">Support on Patreon</h3>
                        <p className="text-text-secondary leading-relaxed">
                            Monthly from $3, or a one-time tip in the shop. Card, Apple Pay or PayPal.
                        </p>
                        <Button
                            href="https://patreon.com/A_EDev"
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="primary"
                            size="md"
                            className="mt-5"
                            icon={<ArrowUpRight className="w-4 h-4" />}
                        >
                            Support on Patreon
                        </Button>

                        <div className="mt-7 pt-6 border-t border-border-subtle">
                            <p className="kicker mb-3">Or send crypto</p>
                            <div className="inline-flex flex-wrap gap-1 rounded-xl border border-border-subtle p-1" role="group" aria-label="Currency">
                                {cryptoAddresses.map((c, i) => (
                                    <button
                                        key={c.label}
                                        type="button"
                                        aria-pressed={coin === i}
                                        onClick={() => setCoin(i)}
                                        className={cn(
                                            'rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors',
                                            coin === i ? 'bg-text-primary text-bg-primary' : 'text-text-secondary hover:text-text-primary'
                                        )}
                                    >
                                        {c.label}
                                    </button>
                                ))}
                            </div>
                            <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border-subtle bg-bg-card py-2.5 pl-4 pr-2.5">
                                <code ref={addressRef} className="font-mono text-[13px] leading-relaxed text-text-primary break-all select-all" aria-label={`${cryptoAddresses[coin].label} address`}>
                                    {cryptoAddresses[coin].address}
                                </code>
                                <button
                                    type="button"
                                    onClick={copyAddress}
                                    className="inline-flex items-center gap-1.5 rounded-lg border border-border-subtle bg-bg-primary px-3 py-2 text-[13px] font-semibold text-text-primary hover:border-text-primary transition-colors"
                                >
                                    {copied ? <Check className="w-3.5 h-3.5" aria-hidden="true" /> : <Copy className="w-3.5 h-3.5" aria-hidden="true" />}
                                    {copied ? 'Copied' : 'Copy'}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-border-subtle bg-bg-primary p-2">
                        <p className="kicker px-4 pt-3 pb-1">Give time</p>
                        <ul>
                            {timeLinks.map(link => (
                                <li key={link.title}>
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-0.5 rounded-xl px-4 py-3.5 hover:bg-bg-secondary transition-colors"
                                    >
                                        <span className="font-display text-[17px] font-semibold tracking-[-0.01em] text-text-primary">{link.title}</span>
                                        <ArrowUpRight className="row-span-2 w-4 h-4 text-text-muted group-hover:text-text-primary transition-colors" aria-hidden="true" />
                                        <span className="text-sm text-text-secondary">{link.description}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </FadeIn>
            </div>
        </Section>
    )
}

export default Support
