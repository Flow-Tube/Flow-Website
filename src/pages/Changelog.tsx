import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Header } from '@/components/layout/Header'
import { FinalCTA } from '@/components/sections/FinalCTA'
import { ChevronDown, ChevronUp, Smartphone, Monitor } from 'lucide-react'

type Platform = 'android' | 'desktop'

function parseChangelogText(text: string) {
    const lines = text.split('\n')
    let version = ''
    let date = ''
    const sections: Record<string, string[]> = {}
    let currentSection = ''
    let title = ''
    let description = ''
    let status = ''

    for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed || trimmed === 'FLOW CHANGE LOG') continue

        if (trimmed.toUpperCase().startsWith('VERSION:')) {
            version = trimmed.substring(8).trim()
            title = 'Flow Update'
        } else if (trimmed.toUpperCase().startsWith('DATE:')) {
            date = trimmed.substring(5).trim()
        } else if (trimmed.toUpperCase().startsWith('STATUS:')) {
            status = trimmed.substring(7).trim()
        } else if (trimmed.toUpperCase().startsWith('TITLE:')) {
            title = trimmed.substring(6).trim()
        } else if (trimmed.toUpperCase().startsWith('DESCRIPTION:')) {
            description = trimmed.substring(12).trim()
        } else if (!trimmed.startsWith('-') && trimmed.length > 2) {
            currentSection = trimmed
            sections[currentSection] = []
        } else if (trimmed.startsWith('-') && currentSection) {
            sections[currentSection].push(trimmed.substring(1).trim())
        }
    }

    // Fallback if title/desc are missing
    if (!title) title = 'Flow Update'
    if (!description && ((sections['FEATURES'] && sections['FEATURES'].length > 0) || (sections['NEW FEATURES'] && sections['NEW FEATURES'].length > 0))) {
        description = 'New features and improvements to the Flow experience.'
    } else if (!description) {
        description = 'Minor fixes and improvements.'
    }

    return { version, date, title, description, sections, status }
}

function formatSectionTitle(title: string): string {
    const clean = title.trim().toUpperCase()

    if (clean === 'FEATURES' || clean === 'NEW FEATURES') return 'New Features'
    if (clean === 'IMPROVEMENTS') return 'Improvements'
    if (clean === 'FIXES' || clean === 'FIXES AND STABILITY' || clean === 'VIDEO PLAYER FIXES') return 'Fixes & Stability'
    if (clean === 'ENGINE' || clean === 'RECOMMENDATION ENGINE' || clean.startsWith('RECOMMENDATION ENGINE') || clean.startsWith('FLOWNEURO ENGINE')) return 'Engine'
    if (clean === 'PERFORMANCE' || clean === 'PERFORMANCE AND REFACTORING') return 'Performance & Refactoring'
    if (clean === 'UI AND STYLE ENHANCEMENTS') return 'UI & Style Enhancements'
    if (clean === 'IMPORTS AND ONBOARDING') return 'Imports & Onboarding'
    if (clean === 'LIBRARIES') return 'Libraries'
    if (clean === 'FLAVORS') return 'Flavors'
    if (clean === 'CORE UPDATE [IMPORTANT]') return 'Core Update [Important]'
    if (clean === '!IMPORTANT!') return 'Important!'

    // Fallback: title case
    return title
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
}

function formatChangelogItem(item: string): string {
    let formatted = item.replace(/(https?:\/\/[^\s"'\)]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-accent-primary hover:underline">$1</a>')
    formatted = formatted.replace(/#(\d+)/g, '<a href="https://github.com/A-EDev/Flow/issues/$1" target="_blank" rel="noopener noreferrer" class="text-accent-primary hover:underline">#$1</a>')
    formatted = formatted.replace(/@([a-zA-Z0-9-]+)/g, '<a href="https://github.com/$1" target="_blank" rel="noopener noreferrer" class="text-text-primary font-medium hover:underline">@$1</a>')
    return formatted
}

const AccordionItem = ({ title, items, isOpen, onToggle }: { title: string, items: string[], isOpen: boolean, onToggle: () => void }) => {
    return (
        <div className="border-b border-border-subtle last:border-0">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between py-4 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
            >
                <span className="flex items-baseline gap-2">
                    {title}
                    <span className="kicker">{items.length}</span>
                </span>
                {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <ul className="pb-4 space-y-2 pl-2">
                            {items.map((item, i) => (
                                <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                                    <span className="text-text-muted mt-1 shrink-0">•</span>
                                    <span dangerouslySetInnerHTML={{ __html: formatChangelogItem(item) }} />
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

function StatusTag({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) {
    return (
        <span className={`px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase rounded-full border ${accent
            ? 'text-bg-primary bg-text-primary border-text-primary'
            : 'text-text-secondary bg-bg-elevated border-border-subtle'
            }`}>
            {children}
        </span>
    )
}

export function ChangelogPage() {
    const [changelogs, setChangelogs] = useState<any[]>([])
    const [platform, setPlatform] = useState<Platform>('android')
    const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({})

    const toggleAccordion = (logKey: string, sectionTitle: string) => {
        const key = `${logKey}-${sectionTitle}`
        setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }))
    }

    useEffect(() => {
        fetch('/changelogs.json')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    const parsed = data.map(item => ({
                        ...parseChangelogText(item.content),
                        platform: (item.platform === 'desktop' ? 'desktop' : 'android') as Platform
                    }))
                    const validChangelogs = parsed.filter(c => c.version)

                    // Sort descending by semantic version (newest first)
                    validChangelogs.sort((a, b) => {
                        const vA = a.version.replace(/[^0-9.]/g, '').split('.').map(Number);
                        const vB = b.version.replace(/[^0-9.]/g, '').split('.').map(Number);
                        for (let i = 0; i < Math.max(vA.length, vB.length); i++) {
                            const numA = vA[i] || 0;
                            const numB = vB[i] || 0;
                            if (numA > numB) return -1;
                            if (numA < numB) return 1;
                        }
                        return 0;
                    })

                    setChangelogs(validChangelogs)
                }
            })
            .catch(() => { })
    }, [])

    const visibleLogs = changelogs.filter(log => log.platform === platform)

    const tabs: { id: Platform; label: string; icon: typeof Smartphone }[] = [
        { id: 'android', label: 'Android', icon: Smartphone },
        { id: 'desktop', label: 'Desktop', icon: Monitor },
    ]

    return (
        <div className="relative min-h-screen bg-bg-primary text-text-primary flex flex-col">
            <Header />

            <main className="flex-1 w-full pt-32 pb-24">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Page Header */}
                    <div className="mb-10">
                        <p className="kicker mb-4">Release Notes</p>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                            Changelog
                        </h1>
                        <p className="text-lg text-text-secondary max-w-2xl">
                            Every release, in detail. Development happens in the open —
                            each entry links back to the issues and contributors behind it.
                        </p>
                    </div>

                    {/* Platform Switcher */}
                    <div className="flex items-center justify-between gap-4 border-b border-border-subtle pb-6 mb-12">
                        <div className="inline-flex rounded-full border border-border-subtle p-1">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setPlatform(tab.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${platform === tab.id
                                        ? 'bg-text-primary text-bg-primary'
                                        : 'text-text-secondary hover:text-text-primary'
                                        }`}
                                    aria-pressed={platform === tab.id}
                                >
                                    <tab.icon className="w-4 h-4" strokeWidth={1.75} />
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                        <span className="kicker hidden sm:block">
                            {platform === 'android' ? `${visibleLogs.length} Releases` : 'Rust + Tauri 2'}
                        </span>
                    </div>

                    {/* Entries */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={platform}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {visibleLogs.length === 0 ? (
                                platform === 'desktop' ? (
                                    /* Desktop empty state (until the first public build ships) */
                                    <div className="rounded-2xl border border-border-subtle bg-bg-secondary px-8 py-16 text-center">
                                        <Monitor className="w-8 h-8 text-text-muted mx-auto mb-5" strokeWidth={1.5} />
                                        <h2 className="text-xl font-bold text-text-primary mb-3">
                                            The desktop story starts here.
                                        </h2>
                                        <p className="text-text-secondary max-w-md mx-auto leading-relaxed mb-6">
                                            Flow for Windows, Linux, and macOS — written in Rust on Tauri 2 —
                                            is in active development. Its first release notes will land on this page.
                                        </p>
                                        <p className="kicker">Windows &middot; Linux &middot; macOS</p>
                                    </div>
                                ) : (
                                    <div className="rounded-2xl border border-border-subtle bg-bg-secondary px-8 py-16 text-center">
                                        <p className="text-text-secondary">
                                            Release notes couldn't be loaded. Check the{' '}
                                            <a href="https://github.com/A-EDev/Flow/releases" target="_blank" rel="noopener noreferrer" className="text-text-primary font-medium hover:underline">
                                                GitHub releases
                                            </a>{' '}
                                            in the meantime.
                                        </p>
                                    </div>
                                )
                            ) : (
                                <div className="relative">
                                    {/* Timeline rail */}
                                    <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border-subtle hidden md:block" aria-hidden="true" />

                                    <div className="space-y-14">
                                        {visibleLogs.map((log, idx) => {
                                            const logKey = `${log.platform}-${log.version}`
                                            return (
                                                <div key={logKey} className="relative md:pl-12">
                                                    {/* Timeline marker */}
                                                    <div className={`absolute left-0 top-2.5 w-[15px] h-[15px] rounded-full border-2 bg-bg-primary hidden md:block ${idx === 0 ? 'border-accent-primary' : 'border-border-subtle'}`} aria-hidden="true" />

                                                    {/* Version Row */}
                                                    <div className="flex flex-wrap items-center gap-3 mb-4">
                                                        <span className="text-lg font-bold tracking-tight text-text-primary tabular-nums">
                                                            v{log.version}
                                                        </span>
                                                        <span className="kicker">{log.date}</span>
                                                        {idx === 0 && <StatusTag accent>Latest</StatusTag>}
                                                        {log.status?.toUpperCase() === 'PRE-RELEASE' && (
                                                            <StatusTag>Pre-Release</StatusTag>
                                                        )}
                                                    </div>

                                                    {/* Content Panel */}
                                                    <div className="rounded-2xl border border-border-subtle bg-bg-secondary p-6 md:p-8">
                                                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-6">
                                                            <h2 className="text-xl font-bold text-text-primary">{log.title}</h2>
                                                            <p className="text-sm text-text-secondary md:max-w-sm md:text-right">
                                                                {log.description}
                                                            </p>
                                                        </div>

                                                        <div className="flex flex-col">
                                                            {Object.entries(log.sections).map(([sectionTitle, items]: any) => (
                                                                <AccordionItem
                                                                    key={sectionTitle}
                                                                    title={formatSectionTitle(sectionTitle)}
                                                                    items={items}
                                                                    isOpen={openAccordions[`${logKey}-${sectionTitle}`] || false}
                                                                    onToggle={() => toggleAccordion(logKey, sectionTitle)}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>

                </div>
            </main>

            <FinalCTA />
        </div>
    )
}

export default ChangelogPage
