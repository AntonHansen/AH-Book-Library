import { useState } from 'react';
import { useGlobalContext } from '../../context';
import Book from '../../components/Book/Book';

const DoneRead = () => {
	const { doneRead, removeFromDoneRead, addReview } = useGlobalContext();

	const [showInput, setShowInput] = useState<Record<string, boolean>>({});
	const [reviews, setReviews] = useState<Record<string, string>>({});

	const handleButtonClick = (id: string) => {
		setShowInput((prev) => ({ ...prev, [id]: !prev[id] }));
	};

	const handleInputChange = (id: string, value: string) => {
		setReviews((prev) => ({ ...prev, [id]: value }));
	};

	const handleSubmit = (id: string) => {
		addReview(id, reviews[id] || '');
		setShowInput((prev) => ({ ...prev, [id]: false }));
	};

	return (
		<section className="read-books">
			<div className="container">
				<div className="flex justify-center items-center">
					<h2 className="font-bold tracking-wide">Read Books</h2>
				</div>
				<div className="read-books-content grid">
					{doneRead.map((book) => (
						<div key={book.id}>
							<Book {...book} />
							<div className="flex justify-center items-center">
								{' '}
								<button onClick={() => removeFromDoneRead(book.id)}>
									Remove from Read Books{' '}
								</button>
								<div>
									<button onClick={() => handleButtonClick(book.id)}>
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
											<button onClick={() => handleSubmit(book.id)}>
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
