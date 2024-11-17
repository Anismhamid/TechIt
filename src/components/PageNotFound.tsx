import {FunctionComponent} from "react";
import Navbar from "./Navbar";
import MiniNav from "./MiniNav";

interface PageNotFoundProps {}

const PageNotFound: FunctionComponent<PageNotFoundProps> = () => {
	return (
		<>
			<header className='sticky-top w-100'>
				<Navbar />
			</header>
			<main className='container text-center'>
				<div className='fourZeroFour'></div>
				<MiniNav />
			</main>
		</>
	);
};

export default PageNotFound;
