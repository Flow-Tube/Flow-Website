import { Download, Github } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { FadeIn } from '@/components/ui/TextReveal'
import { Button } from '@/components/ui/Button'

export function FinalCTA() {
    return (
        <Section id="final-cta" fullHeight={false} className="py-24 md:py-32 bg-bg-primary">
            <div className="section-content relative z-10 max-w-5xl">
                <div className="text-center">
                    <div className="mb-10">
                        <FadeIn delay={0.1}>
                            <h2 className="text-5xl md:text-6xl font-semibold mb-4 tracking-[-0.035em] text-text-primary">
                                This is your <span className="font-serif italic font-normal tracking-[-0.01em] text-text-muted">Flow.</span>
                            </h2>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <p className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
                                Not what an algorithm wants you to watch.
                                <br />
                                <span className="text-text-primary font-medium">What you want to discover.</span>
                            </p>
                        </FadeIn>
                    </div>

                    <FadeIn delay={0.4}>
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <Button
                                href="https://github.com/A-EDev/Flow/releases/latest"
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="primary"
                                size="lg"
                                icon={<Download className="w-5 h-5" />}
                                iconPosition="left"
                            >
                                Download Flow
                            </Button>

                            <Button
                                href="https://github.com/A-EDev/Flow"
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="outline"
                                size="lg"
                                icon={<Github className="w-5 h-5" />}
                                iconPosition="left"
                            >
                                Star on GitHub
                            </Button>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </Section>
    )
}

export default FinalCTA
