import { motion } from 'framer-motion'
import { Download, Github, Heart, Twitter } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { FadeIn } from '@/components/ui/TextReveal'
import { Button } from '@/components/ui/Button'
import { GlowOrb } from '@/components/effects/GlowOrb'

const footerLinks = {
    product: [
        { label: 'Features', href: '#features' },
        { label: 'How it Works', href: '#neuro-engine' },
        { label: 'Privacy', href: '#privacy' },
    ],
    community: [
        { label: 'GitHub', href: 'https://github.com/A-EDev/Flow' },
        { label: 'Issues', href: 'https://github.com/A-EDev/Flow/issues' },
        { label: 'Releases', href: 'https://github.com/A-EDev/Flow/releases/latest' },
    ],
}

export function FinalCTA() {
    const scrollToSection = (href: string) => {
        if (href.startsWith('#')) {
            const element = document.querySelector(href)
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
            }
        } else {
            window.open(href, '_blank')
        }
    }

    return (
        <Section id="final-cta" className="py-24 relative">
            {/* Background Glow */}
            <GlowOrb className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" color="primary" size="xl" />

            <div className="section-content relative z-10">
                {/* Main CTA Section */}
                <div className="text-center mb-20">
                    {/* Main Message - Fixed text visibility */}
                    <div className="mb-8">
                        <FadeIn delay={0.1}>
                            <h2 className="text-display md:text-hero font-bold mb-2">
                                <span className="text-text-secondary">This is your </span>
                                <span className="text-gradient">Flow.</span>
                            </h2>
                        </FadeIn>

                        <FadeIn delay={0.3}>
                            <p className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto leading-relaxed mt-6">
                                Not what an algorithm wants you to watch.
                                <br />
                                <span className="text-text-primary font-medium">What you want to discover.</span>
                            </p>
                        </FadeIn>
                    </div>

                    {/* CTAs */}
                    <FadeIn delay={0.5}>
                        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                            <motion.a
                                href="https://github.com/A-EDev/Flow/releases/latest"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button
                                    variant="primary"
                                    size="lg"
                                    icon={<Download className="w-5 h-5" />}
                                    className="text-lg px-8 py-4"
                                >
                                    Download Flow
                                </Button>
                            </motion.a>

                            <motion.a
                                href="https://github.com/A-EDev/Flow"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button
                                    variant="outline"
                                    size="lg"
                                    icon={<Github className="w-5 h-5" />}
                                    iconPosition="left"
                                    className="text-lg px-8 py-4"
                                >
                                    Star on GitHub
                                </Button>
                            </motion.a>
                        </div>
                    </FadeIn>
                </div>

                {/* Footer Section */}
                <div className="border-t border-white/10 pt-16">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                        {/* Brand */}
                        <div className="md:col-span-2">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-10 h-10 flex items-center justify-center">
                                <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                                    <path
                                        d="M21.58 7.16C21.33 6.22 20.59 5.48 19.65 5.23C17.96 4.77 12 4.77 12 4.77C12 4.77 6.04 4.77 4.35 5.23C3.41 5.48 2.67 6.22 2.42 7.16C1.96 8.85 1.96 12.38 1.96 12.38C1.96 12.38 1.96 15.91 2.42 17.6C2.67 18.54 3.41 19.28 4.35 19.53C6.04 19.99 12 19.99 12 19.99C12 19.99 17.96 19.99 19.65 19.53C20.59 19.28 21.33 18.54 21.58 17.6C22.04 15.91 22.04 12.38 22.04 12.38C22.04 12.38 22.04 8.85 21.58 7.16Z"
                                        fill="#FF0000"
                                    />
                                    <path
                                        d="M10 7L18 7L17.2 9.5H12.8L12.2 11.5H16L15.2 14H11.5L10.5 17H7.5L10 7Z"
                                        fill="white"
                                    />
                                </svg>
                            </div>
                                <span className="text-2xl font-bold text-text-primary">Flow</span>
                            </div>
                            <p className="text-sm text-text-secondary mb-6 max-w-sm">
                                A modern, privacy-first YouTube client with a local Neural Recommendation Engine.
                                No ads. No tracking. Just content.
                            </p>
                            <div className="flex items-center gap-4">
                                <a
                                    href="https://github.com/A-EDev/Flow"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-text-muted hover:text-text-primary"
                                >
                                    <Github className="w-5 h-5" />
                                </a>
                                <a
                                    href="https://twitter.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-text-muted hover:text-text-primary"
                                >
                                    <Twitter className="w-5 h-5" />
                                </a>
                            </div>
                        </div>

                        {/* Product Links */}
                        <div>
                            <h4 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">Product</h4>
                            <ul className="space-y-3">
                                {footerLinks.product.map((link) => (
                                    <li key={link.label}>
                                        <button
                                            onClick={() => scrollToSection(link.href)}
                                            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                                        >
                                            {link.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Community Links */}
                        <div>
                            <h4 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">Community</h4>
                            <ul className="space-y-3">
                                {footerLinks.community.map((link) => (
                                    <li key={link.label}>
                                        <a
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Copyright */}
                    <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-text-muted">
                            © {new Date().getFullYear()} Flow. GPL v3.0 Licensed.
                        </p>
                        <p className="text-sm text-text-muted flex items-center gap-1">
                            Made with <Heart className="w-4 h-4 text-accent-primary" /> by A-EDev
                        </p>
                    </div>
                </div>
            </div>
        </Section>
    )
}

export default FinalCTA
