import { Header } from '@/components/layout/Header'
import { Hero } from '@/components/sections/Hero'
import { AppShowcase } from '@/components/sections/AppShowcase'
import { Features } from '@/components/sections/Features'
import { NeuroEngine } from '@/components/sections/NeuroEngine'
import { FAQ } from '@/components/sections/FAQ'
import { Support } from '@/components/sections/Support'
import { FinalCTA } from '@/components/sections/FinalCTA'

export function Home() {
    return (
        <div className="relative min-h-screen bg-bg-primary text-text-primary">
            <Header hideUntilScroll />

            <main className="w-full relative z-0">
                <Hero />
                <AppShowcase />
                <Features />
                <NeuroEngine />
                <FAQ />
                <Support />
                <FinalCTA />
            </main>
        </div>
    )
}

export default Home
