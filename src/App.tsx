import Navbar from './components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';

const App = () => {
	return (
		<main>
			<header className="w-full">
				<Navbar />
			</header>
			<Outlet />
		</main>
	);
};

export default App;
