// import { useState } from 'react';
import { useGlobalContext } from '../../context';
import Book from '../../components/Book/Book';
import FavoriteIcon from '@mui/icons-material/Favorite';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const SearchResult = () => {
	const { books, addToFavorites, addToDoneRead } = useGlobalContext();
	// const [isFavorite, setIsFavorite] = useState(false);
	const searchResultsBooks = books.slice(0, 10).map((singleBook) => {
		return {
			...singleBook,
			id: singleBook.id.replace('/works/', ''),
			cover_img: singleBook.cover_id
				? `https://covers.openlibrary.org/b/id/${singleBook.cover_id}-L.jpg`
				: 'No cover found',
		};
	});

	return (
		<section className="searchresult">
			<div className="container">
				<div className="section-title"></div>
				<div className="searchresult-content grid">
					{searchResultsBooks.map((item, index) => {
						return (
							<div key={index}>
								<Book {...item} />
								<div className="flex justify-center items-center">
									<FavoriteIcon
										onClick={() => {
											addToFavorites(item);
										}}
									></FavoriteIcon>
									<button onClick={() => addToDoneRead(item)}>
										Completed Book
									</button>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default SearchResult;
