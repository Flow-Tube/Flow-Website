import { motion, AnimatePresence } from 'framer-motion'
import {
    Music,
    Hand,
    Subtitles,
    Palette,
    Download,
    Zap,
    Tv,
    Volume2,
    Heart,
    MessageCircle,
    Share2,
    MoreVertical,
    Pause,
    SkipForward,
    Sun,
    Volume1
} from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { BentoGrid, BentoCard } from '@/components/ui/BentoGrid'
import { TextReveal, FadeIn } from '@/components/ui/TextReveal'
import { GlowOrb } from '@/components/effects/GlowOrb'
import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'

// --- CUSTOM ICONS ---

function Shorts({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 144 144"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <g transform="translate(8 8)">
                <path
                    d="M63.49 2.71c11.59-6.04 25.94-1.64 32.04 9.83 6.1 11.47 1.65 25.66-9.94 31.7l-9.53 5.01 c8.21.3 16.04 4.81 20.14 12.52 6.1 11.47 1.66 25.66-9.94 31.7 l-50.82 26.7c-11.59 6.04-25.94 1.64-32.04-9.83 -6.1-11.47-1.65-25.66 9.94-31.7 l9.53-5.01c-8.21-.3-16.04-4.81-20.14-12.52 -6.1-11.47-1.65-25.66 9.94-31.7 l50.82-26.7z M36.06 42.53l30.76 18.99-30.76 18.9V42.53z"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    fillRule="evenodd"
                />
            </g>
        </svg>
    )
}

// --- MOCK UI COMPONENTS ---

// 1. Shorts Vertical Scroll Mockup
function ShortsPhoneMockup() {
    return (
        <div className="relative w-full max-w-[200px] mx-auto group">
            <div className="relative bg-bg-card rounded-[2rem] border-4 border-text-muted/20 overflow-hidden shadow-2xl aspect-[9/18]">
                {/* Notch */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-black rounded-full z-20" />

                {/* Scroll Container */}
                <div className="relative w-full h-full bg-black overflow-hidden">
                    <motion.div
                        animate={{ y: ['0%', '-100%'] }}
                        transition={{
                            duration: 8,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatDelay: 1,
                            times: [0, 1]
                        }}
                        className="w-full h-[200%]"
                    >
                        {/* Video 1 */}
                        <div className="w-full h-1/2 relative bg-neutral-900 border-b border-white/5">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-full h-full bg-gradient-to-br from-red-900/20 to-neutral-900" />
                            </div>
                            {/* Overlay UI */}
                            <div className="absolute right-2 bottom-16 flex flex-col items-center gap-3">
                                {[Heart, MessageCircle, Share2, MoreVertical].map((Icon, i) => (
                                    <div key={i} className="flex flex-col items-center">
                                        <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                                            <Icon className="w-4 h-4 text-white" />
                                        </div>
                                        {i < 3 && <span className="text-[8px] text-white mt-0.5">1.2K</span>}
                                    </div>
                                ))}
                            </div>
                            <div className="absolute left-3 bottom-6 right-14">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-6 h-6 rounded-full bg-red-600" />
                                    <span className="text-[10px] text-white font-medium">@daily_dose</span>
                                </div>
                                <div className="space-y-1">
                                    <div className="w-3/4 h-2 bg-white/20 rounded-full" />
                                    <div className="w-1/2 h-2 bg-white/10 rounded-full" />
                                </div>
                            </div>
                        </div>

                        {/* Video 2 */}
                        <div className="w-full h-1/2 relative bg-neutral-800">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-full h-full bg-gradient-to-br from-blue-900/20 to-neutral-900" />
                            </div>
                            {/* Overlay UI - same structure for consistency */}
                            <div className="absolute right-2 bottom-16 flex flex-col items-center gap-3">
                                {[Heart, MessageCircle, Share2, MoreVertical].map((Icon, i) => (
                                    <div key={i} className="flex flex-col items-center">
                                        <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                                            <Icon className="w-4 h-4 text-white" />
                                        </div>
                                        {i < 3 && <span className="text-[8px] text-white mt-0.5">856</span>}
                                    </div>
                                ))}
                            </div>
                            <div className="absolute left-3 bottom-6 right-14">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-6 h-6 rounded-full bg-blue-600" />
                                    <span className="text-[10px] text-white font-medium">@tech_guy</span>
                                </div>
                                <div className="space-y-1">
                                    <div className="w-3/4 h-2 bg-white/20 rounded-full" />
                                    <div className="w-1/2 h-2 bg-white/10 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Hand Swipe Hint */}
                    <motion.div
                        className="absolute bottom-1/4 left-1/2 z-30 pointer-events-none"
                        animate={{
                            y: [0, -40, 0],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: 0.5
                        }}
                    >
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                            <Hand className="w-5 h-5 text-white" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

// 2. Music Player Mockup (based on uploaded image)
function MusicPlayerMockup() {
    return (
        <div className="relative w-full h-full flex items-center justify-center px-4">
            <div className="w-full max-w-sm rounded-[2rem] bg-[#0f0f0f] border border-white/10 p-4 shadow-xl flex items-center gap-4 relative overflow-hidden group">
                {/* Progress Bar (Bottom) */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                    <motion.div
                        className="h-full bg-red-600 origin-left"
                        initial={{ scaleX: 0.3 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 30, ease: "linear" }}
                    />
                </div>

                {/* Album Art */}
                <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-neutral-800">
                    {/* Placeholder Art */}
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-700 to-neutral-900" />
                    {/* Visualizer bars */}
                    <div className="absolute inset-0 flex items-center justify-center gap-1">
                        {[1, 2, 3].map((i) => (
                            <motion.div
                                key={i}
                                className="w-1 bg-white"
                                animate={{ height: [10, 24, 8] }}
                                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                            />
                        ))}
                    </div>
                </div>

                {/* Song Info */}
                <div className="flex-1 min-w-0">
                    <h4 className="text-white font-bold text-lg leading-tight truncate">Song Name</h4>
                    <p className="text-text-secondary text-sm truncate">Artist Name</p>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-4">
                    <button className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center hover:scale-105 transition-transform">
                        <Pause className="w-5 h-5 text-white fill-white" />
                    </button>
                    <button className="text-white/80 hover:text-white transition-colors">
                        <SkipForward className="w-6 h-6 fill-white" />
                    </button>
                </div>
            </div>
        </div>
    )
}

// 3. Interactive Gesture Mockup
function GestureMockup() {
    const [activeSide, setActiveSide] = useState<'left' | 'right' | null>(null)

    return (
        <div className="relative w-full h-full flex items-center justify-center px-4 py-2">
            <div className="w-full max-w-sm aspect-video bg-neutral-900 rounded-xl relative overflow-hidden border border-white/10 shadow-lg group">
                {/* Content */}
                <div className="absolute inset-0 flex items-center justify-center text-white/20 font-bold text-4xl">
                    VIDEO
                </div>

                {/* Gesture Zones */}
                <div className="absolute inset-0 flex">
                    {/* Left Zone - Volume */}
                    <motion.div
                        className="flex-1 h-full relative cursor-ns-resize hover:bg-white/5 transition-colors"
                        onHoverStart={() => setActiveSide('left')}
                        onHoverEnd={() => setActiveSide(null)}
                    >
                        <AnimatePresence>
                            {activeSide === 'left' && (
                                <motion.div
                                    className="absolute inset-y-0 left-4 w-1 bg-white/20 rounded-full overflow-hidden my-4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <motion.div
                                        className="absolute bottom-0 w-full bg-white origin-bottom"
                                        animate={{ scaleY: [0.3, 0.6, 0.45] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                        {activeSide === 'left' && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur rounded-full flex items-center justify-center"
                            >
                                <Volume2 className="w-5 h-5 text-white" />
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Right Zone - Brightness */}
                    <motion.div
                        className="flex-1 h-full relative cursor-ns-resize hover:bg-white/5 transition-colors"
                        onHoverStart={() => setActiveSide('right')}
                        onHoverEnd={() => setActiveSide(null)}
                    >
                        <AnimatePresence>
                            {activeSide === 'right' && (
                                <motion.div
                                    className="absolute inset-y-0 right-4 w-1 bg-white/20 rounded-full overflow-hidden my-4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <motion.div
                                        className="absolute bottom-0 w-full bg-white origin-bottom"
                                        animate={{ scaleY: [0.5, 0.8, 0.7] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                        {activeSide === 'right' && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur rounded-full flex items-center justify-center"
                            >
                                <Sun className="w-5 h-5 text-white" />
                            </motion.div>
                        )}
                    </motion.div>
                </div>

                {/* Hand Hint (Only visible when no active side for demo) */}
                {!activeSide && (
                    <motion.div
                        className="absolute inset-0 flex items-center justify-around pointer-events-none opacity-50"
                        animate={{ opacity: [0.5, 0.2, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-1 h-8 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
                            <Volume1 className="w-4 h-4 text-white/50" />
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-1 h-8 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
                            <Sun className="w-4 h-4 text-white/50" />
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    )
}

// 4. Interactive Subtitles Mockup
function SubtitlesMockup() {
    const [style, setStyle] = useState(0)
    const styles = [
        { bg: 'bg-black/70', color: 'text-white', name: 'Default' },
        { bg: 'bg-yellow-400', color: 'text-black', name: 'Yellow' },
        { bg: 'bg-transparent text-shadow-xl', color: 'text-white font-bold text-shadow', name: 'Outline' },
    ]

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
            <div
                className="relative w-full aspect-video bg-neutral-900 rounded-lg overflow-hidden border border-white/10 group cursor-pointer"
                onClick={() => setStyle((prev) => (prev + 1) % styles.length)}
            >
                {/* Mock Video Content */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                    <div className="w-20 h-20 rounded-full border-4 border-white/20" />
                </div>

                {/* Subtitle */}
                <div className="absolute bottom-4 left-0 right-0 text-center px-4">
                    <motion.span
                        key={style}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`inline-block px-2 py-1 rounded text-sm md:text-base transition-all duration-300 ${styles[style].bg} ${styles[style].color}`}
                    >
                        Click to customize this caption!
                    </motion.span>
                </div>

                <div className="absolute top-2 right-2 bg-black/50 px-2 py-1 rounded text-[10px] text-white/70">
                    {styles[style].name}
                </div>
            </div>
        </div>
    )
}

// 5. PiP Mode Animation
function PiPMockup() {
    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Desktop Screen context */}
            <div className="w-full max-w-[280px] aspect-[4/3] bg-neutral-800 rounded-lg relative overflow-hidden flex flex-col">
                {/* Header */}
                <div className="h-4 bg-neutral-700 w-full flex items-center gap-1 px-2">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                </div>
                {/* Body */}
                <div className="flex-1 p-2 relative">
                    <div className="space-y-2 opacity-20">
                        <div className="w-full h-2 bg-white rounded" />
                        <div className="w-2/3 h-2 bg-white rounded" />
                        <div className="w-full h-20 bg-white rounded" />
                    </div>

                    {/* PiP Window Animation */}
                    <motion.div
                        className="absolute bg-black rounded-md shadow-2xl overflow-hidden border border-white/10"
                        animate={{
                            scale: [1, 0.4, 0.4, 1],
                            x: ["0%", "75%", "75%", "0%"],
                            y: ["0%", "115%", "115%", "0%"],
                        }}
                        style={{ originX: 0, originY: 0 }}
                        transition={{
                            duration: 4,
                            ease: "easeInOut",
                            times: [0, 0.3, 0.8, 1],
                            repeat: Infinity,
                            repeatDelay: 1
                        }}
                    >
                        {/* Video Content */}
                        <div className="w-full h-full relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    className="w-4 h-4 rounded-full bg-white/20"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

const features = [
    {
        icon: Shorts as unknown as LucideIcon,
        title: 'Shorts-First Experience',
        description: 'Vertical swipe navigation with gesture controls — just like the real thing',
        color: 'from-red-500 to-orange-500',
        colSpan: 6 as const,
        rowSpan: 2 as const,
        preview: <ShortsPhoneMockup />,
    },
    {
        icon: Music,
        title: 'Music Mode',
        description: 'Dedicated mini-player with lyrics and queue',
        color: 'from-green-500 to-emerald-500',
        colSpan: 6 as const,
        rowSpan: 1 as const,
        preview: <MusicPlayerMockup />,
    },
    {
        icon: Hand,
        title: 'Gesture Controls',
        description: 'Swipe left for volume, right for brightness',
        color: 'from-purple-500 to-pink-500',
        colSpan: 6 as const,
        rowSpan: 1 as const,
        preview: <GestureMockup />,
    },
    {
        icon: Subtitles,
        title: 'Advanced Subtitles',
        description: 'Click to customize style instantly',
        color: 'from-blue-500 to-cyan-500',
        colSpan: 4 as const,
        preview: <SubtitlesMockup />,
    },
    {
        icon: Palette,
        title: '11+ Themes',
        description: 'OLED to vibrant colors',
        color: 'from-yellow-500 to-orange-500',
        colSpan: 4 as const,
        preview: (
            <div className="relative h-24 mt-4 flex items-center justify-center gap-2">
                {['#ff0000', '#6366f1', '#22c55e', '#f43f5e', '#eab308'].map((color, i) => (
                    <motion.div
                        key={color}
                        className="w-6 h-6 rounded-full border border-white/20"
                        style={{ backgroundColor: color }}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -5 }}
                    />
                ))}
            </div>
        ),
    },
    {
        icon: Download,
        title: 'Downloads',
        description: 'Save content for offline access',
        color: 'from-teal-500 to-cyan-500',
        colSpan: 4 as const,
        preview: (
            <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end">
                <div className="space-y-4 w-full">
                    {[
                        { name: 'Physics Video.mp4', progress: 100, color: 'bg-red-500', size: '45MB' },
                        { name: 'Lecture 01.mp3', progress: 65, color: 'bg-red-500/50', size: '12MB' }
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 w-full bg-black/20 p-2 rounded-lg backdrop-blur-sm border border-white/5">
                            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                                <Download className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-white/90 truncate mr-2">{item.name}</span>
                                    <span className="text-white/50 text-[10px]">{item.size}</span>
                                </div>
                                <div className="h-1 bg-white/10 rounded-full overflow-hidden w-full">
                                    <motion.div
                                        className={`h-full ${item.color} rounded-full origin-left`}
                                        initial={{ scaleX: 0 }}
                                        whileInView={{ scaleX: item.progress / 100 }}
                                        transition={{ duration: 1.5, delay: 0.2 + i * 0.2 }}
                                    />
                                </div>
                            </div>
                            {item.progress === 100 ? (
                                <div className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                </div>
                            ) : (
                                <div className="w-4 h-4 rounded-full border border-white/20 border-t-white animate-spin" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        ),
    },
    {
        icon: Zap,
        title: 'PiP Mode',
        description: 'Multitask seamlessly',
        color: 'from-amber-500 to-yellow-500',
        colSpan: 6 as const,
        preview: <PiPMockup />,
    },
    {
        icon: Tv,
        title: 'Background Play',
        description: 'Keep listening with screen off',
        color: 'from-indigo-500 to-purple-500',
        colSpan: 6 as const,
        preview: (
            <div className="relative h-full min-h-[100px] flex items-center justify-center gap-8 mt-4">
                <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="flex flex-col items-center gap-2"
                >
                    <div className="w-12 h-20 border-2 border-white/20 rounded-lg bg-black flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-indigo-500" />
                    </div>
                    <span className="text-[10px] text-white/50">Screen Off</span>
                </motion.div>
                <div className="h-px w-20 bg-gradient-to-r from-indigo-500/50 to-purple-500/50" />
                <motion.div
                    className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <Volume2 className="w-5 h-5 text-indigo-400" />
                    <div className="space-y-1">
                        <div className="w-20 h-1.5 bg-white/20 rounded-full" />
                        <div className="w-12 h-1.5 bg-white/10 rounded-full" />
                    </div>
                </motion.div>
            </div>
        ),
    },
]

export function Features() {
    return (
        <Section id="features" className="py-32 relative">
            <GlowOrb
                className="absolute top-1/3 left-1/4"
                color="primary"
                size="lg"
            />

            <div className="section-content">
                {/* Header */}
                <div className="text-center mb-16">
                    <FadeIn>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-accent-primary mb-6">
                            <Zap className="w-4 h-4" />
                            <span>Feature-Rich Experience</span>
                        </div>
                    </FadeIn>

                    <h2 className="text-display font-bold mb-6">
                        <TextReveal staggerWords>
                            Everything You Need
                        </TextReveal>
                    </h2>

                    <FadeIn delay={0.3}>
                        <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                            Premium features without the premium price.
                        </p>
                    </FadeIn>
                </div>

                {/* Features Grid */}
                <BentoGrid className="grid-cols-12">
                    {features.map((feature, index) => (
                        <BentoCard
                            key={feature.title}
                            colSpan={feature.colSpan}
                            rowSpan={feature.rowSpan}
                            delay={0.1 + index * 0.05}
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className={`p-2 rounded-xl bg-gradient-to-br ${feature.color}`}>
                                    <feature.icon className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold text-text-primary">
                                    {feature.title}
                                </h3>
                            </div>
                            <p className="text-sm text-text-secondary mb-4">
                                {feature.description}
                            </p>
                            <div className="flex-1 flex items-center justify-center min-h-[120px]">
                                {feature.preview}
                            </div>
                        </BentoCard>
                    ))}
                </BentoGrid>
            </div>
        </Section>
    )
}

export default Features
