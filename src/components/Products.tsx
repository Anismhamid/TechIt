import {FunctionComponent} from "react";
import Navbar from "./Navbar";

interface ProductsProps {}

const Products: FunctionComponent<ProductsProps> = () => {
	return (
		<>
			<header>
				<Navbar />
			</header>
			<h1>Products</h1>
		</>
	);
};

export default Products;
