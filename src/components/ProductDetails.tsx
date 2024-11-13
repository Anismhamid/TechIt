import {FunctionComponent, useEffect, useState} from "react";
import {getTheSpicificProduct} from "../services/ProductsServices";
import Navbar from "./Navbar";
import {Product} from "../interfaces/Product";
import {useNavigate, useParams} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShekelSign} from "@fortawesome/free-solid-svg-icons";
import {useSelector} from "react-redux";
import {LoginState} from "../redux/LoginState";

interface ProductDetailsProps {}

const ProductDetails: FunctionComponent<ProductDetailsProps> = () => {
	const {id} = useParams();
	const user = useSelector((state: {Login: LoginState}) => state.Login?.users[0]);
	const navigate = useNavigate();
	const [product, setProduct] = useState<Product[]>([]);
	const shekel = <FontAwesomeIcon icon={faShekelSign} />;

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
				<Navbar />
			</header>
			<main className='container pt-5 text-center bg-dark min-vh-100'>
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
								<h5 className='card-text my-3'>
									{shekel} {product.price}
								</h5>
								<h5 className='card-text my-3'>{product.description}</h5>
							</div>
							{user && user.isAdmin ? (
								<div className='d-grid gap-2 d-md-block'>
									<button className='btn btn-primary' type='button'>
										Add Item
									</button>
									<button
										className='btn btn-primary mx-5'
										type='button'
									>
										Edit Item
									</button>
								</div>
							) : (
								!user?.isAdmin && (
									<>
										<div className=' mt-5 d-flex align-items-center justify-content-around mt-3'>
											<button className='btn btn-primary w-25'>
												Add to Cart
											</button>
											<button className='btn btn-primary w-25 mx-2'>
												more..
											</button>
										</div>
										<button
											onClick={() => navigate(-1)}
											className='btn btn-dark w-50 m-auto mt-5'
											type='button'
										>
											back
										</button>
									</>
								)
							)}
						</div>
					))
				) : (
					<p>No Data</p>
				)}
			</main>
		</>
	);
};

export default ProductDetails;
