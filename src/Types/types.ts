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
