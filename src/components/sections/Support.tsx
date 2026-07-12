import { useState } from 'react'
import { Github, Heart, Bitcoin, Wallet, Check, Copy, ExternalLink, Bug, Languages, GitPullRequest } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { FadeIn } from '@/components/ui/TextReveal'
import { Button } from '@/components/ui/Button'

const cryptoAddresses = [
    { coin: 'Bitcoin', network: 'BTC', address: 'bc1qgmkkxxvzvsymtpfazqfl93jw6k4jgy0xmrtnv8', icon: Bitcoin },
    { coin: 'USDT', network: 'TRC20', address: 'TRz7VDrTWwCLCfQmYBEJakqcZgbFNWfUMP', icon: Wallet },
    { coin: 'Monero', network: 'XMR', address: '8AgaxZnpEvT8VXJpczpL7BQejwSEw97saJmKYqq4zKErbe9bkYSwUhJ813msPPbdYhF11oz4N7tfEj4Zi6k27fKD83ca1if', icon: Wallet },
]

const contributions = [
    { icon: GitPullRequest, label: 'Code', text: 'New features, refactors, and the desktop port all welcome pull requests.' },
    { icon: Bug, label: 'Bug Reports', text: 'A well-written issue is often worth as much as the fix itself.' },
    { icon: Languages, label: 'Translations', text: 'Help Flow speak your language — localization lives in simple string files.' },
]

export function Support() {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

    const copyAddress = (address: string, index: number) => {
        navigator.clipboard.writeText(address)
        setCopiedIndex(index)
        setTimeout(() => setCopiedIndex(prev => (prev === index ? null : prev)), 2000)
    }

    return (
        <Section id="support" fullHeight={false} className="py-24 md:py-32 bg-bg-secondary border-b border-border-subtle">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Header */}
                <div className="mb-16">
                    <FadeIn>
                        <p className="kicker mb-4">05 &mdash; Support</p>
                        <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6 tracking-tight">
                            Free, Open, and Community Driven.
                        </h2>
                        <p className="text-lg text-text-secondary max-w-2xl">
                            Flow has no ads, no telemetry, and no paid tier — which means no revenue
                            except what the community chooses to give back. Time or money, both move
                            the project forward.
                        </p>
                    </FadeIn>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Contribute Panel */}
                    <FadeIn delay={0.15} className="lg:col-span-6">
                        <div className="bg-bg-card border border-border-subtle rounded-2xl h-full flex flex-col overflow-hidden">
                            <div className="flex items-center justify-between px-6 md:px-8 py-5 border-b border-border-subtle">
                                <span className="kicker">Give Time</span>
                                <Github className="w-4 h-4 text-text-muted" />
                            </div>

                            <div className="p-6 md:p-8 flex flex-col flex-1">
                                <h3 className="text-2xl font-bold text-text-primary mb-6">Contribute</h3>

                                <div className="space-y-5 flex-1 mb-8">
                                    {contributions.map((item) => (
                                        <div key={item.label} className="flex items-start gap-4">
                                            <div className="w-9 h-9 rounded-lg bg-bg-elevated flex items-center justify-center flex-shrink-0">
                                                <item.icon className="w-4 h-4 text-text-primary" strokeWidth={1.75} />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-semibold text-text-primary mb-0.5">{item.label}</h4>
                                                <p className="text-sm text-text-secondary leading-relaxed">{item.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    <a href="https://github.com/A-EDev/Flow" target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[160px]">
                                        <Button variant="secondary" className="w-full" size="sm">
                                            <ExternalLink className="w-4 h-4 mr-2" />
                                            View Repository
                                        </Button>
                                    </a>
                                    <a href="https://github.com/A-EDev/Flow/issues" target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[160px]">
                                        <Button variant="outline" className="w-full" size="sm">
                                            <Bug className="w-4 h-4 mr-2" />
                                            Open Issues
                                        </Button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </FadeIn>

                    {/* Donate Panel */}
                    <FadeIn delay={0.25} className="lg:col-span-6">
                        <div className="bg-bg-card border border-border-subtle rounded-2xl h-full flex flex-col overflow-hidden">
                            <div className="flex items-center justify-between px-6 md:px-8 py-5 border-b border-border-subtle">
                                <span className="kicker">Give Support</span>
                                <Heart className="w-4 h-4 text-accent-primary" />
                            </div>

                            <div className="p-6 md:p-8 flex flex-col flex-1">
                                <h3 className="text-2xl font-bold text-text-primary mb-6">Donate</h3>

                                <div className="space-y-3 flex-1">
                                    {cryptoAddresses.map((crypto, i) => (
                                        <button
                                            key={crypto.coin}
                                            onClick={() => copyAddress(crypto.address, i)}
                                            className="w-full text-left flex flex-col gap-1.5 p-4 rounded-xl bg-bg-secondary border border-border-subtle hover:bg-bg-elevated transition-colors group"
                                        >
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-2">
                                                    <crypto.icon className="w-4 h-4 text-text-primary" strokeWidth={1.75} />
                                                    <span className="font-semibold text-text-primary text-sm">{crypto.coin}</span>
                                                    <span className="kicker">{crypto.network}</span>
                                                </div>
                                                <span className={`flex items-center gap-1 text-xs font-medium transition-opacity ${copiedIndex === i
                                                    ? 'text-text-primary opacity-100'
                                                    : 'text-text-secondary opacity-0 group-hover:opacity-100'
                                                    }`}>
                                                    {copiedIndex === i
                                                        ? <><Check className="w-3.5 h-3.5" /> Copied</>
                                                        : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                                                </span>
                                            </div>
                                            <div className="text-xs text-text-secondary font-mono truncate">
                                                {crypto.address}
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                <div className="pt-6 mt-6 border-t border-border-subtle flex items-center justify-between gap-4">
                                    <p className="text-sm text-text-secondary">
                                        Prefer a recurring option?
                                    </p>
                                    <a
                                        href="https://patreon.com/A_EDev"
                                        target="_blank"
                                        rel="noreferrer noopener"
                                        className="transition-transform hover:scale-[1.03]"
                                    >
                                        <img
                                            src="https://img.shields.io/badge/Patreon-Support_Flow-FF424D?style=for-the-badge&logo=patreon&logoColor=white"
                                            alt="Support Flow on Patreon"
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </Section>
    )
}

export default Support
