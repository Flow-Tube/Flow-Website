import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { Header } from '@/components/layout/Header'
import { GrainOverlay } from '@/components/effects/GrainOverlay'

// Sections
import { Hero } from '@/components/sections/Hero'
import { Problem } from '@/components/sections/Problem'
import { NeuroEngine } from '@/components/sections/NeuroEngine'
//import { ExplainableAI } from '@/components/sections/ExplainableAI'
import { Features } from '@/components/sections/Features'
import { MusicVideo } from '@/components/sections/MusicVideo'
import { Privacy } from '@/components/sections/Privacy'
import { OpenSource } from '@/components/sections/OpenSource'
import { FinalCTA } from '@/components/sections/FinalCTA'

export function Home() {
    return (
        <SmoothScroll>
            <div className="relative min-h-screen bg-bg-primary text-text-primary">
                {/* Global grain overlay */}
                <GrainOverlay />

                {/* Header */}
                <Header />

                {/* Main content */}
                <main>
                    <Hero />
                    <Problem />
                    <NeuroEngine />
                    <Features />
                    <MusicVideo />
                    <Privacy />
                    <OpenSource />
                    <FinalCTA />
                </main>

            </div>
        </SmoothScroll>
    )
}
