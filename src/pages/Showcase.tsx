import { ShowcaseSlider } from '@/components/showcase/ShowcaseSlider'
import { Link } from 'react-router-dom'

export function Showcase() {
    return (
        <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
            <main className="relative z-10">
                <div className="flex flex-col items-center justify-center min-h-screen py-20">
                    <div className="text-center mb-12 md:mb-20 px-4">
                        <h1 className="text-4xl md:text-7xl font-semibold tracking-tight mb-6 text-white">Inside Flow</h1>
                        <p className="text-white/70 text-lg md:text-xl font-normal max-w-lg mx-auto">
                            A guided look into how Flow thinks, adapts, and feels.
                        </p>
                    </div>

                    <ShowcaseSlider />

                    {/* Navigation back to home */}
                    <div className="mt-12">
                        <Link to="/" className="text-sm text-white/50 hover:text-white transition-colors uppercase tracking-widest">
                            Return to Overview
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    )
}
