import { useEffect, useState } from 'react'

let cache: string | null = null
let pending: Promise<string | null> | null = null

function compareVersions(a: string, b: string) {
    const pa = a.split('.').map(Number)
    const pb = b.split('.').map(Number)
    for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
        const diff = (pa[i] || 0) - (pb[i] || 0)
        if (diff !== 0) return diff
    }
    return 0
}

function isPreRelease(entry: { content: string; status?: string }) {
    const status = entry.status || entry.content.match(/^STATUS:\s*(.+)$/im)?.[1] || ''
    return status.trim().toUpperCase() === 'PRE-RELEASE'
}

function load(): Promise<string | null> {
    if (!pending) {
        pending = fetch('/changelogs.json')
            .then(res => res.json())
            .then((entries: { content: string; platform?: string; status?: string }[]) => {
                const versions = entries
                    .filter(entry => entry.platform !== 'desktop')
                    .filter(entry => !isPreRelease(entry))
                    .map(entry => entry.content.match(/^VERSION:\s*([\d.]+)/im)?.[1])
                    .filter((v): v is string => Boolean(v))
                cache = versions.sort(compareVersions).pop() ?? null
                return cache
            })
            .catch(() => null)
    }
    return pending
}

export function useLatestVersion() {
    const [version, setVersion] = useState<string | null>(cache)

    useEffect(() => {
        if (cache) return
        let active = true
        load().then(v => { if (active && v) setVersion(v) })
        return () => { active = false }
    }, [])

    return version
}
