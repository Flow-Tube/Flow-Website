import { FadeIn } from '@/components/ui/TextReveal'

const mobileScreens = [
    { src: '/screenshots/Home.webp', label: 'Home Feed' },
    { src: '/screenshots/Shorts.webp', label: 'Shorts' },
    { src: '/screenshots/VideoPlayer.webp', label: 'Video Player' },
    { src: '/screenshots/Music.webp', label: 'Music' },
    { src: '/screenshots/MusicPlayer.webp', label: 'Music Player' },
    { src: '/screenshots/Personality.webp', label: 'Neuro Engine' },
    { src: '/screenshots/Library.webp', label: 'Library' },
    { src: '/screenshots/Playlist.webp', label: 'Playlist' },
    { src: '/screenshots/Artist.webp', label: 'Artist' },
    { src: '/screenshots/Album.webp', label: 'Album' },
    { src: '/screenshots/Channel.webp', label: 'Channel' },
    { src: '/screenshots/Subscriptions.webp', label: 'Subscriptions' },
]

const desktopScreens = [
    { src: '/screenshots/desktop/Home.webp', label: 'Home' },
    { src: '/screenshots/desktop/Watch.webp', label: 'Video Player' },
    { src: '/screenshots/desktop/Music.webp', label: 'Music' },
    { src: '/screenshots/desktop/MusicPlayer.webp', label: 'Music Player' },
    { src: '/screenshots/desktop/Library.webp', label: 'Library' },
    { src: '/screenshots/desktop/Playlist.webp', label: 'Playlist' },
    { src: '/screenshots/desktop/Artist.webp', label: 'Artist' },
    { src: '/screenshots/desktop/Album.webp', label: 'Album' },
    { src: '/screenshots/desktop/Channel.webp', label: 'Channel' },
    { src: '/screenshots/desktop/Search.webp', label: 'Search' },
    { src: '/screenshots/desktop/Shorts.webp', label: 'Shorts' },
    { src: '/screenshots/desktop/ControlCenter.webp', label: 'Control Center' },
    { src: '/screenshots/desktop/Subs.webp', label: 'Subscriptions' },
]

function StripLabel({ title, note }: { title: string; note: string }) {
    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-baseline justify-between gap-4 mb-6">
            <span className="kicker text-text-secondary">{title}</span>
            <span className="kicker">{note}</span>
        </div>
    )
}

export function AppShowcase() {
    return (
        <section id="showcase" className="bg-bg-secondary border-b border-border-subtle py-20 md:py-28 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-16">
                <FadeIn>
                    <p className="kicker mb-4">01 &mdash; Every Screen</p>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary mb-6">
                        From pocket to desktop.
                    </h2>
                    <p className="text-lg text-text-secondary max-w-2xl leading-relaxed">
                        The same engine, native everywhere. Flow runs on Android today,
                        and desktop builds for Windows, Linux, and macOS — written in Rust
                        on Tauri 2 — are in active development.
                    </p>
                </FadeIn>
            </div>

            {/* Mobile Strip */}
            <StripLabel title="Android" note="Available Now" />
            <div className="marquee w-full mb-14 md:mb-16">
                <div className="marquee-track flex w-max gap-6 md:gap-8">
                    {[...mobileScreens, ...mobileScreens].map((screen, i) => (
                        <figure key={i} className="shrink-0 w-[170px] md:w-[210px]">
                            <div className="aspect-[1/2.16] rounded-2xl border border-border-subtle bg-bg-primary overflow-hidden">
                                <img
                                    src={screen.src}
                                    alt={`Flow on Android — ${screen.label}`}
                                    loading="lazy"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <figcaption className="kicker mt-3 text-center">{screen.label}</figcaption>
                        </figure>
                    ))}
                </div>
            </div>

            {/* Desktop Strip — scrolls the opposite way */}
            <StripLabel title="Windows &middot; Linux &middot; macOS" note="Rust + Tauri 2 &middot; In Development" />
            <div className="marquee w-full">
                <div className="marquee-track marquee-track-reverse flex w-max gap-6 md:gap-8" style={{ animationDuration: '70s' }}>
                    {[...desktopScreens, ...desktopScreens].map((screen, i) => (
                        <figure key={i} className="shrink-0 w-[340px] md:w-[440px]">
                            <div className="relative aspect-[16/10] rounded-xl border border-border-subtle bg-bg-primary overflow-hidden">
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                                    <img src="/flow-icon.svg" alt="" className="w-8 h-8 opacity-40" />
                                    <span className="kicker">{screen.label}</span>
                                </div>
                                <img
                                    src={screen.src}
                                    alt={`Flow on desktop — ${screen.label}`}
                                    loading="lazy"
                                    className="relative w-full h-full object-cover"
                                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                                />
                            </div>
                            <figcaption className="kicker mt-3 text-center">{screen.label}</figcaption>
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default AppShowcase
