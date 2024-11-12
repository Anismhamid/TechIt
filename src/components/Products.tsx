import {FunctionComponent, useEffect, useState} from "react";
import Navbar from "./Navbar";
import {Product} from "../interfaces/Product";
import {getTheProducts} from "../services/ProductsServices";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShekelSign} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

interface ProductsProps {}

const Products: FunctionComponent<ProductsProps> = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const shekel = <FontAwesomeIcon icon={faShekelSign} />;
	useEffect(() => {
		try {
			getTheProducts()
				.then((response) => setProducts(response.data))
				.catch((err) => console.log(err));
		} catch (error) {
			console.log(error);
		}
	}, []);

	return (
		<>
			<header className='sticky-top w-100'>
				<Navbar />
			</header>
			<main className='container text-center bg-dark min-vh-100'>
				<table className='table table-striped table-hover table-warning'>
					<thead>
						<tr>
							<th>name</th>
							<th>price</th>
							<th>caregory</th>
							<th>image</th>
						</tr>
					</thead>
					<tbody>
						{products.length ? (
							products.map((product) => (
								<tr key={product.id}>
									<td>
										<Link to={`/productDetails/${product.id}`}>
											{product.name}
										</Link>
									</td>
									<td>
										{shekel} {product.price}
									</td>
									<td>{product.category}</td>
									<td>
										<Link to={`/${product.id}`}>
											<img
												className='img-fluid w-50'
												src={product.image}
												alt={product.name}
											/>
										</Link>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td className=' text-danger'>No Data to show</td>
							</tr>
						)}
					</tbody>
				</table>
			</main>
		</>
	);
};

export default Products;
