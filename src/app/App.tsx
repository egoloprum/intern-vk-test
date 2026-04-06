import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Favorites, Home } from './routes'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
