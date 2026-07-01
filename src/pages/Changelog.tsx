import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Header } from '@/components/layout/Header'
import { FinalCTA } from '@/components/sections/FinalCTA'
import { ChevronDown, ChevronUp } from 'lucide-react'

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
                <span>{title} ({items.length})</span>
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

export function ChangelogPage() {
    const [changelogs, setChangelogs] = useState<any[]>([])
    const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({})

    const toggleAccordion = (logIndex: number, sectionTitle: string) => {
        const key = `${logIndex}-${sectionTitle}`
        setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }))
    }

    useEffect(() => {
        fetch('/changelogs.json')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    const parsed = data.map(item => parseChangelogText(item.content))
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
                } else {
                    throw new Error('No array data')
                }
            })
            .catch(() => {
                // Mock data
                setChangelogs([
                    {
                        version: '2.1.0',
                        date: 'Apr 26, 2026',
                        status: 'PRE-RELEASE',
                        title: 'Playback Enhancements',
                        description: 'New playback speed options and customizable subtitle states.',
                        sections: {
                            'FEATURES': [
                                'Add new save state for subscriptions feed display settings #221',
                                'Add new remember playback speed toggle #229',
                                'Russian localization #230 provided by @vazinoc',
                                'New playback speed options up to 4x #235',
                                'New gesture: Swipe down to exit full screen mode'
                            ],
                            'LIBRARIES': ['Bump NewpipeExtractor to latest version (v0.26.1)']
                        }
                    },
                    {
                        version: '2.0.0',
                        date: 'Mar 15, 2026',
                        title: 'Neuro Engine 2.0',
                        description: 'A complete rewrite of the local recommendation engine.',
                        sections: {
                            'FEATURES': [
                                'Introduced fully local Vector Math models',
                                'Added transparent dashboard for engine insights',
                                'Support for user topic whitelisting'
                            ],
                            'FIXES': [
                                'Fixed background playback resuming issue',
                                'Optimized battery usage during sync'
                            ]
                        }
                    }
                ])
            })
    }, [])

    return (
        <div className="relative min-h-screen bg-bg-primary text-text-primary flex flex-col">
            <Header />
            
            <main className="flex-1 w-full pt-32 pb-24">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Header */}
                    <div className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-8">
                            Flow <br /> Changelog
                        </h1>
                    </div>

                    {/* Table Header */}
                    <div className="flex items-center text-sm font-medium text-text-muted border-b border-border-subtle pb-4 mb-8">
                        <div className="w-40 shrink-0 hidden md:block">Version</div>
                        <div className="flex-1">Description</div>
                    </div>

                    {/* Changelog Entries */}
                    <div className="space-y-16">
                        {changelogs.map((log, idx) => (
                            <div key={idx} className="flex flex-col md:flex-row gap-6">
                                {/* Left Column: Version & Date */}
                                <div className="w-40 shrink-0 pt-2">
                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                        <div className="text-sm font-medium text-text-primary">{log.version}</div>
                                        {log.status?.toUpperCase() === 'PRE-RELEASE' && (
                                            <span className="px-1.5 py-0.5 text-[10px] font-bold tracking-widest text-accent-primary bg-accent-primary/10 rounded border border-accent-primary/20">
                                                PRE-RELEASE
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-sm text-text-muted">{log.date}</div>
                                </div>

                                {/* Right Column: Content Card */}
                                <div className="flex-1 bg-[#f8fafc] dark:bg-[#111111] rounded-2xl p-6 md:p-8">
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
                                        <h2 className="text-xl font-medium text-text-primary">{log.title}</h2>
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
                                                isOpen={openAccordions[`${idx}-${sectionTitle}`] || false}
                                                onToggle={() => toggleAccordion(idx, sectionTitle)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </main>

            <FinalCTA />
        </div>
    )
}

export default ChangelogPage
