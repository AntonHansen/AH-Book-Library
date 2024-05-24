import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<nav className="py-6 border-b-2">
			<div className="container mx-auto flex justify-between items-center">
				<div className="flex items-center justify-between w-full lg:w-auto">
					<Link to="home" className="flex items-center">
						<span className="capitalize font-bold text-xl tracking-wide ml-8">
							Book Library
						</span>
					</Link>
				</div>
				<div>
					<ul className="flex flex-col lg:flex-row items-center">
						<li className="mb-6 lg:mb-0 lg:ml-7">
							<Link to="favorites" className="capitalize text-lg font-semibold">
								Favorites
							</Link>
						</li>
						<li className="mb-6 lg:mb-0 lg:ml-7">
							<Link to="doneRead" className="capitalize text-lg font-semibold">
								My Read Books
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
