import { Link } from 'react-router-dom'
import { LegalPage, type LegalSection } from '@/components/layout/LegalPage'

const services = [
    {
        name: 'YouTube and YouTube Music',
        gets: 'Your requests: searches, video and channel IDs, search phrases built from your interests, and your subscribed channel IDs to fetch new uploads.',
        when: 'Whenever you browse or play, and in the background if new-video alerts are on.',
    },
    {
        name: 'SponsorBlock',
        gets: 'The ID of the video you\'re watching, as is. It isn\'t hashed.',
        when: 'When a video plays, if SponsorBlock is on. You can turn it off in the player settings.',
    },
    {
        name: 'DeArrow',
        gets: 'The IDs of videos being shown, to fetch community titles and thumbnails.',
        when: 'When videos are listed, if DeArrow is on. You can turn it off in the player settings.',
    },
    {
        name: 'Return YouTube Dislike',
        gets: 'The ID of the video you\'re watching.',
        when: 'When a video\'s page opens.',
    },
    {
        name: 'Lyrics providers',
        gets: 'The song\'s title and artist. Providers include LRCLIB, KuGou, Paxsenix and SimpMusic.',
        when: 'Only when you open lyrics.',
    },
    {
        name: 'Shazam',
        gets: 'An audio fingerprint of what the microphone hears.',
        when: 'Only while you use song recognition.',
    },
    {
        name: 'PipePipe decoder',
        gets: 'Data from YouTube\'s video player that\'s needed to play videos. Nothing about you.',
        when: 'When playback needs it.',
    },
    {
        name: 'Discord',
        gets: 'Your Discord login, and the title of what you\'re playing.',
        when: 'Only if you connect Discord Rich Presence. GitHub build only.',
    },
    {
        name: 'GitHub',
        gets: 'A check for the latest release.',
        when: 'When Flow checks for updates. GitHub build only.',
    },
    {
        name: 'Your TV or speaker',
        gets: 'What you cast. Chromecast uses Google\'s Cast service on your phone; DLNA stays on your local network.',
        when: 'Only when you cast.',
    },
]

const permissions = [
    { name: 'Microphone', why: 'Song recognition.' },
    { name: 'Camera', why: 'Scanning the QR code that pairs two devices for sync.' },
    { name: 'Notifications', why: 'Playback controls, download progress and new-video alerts.' },
    { name: 'Wi-Fi and local network', why: 'Syncing between your devices and casting over DLNA.' },
    { name: 'Storage, music and video', why: 'Saving downloads and playing your local media library.' },
    { name: 'Display over other apps', why: 'The floating mini player.' },
    { name: 'Ignore battery optimization', why: 'Keeping background playback and downloads running.' },
]

function Rows({ rows }: { rows: { title: string; body: React.ReactNode; note?: string }[] }) {
    return (
        <div className="rounded-2xl border border-border-subtle bg-bg-card divide-y divide-border-subtle">
            {rows.map(row => (
                <div key={row.title} className="grid gap-1 px-5 py-4 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6">
                    <p className="font-display text-base font-semibold text-text-primary">{row.title}</p>
                    <div className="text-[15px]">
                        <p>{row.body}</p>
                        {row.note && <p className="mt-1.5 text-[13px] text-text-muted">{row.note}</p>}
                    </div>
                </div>
            ))}
        </div>
    )
}

const sections: LegalSection[] = [
    {
        id: 'on-your-device',
        title: 'On your device',
        content: (
            <>
                <p>Flow stores your watch and search history, subscriptions, playlists, downloads, settings, and your FlowNeuro video and music profiles on your phone.</p>
                <ul>
                    <li><strong>Export it</strong> from Settings, or schedule automatic backups to a folder you choose.</li>
                    <li><strong>Sync it</strong> between your own devices over local Wi-Fi, after pairing them with a QR code and matching codes. It doesn't pass through any server.</li>
                    <li><strong>Delete it</strong> by resetting your profiles in Settings › Your taste, clearing the app's data in Android settings, or uninstalling Flow.</li>
                </ul>
            </>
        ),
    },
    {
        id: 'what-the-app-sends',
        title: 'What the app sends, and to whom',
        content: (
            <>
                <p>To show you videos and music, Flow talks directly to these services. Every request comes from your own IP address. Flow has no servers of its own and doesn't route anything through us, so we never see it. Each service handles your requests under its own privacy policy.</p>
                <Rows rows={services.map(s => ({ title: s.name, body: s.gets, note: s.when }))} />
            </>
        ),
    },
    {
        id: 'permissions',
        title: 'Permissions',
        content: (
            <>
                <p>What each Android permission Flow asks for is used for.</p>
                <Rows rows={permissions.map(p => ({ title: p.name, body: p.why }))} />
            </>
        ),
    },
    {
        id: 'telemetry',
        title: 'Analytics and crash reports',
        content: (
            <p>Flow contains no analytics, tracking or crash-reporting code. We have no way of knowing how you use the app or whether it crashed. If something goes wrong, you can copy the error details and <a href="https://github.com/A-EDev/Flow/issues/new?template=bug_report.yml" target="_blank" rel="noopener noreferrer">report it on GitHub</a> yourself.</p>
        ),
    },
    {
        id: 'this-website',
        title: 'This website',
        content: (
            <ul>
                <li>It's hosted on <strong>Vercel</strong>, which keeps standard server logs, such as your IP address and the pages you request.</li>
                <li>Its fonts are served from this site. Nothing loads from Google.</li>
                <li>The <Link to="/about">About</Link> page loads contributor pictures from <strong>GitHub</strong>, so GitHub sees your IP address when you open it.</li>
                <li>Your light or dark mode choice is saved in your browser. There are no cookies, analytics or trackers.</li>
            </ul>
        ),
    },
    {
        id: 'changes-and-contact',
        title: 'Changes and contact',
        content: (
            <>
                <p>When this policy changes, the date at the top changes, and the edit is visible in the website's public repository on GitHub.</p>
                <p>Questions? Open an issue on <a href="https://github.com/A-EDev/Flow/issues" target="_blank" rel="noopener noreferrer">GitHub</a> or ask on <a href="https://reddit.com/r/flow_official" target="_blank" rel="noopener noreferrer">r/Flow_Official</a>.</p>
            </>
        ),
    },
]

export function PrivacyPolicy() {
    return (
        <LegalPage
            kicker="Privacy Policy"
            title="Your data"
            accent="stays yours."
            updated="27 September 2026"
            intro={<p>Flow has no accounts, no servers of its own and no analytics. What you do in the app stays on your phone. To show you videos and music, the app talks directly to YouTube and a few other services, listed below with exactly what each one receives.</p>}
            sections={sections}
        />
    )
}

export default PrivacyPolicy
