import { useGlobalContext } from '../../context';
import Book from '../../components/Book/Book';

const Favorites = () => {
	const { favorites, removeFromFavorites } = useGlobalContext();

	return (
		<section className="favorite-books flex justify-center items-center">
			<div className="container">
				<div className="flex justify-center items-center">
					<h2 className="font-bold tracking-wide">Favorite Books</h2>
				</div>
				<div className="favorite-books-content grid">
					{favorites.map((book) => (
						<div key={book.id}>
							<Book {...book} />
							<div className="flex justify-center items-center">
								{' '}
								<button onClick={() => removeFromFavorites(book.id)}>
									Remove from Favorites
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
export default Favorites;
