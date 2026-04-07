import { Heart } from 'lucide-react'
import { useCats } from '../../shared/providers'
import type { Cat, Favorite } from '../../shared/types'
import clsx from 'clsx'

export const Favorites = () => {
  const { favorites, favoritesLoading, toggleFavorite } = useCats()

  if (favoritesLoading) {
    return (
      <div className="h-[calc(100vh-64px)] flex justify-center items-center">
        загружаем котиков...
      </div>
    )
  }

  if (!favorites.length) {
    return (
      <div className="h-[calc(100vh-64px)] flex justify-center items-center">
        Нет любимых котиков
      </div>
    )
  }

  return (
    <main className="p-16">
      <ul className="grid grid-cols-5 gap-13">
        {favorites.map((fav: Favorite) => (
          <li key={fav.id} className="relative group">
            <img
              src={fav.image?.url}
              alt="Cat"
              className={clsx([
                'w-56 h-56 object-cover cursor-pointer',
                'group-hover:scale-120 group-hover:shadow-[0_6px_5px_0px_rgba(0,0,0,0.24)] transition-all ease-in duration-100',
              ])}
              loading="lazy"
            />
            <div className="absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() =>
                  toggleFavorite({
                    id: fav.image_id,
                    url: fav.image?.url || '',
                    width: 0,
                    height: 0,
                  } as Cat)
                }
                className="cursor-pointer"
              >
                <Heart
                  className={clsx(
                    'w-12 h-12 transition-all fill-[#F24E1E] stroke-[#F24E1E]',
                    'hover:scale-110'
                  )}
                />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}
