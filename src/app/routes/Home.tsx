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
			<div className="h-[calc(100dvh-64px)] flex justify-center items-center">
				загружаем котиков...
			</div>
		)
	if (error)
		return (
			<div className="h-[calc(100dvh-64px)] flex justify-center items-center">
				Ошибка: {error.message}
			</div>
		)
	if (!data)
		return (
			<div className="h-[calc(100dvh-64px)] flex justify-center items-center">
				Не найдено котиков
			</div>
		)

	const allCats = data.pages.flat()

	return (
		<main className="p-8 md:p-12 lg:p-16">
			<ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-13">
				{allCats.map((cat: Cat) => (
					<li key={cat.id} className="relative group">
						<img
							src={cat.url}
							alt="Cat"
							className={clsx([
								'w-full aspect-square object-cover cursor-pointer',
								'group-hover:scale-120 group-hover:shadow-[0_6px_5px_0px_rgba(0,0,0,0.24)] transition-all ease-in duration-100'
							])}
							loading="lazy"
						/>
						<div
							className={clsx([
								'absolute opacity-0 group-hover:opacity-100 transition-opacity max-lg:opacity-100',
								'lg:bottom-0 lg:right-0 md:bottom-2 md:right-2 bottom-4 right-4'
							])}
						>
							<button
								onClick={() => toggleFavorite(cat)}
								className="cursor-pointer"
							>
								<Heart
									className={clsx(
										'w-8 h-8 lg:w-12 lg:h-12 transition-all',
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
