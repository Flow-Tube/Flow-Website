import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Info, Sparkles, Clock, ThumbsUp, X } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { TextReveal, FadeIn } from '@/components/ui/TextReveal'
import { GlowOrb } from '@/components/effects/GlowOrb'

const mockVideo = {
    title: "The Architecture of Modern AI Systems",
    channel: "Tech Explained",
    views: "1.2M views",
    date: "2 weeks ago",
    duration: "32:14",
    thumbnail: null,
    reasons: [
        { type: 'behavior' as const, text: 'You finished multiple long-form AI videos this week', confidence: 92 },
        { type: 'interest' as const, text: 'Strong match with your Technology interest', confidence: 87 },
        { type: 'persona' as const, text: 'Aligns with "Deep Diver" viewing pattern', confidence: 78 },
    ]
}

export function ExplainableAI() {
    const [showOverlay, setShowOverlay] = useState(false)

    return (
        <Section id="explainable-ai" className="py-32 relative">
            <GlowOrb
                className="absolute top-1/4 right-1/4"
                color="light"
                size="md"
            />

            <div className="section-content">
                {/* Header */}
                <div className="text-center mb-16">
                    <FadeIn>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-accent-cyan mb-6">
                            <Info className="w-4 h-4" />
                            <span>Transparent Recommendations</span>
                        </div>
                    </FadeIn>

                    <h2 className="text-display font-bold mb-6">
                        <TextReveal staggerWords>
                            Why You're Seeing This
                        </TextReveal>
                    </h2>

                    <FadeIn delay={0.3}>
                        <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                            Every recommendation comes with an explanation.
                            No hidden signals. No mystery algorithms.
                        </p>
                    </FadeIn>
                </div>

                {/* Interactive Demo */}
                <FadeIn delay={0.4}>
                    <div className="max-w-4xl mx-auto">
                        <div className="relative">
                            {/* Mock Video Card */}
                            <motion.div
                                className="glass rounded-2xl overflow-hidden cursor-pointer group"
                                whileHover={{ scale: 1.02 }}
                                onClick={() => setShowOverlay(true)}
                            >
                                <div className="flex flex-col md:flex-row">
                                    {/* Thumbnail */}
                                    <div className="relative w-full md:w-80 h-48 md:h-44 bg-gradient-to-br from-accent-primary/20 via-accent-secondary/20 to-accent-cyan/20 flex items-center justify-center">
                                        <div className="text-6xl opacity-30">🎬</div>
                                        <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 rounded text-xs text-white">
                                            {mockVideo.duration}
                                        </div>

                                        {/* Hover indicator */}
                                        <motion.div
                                            className="absolute inset-0 bg-accent-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent-primary text-white text-sm font-medium">
                                                <Info className="w-4 h-4" />
                                                See why this was recommended
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 p-4 md:p-6">
                                        <h3 className="text-lg font-semibold text-text-primary mb-1 line-clamp-2">
                                            {mockVideo.title}
                                        </h3>
                                        <p className="text-text-secondary text-sm mb-2">
                                            {mockVideo.channel}
                                        </p>
                                        <p className="text-text-muted text-sm">
                                            {mockVideo.views} • {mockVideo.date}
                                        </p>

                                        {/* Quick reason badge */}
                                        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-primary/10 text-accent-primary text-xs">
                                            <Sparkles className="w-3 h-3" />
                                            <span>94% match with your interests</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Explanation Overlay */}
                            <AnimatePresence>
                                {showOverlay && (
                                    <motion.div
                                        className="absolute inset-0 glass rounded-2xl p-6 md:p-8"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <button
                                            onClick={() => setShowOverlay(false)}
                                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
                                        >
                                            <X className="w-5 h-5 text-text-secondary" />
                                        </button>

                                        <div className="flex items-center gap-2 mb-6">
                                            <Info className="w-5 h-5 text-accent-primary" />
                                            <h4 className="text-lg font-semibold text-text-primary">
                                                Why this recommendation?
                                            </h4>
                                        </div>

                                        <div className="space-y-4">
                                            {mockVideo.reasons.map((reason, index) => (
                                                <motion.div
                                                    key={index}
                                                    className="flex items-start gap-3 p-4 rounded-xl bg-white/5"
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.1 + index * 0.1 }}
                                                >
                                                    <div className={`p-2 rounded-lg ${reason.type === 'behavior' ? 'bg-green-500/10 text-green-400' :
                                                        reason.type === 'interest' ? 'bg-blue-500/10 text-blue-400' :
                                                            'bg-purple-500/10 text-purple-400'
                                                        }`}>
                                                        {reason.type === 'behavior' ? <Clock className="w-4 h-4" /> :
                                                            reason.type === 'interest' ? <ThumbsUp className="w-4 h-4" /> :
                                                                <Sparkles className="w-4 h-4" />}
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-text-primary text-sm">{reason.text}</p>
                                                        <div className="flex items-center gap-2 mt-2">
                                                            <div className="flex-1 h-1 bg-bg-elevated rounded-full overflow-hidden">
                                                                <motion.div
                                                                    className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full"
                                                                    initial={{ width: 0 }}
                                                                    animate={{ width: `${reason.confidence}%` }}
                                                                    transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                                                                />
                                                            </div>
                                                            <span className="text-xs text-text-muted">{reason.confidence}%</span>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>

                                        <p className="mt-6 text-sm text-text-muted text-center">
                                            All analysis happens locally on your device. Nothing is shared.
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Hint */}
                        <p className="text-center text-text-muted text-sm mt-4">
                            Click the video card to see the explanation
                        </p>
                    </div>
                </FadeIn>
            </div>
        </Section>
    )
}

export default ExplainableAI
