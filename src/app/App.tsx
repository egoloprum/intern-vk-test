import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Favorites, Home } from './routes'
import { Header } from '../widgets/header'
import { CatProvider } from '../shared/providers'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <CatProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </CatProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
