import React, {
	useState,
	useContext,
	useEffect,
	useCallback,
	// useReducer,
} from 'react';

const URL = 'http://openlibrary.org/search.json?title=';

interface Book {
	id: string;
	author: string | undefined;
	cover_id: number | undefined;
	title: string;
	review?: string;
}

interface AppContextType {
	books: Book[];
	setSearchInput: React.Dispatch<React.SetStateAction<string>>;
	favorites: Book[];
	addToFavorites: (book: Book) => void;
	removeFromFavorites: (id: string) => void;
	doneRead: Book[];
	addToDoneRead: (book: Book) => void;
	removeFromDoneRead: (id: string) => void;
	addReview: (id: string, review: string) => void;
}

const AppContext = React.createContext<AppContextType | undefined>(undefined);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
	const [searchInput, setSearchInput] = useState('');
	const [books, setBooks] = useState<Book[]>([]);
	const [favorites, setFavorites] = useState<Book[]>(() => {
		const savedFavorites = localStorage.getItem('favorites');
		return savedFavorites ? JSON.parse(savedFavorites) : [];
	});
	const [doneRead, setDoneRead] = useState<Book[]>(() => {
		const savedDoneRead = localStorage.getItem('doneRead');
		return savedDoneRead ? JSON.parse(savedDoneRead) : [];
	});

	const fetchBooks = useCallback(async () => {
		try {
			const response = await fetch(`${URL}${searchInput}`);
			const data = await response.json();
			const { docs } = data;

			if (docs) {
				const newBooks = docs.slice(0, 20).map((bookSingle: any) => {
					const { key, author_name, cover_i, title } = bookSingle;

					return {
						id: key,
						author: author_name,
						cover_id: cover_i,
						title: title,
					};
				});

				setBooks(newBooks);
			} else {
				setBooks([]);
			}
		} catch (error) {
			console.log(error);
		}
	}, [searchInput]);

	useEffect(() => {
		fetchBooks();
	}, [searchInput, fetchBooks]);
	const addToFavorites = (book: Book) => {
		const updatedFavorites = [...favorites, book];
		setFavorites(updatedFavorites);
		localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
	};

	const removeFromFavorites = (id: string) => {
		const updatedFavorites = favorites.filter((book) => book.id !== id);
		setFavorites(updatedFavorites);
		localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
	};

	const addToDoneRead = (book: Book) => {
		const updatedDoneRead = [...doneRead, book];
		setDoneRead(updatedDoneRead);
		localStorage.setItem('doneRead', JSON.stringify(updatedDoneRead));
	};

	const removeFromDoneRead = (id: string) => {
		const updatedDoneRead = doneRead.filter((book) => book.id !== id);
		setDoneRead(updatedDoneRead);
		localStorage.setItem('doneRead', JSON.stringify(updatedDoneRead));
	};

	const addReview = (id: string, review: string) => {
		const updatedDoneRead = doneRead.map((book) => {
			if (book.id === id) {
				return { ...book, review };
			}
			return book;
		});
		setDoneRead(updatedDoneRead);
		localStorage.setItem('doneRead', JSON.stringify(updatedDoneRead));
	};

	return (
		<AppContext.Provider
			value={{
				books,
				setSearchInput,
				favorites,
				addToFavorites,
				removeFromFavorites,
				doneRead,
				addToDoneRead,
				removeFromDoneRead,
				addReview,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useGlobalContext = () => {
	const context = useContext(AppContext);

	if (context === undefined) {
		throw new Error('useGlobalContext must be used within an AppProvider');
	}

	return context;
};

export { AppContext, AppProvider };
