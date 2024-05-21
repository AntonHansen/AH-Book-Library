import SearchComp from '../../components/SearchComp/SearchComp';

const Home = () => {
	return (
		<div className="min-h-screen flex items-center justify-center text-center">
			<div className="header-content">
				<h2 className="header-title capitalize">Search Book</h2>
				<br />
				<SearchComp />
			</div>
		</div>
	);
};

export default Home;
