import { GrainOverlay } from '@/components/effects/GrainOverlay'
import { ShowcaseSlider } from '@/components/showcase/ShowcaseSlider'
import { Link } from 'react-router-dom'

export function Showcase() {
    return (
        <div className="relative min-h-screen bg-[#050505] text-white overflow-x-hidden selection:bg-white/20">
            <GrainOverlay />

            <main className="relative z-10">
                {/* Content will go here */}
                <div className="flex flex-col items-center justify-center min-h-screen py-20">
                    <div className="text-center mb-12 md:mb-20 px-4">
                        <h1 className="text-4xl md:text-7xl font-light tracking-tighter mb-6 text-white">Inside Flow</h1>
                        <p className="text-white/60 text-lg md:text-xl font-light tracking-wide max-w-lg mx-auto">
                            A guided look into how Flow thinks, adapts, and feels.
                        </p>
                    </div>

                    <ShowcaseSlider />

                    {/* Navigation back to home */}
                    <div className="mt-12">
                        <Link to="/" className="text-sm text-white/40 hover:text-white transition-colors uppercase tracking-widest text-[10px]">
                            Return to Overview
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    )
}
