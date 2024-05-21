import React, { useRef, useEffect, RefObject } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context';

interface GlobalContextType {
	setSearchInput: (searchTerm: string) => void;
}

const SearchComp = () => {
	const { setSearchInput }: GlobalContextType = useGlobalContext();
	const searchText: RefObject<HTMLInputElement> = useRef(null);
	const navigate = useNavigate();

	useEffect(() => searchText.current?.focus(), []);
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (searchText.current) {
			let searchInputTerm = searchText.current.value.trim();
			if (searchInputTerm === '') {
				setSearchInput('');
			} else {
				setSearchInput(searchInputTerm);
				navigate('/book');
			}
		}
	};

	return (
		<div className="w-full max-w-2xl">
			<div className="container mx-auto">
				<div className="flex justify-center">
					<form className="w-full" onSubmit={handleSubmit}>
						<div className="flex items-center p-6 bg-white rounded-full">
							<input
								type="text"
								className="flex-1 text-2xl p-2"
								placeholder="Search for..."
								ref={searchText}
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
	);
};

export default SearchComp;
