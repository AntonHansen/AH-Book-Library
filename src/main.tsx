import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context';
import Home from './pages/Home/Home.tsx';
import SearchResult from './pages/SearchResult/SearchResult.tsx';
import BookInfo from './components/BookInfo/BookInfo.tsx';
import Favorites from './pages/Favorites/Favorites';
import DoneRead from './pages/DoneRead/DoneRead.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	// <React.StrictMode>
	// </React.StrictMode>,
	<AppProvider>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}>
					<Route path="home" element={<Home />} />
					<Route path="favorites" element={<Favorites />} />
					<Route path="doneRead" element={<DoneRead />} />
					<Route path="book" element={<SearchResult />} />
					<Route path="/book/:id" element={<BookInfo />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</AppProvider>
);
