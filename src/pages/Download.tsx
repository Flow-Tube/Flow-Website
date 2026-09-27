import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Check, Copy, Download as DownloadIcon, TriangleAlert } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FadeIn } from '@/components/ui/TextReveal'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { detectDevice, type Device } from '@/lib/detectDevice'

type Flavor = 'github' | 'foss'
type Abi = 'universal' | 'arm64-v8a' | 'armeabi-v7a'
type DesktopOS = 'windows' | 'macos' | 'linux'
type Target = 'android' | DesktopOS

interface AndroidAsset { name: string; url: string; size: number; flavor: Flavor; abi: Abi }
interface DesktopAsset { name: string; url: string; size: number; os: DesktopOS; arch: 'x64' | 'arm64'; format: string }
interface Nightly { created: string; run_url: string; commit: string; artifacts: { name: string; url: string; size: number }[] }

interface Downloads {
    android: { version: string; published: string; release_url: string; checksums_url: string | null; assets: AndroidAsset[] } | null
    desktop: { version: string; published: string; release_url: string; assets: DesktopAsset[] } | null
    izzy: { version: string; apk_url: string; page_url: string } | null
    nightly: { android: Nightly | null; desktop: Nightly | null }
}

const FINGERPRINT = '43:22:29:4E:D4:CA:A2:D4:29:41:40:09:58:18:08:0F:FE:8A:CC:1F:BE:3C:DC:76:10:7D:F4:5C:52:86:BE:40'

const TARGETS: { id: Target; label: string }[] = [
    { id: 'android', label: 'Android' },
    { id: 'windows', label: 'Windows' },
    { id: 'macos', label: 'macOS' },
    { id: 'linux', label: 'Linux' },
]

const REQUIREMENTS: Record<Target, string> = {
    android: 'Android 8.0 or newer',
    windows: 'Windows 10 or 11',
    macos: 'macOS 13 or newer',
    linux: 'Most modern distributions',
}

const ARCH_LABEL: Record<DesktopOS, Record<'x64' | 'arm64', string>> = {
    windows: { x64: 'x64', arm64: 'ARM64' },
    macos: { x64: 'Intel', arm64: 'Apple Silicon' },
    linux: { x64: 'x64', arm64: 'ARM64' },
}

const ABI_LABEL: Record<Abi, string> = {
    universal: 'Universal',
    'arm64-v8a': 'arm64-v8a',
    'armeabi-v7a': 'armeabi-v7a',
}

const linkClass = 'font-semibold text-text-primary underline underline-offset-4 decoration-text-muted hover:decoration-text-primary'

function formatSize(bytes: number) {
    return `${(bytes / 1_000_000).toFixed(1)} MB`
}

function formatDate(iso: string) {
    const d = new Date(iso)
    return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

function timeAgo(iso: string) {
    const hours = Math.round((Date.now() - new Date(iso).getTime()) / 3_600_000)
    if (hours < 1) return 'less than an hour ago'
    if (hours < 48) return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`
    return `${Math.round(hours / 24)} days ago`
}

function desktopPick(assets: DesktopAsset[], os: DesktopOS, arch: 'x64' | 'arm64', format?: string) {
    const preferred = format ?? (os === 'windows' ? 'exe' : os === 'macos' ? 'dmg' : 'AppImage')
    return assets.find(a => a.os === os && a.arch === arch && a.format === preferred) ?? null
}

function androidPick(assets: AndroidAsset[], flavor: Flavor, abi: Abi) {
    return assets.find(a => a.flavor === flavor && a.abi === abi) ?? null
}

function Row({ title, detail, href, size, primary }: { title: string; detail?: string; href: string; size?: number; primary?: boolean }) {
    return (
        <li className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-4">
            <div className="min-w-0">
                <p className="font-display text-[17px] font-semibold tracking-[-0.01em] text-text-primary">{title}</p>
                {detail && <p className="text-sm text-text-secondary">{detail}</p>}
            </div>
            <div className="flex items-center gap-4">
                {size !== undefined && <span className="font-mono text-[12px] text-text-muted tabular-nums">{formatSize(size)}</span>}
                <a
                    href={href}
                    className={cn(
                        'inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold transition-colors',
                        primary
                            ? 'bg-text-primary text-bg-primary hover:opacity-90'
                            : 'border border-border-subtle text-text-primary hover:border-text-primary'
                    )}
                >
                    <DownloadIcon className="w-4 h-4" aria-hidden="true" />
                    Download
                </a>
            </div>
        </li>
    )
}

function Group({ title, note, children }: { title: string; note?: React.ReactNode; children: React.ReactNode }) {
    return (
        <div>
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                <h3 className="text-xl font-semibold tracking-[-0.02em] text-text-primary">{title}</h3>
                {note && <span className="kicker">{note}</span>}
            </div>
            <ul className="rounded-2xl border border-border-subtle bg-bg-card divide-y divide-border-subtle">{children}</ul>
        </div>
    )
}

function SectionHeader({ kicker, title, children }: { kicker: string; title: string; children?: React.ReactNode }) {
    return (
        <div className="mb-8 max-w-2xl">
            <p className="kicker mb-3">{kicker}</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.03em] text-text-primary mb-3">{title}</h2>
            {children && <div className="text-text-secondary leading-relaxed space-y-2">{children}</div>}
        </div>
    )
}

function describeDevice(device: Device): string | null {
    const guess = device.archGuessed ? ', as far as we can tell' : ''
    switch (device.os) {
        case 'android':
            return 'Looks like you\'re on Android.'
        case 'macos':
            return `Looks like you're on a Mac with ${device.arch === 'x64' ? 'an Intel processor' : 'Apple Silicon'}${guess}.`
        case 'windows':
        case 'linux':
            return `Looks like you're on ${device.os === 'windows' ? 'Windows' : 'Linux'} (${device.arch === 'arm64' ? 'ARM64' : 'x64'}${guess}).`
        case 'chromeos':
            return 'On a Chromebook, the Android app works best.'
        case 'ios':
            return 'Flow isn\'t available for iPhone or iPad yet. You can still get it for another device below.'
        default:
            return null
    }
}

export function Download() {
    const [data, setData] = useState<Downloads | null>(null)
    const [failed, setFailed] = useState(false)
    const [device, setDevice] = useState<Device | null>(null)
    const [target, setTarget] = useState<Target>('android')
    const [arch, setArch] = useState<'x64' | 'arm64'>('x64')
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        fetch('/downloads.json')
            .then(res => res.json())
            .then((json: Downloads) => setData(json))
            .catch(() => setFailed(true))

        detectDevice().then(d => {
            setDevice(d)
            if (d.os === 'windows' || d.os === 'macos' || d.os === 'linux') setTarget(d.os)
            else setTarget('android')
            setArch(d.arch === 'arm64' ? 'arm64' : 'x64')
        })
    }, [])

    const copyFingerprint = async () => {
        try {
            await navigator.clipboard.writeText(FINGERPRINT)
            setCopied(true)
            window.setTimeout(() => setCopied(false), 2000)
        } catch {
            setCopied(false)
        }
    }

    const android = data?.android
    const desktop = data?.desktop
    const isDesktop = target !== 'android'
    const otherArch = arch === 'x64' ? 'arm64' : 'x64'

    const primaryAndroid = android ? androidPick(android.assets, 'github', 'universal') : null
    const smallAndroid = android ? androidPick(android.assets, 'github', 'arm64-v8a') : null
    const primaryDesktop = desktop && isDesktop ? desktopPick(desktop.assets, target, arch) : null
    const otherDesktop = desktop && isDesktop ? desktopPick(desktop.assets, target, otherArch) : null

    const detectedLabel = device ? describeDevice(device) : null

    return (
        <div className="relative min-h-screen bg-bg-primary text-text-primary flex flex-col">
            <Header />

            <main className="flex-1 w-full pt-32 md:pt-40 pb-24">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeIn>
                        <p className="kicker mb-5">Download</p>
                        <h1 className="text-5xl md:text-7xl font-semibold tracking-[-0.035em] leading-[0.98] mb-6">
                            Get Flow{' '}
                            <span className="whitespace-nowrap font-serif italic font-normal tracking-[-0.01em] text-text-muted">
                                for {TARGETS.find(t => t.id === target)?.label}.
                            </span>
                        </h1>
                        {detectedLabel && <p className="text-lg text-text-secondary">{detectedLabel}</p>}
                    </FadeIn>

                    <FadeIn delay={0.08}>
                        <div className="mt-10 rounded-2xl border-2 border-text-primary p-6 md:p-10">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div className="inline-flex flex-wrap gap-1 rounded-xl border border-border-subtle p-1" role="group" aria-label="Choose your system">
                                    {TARGETS.map(t => (
                                        <button
                                            key={t.id}
                                            type="button"
                                            aria-pressed={target === t.id}
                                            onClick={() => setTarget(t.id)}
                                            className={cn(
                                                'rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors',
                                                target === t.id ? 'bg-text-primary text-bg-primary' : 'text-text-secondary hover:text-text-primary'
                                            )}
                                        >
                                            {t.label}
                                        </button>
                                    ))}
                                </div>
                                <span className="kicker">{REQUIREMENTS[target]}</span>
                            </div>

                            {failed && (
                                <p className="mt-8 text-text-secondary">
                                    Download links couldn't be loaded. Get Flow from{' '}
                                    <a href="https://github.com/A-EDev/Flow/releases/latest" target="_blank" rel="noopener noreferrer" className={linkClass}>GitHub Releases</a> instead.
                                </p>
                            )}

                            {!failed && !data && <p className="mt-8 text-text-secondary">Finding the latest release…</p>}

                            {data && target === 'android' && primaryAndroid && android && (
                                <div className="mt-8">
                                    <p className="text-text-secondary mb-5">
                                        Version {android.version} &middot; released {formatDate(android.published)}
                                    </p>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <Button href={primaryAndroid.url} variant="primary" size="lg" icon={<DownloadIcon className="w-5 h-5" />} iconPosition="left">
                                            Download for Android
                                        </Button>
                                        <span className="font-mono text-[13px] text-text-muted">.apk &middot; {formatSize(primaryAndroid.size)} &middot; works on every phone</span>
                                    </div>
                                    {smallAndroid && (
                                        <p className="mt-5 text-sm text-text-secondary">
                                            Want a smaller download? Most phones can use the{' '}
                                            <a href={smallAndroid.url} className={linkClass}>arm64-v8a build ({formatSize(smallAndroid.size)})</a>.
                                            {' '}Prefer an app store? Get it on{' '}
                                            <a href="#izzyondroid" className={linkClass}>IzzyOnDroid</a>.
                                        </p>
                                    )}
                                </div>
                            )}

                            {data && isDesktop && desktop && (
                                <div className="mt-8">
                                    <p className="text-text-secondary mb-5">
                                        Version {desktop.version} &middot; released {formatDate(desktop.published)} &middot; Flow Desktop is in beta
                                    </p>
                                    {primaryDesktop ? (
                                        <div className="flex flex-wrap items-center gap-3">
                                            <Button href={primaryDesktop.url} variant="primary" size="lg" icon={<DownloadIcon className="w-5 h-5" />} iconPosition="left">
                                                Download for {TARGETS.find(t => t.id === target)?.label}
                                            </Button>
                                            <span className="font-mono text-[13px] text-text-muted">
                                                {ARCH_LABEL[target][arch]} &middot; .{primaryDesktop.format} &middot; {formatSize(primaryDesktop.size)}
                                            </span>
                                        </div>
                                    ) : (
                                        <p className="text-text-secondary">No {ARCH_LABEL[target][arch]} build in this release.</p>
                                    )}
                                    <p className="mt-5 text-sm text-text-secondary">
                                        {otherDesktop && (
                                            <>
                                                {target === 'macos' ? (arch === 'arm64' ? 'On an Intel Mac? ' : 'On an Apple Silicon Mac? ') : `On ${ARCH_LABEL[target][otherArch]}? `}
                                                <button type="button" onClick={() => setArch(otherArch)} className={linkClass}>
                                                    Switch to the {ARCH_LABEL[target][otherArch]} build
                                                </button>
                                                .{' '}
                                            </>
                                        )}
                                        {target === 'linux' && 'Prefer a .deb or .rpm? '}
                                        <a href="#github-releases" className={linkClass}>See every file</a>.
                                    </p>
                                </div>
                            )}
                        </div>
                    </FadeIn>

                    {data && (
                        <>
                            <section id="github-releases" className="mt-20 md:mt-28 scroll-mt-12">
                                <SectionHeader kicker="GitHub Releases" title="Every file, straight from GitHub">
                                    <p>
                                        The <strong className="text-text-primary">GitHub build</strong> includes the in-app updater and Discord Rich Presence.
                                        The <strong className="text-text-primary">FOSS build</strong> leaves both out. Not sure which processor your phone has?
                                        Universal works on all of them.
                                    </p>
                                </SectionHeader>

                                <div className="space-y-10">
                                    {android && (
                                        <>
                                            {(['github', 'foss'] as Flavor[]).map(flavor => (
                                                <Group
                                                    key={flavor}
                                                    title={`Android · ${flavor === 'github' ? 'GitHub build' : 'FOSS build'}`}
                                                    note={flavor === 'github' ? `v${android.version} · ${formatDate(android.published)}` : undefined}
                                                >
                                                    {(['universal', 'arm64-v8a', 'armeabi-v7a'] as Abi[]).map(abi => {
                                                        const asset = androidPick(android.assets, flavor, abi)
                                                        if (!asset) return null
                                                        const detail = abi === 'universal' ? 'Works on every phone' : abi === 'arm64-v8a' ? 'Most phones from 2017 on' : 'Older 32-bit phones'
                                                        return <Row key={abi} title={ABI_LABEL[abi]} detail={detail} href={asset.url} size={asset.size} primary={flavor === 'github' && abi === 'universal'} />
                                                    })}
                                                </Group>
                                            ))}
                                            <p className="text-sm text-text-secondary">
                                                <a href={android.release_url} target="_blank" rel="noopener noreferrer" className={linkClass}>Release on GitHub</a>
                                                {' · '}
                                                <Link to="/changelog" className={linkClass}>What's new</Link>
                                                {android.checksums_url && (
                                                    <>
                                                        {' · '}
                                                        <a href={android.checksums_url} className={linkClass}>checksums.txt</a>
                                                    </>
                                                )}
                                                {' · '}
                                                Get updates automatically with{' '}
                                                <a href="https://apps.obtainium.imranr.dev/redirect?r=obtainium://add/https://github.com/A-EDev/Flow/" target="_blank" rel="noopener noreferrer" className={linkClass}>Obtainium</a>
                                            </p>
                                        </>
                                    )}

                                    {desktop && (
                                        <>
                                            {(['windows', 'macos', 'linux'] as DesktopOS[]).map(os => (
                                                <Group
                                                    key={os}
                                                    title={`${TARGETS.find(t => t.id === os)?.label} · Desktop beta`}
                                                    note={os === 'windows' ? `v${desktop.version} · ${formatDate(desktop.published)}` : REQUIREMENTS[os]}
                                                >
                                                    {desktop.assets
                                                        .filter(a => a.os === os)
                                                        .sort((a, b) => a.arch.localeCompare(b.arch) * -1 || a.format.localeCompare(b.format))
                                                        .map(asset => (
                                                            <Row
                                                                key={asset.name}
                                                                title={`${ARCH_LABEL[os][asset.arch]}${os === 'linux' ? ` · .${asset.format}` : ''}`}
                                                                detail={os === 'windows' ? 'Installer (.exe)' : os === 'macos' ? 'Disk image (.dmg)' : asset.format === 'AppImage' ? 'Runs on any distribution' : asset.format === 'deb' ? 'Debian, Ubuntu, Mint' : 'Fedora, openSUSE'}
                                                                href={asset.url}
                                                                size={asset.size}
                                                                primary={device?.os === os && asset.arch === arch && asset === desktopPick(desktop.assets, os, arch)}
                                                            />
                                                        ))}
                                                </Group>
                                            ))}
                                            <p className="text-sm text-text-secondary">
                                                <a href={desktop.release_url} target="_blank" rel="noopener noreferrer" className={linkClass}>Release on GitHub</a>
                                                {' · '}
                                                <Link to="/changelog" className={linkClass}>What's new</Link>
                                                {' · '}
                                                Flow Desktop updates itself with a signature-checked updater.
                                            </p>
                                        </>
                                    )}
                                </div>
                            </section>

                            {data.izzy && (
                                <section id="izzyondroid" className="mt-20 md:mt-28 scroll-mt-12">
                                    <SectionHeader kicker="IzzyOnDroid" title="Get updates through an app store">
                                        <p>
                                            IzzyOnDroid is an F-Droid repository. Add it to an F-Droid client such as F-Droid, Droid-ify or Neo Store,
                                            and Flow updates with the rest of your apps. It carries the FOSS build.
                                        </p>
                                    </SectionHeader>
                                    <Group title="Android · FOSS build" note={`v${data.izzy.version}`}>
                                        <Row title="arm64-v8a" detail="Direct download from IzzyOnDroid" href={data.izzy.apk_url} />
                                    </Group>
                                    <p className="mt-4 text-sm text-text-secondary">
                                        <a href={data.izzy.page_url} target="_blank" rel="noopener noreferrer" className={linkClass}>Open Flow on IzzyOnDroid</a>
                                    </p>
                                </section>
                            )}

                            {(data.nightly.android || data.nightly.desktop) && (
                                <section id="nightly" className="mt-20 md:mt-28 scroll-mt-12">
                                    <SectionHeader kicker="Nightly builds" title="Try what's coming next">
                                        <p>Built automatically from the latest code. They aren't in the changelog and they can break, so keep a stable build around.</p>
                                    </SectionHeader>
                                    <p className="mb-8 flex items-start gap-3 rounded-2xl border border-border-subtle bg-bg-secondary px-5 py-4 text-sm text-text-secondary">
                                        <TriangleAlert className="mt-0.5 w-4 h-4 shrink-0 text-text-primary" aria-hidden="true" />
                                        Downloads come as a .zip through nightly.link, so no GitHub account is needed. Nightly and stable builds of the same app can't be installed side by side.
                                    </p>
                                    <div className="space-y-10">
                                        {data.nightly.android && (() => {
                                            const n = data.nightly.android
                                            const universal = n.artifacts.find(a => a.name === 'flow-nightly-apk')
                                            const foss = n.artifacts.find(a => a.name === 'flow-foss-universal-release-apk')
                                            return (
                                                <Group title="Android · Nightly" note={`Built ${timeAgo(n.created)} · ${n.commit}`}>
                                                    {universal && <Row title="GitHub build" detail="Universal" href={universal.url} size={universal.size} />}
                                                    {foss && <Row title="FOSS build" detail="Universal" href={foss.url} size={foss.size} />}
                                                </Group>
                                            )
                                        })()}
                                        {data.nightly.desktop && (() => {
                                            const n = data.nightly.desktop
                                            const parsed = n.artifacts
                                                .map(a => {
                                                    const m = a.name.match(/^Flow-nightly-(windows|macos|linux)-(x64|arm64)(?:-([a-z]+))?-\d+$/i)
                                                    return m ? { ...a, os: m[1].toLowerCase() as DesktopOS, arch: m[2] as 'x64' | 'arm64', format: m[3] ?? '' } : null
                                                })
                                                .filter((a): a is NonNullable<typeof a> => a !== null)
                                            const formatName = (f: string) => (f === 'appimage' ? 'AppImage' : f)
                                            return (
                                                <Group title="Desktop · Nightly" note={`Built ${timeAgo(n.created)} · ${n.commit}`}>
                                                    {(['windows', 'macos', 'linux'] as DesktopOS[]).flatMap(os =>
                                                        parsed
                                                            .filter(a => a.os === os)
                                                            .sort((a, b) => b.arch.localeCompare(a.arch) || a.format.localeCompare(b.format))
                                                            .map(a => (
                                                                <Row
                                                                    key={a.name}
                                                                    title={`${TARGETS.find(t => t.id === os)?.label} · ${ARCH_LABEL[os][a.arch]}${a.format ? ` · .${formatName(a.format)}` : ''}`}
                                                                    href={a.url}
                                                                    size={a.size}
                                                                />
                                                            ))
                                                    )}
                                                </Group>
                                            )
                                        })()}
                                    </div>
                                </section>
                            )}

                            <section id="verify" className="mt-20 md:mt-28 scroll-mt-12">
                                <SectionHeader kicker="Verify" title="Check that it's really Flow">
                                    <p>
                                        Every Android release is signed with the same key. Compare its SHA-256 fingerprint with{' '}
                                        <a href="https://github.com/soupslurpr/AppVerifier" target="_blank" rel="noopener noreferrer" className={linkClass}>AppVerifier</a>
                                        {' '}before installing.
                                    </p>
                                </SectionHeader>
                                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border border-border-subtle bg-bg-card py-3 pl-5 pr-3">
                                    <code className="font-mono text-[13px] leading-relaxed text-text-primary break-all select-all">{FINGERPRINT}</code>
                                    <button
                                        type="button"
                                        onClick={copyFingerprint}
                                        className="inline-flex items-center gap-1.5 rounded-lg border border-border-subtle bg-bg-primary px-3 py-2 text-[13px] font-semibold text-text-primary hover:border-text-primary transition-colors"
                                    >
                                        {copied ? <Check className="w-3.5 h-3.5" aria-hidden="true" /> : <Copy className="w-3.5 h-3.5" aria-hidden="true" />}
                                        {copied ? 'Copied' : 'Copy'}
                                    </button>
                                </div>
                                <p className="mt-4 text-sm text-text-secondary">
                                    Not sure where to start?{' '}
                                    <Link to="/#faq-install" className={linkClass}>Read the install FAQ</Link>
                                    <ArrowRight className="inline w-3.5 h-3.5 ml-1 align-[-2px]" aria-hidden="true" />
                                </p>
                            </section>

                            <p className="mt-16 flex items-center gap-1.5 text-sm text-text-muted">
                                Looking for older versions? See all{' '}
                                <a href="https://github.com/A-EDev/Flow/releases" target="_blank" rel="noopener noreferrer" className={linkClass}>Android</a>
                                {' '}and{' '}
                                <a href="https://github.com/Flow-Tube/Flow-Desktop/releases" target="_blank" rel="noopener noreferrer" className={linkClass}>desktop</a>
                                {' '}releases on GitHub
                                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                            </p>
                        </>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default Download
