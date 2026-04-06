import React, { createContext, useContext, type ReactNode } from 'react'
import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import type { Cat } from '../../entities/Cat'

interface CatContextType {
  query: UseQueryResult<Cat[], Error>
  refetchCats: () => void
}

const CatContext = createContext<CatContextType | undefined>(undefined)

const API_URL = import.meta.env.VITE_API_URL || 'https://api.thecatapi.com/v1'
const API_KEY = import.meta.env.VITE_API_KEY

const fetchCats = async (limit: number = 15): Promise<Cat[]> => {
  const headers: HeadersInit = {}
  if (API_KEY) headers['x-api-key'] = API_KEY

  const response = await fetch(`${API_URL}/images/search?limit=${limit}`, { headers })
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
  return response.json()
}

export const CatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const query = useQuery<Cat[], Error>({
    queryKey: ['cats'],
    queryFn: () => fetchCats(15),
    staleTime: 5 * 60 * 1000,
  })

  const refetchCats = () => {
    query.refetch()
  }

  const value: CatContextType = {
    query,
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
