import { Header } from '@/components/layout/Header'
import { FinalCTA } from '@/components/sections/FinalCTA'
import { Section } from '@/components/layout/Section'
import { FadeIn } from '@/components/ui/TextReveal'

export function About() {
    return (
        <div className="relative min-h-screen bg-bg-primary text-text-primary flex flex-col">
            <Header />
            <main className="flex-1 w-full pt-32 pb-24">
                <Section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 overflow-visible">
                    <FadeIn>
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-8">About Flow</h1>
                        <p className="text-xl text-text-secondary leading-relaxed mb-16">
                            Flow was born out of frustration. Frustration with the modern web, where algorithms are optimized for watch-time and engagement rather than your actual interests. 
                            Frustration with platforms that prioritize sponsor reads, clickbait thumbnails, and doom-scrolling over genuine discovery.
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.1}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-text-primary">Our Mission</h3>
                                <p className="text-lg text-text-secondary leading-relaxed">
                                    To build a completely private, on-device media client that puts the user back in control. We believe software should serve the person using it, not the corporation tracking them.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-text-primary">Open Source</h3>
                                <p className="text-lg text-text-secondary leading-relaxed">
                                    Flow is fully open-source and GPL v3.0 licensed. We believe in transparency, community contribution, and the right to inspect the code that runs on your device.
                                </p>
                            </div>
                        </div>
                    </FadeIn>
                </Section>
            </main>
            <FinalCTA />
        </div>
    )
}
export default About
