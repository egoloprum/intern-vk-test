import { useCats } from '../../shared/providers'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import type { Cat } from '../../shared/types'

export const Home = () => {
  const { query, loadMore } = useCats()
  const { data, isLoading, error, isFetchingNextPage, hasNextPage } = query

  const { ref, inView } = useInView({ threshold: 0 })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      loadMore()
    }
  }, [inView, hasNextPage, isFetchingNextPage, loadMore])

  if (isLoading)
    return (
      <div className="h-[calc(100vh-64px)] flex justify-center items-center">
        загружаем котиков...
      </div>
    )
  if (error)
    return (
      <div className="h-[calc(100vh-64px)] flex justify-center items-center">
        Ошибка: {error.message}
      </div>
    )
  if (!data)
    return (
      <div className="h-[calc(100vh-64px)] flex justify-center items-center">
        Не найдено котиков
      </div>
    )

  const allCats = data.pages.flat()

  return (
    <main className="p-16">
      <ul className="grid grid-cols-5 gap-13">
        {allCats.map((cat: Cat) => (
          <li key={cat.id}>
            <img
              src={cat.url}
              alt="Cat"
              className="w-56 h-56 object-cover hover:scale-120 hover:shadow-[0_6px_5px_0px_rgba(0,0,0,0.24)] transition-all ease-in duration-100 cursor-pointer"
            />
          </li>
        ))}
      </ul>

      <div ref={ref} className="h-12 w-full flex justify-center items-center mt-4">
        {isFetchingNextPage && <div>... загружаем еще котиков ...</div>}
        {!hasNextPage && <div>Больше нет котиков</div>}
      </div>
    </main>
  )
}
