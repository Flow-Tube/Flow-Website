import { Routes, Route } from 'react-router-dom'
import { Home } from '@/pages/Home'
import { Showcase } from '@/pages/Showcase'
import { ChangelogPage } from '@/pages/Changelog'
import { NotFound } from '@/pages/NotFound'

import { PrivacyPolicy } from '@/pages/PrivacyPolicy'
import { DMCA } from '@/pages/DMCA'
import { About } from '@/pages/About'
import { ScrollToTop } from '@/components/ScrollToTop'

function App() {
    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/inside-flow" element={<Showcase />} />
                <Route path="/changelog" element={<ChangelogPage />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/dmca" element={<DMCA />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    )
}

export default App
