import {FunctionComponent} from "react";
import Navbar from "./Navbar";
import MiniNav from "./MiniNav";
import AddModal from "./AddModal";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
	
	return (
		<>
			<header className='sticky-top w-100'>
				<Navbar />
			</header>
			<main className='container-fluid text-center bg-dark min-vh-100'>
				<h1 className='text-light bg-black'>Home</h1>
				<MiniNav />

			</main>
		</>
	);
};

export default Home;
