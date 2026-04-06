import { useCats } from '../../shared/providers'

export const Home = ({}) => {
  const { query, refetchCats } = useCats()
  const { data: cats, isLoading, error } = query

  if (isLoading) return <div>Loading cats...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <button onClick={() => refetchCats()}>Refresh</button>
      <div className="grid grid-cols-3 gap-4">
        {cats?.map(cat => (
          <img key={cat.id} src={cat.url} alt="Cat" className="w-full h-64 object-cover" />
        ))}
      </div>
    </div>
  )
}
