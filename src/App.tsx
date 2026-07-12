import { Routes, Route } from 'react-router-dom'
import { Home } from '@/pages/Home'
import { ChangelogPage } from '@/pages/Changelog'
import { NotFound } from '@/pages/NotFound'

import { PrivacyPolicy } from '@/pages/PrivacyPolicy'
import { DMCA } from '@/pages/DMCA'
import { About } from '@/pages/About'
import { Patrons } from '@/pages/Patrons'
import { ScrollToTop } from '@/components/ScrollToTop'

function App() {
    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/changelog" element={<ChangelogPage />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/dmca" element={<DMCA />} />
                <Route path="/about" element={<About />} />
                <Route path="/patrons" element={<Patrons />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    )
}

export default App
