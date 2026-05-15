import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Download, Github } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function Hero() {
    const containerRef = useRef<HTMLElement>(null)

    const scrollToSection = (href: string) => {
        const element = document.querySelector(href)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <section
            ref={containerRef}
            id="hero"
            className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-bg-primary pt-24 pb-12"
        >
            <div
                className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
                {/* Left Column: Text Content */}
                <motion.div
                    className="flex flex-col items-start text-left"
                >
                    {/* Trendshift Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="mb-8"
                    >
                        <a href="https://trendshift.io/repositories/22545" target="_blank" rel="noopener noreferrer" className="inline-block transition-transform hover:scale-[1.02]">
                            <img
                                src="https://trendshift.io/api/badge/repositories/22545"
                                alt="A-EDev/Flow | Trendshift"
                                className="w-[200px] h-[44px]"
                            />
                        </a>
                    </motion.div>

                    {/* Main Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-text-primary mb-6"
                    >
                        Local Recommendations.<br />Privacy First.
                    </motion.h1>

                    {/* Subtitle / Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="text-lg md:text-xl text-text-secondary max-w-lg mb-10 font-normal leading-relaxed"
                    >
                        Flow is a minimalist, open-source YouTube client for Android. No ads, no tracking. Just pure video playback and a neural engine that learns locally.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="flex flex-wrap items-center gap-4"
                    >
                        <a href="https://github.com/A-EDev/Flow/releases/latest" target="_blank" rel="noopener noreferrer">
                            <Button
                                variant="primary"
                                size="lg"
                                icon={<Download className="w-5 h-5" />}
                            >
                                Download APK
                            </Button>
                        </a>

                        <Button
                            variant="secondary"
                            size="lg"
                            icon={<ArrowRight className="w-5 h-5" />}
                            onClick={() => scrollToSection('#features')}
                        >
                            Explore Features
                        </Button>

                        <a href="https://github.com/A-EDev/Flow" target="_blank" rel="noopener noreferrer">
                            <Button
                                variant="ghost"
                                size="lg"
                                icon={<Github className="w-5 h-5" />}
                                iconPosition="left"
                            >
                                GitHub
                            </Button>
                        </a>
                    </motion.div>
                </motion.div>

                {/* Right Column: High-fidelity Frame */}
                <motion.div
                    className="relative w-full flex justify-center lg:justify-end"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-[300px] sm:w-[340px] aspect-[1/2.16] bg-black rounded-[2.5rem] border-[8px] border-[#111] shadow-2xl overflow-hidden"
                    >
                        {/* Placeholder for Home.jpeg / VideoPlayer.jpeg */}
                        <img
                            src="/screenshots/Home.webp"
                            alt="Flow App Home Feed"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                            }}
                        />
                        {/* Fallback pattern if image is missing */}
                        <div className="absolute inset-0 bg-bg-elevated -z-10 flex items-center justify-center text-text-secondary text-sm">
                            App Screen
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

export default Hero
