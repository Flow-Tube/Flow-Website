import { motion } from 'framer-motion'
import { Brain, Activity, Hash, Zap } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { BentoGrid, BentoCard, BentoCardHeader } from '@/components/ui/BentoGrid'
import { TextReveal, FadeIn } from '@/components/ui/TextReveal'
import { Counter } from '@/components/ui/Counter'
import { GlowOrb } from '@/components/effects/GlowOrb'

// --- Radar Chart Component ---
function RadarChart() {
    return (
        <div className="relative w-full aspect-square max-w-[300px] mx-auto flex items-center justify-center">
            {/* Grid Circles */}
            {[0.2, 0.4, 0.6, 0.8, 1].map((scale, i) => (
                <div
                    key={i}
                    className="absolute inset-0 border border-white/5 rounded-full"
                    style={{ transform: `scale(${scale})` }}
                />
            ))}

            {/* Axis Lines */}
            {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                <div
                    key={i}
                    className="absolute w-full h-px bg-white/5 top-1/2 left-0 origin-center"
                    style={{ transform: `rotate(${deg}deg)` }}
                />
            ))}

            {/* Data Polygon */}
            <svg className="absolute inset-0 w-full h-full p-4 overflow-visible" viewBox="0 0 100 100">
                <motion.path
                    d="M 50 10 L 85 35 L 75 80 L 25 80 L 15 35 Z"
                    fill="rgba(255, 0, 0, 0.2)"
                    stroke="#FF0000"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                />

                <motion.path
                    d="M 50 25 L 70 45 L 60 70 L 40 70 L 30 45 Z"
                    fill="rgba(255, 255, 255, 0.05)"
                    stroke="rgba(255, 255, 255, 0.2)"
                    strokeWidth="1"
                    strokeDasharray="4 2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                />
            </svg>

            {/* Labels */}
            <div className="absolute bottom-4 flex gap-4 text-[10px] text-text-muted font-medium uppercase tracking-wider">
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-600" />
                    Current Mood
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                    Personality
                </div>
            </div>
        </div>
    )
}

// --- Bubble Chart Component ---
function BubbleChart() {
    const bubbles = [
        { name: 'Open Source', size: 120, color: 'bg-red-600/20', x: '10%', y: '10%' },
        { name: 'Trailers', size: 100, color: 'bg-red-500/20', x: '60%', y: '5%' },
        { name: 'Gemini', size: 90, color: 'bg-red-700/20', x: '80%', y: '30%' },
        { name: 'Tech News', size: 110, color: 'bg-red-600/10', x: '5%', y: '60%' },
        { name: 'Gaming', size: 95, color: 'bg-red-800/20', x: '40%', y: '50%' },
        { name: 'Lofi Girl', size: 85, color: 'bg-red-500/10', x: '75%', y: '70%' },
        { name: 'Coding', size: 70, color: 'bg-red-900/20', x: '25%', y: '35%' },
        { name: 'Music', size: 80, color: 'bg-red-600/15', x: '55%', y: '80%' },
    ]

    return (
        <div className="relative h-full w-full min-h-[300px] mt-4 overflow-hidden rounded-xl bg-gradient-to-br from-neutral-900/50 to-neutral-900/10">
            {bubbles.map((bubble, i) => (
                <motion.div
                    key={i}
                    className={`absolute rounded-full ${bubble.color} flex items-center justify-center text-xs font-medium text-white/90 shadow-lg backdrop-blur-sm border border-white/5 cursor-pointer hover:bg-red-500/30 transition-colors`}
                    style={{
                        width: bubble.size,
                        height: bubble.size,
                        left: bubble.x,
                        top: bubble.y,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.1 }}
                    drag
                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    transition={{
                        type: "spring",
                        damping: 15,
                        stiffness: 100,
                        delay: i * 0.05
                    }}
                >
                    {bubble.name}
                </motion.div>
            ))}
        </div>
    )
}

export function NeuroEngine() {
    return (
        <Section id="neuro-engine" className="py-32 relative">
            <GlowOrb
                className="absolute top-1/3 left-1/4 -translate-x-1/2"
                color="primary"
                size="lg"
            />

            <div className="section-content">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <FadeIn>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-accent-primary mb-6">
                            <Brain className="w-4 h-4" />
                            <span>Algorithm Tuning & Visualization</span>
                        </div>
                    </FadeIn>

                    <h2 className="text-display font-bold mb-6">
                        <TextReveal staggerWords>
                            The Flow Engine
                        </TextReveal>
                    </h2>

                    <FadeIn delay={0.3}>
                        <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                            Visualize how Flow learns your preferences in real-time.
                        </p>
                    </FadeIn>
                </div>

                {/* Main Dashboard Grid */}
                <BentoGrid className="grid-cols-12 gap-8">

                    {/* Top Stats */}
                    <BentoCard colSpan={12} delay={0.1} className="!p-0 overflow-hidden bg-transparent border-none shadow-none">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="glass p-6 rounded-2xl flex flex-col items-center">
                                <div className="text-4xl font-bold text-red-500 mb-1">
                                    <Counter from={0} to={80} duration={2} />
                                </div>
                                <div className="text-sm text-text-muted flex items-center gap-2">
                                    <Activity className="w-3 h-3" /> Interactions
                                </div>
                            </div>
                            <div className="glass p-6 rounded-2xl flex flex-col items-center">
                                <div className="text-4xl font-bold text-text-primary mb-1">
                                    <Counter from={0} to={88} duration={2} delay={0.2} />
                                </div>
                                <div className="text-sm text-text-muted flex items-center gap-2">
                                    <Hash className="w-3 h-3" /> Topics
                                </div>
                            </div>
                            <div className="glass p-6 rounded-2xl flex flex-col items-center">
                                <div className="text-4xl font-bold text-pink-300 mb-1">
                                    <Counter from={0} to={0.43} decimals={2} duration={2} delay={0.4} />
                                </div>
                                <div className="text-sm text-text-muted flex items-center gap-2">
                                    <Zap className="w-3 h-3" /> Current Pace
                                </div>
                            </div>
                        </div>
                    </BentoCard>

                    {/* Cognitive Vector Map */}
                    <BentoCard colSpan={12} rowSpan={2} delay={0.2} glow className="md:col-span-7">
                        <BentoCardHeader
                            title="Cognitive Vector Map"
                            subtitle="Real-time personality mapping"
                        />
                        <div className="flex-1 flex items-center justify-center py-8">
                            <RadarChart />
                        </div>
                    </BentoCard>

                    {/* Dominant Interests */}
                    <BentoCard colSpan={12} rowSpan={2} delay={0.3} className="md:col-span-5">
                        <BentoCardHeader
                            title="Dominant Interests"
                            subtitle="Top content clusters"
                        />
                        <BubbleChart />
                    </BentoCard>
                </BentoGrid>
            </div>
        </Section>
    )
}

export default NeuroEngine
