import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Favorites, Home } from './routes'
import { Header } from '../widgets/header'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
