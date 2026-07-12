import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { FadeIn } from '@/components/ui/TextReveal'

const faqs = [
    {
        question: 'What does Flow cost?',
        answer: 'Nothing, ever. There are no ads to sit through, no premium tier hiding the good features, and no data being sold behind your back. Flow is GPL-3.0 licensed and funded entirely by people who choose to donate.'
    },
    {
        question: 'Do I need a Google account?',
        answer: 'No. Flow works without any sign-in. Your subscriptions, watch history, and preferences are stored on your device and never touch a server you don\'t control.'
    },
    {
        question: 'How is the recommendation engine private?',
        answer: 'The Neuro Engine is a piece of local software, not a cloud service. It builds its picture of your taste on your phone, and the transparency dashboard lets you inspect, reweight, or erase everything it has learned.'
    },
    {
        question: 'Is there a desktop version?',
        answer: 'It\'s being built right now. The desktop app targets Windows, Linux, and macOS, written in Rust on Tauri 2 — the same Flow, sized for a bigger screen.'
    },
    {
        question: 'How do I install it?',
        answer: 'Grab the latest APK from GitHub Releases, or get automatic updates through IzzyOnDroid and Obtainium. No store account required for any of them.'
    },
    {
        question: 'Does Flow host videos?',
        answer: 'No. Flow is an independent client for YouTube\'s public catalog. It gives you a different way to watch, but it doesn\'t host, upload, or redistribute any content itself.'
    },
    {
        question: 'How can I help?',
        answer: 'Code, bug reports, translations, and ideas are all welcome at github.com/A-EDev/Flow. If writing code isn\'t your thing, starring the repo and telling a friend goes further than you\'d think.'
    }
]

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    return (
        <Section id="faq" fullHeight={false} className="bg-bg-primary border-b border-border-subtle py-24 md:py-32">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    {/* Header */}
                    <FadeIn className="lg:col-span-4">
                        <div className="lg:sticky lg:top-32">
                            <p className="kicker mb-4">04 &mdash; FAQ</p>
                            <h2 className="text-4xl md:text-5xl font-bold text-text-primary tracking-tight">
                                Asked and answered.
                            </h2>
                        </div>
                    </FadeIn>

                    {/* Accordion */}
                    <div className="lg:col-span-8">
                        {faqs.map((faq, i) => {
                            const isOpen = openIndex === i
                            return (
                                <FadeIn key={faq.question} delay={i * 0.05}>
                                    <div className={i > 0 ? 'border-t border-border-subtle' : ''}>
                                        <button
                                            onClick={() => setOpenIndex(isOpen ? null : i)}
                                            className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                                            aria-expanded={isOpen}
                                        >
                                            <span className="text-base md:text-lg font-semibold text-text-primary group-hover:text-text-secondary transition-colors">
                                                {faq.question}
                                            </span>
                                            <Plus
                                                className={`w-5 h-5 text-text-muted flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                                                strokeWidth={1.75}
                                            />
                                        </button>
                                        <AnimatePresence initial={false}>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                                    className="overflow-hidden"
                                                >
                                                    <p className="text-text-secondary leading-relaxed pb-6 pr-10">
                                                        {faq.answer}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </FadeIn>
                            )
                        })}
                    </div>
                </div>
            </div>
        </Section>
    )
}

export default FAQ
