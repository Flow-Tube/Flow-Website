import { Github, Wallet, Heart, Bitcoin, ExternalLink } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { FadeIn } from '@/components/ui/TextReveal'
import { Button } from '@/components/ui/Button'

export function Support() {
    const cryptoAddresses = [
        { coin: 'Bitcoin', network: 'BTC', address: 'bc1qgmkkxxvzvsymtpfazqfl93jw6k4jgy0xmrtnv8', icon: Bitcoin },
        { coin: 'USDT', network: 'TRC20', address: 'TRz7VDrTWwCLCfQmYBEJakqcZgbFNWfUMP', icon: Wallet },
        { coin: 'Monero', network: 'XMR', address: '8AgaxZnpEvT8VXJpczpL7BQejwSEw97saJmKYqq4zKErbe9bkYSwUhJ813msPPbdYhF11oz4N7tfEj4Zi6k27fKD83ca1if', icon: Wallet },
    ]

    return (
        <Section id="support" className="py-24 bg-bg-secondary border-t border-border-subtle">
            <div className="section-content max-w-5xl">
                <div className="text-center mb-16">
                    <FadeIn>
                        <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6 tracking-tight">
                            Free, Open, and Community Driven.
                        </h2>
                        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                            Flow is built in the open. It has no ads, no telemetry, and no premium tiers. 
                            If you find it valuable, consider supporting the development.
                        </p>
                    </FadeIn>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {/* GitHub Stats & CTA */}
                    <FadeIn delay={0.2}>
                        <div className="bg-bg-card border border-border-subtle rounded-3xl p-8 h-full flex flex-col items-center text-center hover:border-text-muted transition-colors">
                            <div className="w-16 h-16 rounded-2xl bg-bg-elevated flex items-center justify-center mb-6">
                                <Github className="w-8 h-8 text-text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold text-text-primary mb-4">Contribute Code</h3>
                            <p className="text-text-secondary mb-8 flex-1 leading-relaxed">
                                Join our community of contributors. Help us build new features, fix bugs, and translate the app.
                            </p>
                            <a href="https://github.com/A-EDev/Flow" target="_blank" rel="noopener noreferrer" className="w-full">
                                <Button
                                    variant="secondary"
                                    className="w-full"
                                >
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    View Repository
                                </Button>
                            </a>
                        </div>
                    </FadeIn>

                    {/* Donations */}
                    <FadeIn delay={0.3}>
                        <div className="bg-bg-card border border-border-subtle rounded-3xl p-8 h-full flex flex-col hover:border-text-muted transition-colors">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-bg-elevated flex items-center justify-center flex-shrink-0">
                                    <Heart className="w-6 h-6 text-accent-primary" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-text-primary">Support Development</h3>
                                    <p className="text-text-secondary text-sm">Crypto donations help keep the project alive.</p>
                                </div>
                            </div>

                            <div className="space-y-4 flex-1">
                                {cryptoAddresses.map((crypto, i) => (
                                    <div 
                                        key={i} 
                                        className="flex flex-col gap-2 p-4 rounded-xl bg-bg-secondary border border-border-subtle hover:border-accent-primary/50 transition-colors group cursor-pointer" 
                                        onClick={() => navigator.clipboard.writeText(crypto.address)}
                                    >
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <crypto.icon className="w-4 h-4 text-text-primary" />
                                                <span className="font-semibold text-text-primary text-sm">{crypto.coin}</span>
                                                <span className="text-[10px] text-text-muted px-2 py-0.5 bg-bg-elevated rounded-md font-medium">{crypto.network}</span>
                                            </div>
                                            <span className="text-xs font-medium text-accent-primary opacity-0 group-hover:opacity-100 transition-opacity">Click to copy</span>
                                        </div>
                                        <div className="text-xs text-text-secondary font-mono truncate">
                                            {crypto.address}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </Section>
    )
}

export default Support
