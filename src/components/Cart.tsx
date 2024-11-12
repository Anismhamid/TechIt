import {FunctionComponent} from "react";
import Navbar from "./Navbar";

interface CartProps {}

const Cart: FunctionComponent<CartProps> = () => {
	return (
		<>
			<header>
				<Navbar />
			</header>
			<h1>Cart</h1>
		</>
	);
};

export default Cart;
