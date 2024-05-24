import { useState } from 'react';
import { useGlobalContext } from '../../context';
import Book from '../../components/Book/Book';
import Rating from '@mui/material/Rating';

const DoneRead = () => {
	const { doneRead, removeFromDoneRead, addReview, addRating } =
		useGlobalContext();

	const [showInput, setShowInput] = useState<Record<string, boolean>>({});
	const [reviews, setReviews] = useState<Record<string, string>>({});

	const btnClickReview = (id: string) => {
		setShowInput((prev) => ({ ...prev, [id]: !prev[id] }));
	};

	const handleInputChange = (id: string, value: string) => {
		setReviews((prev) => ({ ...prev, [id]: value }));
	};

	const submitReview = (id: string) => {
		addReview(id, reviews[id] || '');
		setShowInput((prev) => ({ ...prev, [id]: false }));
	};

	const handleRatingChange = (id: string, value: number | null) => {
		if (value !== null) {
			addRating(id, value);
		}
	};

	return (
		<section className="read-books flex justify-center items-center">
			<div className="container">
				<div className="flex justify-center items-center">
					<h2 className="font-bold tracking-wide">Read Books</h2>
				</div>
				<div className="read-books-content grid">
					{doneRead.map((book) => (
						<div key={book.id}>
							<Book {...book} />
							<div className="flex justify-center items-center">
								<button onClick={() => removeFromDoneRead(book.id)}>
									Remove from Read Books
								</button>
								<div>
									<Rating
										sx={{
											'& .MuiRating-iconFilled': {
												color: 'black',
											},
										}}
										name={`rating-${book.id}`}
										value={book.rating || 0}
										onChange={(_, newValue) => {
											handleRatingChange(book.id, newValue);
										}}
									/>
								</div>
								<div>
									<button onClick={() => btnClickReview(book.id)}>
										Review
									</button>
									{showInput[book.id] && (
										<div>
											<input
												type="text"
												value={reviews[book.id] || ''}
												onChange={(e) =>
													handleInputChange(book.id, e.target.value)
												}
											/>
											<button onClick={() => submitReview(book.id)}>
												Submit
											</button>
										</div>
									)}
									{book.review && <p>{book.review}</p>}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default DoneRead;
