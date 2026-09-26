import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Menu, X, Download, Sun, Moon, ChevronDown, Sparkles, Brain, Smartphone,
    HelpCircle, Github, Heart, Info, Bug, type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { useStats, formatCompact } from '@/lib/useStats'

function RedditIcon({ className }: { className?: string; strokeWidth?: number }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
            <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.508 1.183-.833 2.822-1.393 4.61-1.48l.84-3.922c.046-.216.257-.354.472-.313l3.05.642a1.24 1.24 0 0 1 1.049-.937zM16 11.23c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm-8 0c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm0 5.46c2.08 0 3.754-.925 3.968-1.077l-.608-.813c-.11.082-1.57.94-3.36.94-1.789 0-3.25-.858-3.36-.94l-.608.813c.214.152 1.888 1.077 3.968 1.077z" />
        </svg>
    )
}

interface NavLinkItem {
    label: string
    description: string
    href: string
    icon: LucideIcon | typeof RedditIcon
    external?: boolean
}

interface NavGroup {
    id: string
    label: string
    items: NavLinkItem[]
}

function useNavGroups(): NavGroup[] {
    const stats = useStats()
    return [
        {
            id: 'explore',
            label: 'Explore',
            items: [
                { label: 'Features', description: 'Everything Flow can do', href: '/#features', icon: Sparkles },
                { label: 'How it Works', description: 'The on-device recommendation engine', href: '/#neuro-engine', icon: Brain },
                { label: 'Every Screen', description: 'Tour Flow on Android and desktop', href: '/#showcase', icon: Smartphone },
                { label: 'FAQ', description: 'Answers to common questions', href: '/#faq', icon: HelpCircle },
            ],
        },
        {
            id: 'community',
            label: 'Community',
            items: [
                {
                    label: 'GitHub',
                    description: stats ? `Source code · ${formatCompact(stats.stars)} stars` : 'Source code and releases',
                    href: 'https://github.com/A-EDev/Flow',
                    icon: Github,
                    external: true,
                },
                { label: 'Reddit', description: 'Discuss and get help on r/Flow_Official', href: 'https://reddit.com/r/flow_official', icon: RedditIcon, external: true },
                { label: 'Patrons', description: 'The people who keep Flow free', href: '/patrons', icon: Heart },
                { label: 'About', description: 'Why Flow exists', href: '/about', icon: Info },
                { label: 'Report an Issue', description: 'Found a bug? Let us know', href: 'https://github.com/A-EDev/Flow/issues', icon: Bug, external: true },
            ],
        },
    ]
}

export function Header() {
    const [openGroup, setOpenGroup] = useState<string | null>(null)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [theme, setTheme] = useState(document.documentElement.classList.contains('dark') ? 'dark' : 'light')
    const navRef = useRef<HTMLElement>(null)
    const closeTimer = useRef<number>()
    const location = useLocation()
    const groups = useNavGroups()

    useEffect(() => {
        setOpenGroup(null)
        setIsMobileMenuOpen(false)
    }, [location.pathname, location.hash])

    useEffect(() => {
        if (!openGroup) return
        const onPointerDown = (e: PointerEvent) => {
            if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenGroup(null)
        }
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpenGroup(null)
        }
        document.addEventListener('pointerdown', onPointerDown)
        window.addEventListener('keydown', onKeyDown)
        return () => {
            document.removeEventListener('pointerdown', onPointerDown)
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [openGroup])

    useEffect(() => {
        if (!isMobileMenuOpen) return
        const prevOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsMobileMenuOpen(false)
        }
        window.addEventListener('keydown', onKeyDown)
        return () => {
            document.body.style.overflow = prevOverflow
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [isMobileMenuOpen])

    useEffect(() => () => window.clearTimeout(closeTimer.current), [])

    const toggleTheme = () => {
        const next = theme === 'light' ? 'dark' : 'light'
        document.documentElement.classList.toggle('dark', next === 'dark')
        try { localStorage.setItem('flow-theme', next) } catch { /* storage unavailable */ }
        setTheme(next)
    }

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith('/#') && window.location.pathname === '/') {
            e.preventDefault()
            document.querySelector(href.replace('/#', '#'))?.scrollIntoView({ behavior: 'smooth' })
        }
        setOpenGroup(null)
        setIsMobileMenuOpen(false)
    }

    const openOnHover = (id: string) => {
        window.clearTimeout(closeTimer.current)
        setOpenGroup(id)
    }
    const closeOnLeave = () => {
        window.clearTimeout(closeTimer.current)
        closeTimer.current = window.setTimeout(() => setOpenGroup(null), 160)
    }

    const isGroupActive = (group: NavGroup) =>
        group.items.some(item => !item.external && !item.href.includes('#') && location.pathname === item.href)

    const renderItemLink = (item: NavLinkItem, children: React.ReactNode, className: string) =>
        item.external ? (
            <a href={item.href} target="_blank" rel="noopener noreferrer" className={className} onClick={() => { setOpenGroup(null); setIsMobileMenuOpen(false) }}>
                {children}
            </a>
        ) : (
            <Link to={item.href} className={className} onClick={(e) => handleNavClick(e, item.href)}>
                {children}
            </Link>
        )

    const themeButton = (
        <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="w-10 h-10 grid place-items-center text-text-secondary hover:text-text-primary hover:bg-bg-elevated rounded-xl transition-colors"
        >
            <span className="relative flex w-[18px] h-[18px] items-center justify-center">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                        key={theme}
                        initial={{ y: -8, opacity: 0, rotate: -40 }}
                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                        exit={{ y: 8, opacity: 0, rotate: 40 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        className="absolute"
                    >
                        {theme === 'dark' ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
                    </motion.span>
                </AnimatePresence>
            </span>
        </button>
    )

    return (
        <>
            <header className="absolute top-0 left-0 right-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex md:grid md:grid-cols-[1fr_auto_1fr] items-center justify-between h-16 md:h-20">
                        <Link to="/" className="flex items-center gap-2.5 group justify-self-start" aria-label="Flow home">
                            <img src="/flow-icon.svg" className="w-9 h-9 md:w-10 md:h-10 object-contain transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" alt="" />
                            <span className="font-display text-2xl md:text-[1.75rem] font-semibold tracking-[-0.03em] text-text-primary">Flow</span>
                        </Link>

                        <nav ref={navRef} aria-label="Main" className="hidden md:flex items-center gap-1">
                            {groups.map(group => {
                                const isOpen = openGroup === group.id
                                const active = isGroupActive(group)
                                return (
                                    <div
                                        key={group.id}
                                        className="relative"
                                        onMouseEnter={() => openOnHover(group.id)}
                                        onMouseLeave={closeOnLeave}
                                    >
                                        <button
                                            type="button"
                                            aria-expanded={isOpen}
                                            aria-controls={`nav-${group.id}`}
                                            onClick={() => setOpenGroup(isOpen ? null : group.id)}
                                            className={cn(
                                                'flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[15px] font-medium transition-colors',
                                                isOpen || active ? 'text-text-primary bg-bg-elevated' : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated'
                                            )}
                                        >
                                            {group.label}
                                            <ChevronDown className={cn('w-4 h-4 transition-transform duration-200', isOpen && 'rotate-180')} strokeWidth={2} />
                                        </button>

                                        <AnimatePresence>
                                            {isOpen && (
                                                <motion.div
                                                    id={`nav-${group.id}`}
                                                    initial={{ opacity: 0, y: -6 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -6 }}
                                                    transition={{ duration: 0.16, ease: 'easeOut' }}
                                                    className="absolute left-1/2 -translate-x-1/2 top-full pt-3"
                                                >
                                                    <ul className="w-[340px] rounded-2xl border border-border-subtle bg-bg-card p-2 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.35)]">
                                                        {group.items.map(item => (
                                                            <li key={item.label}>
                                                                {renderItemLink(
                                                                    item,
                                                                    <>
                                                                        <span className="w-9 h-9 rounded-lg bg-bg-elevated grid place-items-center shrink-0 text-text-primary">
                                                                            <item.icon className="w-[18px] h-[18px]" strokeWidth={1.75} />
                                                                        </span>
                                                                        <span className="min-w-0">
                                                                            <span className="block text-sm font-semibold text-text-primary">{item.label}</span>
                                                                            <span className="block text-[13px] leading-snug text-text-secondary">{item.description}</span>
                                                                        </span>
                                                                    </>,
                                                                    'flex items-center gap-3 p-2.5 rounded-xl hover:bg-bg-secondary transition-colors'
                                                                )}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                )
                            })}

                            <Link
                                to="/changelog"
                                aria-current={location.pathname === '/changelog' ? 'page' : undefined}
                                className={cn(
                                    'px-3.5 py-2 rounded-xl text-[15px] font-medium transition-colors',
                                    location.pathname === '/changelog' ? 'text-text-primary bg-bg-elevated' : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated'
                                )}
                            >
                                Changelog
                            </Link>
                        </nav>

                        <div className="hidden md:flex items-center justify-self-end gap-2">
                            {themeButton}
                            <Button
                                href="https://github.com/A-EDev/Flow/releases/latest"
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="primary"
                                size="sm"
                                className="px-5 py-2.5"
                                icon={<Download className="w-4 h-4" />}
                                iconPosition="left"
                            >
                                Download
                            </Button>
                        </div>

                        <div className="md:hidden flex items-center gap-1">
                            {themeButton}
                            <button
                                onClick={() => setIsMobileMenuOpen(true)}
                                aria-label="Open menu"
                                aria-expanded={isMobileMenuOpen}
                                aria-controls="mobile-menu"
                                className="w-10 h-10 grid place-items-center text-text-primary rounded-xl hover:bg-bg-elevated"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            className="fixed inset-0 z-[60] bg-black/40 md:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            aria-hidden="true"
                        />
                        <motion.aside
                            id="mobile-menu"
                            role="dialog"
                            aria-modal="true"
                            aria-label="Menu"
                            className="fixed inset-y-0 right-0 z-[70] w-[min(20rem,86vw)] bg-bg-primary md:hidden flex flex-col shadow-[-24px_0_48px_-24px_rgba(0,0,0,0.4)]"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="flex items-center justify-between h-16 px-5">
                                <span className="font-display text-2xl font-semibold tracking-[-0.03em]">Menu</span>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    aria-label="Close menu"
                                    className="w-10 h-10 grid place-items-center rounded-xl hover:bg-bg-elevated"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto px-5 pb-6">
                                {groups.map(group => (
                                    <div key={group.id} className="py-4 border-t border-border-subtle first:border-t-0">
                                        <p className="kicker mb-2">{group.label}</p>
                                        <ul>
                                            {group.items.map(item => (
                                                <li key={item.label}>
                                                    {renderItemLink(
                                                        item,
                                                        <>
                                                            <item.icon className="w-[18px] h-[18px] text-text-muted" strokeWidth={1.75} />
                                                            <span>{item.label}</span>
                                                        </>,
                                                        'flex items-center gap-3 py-2.5 text-lg font-medium text-text-primary'
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                                <div className="py-4 border-t border-border-subtle">
                                    <Link to="/changelog" onClick={() => setIsMobileMenuOpen(false)} className="block py-2.5 text-lg font-medium text-text-primary">
                                        Changelog
                                    </Link>
                                </div>
                            </div>

                            <div className="p-5 border-t border-border-subtle">
                                <Button
                                    href="https://github.com/A-EDev/Flow/releases/latest"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    variant="primary"
                                    size="md"
                                    className="w-full"
                                    icon={<Download className="w-4 h-4" />}
                                    iconPosition="left"
                                >
                                    Download APK
                                </Button>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}

export default Header
