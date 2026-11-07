const base: string = import.meta.env.VITE_DATA_URL || 'https://assets.flow-tube.org/data/v1/'

export const DATA_URL = base.endsWith('/') ? base : `${base}/`

export function dataUrl(file: string) {
    return `${DATA_URL}${file}`
}
