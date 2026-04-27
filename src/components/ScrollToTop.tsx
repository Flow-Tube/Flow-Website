import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function ScrollToTop() {
    const { pathname, hash } = useLocation()

    useEffect(() => {
        if (hash) {
            // Give the new page time to render before scrolling to hash
            setTimeout(() => {
                const element = document.querySelector(hash)
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                }
            }, 100)
        } else {
            window.scrollTo({ top: 0, behavior: 'instant' })
        }
    }, [pathname, hash])

    return null
}

export default ScrollToTop
