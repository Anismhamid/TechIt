import {FunctionComponent} from "react";
import Navbar from "./Navbar";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {

	return (
		<>
			<header className='sticky-top w-100'>
				<Navbar />
			</header>
			<main className='container text-center bg-dark min-vh-100'>
				<h1>Home</h1>
			</main>
		</>
	);
};

export default Home;
