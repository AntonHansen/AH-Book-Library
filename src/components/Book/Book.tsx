import { Link } from 'react-router-dom';

const Book = (book: any) => {
	const authors = book.author ? book.author.join(', ') : '';

	return (
		<div className="flex flex-col items-center p-6">
			<div className="mb-6" id="cover-book">
				<Link to={`/book/${book.id}`} {...book}>
					<img
						src={book.cover_img}
						alt="cover"
						className="max-w-[180px] mx-auto"
					/>
				</Link>
			</div>
			<div className="text-center" id="title-book">
				<Link to={`/book/${book.id}`} {...book}>
					<div className="font-semibold text-lg mb-2 leading-tight">
						<span>{book.title}</span>
					</div>
				</Link>

				{authors && (
					<div className="text-sm mb-1" id="author-book">
						<span className="font-semibold capitalize">Author: </span>
						<span>{authors}</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default Book;
