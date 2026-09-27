import { ArrowRight } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { FadeIn } from '@/components/ui/TextReveal'
import { Button } from '@/components/ui/Button'

const points = [
    {
        title: 'Learns from how you watch',
        description: 'A like counts ten times as much as a click. Finishing a video teaches it more than sampling one, and skips push back.',
    },
    {
        title: 'Builds a feed that doesn\'t loop',
        description: 'Your subscriptions, videos related to what you finished, and searches from your interests. What you\'ve finished drops out, and your top three interests share the feed with smaller ones that rotate in.',
    },
    {
        title: 'Shows you everything',
        description: 'The Your taste screen shows your persona, top interests and channels, and the searches it ran for you. Boost or block anything, pause learning, or export it as a file.',
    },
]

export function NeuroEngine() {
    return (
        <Section id="neuro-engine" fullHeight={false} className="bg-bg-secondary border-b border-border-subtle py-24 md:py-32">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <FadeIn>
                    <div className="mb-16 md:mb-20 max-w-3xl">
                        <p className="kicker mb-4">03 &middot; The Engine</p>
                        <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.035em] leading-[1.02] text-text-primary mb-6">
                            It learns what you like.{' '}
                            <span className="whitespace-nowrap font-serif italic font-normal tracking-[-0.01em] text-text-muted">It tells no one.</span>
                        </h2>
                        <p className="text-lg text-text-secondary leading-relaxed">
                            FlowNeuro builds your feed from what you watch, skip and search. It keeps what it learns
                            in one file on your phone, and you can see all of it, change it, or erase it.
                        </p>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    <div className="lg:col-span-7">
                        {points.map((point, i) => (
                            <FadeIn key={point.title} delay={i * 0.08}>
                                <div className={`py-7 ${i > 0 ? 'border-t border-border-subtle' : 'pt-0'}`}>
                                    <h3 className="text-xl md:text-2xl font-semibold tracking-[-0.02em] text-text-primary mb-2">{point.title}</h3>
                                    <p className="text-text-secondary leading-relaxed max-w-xl">{point.description}</p>
                                </div>
                            </FadeIn>
                        ))}
                        <FadeIn delay={0.25}>
                            <Button to="/how-it-works" variant="primary" size="md" className="mt-6" icon={<ArrowRight className="w-4 h-4" />}>
                                How FlowNeuro works
                            </Button>
                        </FadeIn>
                    </div>

                    <FadeIn delay={0.15} className="lg:col-span-5 flex justify-center">
                        <figure className="w-[min(72vw,300px)]">
                            <div className="rounded-[36px] bg-[#1a1716] p-[7px] border border-border-subtle shadow-[0_30px_60px_-30px_rgba(0,0,0,0.45)]">
                                <img
                                    src="/screenshots/YourTaste.jpg"
                                    alt="The Your taste screen in Flow: The Explorer persona, profile maturity, and the taste shape chart comparing the whole profile with right now"
                                    width={575}
                                    height={1237}
                                    loading="lazy"
                                    className="block w-full h-auto rounded-[29px]"
                                />
                            </div>
                            <figcaption className="kicker mt-4 text-center">Settings &rsaquo; Your taste</figcaption>
                        </figure>
                    </FadeIn>
                </div>
            </div>
        </Section>
    )
}

export default NeuroEngine
