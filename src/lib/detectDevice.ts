export type DeviceOS = 'android' | 'windows' | 'macos' | 'linux' | 'chromeos' | 'ios' | 'unknown'
export type DeviceArch = 'x64' | 'arm64' | 'unknown'

export interface Device {
    os: DeviceOS
    arch: DeviceArch
    archGuessed: boolean
}

interface UADataLike {
    platform?: string
    getHighEntropyValues?: (hints: string[]) => Promise<{ architecture?: string; bitness?: string }>
}

function osFromPlatform(platform: string): DeviceOS | null {
    const p = platform.toLowerCase()
    if (p === 'android') return 'android'
    if (p === 'windows') return 'windows'
    if (p === 'macos') return 'macos'
    if (p === 'linux') return 'linux'
    if (p === 'chrome os' || p === 'chromeos') return 'chromeos'
    if (p === 'ios') return 'ios'
    return null
}

function osFromUserAgent(ua: string): DeviceOS {
    if (/Android/i.test(ua)) return 'android'
    if (/iPhone|iPad|iPod/i.test(ua) || (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1)) return 'ios'
    if (/CrOS/i.test(ua)) return 'chromeos'
    if (/Windows/i.test(ua)) return 'windows'
    if (/Mac OS X|Macintosh/i.test(ua)) return 'macos'
    if (/Linux/i.test(ua)) return 'linux'
    return 'unknown'
}

function macArchFromGpu(): DeviceArch {
    try {
        const gl = document.createElement('canvas').getContext('webgl')
        if (!gl) return 'unknown'
        const info = gl.getExtension('WEBGL_debug_renderer_info')
        const renderer = String(gl.getParameter(info ? info.UNMASKED_RENDERER_WEBGL : gl.RENDERER))
        if (/Apple (M\d|GPU)/i.test(renderer)) return 'arm64'
        if (/Intel|AMD|Radeon|NVIDIA/i.test(renderer)) return 'x64'
    } catch {
        return 'unknown'
    }
    return 'unknown'
}

export async function detectDevice(): Promise<Device> {
    const ua = navigator.userAgent
    const uaData = (navigator as Navigator & { userAgentData?: UADataLike }).userAgentData
    const os = (uaData?.platform && osFromPlatform(uaData.platform)) || osFromUserAgent(ua)

    if (uaData?.getHighEntropyValues) {
        try {
            const { architecture } = await uaData.getHighEntropyValues(['architecture', 'bitness'])
            if (architecture === 'arm') return { os, arch: 'arm64', archGuessed: false }
            if (architecture === 'x86') return { os, arch: 'x64', archGuessed: false }
        } catch {
            /* fall through to the user-agent string */
        }
    }

    if (/aarch64|arm64/i.test(ua)) return { os, arch: 'arm64', archGuessed: false }
    if (/x86_64|x64|amd64|Win64|WOW64/i.test(ua) && os !== 'macos') return { os, arch: 'x64', archGuessed: false }

    if (os === 'macos') {
        const gpu = macArchFromGpu()
        return { os, arch: gpu === 'unknown' ? 'arm64' : gpu, archGuessed: true }
    }
    if (os === 'windows' || os === 'linux') return { os, arch: 'x64', archGuessed: true }
    return { os, arch: 'unknown', archGuessed: true }
}

export type BrowserFamily = 'chromium' | 'firefox' | 'safari' | 'other'

export function detectBrowser(): BrowserFamily {
    const ua = navigator.userAgent
    if (/Firefox\//i.test(ua)) return 'firefox'
    if (/Chrome\/|Chromium\/|CriOS\/|Edg\/|OPR\//i.test(ua)) return 'chromium'
    if (/Safari\//i.test(ua)) return 'safari'
    return 'other'
}
