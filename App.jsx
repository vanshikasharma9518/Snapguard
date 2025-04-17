import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import MediaPage from './pages/MediaPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/media" element={<MediaPage />} />
    </Routes>
  )
}

export default App