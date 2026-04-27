import { Download, Github, Heart } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { FadeIn } from '@/components/ui/TextReveal'
import { Button } from '@/components/ui/Button'
import { Link } from 'react-router-dom'

const footerLinks = {
    product: [
        { label: 'Features', href: '/#features', isRoute: true },
        { label: 'How it Works', href: '/#neuro-engine', isRoute: true },
        { label: 'Changelog', href: '/changelog', isRoute: true },
        { label: 'About', href: '/about', isRoute: true },
    ],
    community: [
        { label: 'Reddit', href: 'https://reddit.com/r/flow_official' },
        { label: 'GitHub', href: 'https://github.com/A-EDev/Flow' },
        { label: 'Issues', href: 'https://github.com/A-EDev/Flow/issues' },
    ],
    downloads: [
        { label: 'GitHub Releases', href: 'https://github.com/A-EDev/Flow/releases/latest' },
        { label: 'IzzyOnDroid', href: 'https://apt.izzysoft.de/fdroid/index/apk/com.aedev.flow' },
        { label: 'Obtainium', href: 'https://github.com/ImranR98/Obtainium' },
        { label: 'Nightly Build', href: 'https://github.com/A-EDev/Flow/actions' },
    ]
}

export function FinalCTA() {
    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith('/#')) {
            if (window.location.pathname === '/') {
                e.preventDefault()
                const id = href.replace('/#', '#')
                document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
            }
        }
    }

    return (
        <Section id="final-cta" className="py-24 bg-bg-primary">
            <div className="section-content relative z-10 max-w-5xl">
                {/* Main CTA Section */}
                <div className="text-center mb-24">
                    <div className="mb-10">
                        <FadeIn delay={0.1}>
                            <h2 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
                                <span className="text-text-primary">This is your Flow.</span>
                            </h2>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <p className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
                                Not what an algorithm wants you to watch.
                                <br />
                                <span className="text-text-primary font-medium">What you want to discover.</span>
                            </p>
                        </FadeIn>
                    </div>

                    {/* CTAs */}
                    <FadeIn delay={0.4}>
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <a
                                href="https://github.com/A-EDev/Flow/releases/latest"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="text-lg px-8 py-4"
                                >
                                    <Download className="w-5 h-5 mr-2" />
                                    Download Flow
                                </Button>
                            </a>

                            <a
                                href="https://github.com/A-EDev/Flow"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button
                                    variant="secondary"
                                    size="lg"
                                    className="text-lg px-8 py-4 bg-bg-card hover:bg-bg-elevated border-border-subtle"
                                >
                                    <Github className="w-5 h-5 mr-2 text-text-primary" />
                                    Star on GitHub
                                </Button>
                            </a>
                        </div>
                    </FadeIn>
                </div>

                {/* Footer Section */}
                <div className="border-t border-border-subtle pt-16">
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-12">
                        {/* Brand */}
                        <div className="md:col-span-2">
                            <div className="flex items-center gap-2 mb-4">
                                <img src="/flow-icon.svg" className="w-8 h-8 rounded-lg" alt="Flow Logo" />
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
                                    className="p-2 rounded-lg bg-bg-elevated hover:bg-bg-card transition-colors text-text-secondary hover:text-text-primary"
                                >
                                    <Github className="w-5 h-5" />
                                </a>
                                <a
                                    href="https://reddit.com/r/flow_official"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-lg bg-bg-elevated hover:bg-bg-card transition-colors text-text-secondary hover:text-text-primary"
                                >
                                    {/* Reddit Icon SVG */}
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.508 1.183-.833 2.822-1.393 4.61-1.48l.84-3.922c.046-.216.257-.354.472-.313l3.05.642a1.24 1.24 0 0 1 1.049-.937zM16 11.23c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm-8 0c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm0 5.46c2.08 0 3.754-.925 3.968-1.077l-.608-.813c-.11.082-1.57.94-3.36.94-1.789 0-3.25-.858-3.36-.94l-.608.813c.214.152 1.888 1.077 3.968 1.077z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Product Links */}
                        <div>
                            <h4 className="text-xs font-bold text-text-primary mb-4 uppercase tracking-wider">Product</h4>
                            <ul className="space-y-3">
                                {footerLinks.product.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            to={link.href}
                                            onClick={(e) => handleLinkClick(e, link.href)}
                                            className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Community Links */}
                        <div>
                            <h4 className="text-xs font-bold text-text-primary mb-4 uppercase tracking-wider">Community</h4>
                            <ul className="space-y-3">
                                {footerLinks.community.map((link) => (
                                    <li key={link.label}>
                                        <a
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        {/* Legal Links */}
                        <div>
                            <h4 className="text-xs font-bold text-text-primary mb-4 uppercase tracking-wider">Legal</h4>
                            <ul className="space-y-3">
                                <li>
                                    <Link to="/privacy" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dmca" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
                                        DMCA
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        
                        {/* Downloads Links */}
                        <div>
                            <h4 className="text-xs font-bold text-text-primary mb-4 uppercase tracking-wider">Downloads</h4>
                            <div className="flex flex-col gap-3">
                                <a
                                    href="https://github.com/A-EDev/Flow/releases/latest"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:opacity-80 transition-opacity max-w-[120px]"
                                >
                                    <img src="https://github.com/machiav3lli/oandbackupx/blob/034b226cea5c1b30eb4f6a6f313e4dadcbb0ece4/badge_github.png?raw=true" alt="GitHub" className="w-full h-auto object-contain" />
                                </a>
                                <a
                                    href="https://apt.izzysoft.de/packages/io.github.aedev.flow"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:opacity-80 transition-opacity max-w-[120px]"
                                >
                                    <img src="https://gitlab.com/IzzyOnDroid/repo/-/raw/master/assets/IzzyOnDroid.png" alt="IzzyOnDroid" className="w-full h-auto object-contain" />
                                </a>
                                <a
                                    href="https://apps.obtainium.imranr.dev/redirect?r=obtainium://add/https://github.com/A-EDev/Flow/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:opacity-80 transition-opacity max-w-[120px]"
                                >
                                    <img src="https://github.com/ImranR98/Obtainium/blob/main/assets/graphics/badge_obtainium.png?raw=true" alt="Obtainium" className="w-full h-auto object-contain" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Copyright */}
                    <div className="mt-16 pt-8 border-t border-border-subtle flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-text-secondary font-medium">
                            © {new Date().getFullYear()} Flow. GPL v3.0 Licensed.
                        </p>
                        <p className="text-sm text-text-secondary font-medium flex items-center gap-1">
                            Made with <Heart className="w-4 h-4 text-accent-primary" /> by A-EDev
                        </p>
                    </div>
                </div>
            </div>
        </Section>
    )
}

export default FinalCTA
