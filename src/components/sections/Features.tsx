import { Music, Shield, Brain, Tv, MonitorSmartphone } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { FadeIn } from '@/components/ui/TextReveal'

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
            { title: 'Resume Playback', description: 'Pick up exactly where you left off, automatically tracked across all your devices.' },
            { title: 'Casting', description: 'Send what you are watching to a smart TV or streaming device in a tap.' },
            { title: 'Chapters & Speed', description: 'Jump between video chapters and play at anywhere from 0.25x to 2x speed.' },
            { title: 'Floating Mini Player', description: 'Shrink the video into a floating window and keep browsing the app.' },
            { title: 'Comment Threads', description: 'Read comments with full replies and nested threads.' },
            { title: 'Ambient Mode', description: 'A soft glow of the video\'s own colors around the player.' }
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
            { title: 'Persistent Mini Player', description: 'Keep the music playing in a floating dock while exploring other parts of the app.' },
            { title: 'Parametric Equalizer', description: 'Shape the sound band by band, with frequency, gain, and Q controls for each.' },
            { title: 'Song Recognition', description: 'Hear something you like? Identify it and keep a searchable history of every match.' },
            { title: 'Local Media Library', description: 'Play the music and videos already stored on your phone, right alongside everything else.' }
        ]
    },
    {
        id: 'neuro',
        title: 'FlowNeuro',
        icon: Brain,
        items: [
            { title: 'Local Intelligence', description: 'An algorithm that runs entirely on your device. It learns what you like without tracking you.' },
            { title: 'Topic Mixing', description: 'Detects when you are bored and naturally mixes in fresh, relevant content to break loops.' },
            { title: 'Your Taste Screen', description: 'See your persona, top interests and channels, and the searches it ran for you. Boost or block anything.' },
            { title: 'Prevents Topic Collapse', description: 'Actively prevents your feed from shrinking into the same 2-3 repetitive topics.' },
            { title: 'Viewer Personas', description: 'Ten personas, from The Explorer to The Night Owl, describe how you watch as the engine learns.' },
            { title: 'Flow Recap', description: 'Your time per day, time per month, and daily viewing clock, told as a story.' },
            { title: 'Pause Learning', description: 'Long-press the Flow logo and nothing you watch teaches the engine until you turn it back on.' }
        ]
    },
    {
        id: 'privacy',
        title: 'Privacy & Control',
        icon: Shield,
        items: [
            { title: '100% On-Device', description: 'No Google account needed. No telemetry. Your data never leaves your phone.' },
            { title: 'Import / Export', description: 'Import subscriptions and history from NewPipe, and export your entire profile anytime.' },
            { title: '11+ Themes', description: 'Customize your experience with pure OLED black, light modes, and vibrant accent colors.' },
            { title: 'Verify Every Build', description: 'Check the APK\'s SHA-256 signing fingerprint with AppVerifier before you install.' }
        ]
    },
    {
        id: 'everywhere',
        title: 'Everywhere',
        icon: MonitorSmartphone,
        items: [
            { title: 'Android TV', description: 'A TV interface built for the remote, with the same private, on-device feed.' },
            { title: 'Device Sync', description: 'Move your library, history, and profile between devices over local Wi-Fi. Pair with a QR code, no cloud involved.' },
            { title: 'Desktop, In Development', description: 'Windows, Linux, and macOS builds, written in Rust on Tauri 2.' }
        ]
    }
]

export function Features() {
    return (
        <Section id="features" fullHeight={false} className="bg-bg-primary border-b border-border-subtle py-24 md:py-32">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <FadeIn>
                    <div className="mb-16 md:mb-24 max-w-3xl">
                        <p className="kicker mb-4">02 &middot; Features</p>
                        <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6 tracking-tight">
                            Everything on your terms.
                        </h2>
                        <p className="text-lg text-text-secondary leading-relaxed">
                            Watching, listening, discovering: every part of Flow is built around
                            privacy, control, and playback that stays out of your way.
                        </p>
                    </div>
                </FadeIn>

                <div>
                    {featuresList.map((category, i) => (
                        <div
                            key={category.id}
                            id={`category-${category.id}`}
                            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-14 md:py-20 border-t border-border-subtle scroll-mt-24"
                        >
                            <FadeIn className="lg:col-span-4">
                                <div className="lg:sticky lg:top-32">
                                    <span className="kicker">{String(i + 1).padStart(2, '0')}</span>
                                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-text-primary mt-3 flex items-center gap-3">
                                        <category.icon className="w-6 h-6 text-text-muted" strokeWidth={1.75} />
                                        {category.title}
                                    </h3>
                                </div>
                            </FadeIn>

                            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10">
                                {category.items.map((item, idx) => (
                                    <FadeIn key={item.title} delay={idx * 0.04}>
                                        <div>
                                            <h4 className="text-base font-semibold text-text-primary mb-1.5">
                                                {item.title}
                                            </h4>
                                            <p className="text-sm text-text-secondary leading-relaxed">
                                                {item.description}
                                            </p>
                                        </div>
                                    </FadeIn>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    )
}

export default Features
