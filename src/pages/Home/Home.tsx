import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context';

interface GlobalContextType {
	setSearchInput: (searchTerm: string) => void;
}

const Home = () => {
	const { setSearchInput }: GlobalContextType = useGlobalContext();
	const [searchText, setSearchText] = useState('');
	const navigate = useNavigate();

	const submitSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let searchInputTerm = searchText.trim().replace(/\s+/g, '+');
		if (searchInputTerm === '') {
			setSearchInput('');
		} else {
			setSearchInput(searchInputTerm);
			navigate('/book');
		}
	};

	const searchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value);
	};

	return (
		<div className="min-h-screen flex items-center justify-center text-center">
			<div className="header-content">
				<div className="w-full max-w-2xl">
					<div className="container mx-auto">
						<div className="flex justify-center">
							<form className="w-full" onSubmit={submitSearch}>
								<div className="flex items-center p-6 bg-white rounded-full">
									<input
										type="text"
										className="flex-1 text-2xl p-2"
										placeholder="Search Book/Books"
										value={searchText}
										onChange={searchInputChange}
									/>
									<button
										type="submit"
										className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-500"
									/>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;

// import React, { useRef, RefObject } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useGlobalContext } from '../../context';

// interface GlobalContextType {
// 	setSearchInput: (searchTerm: string) => void;
// }

// const Home = () => {
// 	const { setSearchInput }: GlobalContextType = useGlobalContext();
// 	const searchText: RefObject<HTMLInputElement> = useRef(null);
// 	const navigate = useNavigate();

// 	const submitSearch = (e: React.FormEvent<HTMLFormElement>) => {
// 		e.preventDefault();
// 		if (searchText.current) {
// 			let searchInputTerm = searchText.current.value
// 				.trim()
// 				.replace(/\s+/g, '+');
// 			if (searchInputTerm === '') {
// 				setSearchInput('');
// 			} else {
// 				setSearchInput(searchInputTerm);
// 				navigate('/book');
// 			}
// 	};

// 	const searchInput = (e: React.ChangeEvent<HTMLInputElement>) => {

// 	};

// 	return (
// 		<div className="min-h-screen flex items-center justify-center text-center">
// 			<div className="header-content">
// 				<div className="w-full max-w-2xl">
// 					<div className="container mx-auto">
// 						<div className="flex justify-center">
// 							<form className="w-full" onSubmit={submitSearch}>
// 								<div className="flex items-center p-6 bg-white rounded-full">
// 									<input
// 										type="text"
// 										className="flex-1 text-2xl p-2"
// 										placeholder="Search Book/Books"
// 										ref={searchText}
// 										onChange={searchInput}
// 									/>
// 									<button
// 										type="submit"
// 										className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-500"
// 									/>
// 								</div>
// 							</form>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default Home;
