import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Search } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { cn } from '@/lib/utils'

type Platform = 'android' | 'desktop'

interface RawEntry {
    content: string
    status?: string
    platform?: string
    release_url?: string | null
}

interface Section {
    title: string
    items: string[]
}

interface Release {
    key: string
    platform: Platform
    version: string
    date: string
    status: string
    intro: string
    sections: Section[]
    releaseUrl: string | null
}

const REPOS: Record<Platform, string> = {
    android: 'A-EDev/Flow',
    desktop: 'Flow-Tube/Flow-Desktop',
}

const PREVIEW_ITEMS = 8

function replaceEmDashes(line: string): string {
    const parts = line.split(/\s*\u2014\s*/)
    if (parts.length === 1) return line
    if (parts.length > 2) return parts.join(', ')
    return parts[0] + (parts[0].includes(':') ? '; ' : ': ') + parts[1]
}

function isAllCaps(line: string) {
    return /[A-Z]/.test(line) && line === line.toUpperCase()
}

function parseEntry(entry: RawEntry): Release | null {
    const platform: Platform = entry.platform === 'desktop' ? 'desktop' : 'android'
    let version = ''
    let date = ''
    let status = (entry.status || '').trim().toUpperCase()
    const intro: string[] = []
    const sections: Section[] = []
    let current: Section | null = null

    for (const raw of entry.content.split('\n')) {
        const line = replaceEmDashes(raw.trim())
        if (!line || /^FLOW( DESKTOP)? CHANGE LOG$/i.test(line)) continue

        const field = line.match(/^(VERSION|DATE|STATUS|TITLE|DESCRIPTION):\s*(.*)$/i)
        if (field) {
            const key = field[1].toUpperCase()
            if (key === 'VERSION') version = field[2].trim()
            if (key === 'DATE') date = field[2].trim()
            if (key === 'STATUS' && !status) status = field[2].trim().toUpperCase()
            continue
        }

        if (line.startsWith('-')) {
            if (!current) {
                current = { title: 'Changes', items: [] }
                sections.push(current)
            }
            current.items.push(line.slice(1).trim())
        } else if (current?.title === 'ABOUT' && !isAllCaps(line)) {
            intro.push(line)
        } else {
            current = { title: line.replace(/:$/, ''), items: [] }
            sections.push(current)
        }
    }

    if (!version) return null
    return {
        key: `${platform}-${version}`,
        platform,
        version,
        date,
        status,
        intro: intro.join(' '),
        sections: sections.filter(s => s.title !== 'ABOUT' && s.items.length > 0),
        releaseUrl: entry.release_url ?? null,
    }
}

function dateKey(date: string) {
    const m = date.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/)
    return m ? Number(m[1]) * 10000 + Number(m[2]) * 100 + Number(m[3]) : 0
}

function versionKey(version: string): number[] {
    const m = version.match(/^(\d+)\.(\d+)\.(\d+)(?:-([a-z]+)(\d*))?/i)
    if (!m) return [0, 0, 0, 0, 0]
    return [Number(m[1]), Number(m[2]), Number(m[3]), m[4] ? 0 : 1, m[4] ? Number(m[5] || 1) : 0]
}

function compareReleases(a: Release, b: Release) {
    const byDate = dateKey(b.date) - dateKey(a.date)
    if (byDate !== 0) return byDate
    const va = versionKey(a.version)
    const vb = versionKey(b.version)
    for (let i = 0; i < va.length; i++) {
        if (va[i] !== vb[i]) return vb[i] - va[i]
    }
    return 0
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function formatDate(date: string) {
    const m = date.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/)
    return m ? `${Number(m[3])} ${MONTHS[Number(m[2]) - 1]} ${m[1]}` : date
}

const KEEP_UPPER = new Set(['CI', 'UI', 'TV', 'API', 'DLNA', 'AV1', 'VP9'])
const SMALL_WORDS = new Set(['and', 'of', 'the', 'for', 'to'])

function formatWord(word: string, index: number) {
    if (!/[A-Z]/.test(word) || word !== word.toUpperCase()) return word
    const core = word.replace(/[^A-Z0-9.]/g, '')
    if (KEEP_UPPER.has(core) || /^V\d/.test(core)) return word
    if (core === 'FLOWNEURO') return word.replace('FLOWNEURO', 'FlowNeuro')
    const lower = word.toLowerCase()
    if (index > 0 && SMALL_WORDS.has(lower)) return lower
    return lower.replace(/[a-z]/, c => c.toUpperCase())
}

function formatSectionTitle(title: string) {
    const known: Record<string, string> = {
        'FEATURES': 'New features',
        'NEW FEATURES': 'New features',
        'IMPROVEMENTS': 'Improvements',
        'FIXES': 'Fixes',
        'FIXES AND STABILITY': 'Fixes',
        'VIDEO PLAYER FIXES': 'Player fixes',
    }
    const clean = title.replace(/^!+|!+$/g, '').trim()
    return known[clean.toUpperCase()] ?? clean.split(' ').map(formatWord).join(' ')
}

function sectionKind(title: string): 'new' | 'improved' | 'fixed' | 'other' {
    const t = title.toUpperCase()
    if (t.includes('FEATURE')) return 'new'
    if (t.includes('FIX')) return 'fixed'
    if (/IMPROV|PERFORM|ENGINE|UI|STYLE/.test(t)) return 'improved'
    return 'other'
}

function summarize(release: Release) {
    const counts = { new: 0, improved: 0, fixed: 0, other: 0 }
    let total = 0
    for (const s of release.sections) {
        counts[sectionKind(s.title)] += s.items.length
        total += s.items.length
    }
    const label = `${total} ${total === 1 ? 'change' : 'changes'}`
    if (counts.other === total) {
        return `${label} across ${release.sections.length} ${release.sections.length === 1 ? 'section' : 'sections'}`
    }
    const parts = [
        counts.new && `${counts.new} new`,
        counts.improved && `${counts.improved} improved`,
        counts.fixed && `${counts.fixed} fixed`,
        counts.other && `${counts.other} other`,
    ].filter(Boolean)
    return `${label}: ${parts.join(', ')}`
}

function highlight(text: string, query: string, keyPrefix: string): React.ReactNode {
    if (!query) return text
    const pattern = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    return text.split(pattern).map((part, i) =>
        i % 2 === 1
            ? <mark key={`${keyPrefix}-${i}`} className="rounded-sm bg-[#F7EBD8] dark:bg-[#2B2012] text-inherit px-0.5">{part}</mark>
            : part
    )
}

const linkClass = 'font-medium text-text-primary underline underline-offset-4 decoration-text-muted hover:decoration-text-primary'

function renderText(text: string, platform: Platform, query: string, keyPrefix: string): React.ReactNode[] {
    const nodes: React.ReactNode[] = []
    const pattern = /(https?:\/\/[^\s"')]+)|#(\d+)\b|@([A-Za-z0-9-]+)/g
    let last = 0
    let match: RegExpExecArray | null
    while ((match = pattern.exec(text))) {
        const before = match.index > 0 ? text[match.index - 1] : ' '
        if (!match[1] && !/[\s(]/.test(before)) continue
        if (match.index > last) nodes.push(highlight(text.slice(last, match.index), query, `${keyPrefix}-t${last}`))
        const href = match[1]
            ? match[1]
            : match[2]
                ? `https://github.com/${REPOS[platform]}/issues/${match[2]}`
                : `https://github.com/${match[3]}`
        nodes.push(
            <a key={`${keyPrefix}-l${match.index}`} href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {match[0]}
            </a>
        )
        last = match.index + match[0].length
    }
    if (last < text.length) nodes.push(highlight(text.slice(last), query, `${keyPrefix}-t${last}`))
    return nodes
}

function ChangeItem({ text, platform, query }: { text: string; platform: Platform; query: string }) {
    const colon = text.indexOf(':')
    const hasLabel = colon > 2 && colon < 48 && !/https?$/i.test(text.slice(0, colon))
    if (!hasLabel) return <li>{renderText(text, platform, query, 'i')}</li>
    return (
        <li>
            <strong className="font-semibold text-text-primary">{highlight(text.slice(0, colon), query, 'b')}</strong>
            {renderText(text.slice(colon), platform, query, 'r')}
        </li>
    )
}

export function ChangelogPage() {
    const [releases, setReleases] = useState<Release[]>([])
    const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
    const [platform, setPlatform] = useState<Platform>('android')
    const [query, setQuery] = useState('')
    const [opened, setOpened] = useState<Set<string>>(new Set())
    const [expanded, setExpanded] = useState<Set<string>>(new Set())

    useEffect(() => {
        fetch('/changelogs.json')
            .then(res => res.json())
            .then((data: RawEntry[]) => {
                const parsed = (Array.isArray(data) ? data : [])
                    .map(parseEntry)
                    .filter((r): r is Release => r !== null && r.status !== 'PRE-RELEASE')
                    .sort(compareReleases)
                setReleases(parsed)
                setStatus('ready')
            })
            .catch(() => setStatus('error'))
    }, [])

    const counts = useMemo(() => ({
        android: releases.filter(r => r.platform === 'android').length,
        desktop: releases.filter(r => r.platform === 'desktop').length,
    }), [releases])

    const visible = releases.filter(r => r.platform === platform)
    const latestKey = visible[0]?.key
    const q = query.trim()
    const qLower = q.toLowerCase()

    const toggleOpen = (key: string) => setOpened(prev => {
        const next = new Set(prev)
        if (next.has(key)) next.delete(key)
        else next.add(key)
        return next
    })

    const expand = (key: string) => setExpanded(prev => new Set(prev).add(key))

    const results = visible
        .map(release => {
            const sections = q
                ? release.sections
                    .map(s => ({ ...s, items: s.items.filter(i => i.toLowerCase().includes(qLower)) }))
                    .filter(s => s.items.length > 0)
                : release.sections
            return { release, sections }
        })
        .filter(r => !q || r.sections.length > 0)

    return (
        <div className="relative min-h-screen bg-bg-primary text-text-primary flex flex-col">
            <Header />

            <main className="flex-1 w-full pt-32 md:pt-40 pb-24">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-5xl md:text-7xl font-semibold tracking-[-0.035em] leading-[0.98] mb-5">Changelog</h1>
                    <p className="text-lg text-text-secondary leading-relaxed max-w-2xl">
                        Release notes for Flow on Android and desktop. Nightly builds aren't listed here; get Flow Nightly from the{' '}
                        <Link to="/download#nightly" className={linkClass}>Download page</Link>.
                    </p>

                    <div role="tablist" aria-label="Platform" className="mt-10 flex flex-wrap gap-x-2 border-b border-border-subtle">
                        {(['android', 'desktop'] as Platform[]).map(p => (
                            <button
                                key={p}
                                type="button"
                                role="tab"
                                aria-selected={platform === p}
                                onClick={() => setPlatform(p)}
                                className={cn(
                                    '-mb-px flex items-baseline gap-2 border-b-2 px-3 md:px-4 pt-2 pb-3.5 font-display text-xl md:text-2xl font-semibold tracking-[-0.02em] transition-colors',
                                    platform === p ? 'border-text-primary text-text-primary' : 'border-transparent text-text-muted hover:text-text-secondary'
                                )}
                            >
                                {p === 'android' ? 'Android' : 'Desktop'}
                                <span className="font-mono text-[11px] font-medium tracking-[0.1em] text-text-muted">{counts[p]}</span>
                            </button>
                        ))}
                    </div>

                    <div className="mt-6 relative w-full sm:w-80">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" aria-hidden="true" />
                        <input
                            type="search"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            placeholder="Search changes, e.g. lyrics"
                            aria-label="Search changes"
                            className="w-full rounded-xl border border-border-subtle bg-bg-card py-2.5 pl-10 pr-3 text-[15px] text-text-primary placeholder:text-text-muted focus:border-text-primary focus:outline-none"
                        />
                    </div>

                    <div className="mt-10 grid grid-cols-1 lg:grid-cols-[11rem_minmax(0,1fr)] gap-10 lg:gap-14 items-start">
                        <nav aria-label="Versions" className="hidden lg:block sticky top-12">
                            <p className="kicker mb-3 px-3">Versions</p>
                            <ol className="space-y-0.5">
                                {visible.map(release => (
                                    <li key={release.key}>
                                        <a
                                            href={`#${release.key}`}
                                            className="flex items-baseline justify-between gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-text-secondary hover:bg-bg-secondary hover:text-text-primary transition-colors"
                                        >
                                            v{release.version}
                                            <span className="font-mono text-[11px] text-text-muted">{formatDate(release.date).replace(/ \d{4}$/, '')}</span>
                                        </a>
                                    </li>
                                ))}
                            </ol>
                        </nav>

                        <div className="min-w-0">
                            {status === 'loading' && <p className="text-text-secondary">Loading release notes…</p>}

                            {status === 'error' && (
                                <p className="rounded-2xl border border-border-subtle px-6 py-10 text-center text-text-secondary">
                                    Release notes couldn't be loaded. See the{' '}
                                    <a href={`https://github.com/${REPOS[platform]}/releases`} target="_blank" rel="noopener noreferrer" className={linkClass}>releases on GitHub</a>
                                    {' '}in the meantime.
                                </p>
                            )}

                            {status === 'ready' && visible.length === 0 && (
                                <p className="rounded-2xl border border-border-subtle px-6 py-10 text-center text-text-secondary">
                                    No {platform === 'desktop' ? 'desktop' : 'Android'} releases yet.
                                </p>
                            )}

                            {status === 'ready' && visible.length > 0 && results.length === 0 && (
                                <p className="rounded-2xl border border-border-subtle px-6 py-10 text-center text-text-secondary">
                                    No changes match "{q}".
                                </p>
                            )}

                            {results.map(({ release, sections }) => {
                                const isLatest = release.key === latestKey
                                const isOpen = Boolean(q) || isLatest || opened.has(release.key)
                                return (
                                    <article key={release.key} id={release.key} className="scroll-mt-12 border-t border-border-subtle py-10 first:border-t-0 first:pt-0">
                                        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                                            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.03em] text-text-primary">v{release.version}</h2>
                                            <span className="kicker">{formatDate(release.date)}</span>
                                            {isLatest && (
                                                <span className="rounded-md bg-text-primary px-2 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-bg-primary">Latest</span>
                                            )}
                                            {release.releaseUrl && (
                                                <a
                                                    href={release.releaseUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="ml-auto inline-flex items-center gap-1 text-sm font-semibold text-text-primary underline underline-offset-4 decoration-text-muted hover:decoration-text-primary"
                                                >
                                                    Release on GitHub
                                                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                                                </a>
                                            )}
                                        </div>
                                        <p className="mt-2 text-text-secondary">{summarize(release)}</p>

                                        {isOpen ? (
                                            <>
                                                {release.intro && !q && <p className="mt-4 max-w-3xl text-text-secondary leading-relaxed">{release.intro}</p>}
                                                <div className="mt-6 space-y-7">
                                                    {sections.map(section => {
                                                        const sectionKey = `${release.key}-${section.title}`
                                                        const showAll = Boolean(q) || expanded.has(sectionKey)
                                                        const items = showAll ? section.items : section.items.slice(0, PREVIEW_ITEMS)
                                                        return (
                                                            <div key={section.title}>
                                                                <h3 className="kicker mb-3 flex gap-2">
                                                                    {formatSectionTitle(section.title)}
                                                                    <span>{section.items.length}</span>
                                                                </h3>
                                                                <ul className="list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-text-secondary marker:text-text-muted max-w-3xl">
                                                                    {items.map((item, i) => (
                                                                        <ChangeItem key={i} text={item} platform={release.platform} query={q} />
                                                                    ))}
                                                                </ul>
                                                                {!showAll && section.items.length > PREVIEW_ITEMS && (
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => expand(sectionKey)}
                                                                        className="mt-3 text-sm font-semibold text-text-primary underline underline-offset-4 decoration-text-muted hover:decoration-text-primary"
                                                                    >
                                                                        Show all {section.items.length}
                                                                    </button>
                                                                )}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                                {!isLatest && !q && (
                                                    <button
                                                        type="button"
                                                        onClick={() => toggleOpen(release.key)}
                                                        className="mt-6 rounded-xl border border-border-subtle px-4 py-2 text-sm font-semibold text-text-primary hover:border-text-primary transition-colors"
                                                    >
                                                        Hide release notes
                                                    </button>
                                                )}
                                            </>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => toggleOpen(release.key)}
                                                className="mt-4 rounded-xl border border-border-subtle px-4 py-2 text-sm font-semibold text-text-primary hover:border-text-primary transition-colors"
                                            >
                                                Show release notes
                                            </button>
                                        )}
                                    </article>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default ChangelogPage
