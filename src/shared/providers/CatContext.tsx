import {
	type UseInfiniteQueryResult,
	type InfiniteData
} from '@tanstack/react-query'
import { createContext, useContext } from 'react'

import type { Cat, Favorite } from '../types'

export interface CatContextType {
	query: UseInfiniteQueryResult<InfiniteData<Cat[]>, Error>
	loadMore: () => void
	favorites: Favorite[]
	favoritesLoading: boolean
	toggleFavorite: (cat: Cat) => void
	isFavorite: (catId: string) => boolean
}

export const CatContext = createContext<CatContextType | undefined>(undefined)

export const useCats = () => {
	const context = useContext(CatContext)
	if (context === undefined) {
		throw new Error('useCats must be used within a CatProvider')
	}
	return context
}
