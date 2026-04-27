import { Header } from '@/components/layout/Header'
import { FinalCTA } from '@/components/sections/FinalCTA'

export function DMCA() {
    return (
        <div className="relative min-h-screen bg-bg-primary text-text-primary flex flex-col">
            <Header />
            <main className="flex-1 w-full pt-32 pb-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                    <div className="prose prose-invert prose-blue max-w-none text-text-secondary prose-headings:text-text-primary prose-a:text-accent-primary">
                        <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-12">DMCA Policy</h1>
                        <p className="text-lg">Flow is a decentralized, open-source client application. Flow does not host, upload, or stream any copyrighted content itself. All media content accessed through Flow is sourced directly from publicly available platforms like YouTube.</p>

                        <h2 className="text-2xl font-semibold mt-12 mb-4">Notice to Copyright Holders</h2>
                        <p>Because Flow does not host or distribute the actual media files, any takedown requests must be directed at the platforms hosting the content (e.g., YouTube). Removing the app from platforms will not remove the underlying content from the internet.</p>
                        <p>If you believe that your copyrighted work is being made available in a way that constitutes copyright infringement, please submit a DMCA notice to the host of the content.</p>

                        <h2 className="text-2xl font-semibold mt-12 mb-4">App Distribution</h2>
                        <p>Flow's source code is distributed for educational and non-commercial purposes. We actively respect the intellectual property rights of others. If there is a dispute regarding the application's source code itself, please contact us via our GitHub repository.</p>

                        <h2 className="text-2xl font-semibold mt-12 mb-4">Contact</h2>
                        <p>For any inquiries related to copyright and Flow's operations, please open an issue on our <a href="https://github.com/A-EDev/Flow" target="_blank" rel="noopener noreferrer">GitHub repository</a> or contact the lead maintainer.</p>
                    </div>
                </div>
            </main>
            <FinalCTA />
        </div>
    )
}
export default DMCA
