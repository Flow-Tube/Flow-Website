import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Download, Sun, Moon, ChevronDown, ArrowRight, ArrowUpRight, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { useStats, formatCompact } from '@/lib/useStats'

interface NavLinkItem {
    label: string
    description: string
    href: string
    external?: boolean
    meta?: string
    heart?: boolean
}

interface NavGroup {
    id: string
    label: string
    featured?: NavLinkItem & { kicker: string; cta: string }
    items: NavLinkItem[]
}

function useNavGroups(): NavGroup[] {
    const stats = useStats()
    return [
        {
            id: 'explore',
            label: 'Explore',
            featured: {
                kicker: 'FlowNeuro',
                label: 'How it Works',
                description: 'A recommendation engine that learns what you like on your phone, and nowhere else. See what it knows and why it picked each video.',
                href: '/#neuro-engine',
                cta: 'See how it learns',
            },
            items: [
                { label: 'Features', description: 'Everything Flow can do, from SponsorBlock to song recognition.', href: '/#features' },
                { label: 'Every Screen', description: 'Tour Flow on Android, Android TV and desktop.', href: '/#showcase' },
                { label: 'FAQ', description: 'Straight answers on cost, privacy and installing.', href: '/#faq' },
            ],
        },
        {
            id: 'community',
            label: 'Community',
            items: [
                { label: 'Support Flow', description: 'No ads and no paid tier. Donations keep Flow going.', href: '/#support', heart: true },
                { label: 'Patrons', description: 'The people who keep Flow free.', href: '/patrons' },
                {
                    label: 'GitHub',
                    description: 'Star the source and follow development.',
                    href: 'https://github.com/A-EDev/Flow',
                    external: true,
                    meta: stats ? `${formatCompact(stats.stars)} stars` : undefined,
                },
                { label: 'Reddit', description: 'Chat with other Flow users on r/Flow_Official.', href: 'https://reddit.com/r/flow_official', external: true },
                { label: 'About', description: 'Why Flow exists and who builds it.', href: '/about' },
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

    const itemTitle = (item: NavLinkItem) => (
        <span className="flex items-baseline justify-between gap-3">
            <span className="flex items-center gap-1.5 font-display text-[17px] font-semibold tracking-[-0.01em] text-text-primary">
                {item.label}
                {item.heart && <Heart className="w-3.5 h-3.5 text-accent-primary fill-accent-primary" aria-hidden="true" />}
                {item.external && <ArrowUpRight className="w-3.5 h-3.5 text-text-muted opacity-0 -translate-x-1 transition-all duration-200 group-hover/item:opacity-100 group-hover/item:translate-x-0" aria-hidden="true" />}
            </span>
            {item.meta && <span className="kicker shrink-0">{item.meta}</span>}
        </span>
    )

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
                                                'flex items-center gap-1 px-3.5 py-2 text-[15px] font-medium transition-colors',
                                                isOpen || active ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
                                            )}
                                        >
                                            {group.label}
                                            <ChevronDown className={cn('w-4 h-4 transition-transform duration-200', isOpen && 'rotate-180')} strokeWidth={2} />
                                        </button>

                                        <AnimatePresence>
                                            {isOpen && (
                                                <motion.div
                                                    id={`nav-${group.id}`}
                                                    initial={{ opacity: 0, x: '-50%', y: -4 }}
                                                    animate={{ opacity: 1, x: '-50%', y: 0 }}
                                                    exit={{ opacity: 0, x: '-50%', y: -4 }}
                                                    transition={{ duration: 0.15, ease: 'easeOut' }}
                                                    className="absolute left-1/2 top-full pt-2"
                                                >
                                                    <ul
                                                        className={cn(
                                                            'grid gap-1 rounded-2xl border-2 border-text-primary bg-bg-primary p-2.5 shadow-sm',
                                                            group.featured ? 'w-[480px] lg:w-[600px] grid-cols-2' : 'w-[340px] grid-cols-1'
                                                        )}
                                                    >
                                                        {group.featured && (
                                                            <li className="row-span-3">
                                                                {renderItemLink(
                                                                    group.featured,
                                                                    <>
                                                                        <span className="kicker">{group.featured.kicker}</span>
                                                                        {itemTitle(group.featured)}
                                                                        <span className="text-sm leading-relaxed text-text-secondary">{group.featured.description}</span>
                                                                        <span className="mt-auto pt-4 self-start inline-flex items-center gap-2 rounded-xl bg-text-primary text-bg-primary px-4 py-2.5 text-sm font-semibold shadow-[0_8px_18px_-10px_rgba(0,0,0,0.55)] transition-transform duration-150 group-hover/item:scale-[1.02]">
                                                                            {group.featured.cta}
                                                                            <ArrowRight className="w-4 h-4" aria-hidden="true" />
                                                                        </span>
                                                                    </>,
                                                                    'group/item h-full flex flex-col gap-2 rounded-xl bg-bg-secondary p-5 hover:bg-bg-elevated transition-colors'
                                                                )}
                                                            </li>
                                                        )}
                                                        {group.items.map(item => (
                                                            <li key={item.label}>
                                                                {renderItemLink(
                                                                    item,
                                                                    <>
                                                                        {itemTitle(item)}
                                                                        <span className="text-sm leading-snug text-text-secondary">{item.description}</span>
                                                                    </>,
                                                                    'group/item flex flex-col gap-1 rounded-xl px-4 py-3.5 hover:bg-bg-secondary transition-colors'
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
                                    'px-3.5 py-2 text-[15px] font-medium transition-colors',
                                    location.pathname === '/changelog' ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
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
                                            {(group.featured ? [group.featured, ...group.items] : group.items).map(item => (
                                                <li key={item.label}>
                                                    {renderItemLink(
                                                        item,
                                                        <>
                                                            {item.label}
                                                            {item.heart && <Heart className="w-4 h-4 text-accent-primary fill-accent-primary" aria-hidden="true" />}
                                                        </>,
                                                        'flex items-center gap-2 py-2 font-display text-xl font-semibold tracking-[-0.01em] text-text-primary'
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                                <div className="py-4 border-t border-border-subtle">
                                    <Link to="/changelog" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 font-display text-xl font-semibold tracking-[-0.01em] text-text-primary">
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
