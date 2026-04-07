import clsx from 'clsx'
import { Heart } from 'lucide-react'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import { useCats } from '@/shared/providers'
import type { Cat } from '@/shared/types'

export const Home = () => {
	const { query, loadMore, toggleFavorite, isFavorite } = useCats()
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
					<li key={cat.id} className="relative group">
						<img
							src={cat.url}
							alt="Cat"
							className={clsx([
								'w-56 h-56 object-cover cursor-pointer',
								'group-hover:scale-120 group-hover:shadow-[0_6px_5px_0px_rgba(0,0,0,0.24)] transition-all ease-in duration-100'
							])}
							loading="lazy"
						/>
						<div className="absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
							<button
								onClick={() => toggleFavorite(cat)}
								className="cursor-pointer"
							>
								<Heart
									className={clsx(
										'w-12 h-12 transition-all',
										'hover:fill-[#F24E1E] hover:stroke-[#F24E1E]',
										isFavorite(cat.id)
											? 'fill-[#FF3A00] stroke-[#FF3A00]'
											: 'fill-none stroke-[#F24E1E]'
									)}
								/>
							</button>
						</div>
					</li>
				))}
			</ul>

			<div
				ref={ref}
				className="h-12 w-full flex justify-center items-center mt-4"
			>
				{isFetchingNextPage && <div>... загружаем еще котиков ...</div>}
				{!hasNextPage && <div>Больше нет котиков</div>}
			</div>
		</main>
	)
}
