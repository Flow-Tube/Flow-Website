import { useState, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FadeIn } from '@/components/ui/TextReveal'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const CODE_BASE = 'https://github.com/A-EDev/Flow/blob/main/app/src/main/java/io/github/aedev/flow/'

interface Tip {
    x: number
    y: number
    title: string
    body: string
}

function useTip() {
    const ref = useRef<HTMLDivElement>(null)
    const [tip, setTip] = useState<Tip | null>(null)
    const show = (e: React.MouseEvent, title: string, body: string) => {
        const box = ref.current?.getBoundingClientRect()
        if (!box) return
        setTip({ x: e.clientX - box.left, y: e.clientY - box.top, title, body })
    }
    const node = tip && (
        <div
            role="status"
            className="pointer-events-none absolute z-10 max-w-[240px] rounded-lg bg-text-primary px-3 py-2 text-xs leading-snug text-bg-primary"
            style={{ left: Math.min(tip.x + 14, (ref.current?.clientWidth ?? 400) - 250), top: tip.y + 14 }}
        >
            <span className="block font-semibold">{tip.title}</span>
            {tip.body}
        </div>
    )
    return { ref, node, show, hide: () => setTip(null) }
}

function CodeLinks({ files }: { files: string[] }) {
    return (
        <p className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5">
            {files.map(file => (
                <a
                    key={file}
                    href={CODE_BASE + file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="kicker inline-flex items-center gap-1 hover:text-text-primary transition-colors"
                >
                    {file.split('/').pop()}
                    <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                </a>
            ))}
        </p>
    )
}

function Chapter({ n, id, title, text, files, children }: {
    n: string
    id: string
    title: string
    text: React.ReactNode
    files: string[]
    children: React.ReactNode
}) {
    return (
        <FadeIn>
            <section id={id} className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 py-12 md:py-16 border-t border-border-subtle scroll-mt-8">
                <div className="md:col-span-5">
                    <span className="kicker">{n}</span>
                    <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-[-0.03em] leading-tight text-text-primary">{title}</h2>
                    <div className="mt-4 space-y-3 text-text-secondary leading-relaxed">{text}</div>
                    <CodeLinks files={files} />
                </div>
                <div className="md:col-span-7 min-w-0">
                    <div className="rounded-2xl border border-border-subtle bg-bg-card p-5 md:p-6">{children}</div>
                </div>
            </section>
        </FadeIn>
    )
}

function DemoTitle({ title, unit }: { title: string; unit: string }) {
    return (
        <div className="flex flex-wrap items-baseline justify-between gap-3 mb-4">
            <p className="text-sm font-semibold text-text-primary">{title}</p>
            <span className="kicker">{unit}</span>
        </div>
    )
}

function Rows({ rows }: { rows: { label: string; value: string; note?: string }[] }) {
    return (
        <ul>
            {rows.map(row => (
                <li key={row.label} className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-1 py-3 border-b border-border-subtle last:border-b-0">
                    <span className="text-sm font-medium text-text-primary">{row.label}</span>
                    <span className="font-mono text-[13px] text-text-primary whitespace-nowrap">{row.value}</span>
                    {row.note && <span className="col-span-2 text-[13px] text-text-secondary">{row.note}</span>}
                </li>
            ))}
        </ul>
    )
}

const signals = [
    { label: 'Dislike', value: -0.40, note: 'Pushes the video\'s topics away.' },
    { label: 'Skip', value: -0.15, note: 'You left after 10 seconds but before 20%.' },
    { label: 'Click', value: 0.03, note: 'Just opening a video barely counts.' },
    { label: 'Save', value: 0.22, note: 'Download, Watch Later or a playlist.' },
    { label: 'Full watch', value: 0.23, note: '0.15 times the share you watched, plus up to 0.08 for the minutes. A full hour-long video gives about 0.23.' },
    { label: 'Like', value: 0.30, note: 'The strongest positive signal.' },
]

function SignalsChart() {
    const { ref, node, show, hide } = useTip()
    const W = 560
    const rowH = 34
    const H = signals.length * rowH + 30
    const L = 92
    const R = 56
    const min = -0.45
    const max = 0.35
    const sx = (v: number) => L + ((v - min) / (max - min)) * (W - L - R)
    return (
        <div ref={ref} className="relative">
            <svg viewBox={`0 0 ${W} ${H}`} className="block w-full h-auto" role="img" aria-label="How far one action moves your profile: dislike minus 0.40, skip minus 0.15, click plus 0.03, save plus 0.22, full watch up to plus 0.23, like plus 0.30">
                {[-0.4, -0.2, 0, 0.2].map(t => (
                    <g key={t}>
                        <line x1={sx(t)} x2={sx(t)} y1={4} y2={H - 24} stroke="var(--border-subtle)" strokeDasharray={t === 0 ? undefined : '2 4'} />
                        <text x={sx(t)} y={H - 6} textAnchor="middle" fontSize={11} fill="var(--text-muted)">{t > 0 ? '+' : ''}{t.toFixed(1)}</text>
                    </g>
                ))}
                {signals.map((s, i) => {
                    const y = 8 + i * rowH
                    const x0 = sx(Math.min(0, s.value))
                    const w = Math.max(Math.abs(sx(s.value) - sx(0)), 2)
                    return (
                        <g key={s.label} onMouseMove={e => show(e, `${s.label} · ${s.value > 0 ? '+' : ''}${s.value.toFixed(2)}`, s.note)} onMouseLeave={hide}>
                            <rect x={0} y={y - 7} width={W} height={rowH} fill="transparent" />
                            <text x={L - 10} y={y + 13} textAnchor="end" fontSize={12.5} fill="var(--text-primary)">{s.label}</text>
                            <rect x={x0} y={y} width={w} height={18} rx={4} fill={s.value < 0 ? 'var(--viz-negative)' : 'var(--viz-1)'} />
                            <text
                                x={s.value < 0 ? x0 - 6 : x0 + w + 6}
                                y={y + 13}
                                textAnchor={s.value < 0 ? 'end' : 'start'}
                                fontSize={11.5}
                                fill="var(--text-primary)"
                                fontFamily="var(--font-mono)"
                            >
                                {s.value > 0 ? '+' : ''}{s.value.toFixed(2)}
                            </text>
                        </g>
                    )
                })}
            </svg>
            {node}
        </div>
    )
}

const slotNames = [
    { name: 'Morning', hours: '6 to 11' },
    { name: 'Afternoon', hours: '12 to 17' },
    { name: 'Evening', hours: '18 to 23' },
    { name: 'Night', hours: '0 to 5' },
]

function TimeSlots() {
    const [now] = useState(() => new Date())
    const hour = now.getHours()
    const weekend = now.getDay() === 0 || now.getDay() === 6
    const slot = hour >= 6 && hour <= 11 ? 0 : hour >= 12 && hour <= 17 ? 1 : hour >= 18 ? 2 : 3
    return (
        <>
            <DemoTitle title="The eight slots" unit={`${weekend ? 'Weekend' : 'Weekday'} ${slotNames[slot].name.toLowerCase()} for you`} />
            <div className="grid grid-cols-[auto_repeat(4,minmax(0,1fr))] gap-1.5 text-sm">
                <span />
                {slotNames.map(s => <span key={s.name} className="kicker px-1 pb-1">{s.name}</span>)}
                {['Weekday', 'Weekend'].map((row, r) => (
                    <div key={row} className="contents">
                        <span className="kicker self-center pr-2">{row}</span>
                        {slotNames.map((s, c) => {
                            const active = (r === 1) === weekend && c === slot
                            return (
                                <div
                                    key={s.name}
                                    className={cn(
                                        'rounded-xl px-2 py-4 text-center',
                                        active ? 'border-2 border-text-primary bg-bg-primary font-semibold text-text-primary' : 'border border-border-subtle text-text-secondary'
                                    )}
                                >
                                    {active ? 'You are here' : ' '}
                                    <span className="block mt-1 font-mono text-[10.5px] text-text-muted">{s.hours}</span>
                                </div>
                            )
                        })}
                    </div>
                ))}
            </div>
        </>
    )
}

function decaySeries(start: number) {
    const points: [number, number][] = []
    let v = start
    let n = 0
    while (v >= 0.03 && n < 1000) {
        points.push([n, v])
        v *= v >= 0.30 ? 0.998 : v >= 0.10 ? 0.993 : 0.97
        n++
    }
    points.push([n, 0])
    return points
}

const coreSeries = decaySeries(0.80)
const whimSeries = decaySeries(0.08)

function DecayChart() {
    const { ref, node, show, hide } = useTip()
    const [hover, setHover] = useState<number | null>(null)
    const W = 560
    const H = 250
    const L = 36
    const R = 12
    const T = 10
    const B = 30
    const X = 720
    const sx = (n: number) => L + ((W - L - R) * n) / X
    const sy = (v: number) => T + (H - T - B) * (1 - v / 0.85)
    const path = (p: [number, number][]) => p.map((q, i) => `${i ? 'L' : 'M'}${sx(q[0]).toFixed(1)} ${sy(q[1]).toFixed(1)}`).join(' ')
    const coreEnd = coreSeries[coreSeries.length - 1][0]
    const whimEnd = whimSeries[whimSeries.length - 1][0]
    const at = (p: [number, number][], n: number) => p[Math.min(n, p.length - 1)][1]

    const onMove = (e: React.MouseEvent<SVGRectElement>) => {
        const box = e.currentTarget.ownerSVGElement?.getBoundingClientRect()
        if (!box) return
        const n = Math.max(0, Math.min(X, Math.round((((e.clientX - box.left) * (W / box.width)) - L) / (W - L - R) * X)))
        setHover(n)
        show(e, `After ${n} other videos`, `Core interest ${at(coreSeries, n).toFixed(2)} · passing click ${at(whimSeries, n).toFixed(2)}`)
    }

    return (
        <div ref={ref} className="relative">
            <svg viewBox={`0 0 ${W} ${H}`} className="block w-full h-auto" role="img" aria-label={`A core interest starting at 0.80 is gone after about ${coreEnd} other videos you enjoy. A passing click starting at 0.08 is gone after about ${whimEnd}.`}>
                {[0.30, 0.10].map(t => (
                    <g key={t}>
                        <line x1={L} x2={W - R} y1={sy(t)} y2={sy(t)} stroke="var(--border-subtle)" strokeDasharray="2 4" />
                        <text x={W - R} y={sy(t) - 5} textAnchor="end" fontSize={10.5} fill="var(--text-muted)">
                            {t === 0.30 ? 'above 0.30: fades ×0.998 each time' : 'above 0.10: ×0.993, below: ×0.97'}
                        </text>
                    </g>
                ))}
                <line x1={L} x2={W - R} y1={sy(0)} y2={sy(0)} stroke="var(--border-subtle)" />
                {[0, 200, 400, 600].map(t => (
                    <text key={t} x={sx(t)} y={H - 8} textAnchor="middle" fontSize={11} fill="var(--text-muted)">{t}</text>
                ))}
                {[0, 0.4, 0.8].map(t => (
                    <text key={t} x={L - 8} y={sy(t) + 4} textAnchor="end" fontSize={11} fill="var(--text-muted)">{t.toFixed(1)}</text>
                ))}
                <path d={path(coreSeries)} fill="none" stroke="var(--viz-1)" strokeWidth={2} strokeLinejoin="round" />
                <path d={path(whimSeries)} fill="none" stroke="var(--viz-2)" strokeWidth={2} strokeLinejoin="round" />
                <text x={sx(coreEnd) - 4} y={sy(0) - 8} textAnchor="end" fontSize={11.5} fill="var(--text-primary)">gone after ~{coreEnd}</text>
                <text x={sx(whimEnd) + 6} y={sy(0.08) - 4} fontSize={11.5} fill="var(--text-primary)">gone after ~{whimEnd}</text>
                {hover !== null && (
                    <>
                        <line x1={sx(hover)} x2={sx(hover)} y1={T} y2={H - B} stroke="var(--text-muted)" />
                        <circle cx={sx(hover)} cy={sy(at(coreSeries, hover))} r={4} fill="var(--viz-1)" stroke="var(--bg-card)" strokeWidth={2} />
                        <circle cx={sx(hover)} cy={sy(at(whimSeries, hover))} r={4} fill="var(--viz-2)" stroke="var(--bg-card)" strokeWidth={2} />
                    </>
                )}
                <rect x={L} y={T} width={W - L - R} height={H - T - B} fill="transparent" onMouseMove={onMove} onMouseLeave={() => { setHover(null); hide() }} />
            </svg>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[13px] text-text-secondary">
                <span className="inline-flex items-center gap-2"><i className="w-2.5 h-2.5 rounded-sm bg-[var(--viz-1)]" />Core interest, starting at 0.80</span>
                <span className="inline-flex items-center gap-2"><i className="w-2.5 h-2.5 rounded-sm bg-[var(--viz-2)]" />Passing click, starting at 0.08</span>
            </div>
            {node}
        </div>
    )
}

const feedCases = {
    established: { label: 'Subscriptions + history', subs: 16, related: 10, discovery: 10 },
    new: { label: 'New to Flow', subs: 14, related: 12, discovery: 10 },
    noSubs: { label: 'No subscriptions', subs: 0, related: 14, discovery: 18 },
}

type FeedCase = keyof typeof feedCases

function FeedMix() {
    const [active, setActive] = useState<FeedCase>('established')
    const c = feedCases[active]
    const rest = 40 - c.subs - c.related - c.discovery
    const lanes = [
        { label: 'Subscriptions', count: c.subs, color: 'var(--viz-1)' },
        { label: 'Related to what you finished', count: c.related, color: 'var(--viz-3)' },
        { label: 'Searches from your interests', count: c.discovery, color: 'var(--viz-2)' },
        { label: 'Topped up from the others', count: rest, color: 'var(--viz-neutral)' },
    ]
    return (
        <>
            <DemoTitle title="40 slots in one Home refresh" unit="Share of feed" />
            <div className="inline-flex flex-wrap gap-1 rounded-xl border border-border-subtle p-1 mb-5" role="group" aria-label="Situation">
                {(Object.keys(feedCases) as FeedCase[]).map(key => (
                    <button
                        key={key}
                        type="button"
                        aria-pressed={active === key}
                        onClick={() => setActive(key)}
                        className={cn(
                            'rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors',
                            active === key ? 'bg-text-primary text-bg-primary' : 'text-text-secondary hover:text-text-primary'
                        )}
                    >
                        {feedCases[key].label}
                    </button>
                ))}
            </div>
            <div className="grid grid-cols-[repeat(20,minmax(0,1fr))] gap-[3px]" role="img" aria-label={lanes.map(l => `${l.count} ${l.label.toLowerCase()}`).join(', ')}>
                {lanes.flatMap(lane => Array.from({ length: lane.count }, (_, i) => (
                    <i key={lane.label + i} className="aspect-square rounded-[4px]" style={{ background: lane.color }} />
                )))}
            </div>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[13px] text-text-secondary">
                {lanes.map(lane => (
                    <span key={lane.label} className="inline-flex items-center gap-2">
                        <i className="w-2.5 h-2.5 rounded-sm" style={{ background: lane.color }} />
                        {lane.label} <span className="font-mono text-text-primary">{lane.count}</span>
                    </span>
                ))}
            </div>
        </>
    )
}

function BoredomSlider() {
    const [skips, setSkips] = useState(0)
    const boredom = Math.min(Math.max(skips / 20, 0), 0.5)
    const parts = [
        { label: 'Fits you', value: 0.4 - boredom * 0.5, color: 'var(--viz-1)' },
        { label: 'Fits this time of day', value: 0.4 - boredom * 0.5, color: 'var(--viz-3)' },
        { label: 'Something new', value: 0.2 + boredom, color: 'var(--viz-2)' },
    ]
    return (
        <>
            <label htmlFor="skips" className="flex items-baseline justify-between text-sm font-semibold text-text-primary">
                Skips in a row
                <span className="font-mono font-normal">{skips}{skips >= 10 ? ' (maximum effect)' : ''}</span>
            </label>
            <input
                id="skips"
                type="range"
                min={0}
                max={12}
                value={skips}
                onChange={e => setSkips(Number(e.target.value))}
                className="mt-3 mb-5 w-full accent-[var(--text-primary)]"
            />
            <div className="flex h-11 gap-[2px] overflow-hidden rounded-xl" role="img" aria-label={parts.map(p => `${p.label} ${Math.round(p.value * 100)}%`).join(', ')}>
                {parts.map(p => (
                    <div
                        key={p.label}
                        className="flex items-center justify-center text-[13px] font-semibold text-white transition-[flex-basis] duration-300"
                        style={{ flexBasis: `${p.value * 100}%`, background: p.color }}
                    >
                        {Math.round(p.value * 100)}%
                    </div>
                ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[13px] text-text-secondary">
                {parts.map(p => (
                    <span key={p.label} className="inline-flex items-center gap-2"><i className="w-2.5 h-2.5 rounded-sm" style={{ background: p.color }} />{p.label}</span>
                ))}
            </div>
        </>
    )
}

const personas = [
    { emoji: '🌱', name: 'The Initiate', text: 'Just getting started. Your profile is still forming.', rule: 'Under 15 interactions' },
    { emoji: '🎧', name: 'The Audiophile', text: 'You use Flow mostly for Music. The vibe is everything.', rule: 'Music is over 40% of your topics' },
    { emoji: '🔴', name: 'The Livewire', text: 'You love the raw energy of Livestreams and premieres.', rule: 'Mostly live and premieres' },
    { emoji: '🦉', name: 'The Night Owl', text: 'You thrive in the dark. Most watching happens after midnight.', rule: 'Nights over 1.5× your mornings' },
    { emoji: '🍿', name: 'The Binger', text: 'Once you start, you can\'t stop. Massive content waves.', rule: '500+ interactions, fast-paced' },
    { emoji: '🎓', name: 'The Scholar', text: 'High-complexity content. Here to grow, not just be entertained.', rule: 'Mostly dense, complex videos' },
    { emoji: '🤿', name: 'The Deep Diver', text: 'Long-form video essays and documentaries are your world.', rule: 'Mostly long videos' },
    { emoji: '⚡', name: 'The Skimmer', text: 'Fast-paced, short content. Dopamine on demand.', rule: 'Short and fast-paced' },
    { emoji: '🎯', name: 'The Specialist', text: 'Laser-focused on a few niches. You know what you like.', rule: 'A few topics far ahead of the rest' },
    { emoji: '🧭', name: 'The Explorer', text: 'Chaotic and beautiful. A bit of everything.', rule: 'None of the above' },
]

const chapters = [
    { id: 'signals', title: 'What teaches it' },
    { id: 'reading', title: 'What it reads from a video' },
    { id: 'time', title: 'It knows what time it is' },
    { id: 'forgetting', title: 'It forgets, slowly' },
    { id: 'feed', title: 'Where your feed comes from' },
    { id: 'boredom', title: 'It notices when you\'re bored' },
    { id: 'guardrails', title: 'Guardrails against the loop' },
    { id: 'personas', title: 'Ten personas' },
    { id: 'control', title: 'What you can see and change' },
    { id: 'music', title: 'Music has its own brain' },
    { id: 'privacy', title: 'What stays, and what YouTube sees' },
]

export function HowItWorks() {
    return (
        <div className="relative min-h-screen bg-bg-primary text-text-primary flex flex-col">
            <Header />

            <main className="flex-1 w-full pt-32 md:pt-40 pb-24">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeIn>
                        <p className="kicker mb-5">How it works</p>
                        <h1 className="text-5xl md:text-7xl font-semibold tracking-[-0.035em] leading-[0.98] mb-6">
                            FlowNeuro,{' '}
                            <span className="whitespace-nowrap font-serif italic font-normal tracking-[-0.01em] text-text-muted">in detail.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-3xl">
                            FlowNeuro is the recommendation engine inside Flow. It isn't an AI model: it keeps a list of topics
                            and weights in one file on your phone and does plain math on them.
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.1}>
                        <ol className="mt-12 grid sm:grid-cols-2 gap-x-10 border-t border-border-subtle">
                            {chapters.map((chapter, i) => (
                                <li key={chapter.id} className="border-b border-border-subtle">
                                    <a href={`#${chapter.id}`} className="group flex items-baseline gap-4 py-3.5 text-text-secondary hover:text-text-primary transition-colors">
                                        <span className="kicker w-6 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                                        <span className="font-medium">{chapter.title}</span>
                                    </a>
                                </li>
                            ))}
                        </ol>
                    </FadeIn>

                    <div className="mt-16 md:mt-24">
                        <Chapter
                            n="01"
                            id="signals"
                            title="What teaches it"
                            text={<>
                                <p>Every action nudges your profile by a set amount. A like counts ten times as much as a click, and a dislike pushes back harder than a like pulls. Finishing a video counts more when it's a long one.</p>
                                <p>A watch counts once you pass 20%. Leaving after 10 seconds but before 20% counts as a skip, and leaving sooner teaches nothing. Shorts train their own separate profile and move the main one at 1% strength.</p>
                                <p>New lessons get gentler as your profile matures, down to a quarter of their strength after about 950 interactions, so one odd video can't rewrite a settled profile.</p>
                            </>}
                            files={['data/recommendation/FlowNeuroEngine.kt', 'ui/screens/player/WatchSessionTracker.kt']}
                        >
                            <DemoTitle title="How far one action moves your profile" unit="Learning rate" />
                            <SignalsChart />
                        </Chapter>

                        <Chapter
                            n="02"
                            id="reading"
                            title="What it reads from a video"
                            text={<>
                                <p>It reads the title, channel, tags and description, weighs the words, and turns each video into a list of topics with weights between 0 and 1. Sponsor lines, people's names and channel branding are filtered out first.</p>
                                <p>It also scores three traits: how long the video is, how fast-paced, and how dense. When it compares a video with your profile, topics make up 70% of the match and each trait 10%.</p>
                            </>}
                            files={['data/recommendation/NeuroTokenizer.kt', 'data/recommendation/NeuroVectorMath.kt']}
                        >
                            <DemoTitle title="How much each part of a video counts" unit="Weight" />
                            <Rows rows={[
                                { label: 'Two-word phrase from the title', value: '0.75', note: '1.2 when a single word would be ambiguous on its own.' },
                                { label: 'Tag that also appears in the title or description', value: '0.65' },
                                { label: 'Channel keyword', value: '0.60' },
                                { label: 'Single word from the title', value: '0.50' },
                                { label: 'Word from the description', value: '0.20' },
                                { label: 'Tag that appears nowhere else', value: '0.10', note: 'Tag spam gets almost no say.' },
                            ]} />
                        </Chapter>

                        <Chapter
                            n="03"
                            id="time"
                            title="It knows what time it is"
                            text={<>
                                <p>Your mornings and your weekend nights aren't the same. Every action also trains one of eight time slots: weekday or weekend, crossed with morning, afternoon, evening and night.</p>
                                <p>When it ranks videos, how well a video fits the slot you're in counts as much as how well it fits you overall.</p>
                            </>}
                            files={['data/recommendation/NeuroModels.kt', 'data/recommendation/FlowNeuroEngine.kt']}
                        >
                            <TimeSlots />
                        </Chapter>

                        <Chapter
                            n="04"
                            id="forgetting"
                            title="It forgets, slowly"
                            text={<>
                                <p>Each time you enjoy something, the topics you've stopped watching lose a little weight. Strong interests fade slowly and passing whims fade fast. Anything below 0.03 is dropped.</p>
                                <p>It counts in videos, not days. An interest doesn't fade while you're away from the app, only when you spend your time on other things.</p>
                            </>}
                            files={['data/recommendation/NeuroVectorMath.kt']}
                        >
                            <DemoTitle title="How long an interest you stop watching lasts" unit="Weight · other videos you enjoy" />
                            <DecayChart />
                        </Chapter>

                        <Chapter
                            n="05"
                            id="feed"
                            title="Where your feed comes from"
                            text={<>
                                <p>Home mixes three sources: your subscriptions, videos related to ones you finished or liked, and searches Flow runs for you from your interests. Up to two uploads from the last 72 hours are pinned at the top.</p>
                                <p>Each refresh runs up to 12 searches, always including one or two that explore topics next to yours. There's no trending filler: if nothing fits, the feed stays short.</p>
                            </>}
                            files={['ui/screens/home/HomeFeedMixer.kt', 'ui/screens/home/HomeFeedAssembly.kt', 'data/recommendation/NeuroDiscovery.kt']}
                        >
                            <FeedMix />
                        </Chapter>

                        <Chapter
                            n="06"
                            id="boredom"
                            title="It notices when you're bored"
                            text={<>
                                <p>Each video's score has three parts: how well it fits you, how well it fits this time of day, and how new it is. Normally that's 40%, 40% and 20%.</p>
                                <p>Every skip in a row shifts weight toward something new, up to 70% after ten skips. Watching or liking anything resets it.</p>
                            </>}
                            files={['data/recommendation/FlowNeuroEngine.kt']}
                        >
                            <BoredomSlider />
                        </Chapter>

                        <Chapter
                            n="07"
                            id="guardrails"
                            title="Guardrails against the loop"
                            text={<p>The rules that stop the feed from repeating itself or rewarding clickbait. A multiplier like ×0.02 means the video keeps 2% of its score.</p>}
                            files={['data/recommendation/NeuroScoring.kt', 'ui/screens/home/HomeFeedMixer.kt']}
                        >
                            <Rows rows={[
                                { label: 'Finished it (over 85%)', value: '×0.02', note: 'Songs are exempt, so you can replay what you love.' },
                                { label: 'Scrolled past it', value: 'hidden 6 h', note: 'Shown twice and still skipped: hidden for 60 hours.' },
                                { label: 'Same channel', value: 'max 2', note: 'Per Home feed, and only one per channel in the first 20 of each list.' },
                                { label: 'Under 1% likes at 50,000+ views', value: 'down to ×0.2', note: 'A floor against clickbait, applied after the first day.' },
                                { label: 'Shown 5 times in 48 h, never opened', value: '×0.10' },
                                { label: 'One topic taking over', value: '3 to 6 max', note: 'Per topic in each list. Your top 3 interests appear every refresh, and smaller ones rotate in.' },
                                { label: '"Not interested"', value: '30 d / 14 d', note: 'Hides the video for 30 days and the channel for 14. Only "Don\'t show this channel" is permanent.' },
                            ]} />
                        </Chapter>

                        <Chapter
                            n="08"
                            id="personas"
                            title="Ten personas"
                            text={<p>The Your taste screen gives you one of ten labels based on how and when you watch. It checks them in this order, and only switches once the new one has held for a while, so the label doesn't flicker.</p>}
                            files={['data/recommendation/FlowNeuroEngine.kt']}
                        >
                            <ul className="grid gap-2 sm:grid-cols-2">
                                {personas.map(p => (
                                    <li key={p.name} className="rounded-xl border border-border-subtle bg-bg-primary px-4 py-3">
                                        <span className="text-lg" aria-hidden="true">{p.emoji}</span>
                                        <p className="font-display text-[17px] font-semibold tracking-[-0.01em] text-text-primary">{p.name}</p>
                                        <p className="mt-0.5 text-[13px] text-text-secondary leading-snug">{p.text}</p>
                                        <p className="kicker mt-2">{p.rule}</p>
                                    </li>
                                ))}
                            </ul>
                        </Chapter>

                        <Chapter
                            n="09"
                            id="control"
                            title="What you can see and change"
                            text={<p>Settings › Your taste shows the engine's view of you, and every control on it changes the engine directly.</p>}
                            files={['ui/screens/settings/taste/TasteSections.kt', 'ui/screens/settings/taste/TasteViewModel.kt', 'ui/screens/home/FlowHeaderLogoIcon.kt']}
                        >
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <p className="kicker mb-3">See</p>
                                    <ul className="space-y-2 text-sm text-text-secondary">
                                        <li>Your persona and profile maturity, full at 250 interactions</li>
                                        <li>Taste shape: pacing, complexity, length, live and topic breadth, overall against right now</li>
                                        <li>Your top 12 interests and top 10 channels</li>
                                        <li>Your music taste and how much new music it mixes in</li>
                                        <li>The last 5 searches it ran for you</li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="kicker mb-3">Change</p>
                                    <ul className="space-y-2 text-sm text-text-secondary">
                                        <li>Boost a topic, or block topics and channels</li>
                                        <li>Unblock anything under Hidden from you</li>
                                        <li>Long-press the Flow logo to pause learning. It turns back on after 4 hours by default.</li>
                                        <li>Export or import your profile as a JSON file</li>
                                        <li>Reset video or music learning to zero. Your recap stays.</li>
                                    </ul>
                                </div>
                            </div>
                        </Chapter>

                        <Chapter
                            n="10"
                            id="music"
                            title="Music has its own brain"
                            text={<>
                                <p>Music works the opposite way from video. It rewards replaying favourites and keeps mixes coherent instead of varied.</p>
                                <p>It lives in its own file, and a test in the app fails the build if the two engines ever share code.</p>
                            </>}
                            files={['data/recommendation/music/MusicBrainModels.kt', 'data/recommendation/music/MusicBrainRanker.kt', 'data/recommendation/music/MusicBrainMixes.kt']}
                        >
                            <Rows rows={[
                                { label: 'A song counts', value: 'at 50%', note: 'Or when you like it. Skipping in the first 15% doesn\'t count against you.' },
                                { label: 'Daily Mixes', value: 'from your sessions', note: 'Built from artists you actually play together, not from genre labels.' },
                                { label: 'New artists mixed in', value: '15 · 35 · 55 · 75%', note: 'Quick Picks, Radio, Similar and Discover, in that order.' },
                                { label: 'On Repeat and Rediscover', value: 'no network', note: 'Built entirely from what\'s on your phone.' },
                            ]} />
                        </Chapter>

                        <Chapter
                            n="11"
                            id="privacy"
                            title="What stays, and what YouTube sees"
                            text={<p>The exact version of "your data stays on your phone".</p>}
                            files={['data/recommendation/NeuroStorage.kt', 'data/repository/YouTubeRepository.kt']}
                        >
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <p className="kicker mb-3">Stays on your devices</p>
                                    <ul className="space-y-2 text-sm text-text-secondary">
                                        <li>Your video and music profiles, each a JSON file in the app's private storage</li>
                                        <li>All scoring, penalties, blocks and personas</li>
                                        <li>It only moves if you export it, back it up to a folder you pick, or sync with your own device over local Wi-Fi</li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="kicker mb-3">Sent to YouTube to fetch videos</p>
                                    <ul className="space-y-2 text-sm text-text-secondary">
                                        <li>Short search phrases built from your interests</li>
                                        <li>IDs of videos you finished, to find related ones</li>
                                        <li>Your subscribed channel IDs, a few at a time</li>
                                        <li>Blocked topics are removed from searches before they're sent</li>
                                    </ul>
                                </div>
                            </div>
                        </Chapter>
                    </div>

                    <FadeIn delay={0.1}>
                        <div className="mt-8 rounded-2xl border-2 border-text-primary p-8 md:p-12 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
                            <div>
                                <p className="kicker mb-4">Open source</p>
                                <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.03em] leading-tight mb-3">
                                    Don't take our word{' '}
                                    <span className="whitespace-nowrap font-serif italic font-normal tracking-[-0.01em] text-text-muted">for it.</span>
                                </h2>
                                <p className="text-text-secondary max-w-xl leading-relaxed">
                                    Every rule on this page is in the source, under GPL-3.0. Read it, question it, or send a pull request.
                                </p>
                            </div>
                            <Button
                                href="https://github.com/A-EDev/Flow/tree/main/app/src/main/java/io/github/aedev/flow/data/recommendation"
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="primary"
                                size="md"
                                icon={<ArrowUpRight className="w-4 h-4" />}
                            >
                                Read the engine's code
                            </Button>
                        </div>
                    </FadeIn>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default HowItWorks
