import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
    Play,
    Pause,
    Headphones,
    MoreVertical,
    ChevronDown,
    Heart,
    Shuffle,
    Repeat,
    SkipBack,
    SkipForward,
} from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { TextReveal, FadeIn } from '@/components/ui/TextReveal'
import { GlowOrb } from '@/components/effects/GlowOrb'

export function MusicVideo() {
    const containerRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    })

    // Animation values
    const videoX = useTransform(scrollYProgress, [0.3, 0.5, 0.7], ['0%', '0%', '-5%'])
    const musicX = useTransform(scrollYProgress, [0.3, 0.5, 0.7], ['0%', '0%', '5%'])
    const dividerOpacity = useTransform(scrollYProgress, [0.4, 0.5, 0.6], [1, 0.5, 0])

    return (
        <Section id="music-video" className="py-32 relative">
            <GlowOrb className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" color="secondary" size="xl" />

            <div className="section-content">
                {/* Header */}
                <div className="text-center mb-16">
                    <FadeIn>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-accent-secondary mb-6">
                            <Headphones className="w-4 h-4" />
                            <span>Adaptive Consumption</span>
                        </div>
                    </FadeIn>

                    <h2 className="text-display font-bold mb-6">
                        <TextReveal staggerWords>
                            Music × Video
                        </TextReveal>
                    </h2>

                    <FadeIn delay={0.3}>
                        <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-4">
                            Sometimes you watch. Sometimes you listen.
                        </p>
                        <p className="text-2xl font-semibold text-gradient">
                            Flow adapts.
                        </p>
                    </FadeIn>
                </div>

                {/* Split Screen Demo */}
                <div ref={containerRef} className="relative max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-8 md:gap-0 items-center md:items-stretch">

                        {/* ---------------- VIDEO SKELETON CARD ---------------- */}
                        <motion.div
                            className="flex-1 p-4 flex justify-center md:justify-end"
                            style={{ x: videoX }}
                        >
                            <FadeIn delay={0.4}>
                                <div className="bg-[#0f0f0f] rounded-[2rem] border-[6px] border-[#1f1f1f] w-[320px] h-[640px] relative overflow-hidden shadow-2xl flex flex-col font-sans select-none">

                                    {/* Video Player Skeleton */}
                                    <div className="w-full aspect-video bg-zinc-900 relative flex items-center justify-center">
                                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                                            <Play className="w-5 h-5 text-white/20 ml-1" />
                                        </div>

                                        {/* Overlay Icons */}
                                        <div className="absolute top-3 right-3 flex gap-4">
                                            <div className="w-5 h-5 bg-white/10 rounded animate-pulse" />
                                            <div className="w-5 h-5 bg-white/10 rounded animate-pulse" />
                                            <div className="w-5 h-5 bg-white/10 rounded animate-pulse" />
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10">
                                            <div className="w-1/3 h-full bg-red-500/50" />
                                        </div>
                                    </div>

                                    {/* Content Scroll Area */}
                                    <div className="flex-1 p-3 flex flex-col gap-4">

                                        {/* Title Lines */}
                                        <div className="space-y-2 pt-1">
                                            <div className="h-4 w-[90%] bg-zinc-800 rounded animate-pulse" />
                                            <div className="h-4 w-[60%] bg-zinc-800 rounded animate-pulse" />
                                        </div>

                                        {/* Metadata Line */}
                                        <div className="flex gap-2">
                                            <div className="h-3 w-16 bg-zinc-800/60 rounded animate-pulse" />
                                            <div className="h-3 w-16 bg-zinc-800/60 rounded animate-pulse" />
                                            <div className="h-3 w-10 bg-zinc-800/60 rounded animate-pulse" />
                                        </div>

                                        {/* Channel Row */}
                                        <div className="flex items-center justify-between py-2">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-zinc-800 animate-pulse" />
                                                <div className="space-y-1.5">
                                                    <div className="h-3 w-24 bg-zinc-800 rounded animate-pulse" />
                                                    <div className="h-2 w-16 bg-zinc-800/60 rounded animate-pulse" />
                                                </div>
                                            </div>
                                            <div className="h-8 w-24 bg-white/10 rounded-full animate-pulse" />
                                        </div>

                                        {/* Action Pills Row (Scrollable look) */}
                                        <div className="flex gap-2 overflow-hidden opacity-60">
                                            <div className="h-9 w-24 bg-zinc-800 rounded-full flex-shrink-0" />
                                            <div className="h-9 w-20 bg-zinc-800 rounded-full flex-shrink-0" />
                                            <div className="h-9 w-24 bg-zinc-800 rounded-full flex-shrink-0" />
                                            <div className="h-9 w-16 bg-zinc-800 rounded-full flex-shrink-0" />
                                        </div>

                                        {/* Comment Teaser Skeleton */}
                                        <div className="bg-zinc-800/30 rounded-xl p-3 space-y-2">
                                            <div className="flex justify-between">
                                                <div className="h-3 w-20 bg-zinc-800 rounded animate-pulse" />
                                                <div className="w-4 h-4 bg-zinc-800 rounded-sm" />
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <div className="w-6 h-6 rounded-full bg-zinc-800" />
                                                <div className="h-3 w-full bg-zinc-800 rounded animate-pulse" />
                                            </div>
                                        </div>

                                        {/* Next Video Skeleton */}
                                        <div className="mt-auto">
                                            <div className="aspect-video bg-zinc-800/50 rounded-xl mb-3" />
                                            <div className="flex gap-3">
                                                <div className="w-9 h-9 rounded-full bg-zinc-800/50" />
                                                <div className="space-y-2 flex-1">
                                                    <div className="h-3 w-[85%] bg-zinc-800/50 rounded" />
                                                    <div className="h-3 w-[60%] bg-zinc-800/50 rounded" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        </motion.div>

                        {/* Divider */}
                        <motion.div
                            className="hidden md:flex items-center justify-center w-8"
                            style={{ opacity: dividerOpacity }}
                        >
                            <div className="w-px h-64 bg-gradient-to-b from-transparent via-accent-secondary to-transparent" />
                        </motion.div>

                        {/* ---------------- MUSIC SKELETON CARD ---------------- */}
                        <motion.div
                            className="flex-1 p-4 flex justify-center md:justify-start"
                            style={{ x: musicX }}
                        >
                            <FadeIn delay={0.5}>
                                <div className="bg-[#050505] rounded-[2rem] border-[6px] border-[#1f1f1f] w-[320px] h-[640px] relative overflow-hidden shadow-2xl flex flex-col font-sans select-none">
                                    {/* Gradient Background */}
                                    <div className="absolute top-0 inset-x-0 h-[400px] bg-gradient-to-b from-zinc-800/20 to-transparent pointer-events-none" />

                                    {/* Top Navigation Skeleton */}
                                    <div className="p-6 pb-2 flex justify-between items-center z-10">
                                        <ChevronDown className="w-7 h-7 text-zinc-700" />
                                        <div className="flex bg-zinc-900 rounded-full p-1 gap-1">
                                            <div className="px-5 py-1.5 rounded-full bg-zinc-800 w-16 h-6" />
                                            <div className="px-5 py-1.5 rounded-full w-16 h-6" />
                                        </div>
                                        <MoreVertical className="w-6 h-6 text-zinc-700" />
                                    </div>

                                    {/* Main Content */}
                                    <div className="flex-1 flex flex-col px-6 pt-6 pb-8 z-10">

                                        {/* Album Art Skeleton */}
                                        <div className="w-full aspect-square rounded-xl bg-zinc-900 mb-8 mx-auto max-w-[280px] flex items-center justify-center relative overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-tr from-zinc-800 to-zinc-900 animate-pulse" />
                                            <div className="w-20 h-20 bg-zinc-800 rounded-full opacity-20" />
                                        </div>

                                        {/* Text Info Skeleton */}
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="space-y-3 flex-1">
                                                <div className="h-6 w-3/4 bg-zinc-800 rounded animate-pulse" />
                                                <div className="h-4 w-1/2 bg-zinc-800/60 rounded animate-pulse" />
                                            </div>
                                            <Heart className="w-7 h-7 text-zinc-800 mt-1" />
                                        </div>

                                        {/* 3 Pill Buttons Skeleton */}
                                        <div className="flex gap-3 mb-8">
                                            <div className="flex-1 h-10 bg-zinc-900 rounded-full animate-pulse" />
                                            <div className="flex-1 h-10 bg-zinc-900 rounded-full animate-pulse" />
                                            <div className="flex-1 h-10 bg-zinc-900 rounded-full animate-pulse" />
                                        </div>

                                        {/* Progress Bar Skeleton */}
                                        <div className="mb-6 space-y-2">
                                            <div className="h-1 bg-zinc-800 rounded-full w-full">
                                                <div className="h-full w-1/3 bg-zinc-600 rounded-full" />
                                            </div>
                                            <div className="flex justify-between">
                                                <div className="h-2 w-8 bg-zinc-900 rounded" />
                                                <div className="h-2 w-8 bg-zinc-900 rounded" />
                                            </div>
                                        </div>

                                        {/* Playback Controls Skeleton */}
                                        <div className="flex items-center justify-between mb-auto px-2">
                                            <Shuffle className="w-6 h-6 text-zinc-800" />
                                            <SkipBack className="w-9 h-9 text-zinc-200 fill-zinc-200 opacity-20" />
                                            <div className="w-16 h-16 rounded-full bg-zinc-200 flex items-center justify-center shadow-lg transform scale-100">
                                                <Pause className="w-8 h-8 text-black fill-black ml-0.5" />
                                            </div>
                                            <SkipForward className="w-9 h-9 text-zinc-200 fill-zinc-200 opacity-20" />
                                            <Repeat className="w-6 h-6 text-zinc-800" />
                                        </div>

                                        {/* Bottom Tabs Skeleton */}
                                        <div className="flex justify-between items-end pt-4 px-4 mt-2 border-t border-zinc-900/50">
                                            <div className="h-2 w-12 bg-zinc-800 rounded animate-pulse" />
                                            <div className="h-2 w-12 bg-zinc-900 rounded" />
                                            <div className="h-2 w-12 bg-zinc-900 rounded" />
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        </motion.div>
                    </div>
                </div>
            </div>
        </Section>
    )
}

export default MusicVideo