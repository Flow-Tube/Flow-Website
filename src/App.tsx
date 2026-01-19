import { Routes, Route } from 'react-router-dom'
import { Home } from '@/pages/Home'
import { Showcase } from '@/pages/Showcase'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inside-flow" element={<Showcase />} />
        </Routes>
    )
}

export default App
