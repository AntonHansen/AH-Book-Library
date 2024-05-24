import React, { useState, useContext, useEffect } from 'react';
import useFetch from './hooks/useFetch';

const URL = 'http://openlibrary.org/search.json?title=';

interface Book {
	id: string;
	author: string | undefined;
	cover_id: number | undefined;
	title: string;
	review?: string;
	rating?: number;
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
	addRating: (id: string, rating: number) => void;
}

const AppContext = React.createContext<AppContextType | undefined>(undefined);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
	const [searchInput, setSearchInput] = useState<string>('');
	const [books, setBooks] = useState<Book[]>([]);
	const [favorites, setFavorites] = useState<Book[]>(() => {
		const savedFavorites = localStorage.getItem('favorites');
		return savedFavorites ? JSON.parse(savedFavorites) : [];
	});
	const [doneRead, setDoneRead] = useState<Book[]>(() => {
		const savedDoneRead = localStorage.getItem('doneRead');
		return savedDoneRead ? JSON.parse(savedDoneRead) : [];
	});

	const { data, error } = useFetch(`${URL}${searchInput}`);

	useEffect(() => {
		if (data) {
			const { docs } = data;
			const newBooks = docs.slice(0, 10).map((bookSingle: any) => {
				const { key, author_name, cover_i, title } = bookSingle;
				return {
					id: key,
					author: author_name,
					cover_id: cover_i,
					title: title,
				};
			});
			console.log(newBooks);
			setBooks(newBooks);
		} else if (error) {
			console.log(error);
		}
	}, [data, error]);

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

	const addRating = (id: string, rating: number) => {
		const updatedDoneRead = doneRead.map((book) => {
			if (book.id === id) {
				return { ...book, rating };
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
				addRating,
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
