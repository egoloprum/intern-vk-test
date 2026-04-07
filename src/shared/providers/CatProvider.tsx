import React, { createContext, useContext, type ReactNode, useCallback } from 'react'
import {
  useInfiniteQuery,
  type UseInfiniteQueryResult,
  type InfiniteData,
} from '@tanstack/react-query'
import type { Cat, Favorite } from '../types'
import { useLocalStorage } from '../hooks/useLocalStorage'

interface CatContextType {
  query: UseInfiniteQueryResult<InfiniteData<Cat[]>, Error>
  loadMore: () => void
  favorites: Favorite[]
  favoritesLoading: boolean
  toggleFavorite: (cat: Cat) => void
  isFavorite: (catId: string) => boolean
}

const CatContext = createContext<CatContextType | undefined>(undefined)

const API_URL = import.meta.env.VITE_API_URL || 'https://api.thecatapi.com/v1'
const API_KEY = import.meta.env.VITE_API_KEY
const PAGE_SIZE = 15

const FAVORITES_STORAGE_KEY = 'cat_favorites'

const fetchCats = async ({ pageParam = 0 }: { pageParam?: number }): Promise<Cat[]> => {
  const headers: HeadersInit = {}
  if (API_KEY) headers['x-api-key'] = API_KEY

  const response = await fetch(`${API_URL}/images/search?limit=${PAGE_SIZE}&page=${pageParam}`, {
    headers,
  })
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
  return response.json()
}

export const CatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useLocalStorage<Favorite[]>(FAVORITES_STORAGE_KEY, [])

  const query = useInfiniteQuery<Cat[], Error, InfiniteData<Cat[]>, [string], number>({
    queryKey: ['cats'],
    queryFn: fetchCats,
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.length < PAGE_SIZE) return undefined
      return lastPageParam + 1
    },
    staleTime: 5 * 60 * 1000,
  })

  const toggleFavorite = useCallback(
    (cat: Cat) => {
      setFavorites(prev => {
        const existing = prev.find(fav => fav.image_id === cat.id)
        if (existing) {
          return prev.filter(fav => fav.image_id !== cat.id)
        } else {
          const newFavorite: Favorite = {
            id: Date.now(),
            image_id: cat.id,
            sub_id: 'local',
            created_at: new Date().toISOString(),
            image: {
              id: cat.id,
              url: cat.url,
            },
          }
          return [...prev, newFavorite]
        }
      })
    },
    [setFavorites]
  )

  const isFavorite = useCallback(
    (catId: string) => favorites.some(fav => fav.image_id === catId),
    [favorites]
  )

  const loadMore = useCallback(() => {
    if (query.hasNextPage && !query.isFetchingNextPage) {
      query.fetchNextPage()
    }
  }, [query])

  const value: CatContextType = {
    query,
    loadMore,
    favorites,
    favoritesLoading: false,
    toggleFavorite,
    isFavorite,
  }

  return <CatContext.Provider value={value}>{children}</CatContext.Provider>
}

export const useCats = () => {
  const context = useContext(CatContext)
  if (context === undefined) {
    throw new Error('useCats must be used within a CatProvider')
  }
  return context
}
