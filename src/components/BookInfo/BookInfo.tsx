import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface Excerpts {
	excerpt: string;
	comment: string;
}

interface Book {
	description: string;
	title: string;
	cover_img: string;
	subjects: string[];
	excerpts: Excerpts[];
}

const URL = 'https://openlibrary.org/works/';

const BookInfo = () => {
	const { id } = useParams();
	const [book, setBook] = useState<Book | null>(null);
	const [firstTenSubjects, setFirstTenSubjects] = useState<string>('');

	useEffect(() => {
		async function getBookInfo() {
			try {
				const response = await fetch(`${URL}${id}.json`);
				const data = await response.json();

				if (data) {
					const { description, title, covers, subjects, excerpts } = data;
					let bookDescription = 'No description found';

					if (description) {
						if (typeof description === 'string') {
							bookDescription = description;
						} else if (description.value) {
							bookDescription = description.value;
						}
					}

					const newBook: Book = {
						description: bookDescription,
						title: title,
						cover_img: covers
							? `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg`
							: 'No cover found',
						subjects: subjects || [],
						excerpts: excerpts || [],
					};
					setBook(newBook);

					const firstTen = (subjects || []).slice(0, 10);
					setFirstTenSubjects(JSON.stringify(firstTen));
				} else {
					setBook(null);
				}
			} catch (error) {
				console.log(error);
			}
		}
		getBookInfo();
	}, [id]);

	return (
		<section className="py-24">
			<div className="container mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div className="max-h-[600px] overflow-hidden">
						<img src={book?.cover_img} alt="CoverArt" className="w-full" />
					</div>
					<div className="overflow-y-auto max-h-[600px] px-4">
						<div className="mb-6">
							<span className="font-semibold text-3xl">{book?.title}</span>
						</div>
						<div className="opacity-80">
							<span>{book?.description}</span>
						</div>
						<div className="opacity-80">
							<h4 className="font-semibold">Subjects:</h4>
							<span>{firstTenSubjects}</span>
						</div>
						<div className="opacity-80">
							{book?.excerpts &&
								book.excerpts.map((excerpt, index) => (
									<div key={index} className="mb-4">
										<p>
											<strong className="capitalize">
												{excerpt.comment}:{' '}
											</strong>
											{excerpt.excerpt}
										</p>
									</div>
								))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default BookInfo;
