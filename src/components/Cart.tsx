import {FunctionComponent} from "react";
import Navbar from "./Navbar";

interface CartProps {}

const Cart: FunctionComponent<CartProps> = () => {
	return (
		<>
			<header>
				<Navbar />
			</header>
			<main className='container text-center bg-dark min-vh-100'>
				<h1>Cart</h1>
			</main>
		</>
	);
};

export default Cart;
