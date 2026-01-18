import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2, Circle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useEffect } from 'react'

interface RoadmapModalProps {
    isOpen: boolean
    onClose: () => void
}

const roadmapData = [
    {
        category: "High Priority",
        color: "text-red-400",
        items: [
            { text: "YouTube Algorithm Integration", done: true },
            { text: "Shorts Support & UI", done: true },
            { text: "Channel Screen Implementation", done: true },
            { text: "Remove Placeholder Data", done: true },
            { text: "Neural Engine Personalization", done: true },
        ]
    },
    {
        category: "Core Features",
        color: "text-yellow-400",
        items: [
            { text: "Notification System & Music Controls", done: true },
            { text: "Download Manager", done: true },
            { text: "Comments System (Read/Sort)", done: true },
            { text: "Social Features (Share/Playlists)", done: true },
        ]
    },
    {
        category: "User Experience",
        color: "text-green-400",
        items: [
            { text: "Search Filters & Voice Search", done: true },
            { text: "Watch Together & Live Stream DVR", done: true },
            { text: "Accessibility (Screen Reader/Voice)", done: false },
        ]
    },
    {
        category: "Technical Improvements",
        color: "text-blue-400",
        items: [
            { text: "Performance Optimization", done: true },
            { text: "Migration to Hilt/Room", done: true },
            { text: "Unit & UI Testing Coverage", done: false },
        ]
    },
    {
        category: "Future Ideas",
        color: "text-purple-400",
        items: [
            { text: "Android TV & Wear OS Versions", done: false },
            { text: "Sponsorblock Integration", done: false },
            { text: "Community Playlists", done: false },
        ]
    }
]

export function RoadmapModal({ isOpen, onClose }: RoadmapModalProps) {
    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    >
                        <div className="bg-neutral-900/90 border border-white/10 rounded-3xl w-full max-w-4xl max-h-[85vh] shadow-2xl flex flex-col pointer-events-auto overflow-hidden">
                            {/* Header */}
                            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-black/20">
                                <div>
                                    <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                                        Project Roadmap
                                    </h2>
                                    <p className="text-sm text-text-secondary mt-1">
                                        The journey to build the ultimate client
                                    </p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={onClose}
                                    className="!p-2 hover:bg-white/10 rounded-full"
                                >
                                    <X className="w-5 h-5" />
                                </Button>
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {roadmapData.map((section, idx) => (
                                        <div key={idx} className="space-y-4">
                                            <h3 className={`font-semibold flex items-center gap-2 ${section.color}`}>
                                                <ArrowRight className="w-4 h-4" />
                                                {section.category}
                                            </h3>
                                            <div className="space-y-2">
                                                {section.items.map((item, i) => (
                                                    <div
                                                        key={i}
                                                        className={`flex items-start gap-3 p-3 rounded-xl border transition-all duration-300 ${item.done
                                                                ? 'bg-white/5 border-white/5'
                                                                : 'bg-transparent border-white/5 opacity-60 hover:opacity-100 hover:bg-white/5'
                                                            }`}
                                                    >
                                                        <div className={`mt-0.5 ${item.done ? 'text-green-500' : 'text-neutral-500'}`}>
                                                            {item.done ? (
                                                                <CheckCircle2 className="w-4 h-4" />
                                                            ) : (
                                                                <Circle className="w-4 h-4" />
                                                            )}
                                                        </div>
                                                        <span className={`text-sm ${item.done ? 'text-text-primary' : 'text-text-secondary'}`}>
                                                            {item.text}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="p-6 border-t border-white/5 bg-black/20 text-center">
                                <p className="text-sm text-text-tertiary">
                                    Priorities may change based on community feedback.
                                    <a href="https://github.com/A-EDev/Flow/issues" target="_blank" rel="noopener noreferrer" className="text-accent-primary hover:underline ml-1">
                                        Submit a request
                                    </a>
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
