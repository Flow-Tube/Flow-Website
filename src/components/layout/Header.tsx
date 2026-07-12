import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Download, Star, Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

const navItems = [
    { label: 'Features', href: '/#features', isRoute: true },
    { label: 'How it Works', href: '/#neuro-engine', isRoute: true },
    { label: 'Changelog', href: '/changelog', isRoute: true },
    { label: 'Patrons', href: '/patrons', isRoute: true },
    { label: 'About', href: '/about', isRoute: true },
]

interface HeaderProps {
    hideUntilScroll?: boolean
}

export function Header({ hideUntilScroll = false }: HeaderProps) {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [theme, setTheme] = useState(document.documentElement.classList.contains('dark') ? 'dark' : 'light')
    const [stats, setStats] = useState({ stars: '0', downloads: '0' })
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)

        fetch('/stats.json')
            .then(res => res.json())
            .then(data => {
                if (data.stars) {
                    setStats({
                        stars: data.stars.toString(),
                        downloads: data.downloads >= 1000 ? (data.downloads / 1000).toFixed(1) + 'k' : data.downloads.toString()
                    })
                }
            })
            .catch(() => { })

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

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

    const toggleTheme = () => {
        const next = theme === 'light' ? 'dark' : 'light'
        document.documentElement.classList.toggle('dark', next === 'dark')
        localStorage.setItem('flow-theme', next)
        setTheme(next)
    }

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith('/#')) {
            if (window.location.pathname === '/') {
                e.preventDefault()
                const id = href.replace('/#', '#')
                document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
            }
        }
        setIsMobileMenuOpen(false)
    }

    const isActive = (href: string) => !href.includes('#') && location.pathname === href

    const isHidden = hideUntilScroll && !isScrolled && !isMobileMenuOpen

    return (
        <>
            <motion.header
                className={cn(
                    'fixed top-0 left-0 right-0 z-50 transition-colors duration-300',
                    isScrolled || isMobileMenuOpen ? 'bg-bg-primary/90 backdrop-blur-md border-b border-border-subtle' : 'bg-transparent border-b border-transparent'
                )}
                initial={hideUntilScroll ? { y: '-110%' } : { y: -100 }}
                animate={{ y: isHidden ? '-110%' : 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2 group" aria-label="Flow — home">
                            <img src="/flow-icon.svg" className="w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" alt="" />
                            <span className="text-xl font-bold text-text-primary tracking-tight">Flow</span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-8">
                            {navItems.map((item) => {
                                const active = item.isRoute && isActive(item.href)
                                const underline = (
                                    <span
                                        aria-hidden="true"
                                        className={cn(
                                            'absolute -bottom-1.5 left-0 h-0.5 rounded-full bg-accent-primary transition-all duration-300 ease-out',
                                            active ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                                        )}
                                    />
                                )
                                return item.isRoute ? (
                                    <Link
                                        key={item.label}
                                        to={item.href}
                                        onClick={(e) => handleNavClick(e, item.href)}
                                        aria-current={active ? 'page' : undefined}
                                        className={cn(
                                            'group relative text-sm font-medium transition-colors',
                                            active ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
                                        )}
                                    >
                                        {item.label}
                                        {underline}
                                    </Link>
                                ) : (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
                                    >
                                        {item.label}
                                        {underline}
                                    </a>
                                )
                            })}
                        </nav>

                        {/* Desktop CTAs & Badges */}
                        <div className="hidden md:flex items-center gap-3">
                            {/* Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                                className="p-2 text-text-secondary hover:text-text-primary hover:bg-bg-elevated rounded-full transition-colors mr-2"
                            >
                                <span className="relative flex w-4 h-4 items-center justify-center">
                                    <AnimatePresence mode="wait" initial={false}>
                                        <motion.span
                                            key={theme}
                                            initial={{ y: -8, opacity: 0, rotate: -40 }}
                                            animate={{ y: 0, opacity: 1, rotate: 0 }}
                                            exit={{ y: 8, opacity: 0, rotate: 40 }}
                                            transition={{ duration: 0.18, ease: 'easeOut' }}
                                            className="absolute"
                                        >
                                            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                                        </motion.span>
                                    </AnimatePresence>
                                </span>
                            </button>

                            {/* Stats Badges */}
                            <a href="https://github.com/A-EDev/Flow/stargazers" target="_blank" rel="noopener noreferrer" aria-label={`${stats.stars} stars on GitHub`} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border-subtle bg-bg-elevated text-xs font-semibold text-text-primary hover:bg-bg-secondary hover:border-text-muted transition-colors group">
                                <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500 group-hover:scale-110 transition-transform" />
                                <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true" className="text-text-primary ml-0.5"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.46-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path></svg>
                                <span>{stats.stars}</span>
                            </a>
                            <a href="https://github.com/A-EDev/Flow/releases" target="_blank" rel="noopener noreferrer" aria-label={`${stats.downloads} downloads`} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border-subtle bg-bg-elevated text-xs font-semibold text-text-primary hover:bg-bg-secondary hover:border-text-muted transition-colors group">
                                <Download className="w-3.5 h-3.5 text-accent-primary group-hover:scale-110 transition-transform" />
                                <span>{stats.downloads}</span>
                            </a>

                            <div className="w-px h-6 bg-border-subtle mx-1"></div>

                            <a href="https://reddit.com/r/flow_official" target="_blank" rel="noopener noreferrer">
                                <Button variant="secondary" size="sm" className="hidden lg:flex items-center gap-1.5 border-border-subtle bg-bg-card hover:bg-bg-elevated">
                                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true" className="text-[#FF4500]">
                                        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.508 1.183-.833 2.822-1.393 4.61-1.48l.84-3.922c.046-.216.257-.354.472-.313l3.05.642a1.24 1.24 0 0 1 1.049-.937zM16 11.23c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm-8 0c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm0 5.46c2.08 0 3.754-.925 3.968-1.077l-.608-.813c-.11.082-1.57.94-3.36.94-1.789 0-3.25-.858-3.36-.94l-.608.813c.214.152 1.888 1.077 3.968 1.077z" />
                                    </svg>
                                    Join on Reddit
                                </Button>
                            </a>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center gap-2">
                            <button
                                onClick={toggleTheme}
                                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                                className="p-2 text-text-secondary hover:text-text-primary rounded-full transition-colors"
                            >
                                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                                aria-expanded={isMobileMenuOpen}
                                aria-controls="mobile-menu"
                                className="p-2 text-text-primary"
                            >
                                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        id="mobile-menu"
                        className="fixed inset-0 z-40 bg-bg-primary md:hidden pt-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="flex flex-col items-center justify-center h-full gap-8 pb-20">
                            {navItems.map((item, index) => {
                                const active = item.isRoute && isActive(item.href)
                                return (
                                    <motion.div
                                        key={item.label}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        {item.isRoute ? (
                                            <Link
                                                to={item.href}
                                                onClick={(e) => handleNavClick(e, item.href)}
                                                aria-current={active ? 'page' : undefined}
                                                className={cn('text-xl font-medium transition-colors', active ? 'text-accent-primary' : 'text-text-primary')}
                                            >
                                                {item.label}
                                            </Link>
                                        ) : (
                                            <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-xl font-medium text-text-primary">
                                                {item.label}
                                            </a>
                                        )}
                                    </motion.div>
                                )
                            })}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: navItems.length * 0.05 }}
                                className="flex flex-col items-center gap-4 mt-4"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border-subtle bg-bg-elevated text-sm font-semibold text-text-primary">
                                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                        <span>{stats.stars}</span>
                                    </span>
                                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border-subtle bg-bg-elevated text-sm font-semibold text-text-primary">
                                        <Download className="w-4 h-4 text-orange-500" />
                                        <span>{stats.downloads}</span>
                                    </span>
                                </div>
                                <a href="https://reddit.com/r/flow_official" target="_blank" rel="noopener noreferrer">
                                    <Button variant="secondary" size="lg" className="w-full flex items-center justify-center gap-2">
                                        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" className="text-[#FF4500]">
                                            <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.508 1.183-.833 2.822-1.393 4.61-1.48l.84-3.922c.046-.216.257-.354.472-.313l3.05.642a1.24 1.24 0 0 1 1.049-.937zM16 11.23c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm-8 0c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm0 5.46c2.08 0 3.754-.925 3.968-1.077l-.608-.813c-.11.082-1.57.94-3.36.94-1.789 0-3.25-.858-3.36-.94l-.608.813c.214.152 1.888 1.077 3.968 1.077z" />
                                        </svg>
                                        Join on Reddit
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
