import {FunctionComponent, useEffect, useState} from "react";
import Navbar from "./Navbar";
import {Product} from "../interfaces/Product";
import {getTheProducts} from "../services/ProductsServices";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
	faCartShopping,
	faEdit,
	faShekelSign,
	faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

interface ProductsProps {}

const Products: FunctionComponent<ProductsProps> = () => {
	const shekel = <FontAwesomeIcon icon={faShekelSign} />;
	const cart = <FontAwesomeIcon icon={faCartShopping} />;
	const edit = <FontAwesomeIcon icon={faEdit} />;
	const deleteItem = <FontAwesomeIcon icon={faTrash} />;
	let admin = localStorage.getItem("admin");

	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		try {
			getTheProducts()
				.then((response) => {
					setProducts(response.data);
					console.log(admin);
				})
				.catch((err) => console.log(err));
		} catch (error) {
			console.log(error);
		}
	}, [admin]);

	return (
		<>
			<header className='sticky-top w-100'>
				<Navbar />
			</header>
			<main className='container text-center bg-dark min-vh-100'>
				<div className='row'>
					{products.length ? (
						products.map((product) => (
							<div
								className='col-md-6 col-sm-12 col-lg-3 mt-5'
								key={product.id}
							>
								<div className='card '>
									<div className='card-img'>
										<Link to={`/productDetails/${product.id}`}>
											<img
												className='card-img-top'
												src={product.image}
												alt={product.name}
											/>
										</Link>
									</div>
									<div className='card-body'>
										<h6>{product.category}</h6>
										<Link to={`/productDetails/${product.id}`}>
											<h5 className='card-title'>{product.name}</h5>
										</Link>
										<h5 className='card-text'>
											{product.description}
										</h5>
										<h5 className='card-text'>
											<p className=' text-success'>
												{shekel} {product.price}
											</p>
										</h5>
										<button className='btn btn-primary w-50 rounded-start-0 my-2'>
											{cart}Add to cart
										</button>
										{admin && (
											<div className='w-100 d-flex align-items-center justify-content-around bg-black'>
												<button className='btn w-25 btn-warning mx-4'>
													{edit}
												</button>
												<button className='btn w-25 btn-danger my-2'>
													{deleteItem}
												</button>
											</div>
										)}
									</div>
								</div>
							</div>
						))
					) : (
						<div className='card-text text-danger'>
							<h5 className='text-danger'>No Data to show</h5>
						</div>
					)}
				</div>
			</main>
		</>
	);
};

export default Products;
