import {FunctionComponent} from "react";
import Navbar from "./Navbar";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
	return (
		<>
			<header>
				<Navbar />
			</header>
			<h1>Home</h1>
		</>
	);
};

export default Home;
