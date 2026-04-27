import { motion } from 'framer-motion'
import { Brain, Lock, SlidersHorizontal } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { FadeIn } from '@/components/ui/TextReveal'

export function NeuroEngine() {
    return (
        <Section id="neuro-engine" className="py-24 md:py-32 bg-bg-primary overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-primary/5 via-bg-primary to-bg-primary pointer-events-none"></div>
            
            <div className="section-content relative z-10 max-w-6xl mx-auto">
                <FadeIn>
                    <div className="flex flex-col items-center text-center mb-20 md:mb-32">
                        
                        <h2 className="text-5xl md:text-6xl font-bold text-text-primary mb-6 tracking-tight">
                            Intelligence without compromise.
                        </h2>
                        <p className="text-xl text-text-secondary max-w-3xl leading-relaxed">
                            A recommendation algorithm that runs entirely on your device. 
                            It learns your preferences without ever transmitting your data to a cloud server. 
                            You have total control over what it knows and why it recommends what it does.
                        </p>
                    </div>
                </FadeIn>

                <FadeIn delay={0.2}>
                    <div className="bg-bg-card border border-border-subtle rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl relative">
                        {/* Subtle background glow */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-primary/10 rounded-full blur-[100px] pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
                        
                        <div className="flex flex-col lg:flex-row">
                            {/* Text Content */}
                            <div className="lg:w-5/12 p-10 md:p-16 lg:p-20 flex flex-col justify-center relative z-10 border-b lg:border-b-0 lg:border-r border-border-subtle bg-bg-card/50 backdrop-blur-sm">
                                <h3 className="text-3xl font-bold text-text-primary mb-10 tracking-tight">
                                    Algorithm Dashboard
                                </h3>
                                
                                <div className="space-y-10 relative">
                                    {/* Vertical connecting line */}
                                    <div className="absolute left-6 top-10 bottom-10 w-px bg-gradient-to-b from-accent-primary via-border-subtle to-transparent hidden md:block"></div>
                                    
                                    <div className="flex items-start gap-6 relative">
                                        <div className="w-12 h-12 rounded-2xl bg-bg-elevated border border-accent-primary/30 flex items-center justify-center flex-shrink-0 shadow-lg shadow-accent-primary/10 relative z-10">
                                            <Brain className="w-6 h-6 text-accent-primary" />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-semibold text-text-primary mb-2">Local Learning</h4>
                                            <p className="text-text-secondary leading-relaxed">Analyzes your watch behavior locally to build a unique personality profile, breaking you out of algorithmic loops.</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start gap-6 relative">
                                        <div className="w-12 h-12 rounded-2xl bg-bg-elevated border border-border-subtle flex items-center justify-center flex-shrink-0 relative z-10 transition-colors hover:border-accent-primary/50 group">
                                            <SlidersHorizontal className="w-6 h-6 text-text-secondary group-hover:text-text-primary transition-colors" />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-semibold text-text-primary mb-2">Inspect & Adjust</h4>
                                            <p className="text-text-secondary leading-relaxed">See exactly what topics the algorithm associates with you. Manually adjust their weights or remove them entirely.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-6 relative">
                                        <div className="w-12 h-12 rounded-2xl bg-bg-elevated border border-border-subtle flex items-center justify-center flex-shrink-0 relative z-10 transition-colors hover:border-accent-primary/50 group">
                                            <Lock className="w-6 h-6 text-text-secondary group-hover:text-text-primary transition-colors" />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-semibold text-text-primary mb-2">Data Portability</h4>
                                            <p className="text-text-secondary leading-relaxed">Your data belongs to you. Export your entire recommendation profile or wipe it clean at any time with a single tap.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* UI Mockup Side - Highly detailed interactive map */}
                            <div className="lg:w-7/12 bg-bg-secondary p-8 md:p-16 flex items-center justify-center relative overflow-hidden">
                                {/* Grid background pattern */}
                                <div className="absolute inset-0 opacity-[0.03] dark:opacity-10" style={{ backgroundImage: 'linear-gradient(to right, #888 1px, transparent 1px), linear-gradient(to bottom, #888 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                                
                                <div className="w-full max-w-md bg-bg-primary/90 backdrop-blur-xl rounded-3xl border border-border-subtle p-8 shadow-2xl relative z-10 group">
                                    <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                                    {/* Nodes Visualization */}
                                    <div className="relative aspect-square flex items-center justify-center mb-6">
                                        {/* Center Node */}
                                        <div className="absolute z-30 w-20 h-20 rounded-full bg-bg-card border-2 border-accent-primary flex items-center justify-center shadow-[0_0_30px_rgba(var(--accent-primary-rgb),0.3)]">
                                            <img src="/flow-icon.svg" className="w-10 h-10 opacity-80" alt="Flow" />
                                        </div>

                                        {/* Pulsing rings */}
                                        <div className="absolute w-full h-full rounded-full border border-border-subtle/50 scale-[0.6] opacity-50"></div>
                                        <div className="absolute w-full h-full rounded-full border border-border-subtle/30 scale-[0.8] opacity-30"></div>
                                        <div className="absolute w-full h-full rounded-full border border-border-subtle/10 scale-[1] opacity-10"></div>

                                        {/* Orbiting Nodes */}
                                        {[
                                            { name: 'Programming', angle: 0, distance: 130, scale: 1.1, val: '92%' },
                                            { name: 'Cinematography', angle: 72, distance: 100, scale: 0.9, val: '78%' },
                                            { name: 'Architecture', angle: 144, distance: 140, scale: 0.8, val: '45%' },
                                            { name: 'Neuroscience', angle: 216, distance: 110, scale: 1, val: '65%' },
                                            { name: 'Jazz Music', angle: 288, distance: 120, scale: 0.85, val: '50%' },
                                        ].map((node, i) => {
                                            const rad = (node.angle * Math.PI) / 180;
                                            const x = Math.cos(rad) * node.distance;
                                            const y = Math.sin(rad) * node.distance;
                                            
                                            return (
                                                <motion.div
                                                    key={i}
                                                    className="absolute z-20 flex flex-col items-center gap-2"
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    whileInView={{ opacity: 1, x, y, scale: node.scale }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1.2, delay: 0.3 + i * 0.1, type: 'spring', bounce: 0.4 }}
                                                >
                                                    <div className="w-14 h-14 rounded-2xl bg-bg-card border border-border-subtle shadow-lg flex items-center justify-center relative hover:border-accent-primary hover:shadow-accent-primary/20 transition-all duration-300 cursor-default group/node overflow-hidden">
                                                        <div className="absolute inset-0 bg-accent-primary/5 opacity-0 group-hover/node:opacity-100 transition-opacity"></div>
                                                        <span className="text-sm font-bold text-text-primary relative z-10">{node.val}</span>
                                                    </div>
                                                    
                                                    {/* Connecting Line to center */}
                                                    <svg className="absolute top-1/2 left-1/2 -z-10 overflow-visible pointer-events-none" style={{ transform: `translate(-50%, -50%) rotate(${node.angle + 180}deg)` }}>
                                                        <motion.line 
                                                            x1="0" y1="0" x2={node.distance - 40} y2="0" 
                                                            stroke="currentColor" 
                                                            className="text-accent-primary/30" 
                                                            strokeWidth="2" 
                                                            strokeDasharray="4 4"
                                                            initial={{ strokeDashoffset: 20 }}
                                                            animate={{ strokeDashoffset: 0 }}
                                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                        />
                                                    </svg>
                                                    <span className="text-xs font-semibold text-text-secondary whitespace-nowrap bg-bg-primary/80 px-2 py-0.5 rounded-md backdrop-blur-sm">{node.name}</span>
                                                </motion.div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </Section>
    )
}

export default NeuroEngine
