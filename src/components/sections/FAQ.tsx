import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Link2, Plus } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { FadeIn } from '@/components/ui/TextReveal'
import { cn } from '@/lib/utils'

const linkClass = 'font-semibold text-text-primary underline underline-offset-4 decoration-text-muted hover:decoration-text-primary'

function Ext({ href, children }: { href: string; children: React.ReactNode }) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>{children}</a>
}

function Page({ to, children }: { to: string; children: React.ReactNode }) {
    return <Link to={to} className={linkClass}>{children}</Link>
}

interface Question {
    id: string
    question: string
    answer: React.ReactNode
}

const groups: { label: string; questions: Question[] }[] = [
    {
        label: 'Getting Flow',
        questions: [
            {
                id: 'faq-cost',
                question: 'What does Flow cost?',
                answer: <>Nothing. No ads, no premium tier, and no data sold. Flow is GPL-3.0 licensed and funded by people who choose to donate.</>,
            },
            {
                id: 'faq-install',
                question: 'How do I install it?',
                answer: <>The <Page to="/download">Download page</Page> picks the right file for your device. You can also add Flow to <Ext href="https://apt.izzysoft.de/packages/io.github.aedev.flow">IzzyOnDroid</Ext> or <Ext href="https://apps.obtainium.imranr.dev/redirect?r=obtainium://add/https://github.com/A-EDev/Flow/">Obtainium</Ext> for automatic updates. No store account needed. Flow runs on Android 8.0 and newer, and you can <Ext href="https://github.com/A-EDev/Flow#cert">verify the APK</Ext> before installing.</>,
            },
            {
                id: 'faq-updates',
                question: 'How do I get updates?',
                answer: <>The GitHub build checks for updates itself, from Settings. IzzyOnDroid and Obtainium update Flow for you. There's also a <Ext href="https://nightly.link/A-EDev/Flow/workflows/build/main/flow-nightly-apk.zip">nightly build</Ext> if you want new features early.</>,
            },
            {
                id: 'faq-import',
                question: 'Can I bring my subscriptions and history?',
                answer: <>Yes. Import a Google Takeout ZIP for your YouTube subscriptions, watch history and playlists in one go, or import from NewPipe, LibreTube or a Flow backup. You can export everything the same way, or schedule automatic backups to a folder.</>,
            },
            {
                id: 'faq-tv-desktop',
                question: 'Does it work on Android TV and desktop?',
                answer: <>Android TV, yes: it has its own interface built for the remote. The desktop app for Windows, Linux and macOS is in development, written in Rust on Tauri 2.</>,
            },
        ],
    },
    {
        label: 'Privacy',
        questions: [
            {
                id: 'faq-account',
                question: 'Do I need a Google account?',
                answer: <>No. Flow works without signing in. Your subscriptions, history and preferences are stored on your phone.</>,
            },
            {
                id: 'faq-engine',
                question: 'How does the recommendation engine stay private?',
                answer: <>FlowNeuro runs on your phone and keeps what it learns in a file there. You can see it, boost or block topics, or erase it. <Page to="/how-it-works">How it works</Page> explains every rule.</>,
            },
            {
                id: 'faq-network',
                question: 'What does Flow send over the internet?',
                answer: <>Requests to YouTube for videos and music, and the video ID to SponsorBlock, DeArrow and Return YouTube Dislike. Lyrics, song recognition, casting and Discord Rich Presence only contact their services when you use them. The <Page to="/privacy">Privacy Policy</Page> lists every one.</>,
            },
        ],
    },
    {
        label: 'The project',
        questions: [
            {
                id: 'faq-affiliated',
                question: 'Is Flow affiliated with YouTube?',
                answer: <>No. Flow is an independent, open-source client for YouTube's public catalog. It doesn't host, upload or redistribute any content, and it isn't endorsed by YouTube or Google.</>,
            },
            {
                id: 'faq-builds',
                question: 'What\'s the difference between the GitHub and FOSS builds?',
                answer: <>The GitHub build includes the in-app updater and Discord Rich Presence. The FOSS build leaves both out. Everything else is the same.</>,
            },
            {
                id: 'faq-help',
                question: 'How can I help?',
                answer: <>Report bugs, suggest features, <Ext href="https://hosted.weblate.org/engage/flow/">translate Flow</Ext> or send code on <Ext href="https://github.com/A-EDev/Flow">GitHub</Ext>. If code isn't your thing, starring the repo and telling a friend helps more than you'd think.</>,
            },
        ],
    },
]

const allIds = groups.flatMap(g => g.questions.map(q => q.id))

export function FAQ() {
    const [open, setOpen] = useState<Set<string>>(() => new Set([allIds[0]]))

    useEffect(() => {
        const openFromHash = () => {
            const id = window.location.hash.slice(1)
            if (!allIds.includes(id)) return
            setOpen(prev => new Set(prev).add(id))
            window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 60)
        }
        openFromHash()
        window.addEventListener('hashchange', openFromHash)
        return () => window.removeEventListener('hashchange', openFromHash)
    }, [])

    const toggle = (id: string) => {
        setOpen(prev => {
            const next = new Set(prev)
            if (next.has(id)) next.delete(id)
            else next.add(id)
            return next
        })
    }

    return (
        <Section id="faq" fullHeight={false} className="bg-bg-primary border-b border-border-subtle py-24 md:py-32">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    <FadeIn className="lg:col-span-4">
                        <div className="lg:sticky lg:top-32">
                            <p className="kicker mb-4">04 &middot; FAQ</p>
                            <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.035em] leading-[1.02] text-text-primary mb-5">
                                Asked and{' '}
                                <span className="whitespace-nowrap font-serif italic font-normal tracking-[-0.01em] text-text-muted">answered.</span>
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                Didn't find yours? Ask on{' '}
                                <Ext href="https://reddit.com/r/flow_official">r/Flow_Official</Ext>
                                {' '}or{' '}
                                <Ext href="https://github.com/A-EDev/Flow/issues">open an issue</Ext>.
                            </p>
                        </div>
                    </FadeIn>

                    <div className="lg:col-span-8 space-y-10">
                        {groups.map(group => (
                            <FadeIn key={group.label}>
                                <p className="kicker mb-2">{group.label}</p>
                                <div className="border-b border-border-subtle">
                                    {group.questions.map(q => {
                                        const isOpen = open.has(q.id)
                                        return (
                                            <div key={q.id} id={q.id} className="group border-t border-border-subtle scroll-mt-24">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => toggle(q.id)}
                                                        aria-expanded={isOpen}
                                                        aria-controls={`${q.id}-answer`}
                                                        className="flex flex-1 items-center justify-between gap-6 py-5 text-left"
                                                    >
                                                        <h3 className="font-display text-lg md:text-xl font-semibold tracking-[-0.01em] text-text-primary">
                                                            {q.question}
                                                        </h3>
                                                        <Plus
                                                            className={cn('w-5 h-5 shrink-0 text-text-muted transition-transform duration-300', isOpen && 'rotate-45 text-text-primary')}
                                                            strokeWidth={1.75}
                                                            aria-hidden="true"
                                                        />
                                                    </button>
                                                    <a
                                                        href={`#${q.id}`}
                                                        aria-label={`Link to "${q.question}"`}
                                                        className="order-first -ml-7 w-5 opacity-0 group-hover:opacity-100 focus:opacity-100 text-text-muted hover:text-text-primary transition-opacity hidden md:block"
                                                    >
                                                        <Link2 className="w-4 h-4" aria-hidden="true" />
                                                    </a>
                                                </div>
                                                <AnimatePresence initial={false}>
                                                    {isOpen && (
                                                        <motion.div
                                                            id={`${q.id}-answer`}
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                                            className="overflow-hidden"
                                                        >
                                                            <p className="text-text-secondary leading-relaxed pb-6 pr-10 max-w-2xl">{q.answer}</p>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        )
                                    })}
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    )
}

export default FAQ
