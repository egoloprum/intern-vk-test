import clsx from 'clsx'
import { Link, useLocation } from 'react-router-dom'

export const Header = () => {
	const { pathname } = useLocation()

	return (
		<header className="bg-[#2196F3] flex h-16 shadow-[0_4px_4px_0px_rgba(0,0,0,0.24)] px-16">
			<nav className="h-full flex">
				<Link
					className={clsx([
						'h-full flex justify-between items-center px-8 text-sm',
						pathname === '/' ? 'bg-[#1E88E5] text-white' : 'text-[#FFFFFFB2]'
					])}
					to="/"
				>
					Все котики
				</Link>
			</nav>
			<nav className="h-full flex">
				<Link
					className={clsx([
						'h-full flex justify-between items-center px-8 text-sm',
						pathname === '/favorites'
							? 'bg-[#1E88E5] text-white'
							: 'text-[#FFFFFFB2]'
					])}
					to="/favorites"
				>
					Любимые котики
				</Link>
			</nav>
		</header>
	)
}
