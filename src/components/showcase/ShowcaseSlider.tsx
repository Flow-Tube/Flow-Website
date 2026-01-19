import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectCoverflow } from 'swiper/modules'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-coverflow'

import { PhoneMockup } from './PhoneMockup'

const slides = [
    {
        id: 'home',
        image: '/screenshots/Home.jpeg',
        text: "A home feed shaped by how you actually watch."
    },
    {
        id: 'shorts',
        image: '/screenshots/Shorts.jpeg',
        text: "Short-form content without noise or manipulation."
    },
    {
        id: 'music',
        image: '/screenshots/Music.jpeg',
        text: "Music discovery that adapts to your listening patterns."
    },
    {
        id: 'subscriptions',
        image: '/screenshots/Subscriptions.jpeg',
        text: "Your subscriptions, ordered by relevance — not algorithms."
    },
    {
        id: 'library',
        image: '/screenshots/Library.jpeg',
        text: "Everything you save, organized around your habits."
    },
    {
        id: 'channel',
        image: '/screenshots/Channel.jpeg',
        text: "Explore creators without distractions or artificial boosts."
    },
    {
        id: 'artist',
        image: '/screenshots/Artist.jpeg',
        text: "An artist view focused on music, not metrics."
    },
    {
        id: 'videoplayer',
        image: '/screenshots/VideoPlayer.jpeg',
        text: "Full control over playback, without breaking immersion."
    },
    {
        id: 'musicplayer',
        image: '/screenshots/MusicPlayer.jpeg',
        text: "Designed for listening first — watching second."
    },
    {
        id: 'neuro',
        image: '/screenshots/Personality.jpeg',
        text: "A living profile that evolves with every interaction."
    }
]

export function ShowcaseSlider() {
    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <section className="relative w-full py-20 overflow-hidden">
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                initialSlide={0}
                speed={800} // Slow, confident transition
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: true,
                    pauseOnMouseEnter: true
                }}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2,
                    slideShadows: false,
                }}
                modules={[Autoplay, EffectCoverflow]}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                className="w-full max-w-[1400px] mx-auto !pb-20"
            >
                {slides.map((slide) => (
                    <SwiperSlide
                        key={slide.id}
                        className="!w-[300px] md:!w-[360px] lg:!w-[400px] transition-all duration-700 ease-out"
                    >
                        {({ isActive }) => (
                            <motion.div
                                animate={{
                                    scale: isActive ? 1 : 0.85,
                                    opacity: isActive ? 1 : 0.4,
                                    filter: isActive ? 'blur(0px)' : 'blur(4px)',
                                }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                <PhoneMockup>
                                    <img
                                        src={slide.image}
                                        alt={slide.text}
                                        className="w-full h-full object-cover"
                                    />
                                </PhoneMockup>
                            </motion.div>
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Active Slide Text */}
            <div className="absolute bottom-10 left-0 right-0 flex justify-center items-center z-10 px-4">
                <AnimatePresence mode='wait'>
                    <motion.p
                        key={activeIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="text-center text-xl md:text-2xl font-light tracking-wide text-white/90 max-w-xl"
                    >
                        {slides[activeIndex]?.text}
                    </motion.p>
                </AnimatePresence>
            </div>

            {/* Ambient Background Glow based on active index (Optional Enhancement) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-radial from-red-900/10 to-transparent opacity-50 blur-[100px]" />
            </div>
        </section>
    )
}
