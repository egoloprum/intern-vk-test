import React, { createContext, useContext, type ReactNode, useCallback } from 'react'
import {
  useInfiniteQuery,
  type UseInfiniteQueryResult,
  type InfiniteData,
} from '@tanstack/react-query'
import type { Cat } from '../../entities/Cat'

interface CatContextType {
  query: UseInfiniteQueryResult<InfiniteData<Cat[]>, Error>
  loadMore: () => void
  refetchCats: () => void
}

const CatContext = createContext<CatContextType | undefined>(undefined)

const API_URL = import.meta.env.VITE_API_URL || 'https://api.thecatapi.com/v1'
const API_KEY = import.meta.env.VITE_API_KEY
const PAGE_SIZE = 15

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

  const loadMore = useCallback(() => {
    if (query.hasNextPage && !query.isFetchingNextPage) {
      query.fetchNextPage()
    }
  }, [query])

  const refetchCats = useCallback(() => {
    query.refetch()
  }, [query])

  const value: CatContextType = {
    query,
    loadMore,
    refetchCats,
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
