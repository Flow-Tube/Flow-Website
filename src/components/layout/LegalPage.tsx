import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FadeIn } from '@/components/ui/TextReveal'

export interface LegalSection {
    id: string
    title: string
    content: React.ReactNode
}

export const AFFILIATION_NOTICE =
    'Flow is not affiliated with, endorsed or sponsored by YouTube or Google. YouTube and YouTube Music are trademarks of Google LLC.'

export function LegalPage({ kicker, title, accent, updated, intro, sections }: {
    kicker: string
    title: string
    accent: string
    updated: string
    intro: React.ReactNode
    sections: LegalSection[]
}) {
    return (
        <div className="relative min-h-screen bg-bg-primary text-text-primary flex flex-col">
            <Header />

            <main className="flex-1 w-full pt-32 md:pt-40 pb-24">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeIn>
                        <p className="kicker mb-5">{kicker}</p>
                        <h1 className="text-5xl md:text-7xl font-semibold tracking-[-0.035em] leading-[0.98] mb-6">
                            {title}{' '}
                            <span className="whitespace-nowrap font-serif italic font-normal tracking-[-0.01em] text-text-muted">{accent}</span>
                        </h1>
                        <p className="kicker">Last updated {updated}</p>
                        <div className="legal mt-8 max-w-[65ch] text-lg">{intro}</div>
                    </FadeIn>

                    <div className="mt-14 md:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                        <nav aria-label="On this page" className="hidden lg:block lg:col-span-3">
                            <div className="sticky top-12">
                                <p className="kicker mb-3">On this page</p>
                                <ol className="space-y-2 text-sm">
                                    {sections.map(section => (
                                        <li key={section.id}>
                                            <a href={`#${section.id}`} className="text-text-secondary hover:text-text-primary transition-colors">
                                                {section.title}
                                            </a>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </nav>

                        <div className="lg:col-span-9 min-w-0">
                            {sections.map(section => (
                                <section key={section.id} id={section.id} className="py-10 first:pt-0 border-b border-border-subtle last:border-b-0 scroll-mt-12">
                                    <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.025em] text-text-primary mb-5">{section.title}</h2>
                                    <div className="legal max-w-[65ch]">{section.content}</div>
                                </section>
                            ))}

                            <p className="mt-10 rounded-2xl border border-border-subtle bg-bg-secondary px-5 py-4 text-sm text-text-secondary leading-relaxed">
                                {AFFILIATION_NOTICE}
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default LegalPage
