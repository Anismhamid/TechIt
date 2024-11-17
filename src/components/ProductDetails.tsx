import {FunctionComponent, useEffect, useState} from "react";
import {getTheSpicificProduct} from "../services/ProductsServices";
import Navbar from "./Navbar";
import {Product} from "../interfaces/Product";
import { useNavigate, useParams} from "react-router-dom";
import {cart, deleteItem, edit, shekel} from "../fontAwesome/FontAwesome";
import MiniNav from "./MiniNav";

interface ProductDetailsProps {}

const ProductDetails: FunctionComponent<ProductDetailsProps> = () => {
	const {id} = useParams();
	const admin = localStorage.getItem("admin");
	const navigate = useNavigate();
	const [product, setProduct] = useState<Product[]>([]);

	useEffect(() => {
		if (id) {
			getTheSpicificProduct(id)
				.then((res) => {
					setProduct(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [id]);

	return (
		<>
			<header className='sticky-top w-100'>
				<Navbar  />
			</header>
			<main className='container-fluid pt-5 text-center bg-dark min-vh-100'>
			
				<h1 className='text-light bg-black'>Product Details</h1>
				{product.length ? (
					product.map((product) => (
						<div id='card' className='card py-5' key={product.id}>
							<div className='card-header'>
								<h5 className='card-title'>{product.name}</h5>
							</div>
							<div className='card-body'>
								<div className='card-img'>
									<img
										className='img-fluid'
										src={product.image}
										alt={product.name || "Product Image"}
									/>
								</div>

								{admin ? (
									<h5 className='card-text my-3'>
										<span className=' text-success fw-bold display-6'>
											15%
										</span>{" "}
										{shekel}{" "}
										{(
											(product.price ** product.price /
												product.price) %
											50
										).toFixed(2)}
									</h5>
								) : (
									<h5 className='card-text my-3'>
										{shekel} {product.price}
									</h5>
								)}
								<button
									className='btn btn-primary rounded-0'
									type='button'
								>
									{cart}Add to cart
								</button>
								<h5 className='card-text my-3'>{product.description}</h5>
							</div>
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
							<div className=' card-footer'>
								<button
									onClick={() => navigate(-1)}
									className='btn btn-dark w-50 m-auto mt-5'
									type='button'
								>
									back
								</button>
							</div>
						</div>
					))
				) : (
					<p>No Data</p>
				)}
				<MiniNav />
			</main>
		</>
	);
};

export default ProductDetails;
