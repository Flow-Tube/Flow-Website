import { Header } from '@/components/layout/Header'
import { Hero } from '@/components/sections/Hero'
import { Features } from '@/components/sections/Features'
import { NeuroEngine } from '@/components/sections/NeuroEngine'
import { Support } from '@/components/sections/Support'
import { FinalCTA } from '@/components/sections/FinalCTA'

export function Home() {
    return (
        <div className="relative min-h-screen bg-bg-primary text-text-primary">
            <Header />
            
            <main className="flex flex-col items-center justify-between w-full relative z-0">
                <Hero />
                <Features />
                <NeuroEngine />
                <Support />
                <FinalCTA />
            </main>
        </div>
    )
}

export default Home
