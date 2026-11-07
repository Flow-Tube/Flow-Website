import { useEffect, useState } from 'react'
import { dataUrl } from '@/lib/data'

export interface Stats {
    stars: number
    downloads: number
    contributors: number
}

let cache: Stats | null = null
let failed = false
let pending: Promise<Stats | null> | null = null

function load(): Promise<Stats | null> {
    if (!pending) {
        pending = fetch(dataUrl('stats.json'))
            .then(res => res.json())
            .then(data => {
                cache = {
                    stars: Number(data.stars) || 0,
                    downloads: Number(data.downloads) || 0,
                    contributors: Number(data.contributors) || 0,
                }
                return cache
            })
            .catch(() => {
                failed = true
                return null
            })
    }
    return pending
}

export function useStatsState() {
    const [state, setState] = useState({ stats: cache, failed })

    useEffect(() => {
        if (cache || failed) return
        let active = true
        load().then(stats => { if (active) setState({ stats, failed: !stats }) })
        return () => { active = false }
    }, [])

    return state
}

export function useStats() {
    return useStatsState().stats
}

export function formatCompact(n: number) {
    return n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k' : n.toString()
}
