import { useRef, useState, useEffect } from 'react'

import {
    Music, Shield, Brain, Tv
} from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { FadeIn } from '@/components/ui/TextReveal'

const categories = [
    { id: 'video', label: 'Video Playback', icon: Tv },
    { id: 'music', label: 'Music Mode', icon: Music },
    { id: 'neuro', label: 'Neuro Engine', icon: Brain },
    { id: 'privacy', label: 'Privacy & Control', icon: Shield },
]

const featuresList = [
    {
        id: 'video',
        title: 'Video Playback',
        icon: Tv,
        items: [
            { title: 'Shorts-First Experience', description: 'Seamless vertical swipe navigation with pure, unadulterated content.' },
            { title: 'Gesture Controls', description: 'Intuitive swipe gestures. Left side for volume, right side for brightness.' },
            { title: 'Advanced Subtitles', description: 'Fully customizable subtitles. Change colors, size, and backgrounds instantly.' },
            { title: 'PiP & Background Play', description: 'Keep the video floating while you multitask, or turn the screen off and keep listening.' },
            { title: 'SponsorBlock & DeArrow', description: 'Automatically skips sponsors, intros, and replaces clickbait thumbnails with community alternatives.' },
            { title: 'Return YouTube Dislike', description: 'See the true rating of videos with community-sourced dislike counts.' },
            { title: 'Downloads & Formats', description: 'Save content for offline access in multiple formats including VP9 and AV1.' },
            { title: 'Resume Playback', description: 'Pick up exactly where you left off, automatically tracked across all your devices.' }
        ]
    },
    {
        id: 'music',
        title: 'Music Mode',
        icon: Music,
        items: [
            { title: 'Dedicated Audio Player', description: 'A beautiful mini-player with synchronized lyrics and robust queue management.' },
            { title: 'High-Quality Audio', description: 'Fetches high bitrate audio directly from YouTube Music streams.' },
            { title: 'Synchronized Lyrics', description: 'Real-time lyrics display that scrolls dynamically as the song plays.' },
            { title: 'Persistent Mini Player', description: 'Keep the music playing in a floating dock while exploring other parts of the app.' }
        ]
    },
    {
        id: 'neuro',
        title: 'Neuro Engine',
        icon: Brain,
        items: [
            { title: 'Local Intelligence', description: 'An algorithm that runs entirely on your device. It learns what you like without tracking you.' },
            { title: 'Topic Mixing', description: 'Detects when you are bored and naturally mixes in fresh, relevant content to break loops.' },
            { title: 'Full Transparency Dashboard', description: 'See exactly what the algorithm knows about you and why it recommended specific videos.' },
            { title: 'Prevents Topic Collapse', description: 'Actively prevents your feed from shrinking into the same 2-3 repetitive topics.' }
        ]
    },
    {
        id: 'privacy',
        title: 'Privacy & Control',
        icon: Shield,
        items: [
            { title: '100% On-Device', description: 'No Google account needed. No telemetry. Your data never leaves your phone.' },
            { title: 'Import / Export', description: 'Import subscriptions and history from NewPipe, and export your entire profile anytime.' },
            { title: '11+ Themes', description: 'Customize your experience with pure OLED black, light modes, and vibrant accent colors.' }
        ]
    }
]

export function Features() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [activeCategory, setActiveCategory] = useState('video')

    useEffect(() => {
        const handleScroll = () => {
            const sections = categories.map(cat => ({
                id: cat.id,
                element: document.getElementById(`category-${cat.id}`)
            }))
            
            // Find the section that is closest to the top of the viewport
            let currentActive = categories[0].id
            for (const { id, element } of sections) {
                if (element) {
                    const rect = element.getBoundingClientRect()
                    // If the top of the element is above the middle of the viewport
                    if (rect.top <= window.innerHeight / 2) {
                        currentActive = id
                    }
                }
            }
            setActiveCategory(currentActive)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        // Trigger once to set initial state
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToCategory = (id: string) => {
        const element = document.getElementById(`category-${id}`)
        if (element) {
            const y = element.getBoundingClientRect().top + window.scrollY - 100
            window.scrollTo({ top: y, behavior: 'smooth' })
        }
    }

    return (
        <Section id="features" className="bg-bg-secondary border-t border-border-subtle py-24 !overflow-visible">
            <div className="section-content max-w-5xl">
                {/* Header */}
                <div className="mb-16 md:mb-24">
                    <FadeIn>
                        <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4 tracking-tight">
                            A New Standard for Discovery.
                        </h2>
                        <p className="text-lg text-text-secondary max-w-3xl">
                            Uncompromising features built for privacy, control, and a pure playback experience.
                        </p>
                    </FadeIn>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative items-start" ref={containerRef}>
                    {/* Sticky Sidebar */}
                    <div className="lg:w-1/4 hidden lg:block sticky top-32 h-fit">
                        <div className="flex flex-col gap-2 border-l border-border-subtle pl-6">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => scrollToCategory(category.id)}
                                    className={`text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-3 ${
                                        activeCategory === category.id
                                            ? 'bg-bg-elevated text-text-primary scale-105 shadow-sm'
                                            : 'text-text-secondary hover:text-text-primary hover:bg-black/5 dark:hover:bg-white/5'
                                    }`}
                                >
                                    <category.icon className={`w-5 h-5 ${activeCategory === category.id ? 'text-accent-primary' : 'text-text-muted'}`} />
                                    {category.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Scrolling Content */}
                    <div className="lg:w-3/4 flex flex-col gap-24">
                        {featuresList.map((category) => (
                            <div key={category.id} id={`category-${category.id}`} className="scroll-mt-32">
                                <FadeIn>
                                    <h3 className="text-2xl font-bold text-text-primary mb-8 border-b border-border-subtle pb-4 flex items-center gap-3">
                                        <category.icon className="w-6 h-6 text-accent-primary" />
                                        {category.title}
                                    </h3>
                                </FadeIn>
                                
                                <ul className="space-y-6">
                                    {category.items.map((item, idx) => (
                                        <FadeIn key={item.title} delay={idx * 0.05}>
                                            <li className="group relative pl-6">
                                                <span className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-text-muted group-hover:bg-accent-primary transition-colors"></span>
                                                <h4 className="text-lg font-semibold text-text-primary mb-1">
                                                    {item.title}
                                                </h4>
                                                <p className="text-text-secondary leading-relaxed">
                                                    {item.description}
                                                </p>
                                            </li>
                                        </FadeIn>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    )
}

export default Features
