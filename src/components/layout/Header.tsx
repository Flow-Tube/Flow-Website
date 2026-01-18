import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Download, Github } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

const navItems = [
    { label: 'Features', href: '#features' },
    { label: 'How it Works', href: '#neuro-engine' },
    { label: 'Privacy', href: '#privacy' },
    { label: 'Open Source', href: '#open-source' },
]

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToSection = (href: string) => {
        const element = document.querySelector(href)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
        setIsMobileMenuOpen(false)
    }

    return (
        <>
            <motion.header
                className={cn(
                    'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                    isScrolled ? 'bg-bg-primary/80 backdrop-blur-xl border-b border-white/5' : ''
                )}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        {/* Logo */}
                        <a
                            href="#hero"
                            onClick={(e) => { e.preventDefault(); scrollToSection('#hero') }}
                            className="flex items-center gap-2"
                        >
                            <div className="w-8 h-8 flex items-center justify-center">
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
                            <span className="text-xl font-bold text-text-primary">Flow</span>
                        </a>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-8">
                            {navItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    onClick={(e) => { e.preventDefault(); scrollToSection(item.href) }}
                                    className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </nav>

                        {/* Desktop CTAs */}
                        <div className="hidden md:flex items-center gap-3">
                            <a
                                href="https://github.com/A-EDev/Flow"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button variant="ghost" size="sm">
                                    <Github className="w-4 h-4" />
                                </Button>
                            </a>
                            <a
                                href="https://github.com/A-EDev/Flow/releases/latest"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                            <Button variant="primary" size="sm" icon={<Download className="w-4 h-4" />}>
                                Download
                            </Button>
                            </a>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 text-text-primary"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="fixed inset-0 z-40 bg-bg-primary/95 backdrop-blur-xl md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="flex flex-col items-center justify-center h-full gap-8">
                            {navItems.map((item, index) => (
                                <motion.a
                                    key={item.label}
                                    href={item.href}
                                    onClick={(e) => { e.preventDefault(); scrollToSection(item.href) }}
                                    className="text-2xl font-medium text-text-primary"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    {item.label}
                                </motion.a>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: navItems.length * 0.1 }}
                            >
                                <a href="https://github.com/A-EDev/Flow/releases/latest"
                                target="_blank"
                                rel="noopener noreferrer"
                                >
                                <Button variant="primary" size="lg" icon={<Download className="w-5 h-5" />}>
                                    Download Flow
                                </Button>
                                </a>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Header
