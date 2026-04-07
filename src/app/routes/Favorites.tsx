import clsx from 'clsx'
import { Heart } from 'lucide-react'

import { useCats } from '@/shared/providers'
import type { Cat, Favorite } from '@/shared/types'

export const Favorites = () => {
	const { favorites, favoritesLoading, toggleFavorite } = useCats()

	if (favoritesLoading) {
		return (
			<div className="h-[calc(100dvh-64px)] flex justify-center items-center">
				загружаем котиков...
			</div>
		)
	}

	if (!favorites.length) {
		return (
			<div className="h-[calc(100dvh-64px)] flex justify-center items-center">
				Нет любимых котиков
			</div>
		)
	}

	return (
		<main className="p-8 md:p-12 lg:p-16">
			<ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-13">
				{favorites.map((fav: Favorite) => (
					<li key={fav.id} className="relative group">
						<img
							src={fav.image?.url}
							alt="Cat"
							className={clsx([
								'w-full aspect-square object-cover cursor-pointer',
								'group-hover:scale-120 group-hover:shadow-[0_6px_5px_0px_rgba(0,0,0,0.24)] transition-all ease-in duration-100'
							])}
							loading="lazy"
						/>
						<div
							className={clsx([
								'absolute opacity-0 group-hover:opacity-100 transition-opacity max-sm:opacity-100',
								'sm:bottom-0 sm:right-0 bottom-4 right-4'
							])}
						>
							<button
								onClick={() =>
									toggleFavorite({
										id: fav.image_id,
										url: fav.image?.url || '',
										width: 0,
										height: 0
									} as Cat)
								}
								className="cursor-pointer"
							>
								<Heart
									className={clsx(
										'w-8 h-8 md:w-12 md:h-12 transition-all fill-[#F24E1E] stroke-[#F24E1E]',
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
