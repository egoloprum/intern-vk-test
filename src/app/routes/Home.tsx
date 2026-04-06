import { useCats } from '../../shared/providers'

export const Home = ({}) => {
  const { query } = useCats()
  const { data: cats, isLoading, error } = query

  if (isLoading) return <div>Loading cats...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!cats) return <div>No cats found</div>

  return (
    <main className="p-16">
      <ul className="grid grid-cols-5 gap-13">
        {cats.map(cat => (
          <li key={cat.id}>
            <img
              key={cat.id}
              src={cat.url}
              alt="Cat"
              className="w-56 h-56 object-cover hover:scale-120 hover:shadow-[0_6px_5px_0px_rgba(0,0,0,0.24)] transition-all ease-in duration-100 cursor-pointer"
            />
          </li>
        ))}
      </ul>
    </main>
  )
}
