import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Favorites, Home } from './routes'

import { CatProvider } from '@/shared/providers'
import { Header } from '@/widgets/header'

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
