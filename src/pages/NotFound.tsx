import { Header } from '@/components/layout/Header'
import { motion } from 'framer-motion'
import { ArrowLeft, Home } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Link } from 'react-router-dom'

export function NotFound() {
    return (
        <div className="relative min-h-screen bg-bg-primary text-text-primary flex flex-col overflow-hidden selection:bg-accent-primary/20">
            <Header />
            
            {/* Ambient Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl pointer-events-none z-0">
                <div className="absolute inset-0 bg-accent-primary/5 md:bg-accent-primary/10 blur-[100px] md:blur-[120px] rounded-full mix-blend-screen animate-pulse duration-1000" />
            </div>

            <main className="flex-1 w-full pt-20 pb-12 flex flex-col items-center justify-center relative z-10">
                
                {/* Floating Huge Image */}
                <motion.div 
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full max-w-3xl md:max-w-5xl lg:max-w-6xl px-4 flex justify-center mb-2 md:mb-0 mt-2 md:mt-0"
                >
                    <motion.img 
                        animate={{ y: [0, -15, 0] }}
                        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                        src="/404Flow.webp" 
                        alt="404 Illustration" 
                        className="w-full h-auto max-h-[45vh] md:max-h-[55vh] object-contain drop-shadow-2xl filter"
                    />
                </motion.div>

                {/* Typography and CTAs */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center flex flex-col items-center px-4"
                >
                    <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-text-primary mb-4">
                        You're off the grid.
                    </h2>
                    <p className="text-lg md:text-xl text-text-secondary max-w-lg mx-auto mb-10 font-medium leading-relaxed">
                        The page you are looking for doesn't exist, has been moved, or lost in the flow.
                    </p>
                    
                    <div className="flex flex-wrap justify-center items-center gap-4">
                        <Link to="/">
                            <Button variant="primary" size="lg" className="rounded-full px-8 py-6 text-base shadow-xl shadow-accent-primary/20 hover:shadow-accent-primary/30 transition-all" icon={<Home className="w-5 h-5" />}>
                                Return Home
                            </Button>
                        </Link>
                        <Button 
                            variant="secondary" 
                            size="lg" 
                            className="rounded-full px-8 py-6 text-base bg-bg-elevated border-border-subtle hover:bg-bg-secondary"
                            icon={<ArrowLeft className="w-5 h-5" />} 
                            iconPosition="left"
                            onClick={() => window.history.back()}
                        >
                            Go Back
                        </Button>
                    </div>
                </motion.div>
                
            </main>
        </div>
    )
}

export default NotFound
