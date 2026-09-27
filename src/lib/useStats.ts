import { useEffect, useState } from 'react'

export interface Stats {
    stars: number
    downloads: number
    contributors: number
}

let cache: Stats | null = null
let pending: Promise<Stats | null> | null = null

function load(): Promise<Stats | null> {
    if (!pending) {
        pending = fetch('/stats.json')
            .then(res => res.json())
            .then(data => {
                cache = {
                    stars: Number(data.stars) || 0,
                    downloads: Number(data.downloads) || 0,
                    contributors: Number(data.contributors) || 0,
                }
                return cache
            })
            .catch(() => null)
    }
    return pending
}

export function useStats() {
    const [stats, setStats] = useState<Stats | null>(cache)

    useEffect(() => {
        if (cache) return
        let active = true
        load().then(s => { if (active && s) setStats(s) })
        return () => { active = false }
    }, [])

    return stats
}

export function formatCompact(n: number) {
    return n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k' : n.toString()
}
