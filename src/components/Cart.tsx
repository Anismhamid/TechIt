import {FunctionComponent, useEffect, useState} from "react";
import Navbar from "./Navbar";
import { deleteItem,minus,plus, shekel} from "../fontAwesome/FontAwesome";
import {useDispatch} from "react-redux";
import {Dispatch} from "@reduxjs/toolkit";
import {
	formattedPrice,
	getAllProductFromCart,
	removeProduct,
} from "../services/CartServices";
import {Product} from "../interfaces/Product";
import {Link, useNavigate} from "react-router-dom";
import {errorMsg, successMsg} from "../services/Toastify";
import MiniNav from "./MiniNav";
import Modal from "./Modal";
import {CartAction, removeFromCart} from "../redux/CartReducer";

interface CartProps {}

const Cart: FunctionComponent<CartProps> = () => {
	const navigate = useNavigate();
	const dispatch: Dispatch<CartAction> = useDispatch();
	const [products, setProduct] = useState<Product[]>([]);
	const [cartChanged, setCartChanged] = useState<boolean>(false);
	const [productToDelete, setProductToDelete] = useState<Product | null>(null); // Track product to delete

	useEffect(() => {
		getAllProductFromCart()
			.then((res) => setProduct(res.data))
			.catch((error) => errorMsg(error));
	}, [cartChanged]);

	const totalPrice = products.reduce((total, product) => total + product.price, 0);
	const formattedTotalPrice = formattedPrice(totalPrice);

	const handleRemoveProduct = (product: Product) => {
		removeProduct(product.id)
			.then(() => {
				dispatch(removeFromCart(product));
				setCartChanged(!cartChanged);
				successMsg(`the product ${product.name} has been removed`);
			})
			.catch((error) => errorMsg(`${error}`));
	};

	return (
		<>
			<header className='sticky-top w-100'>
				<Navbar />
			</header>
			<main className='container-fluid text-center bg-dark min-vh-100'>
				<h2 className='text-light bg-black'>Cart</h2>
				<div className='fixedd'>
					<h5 className='card-text text-dark fw-bold bg-light w-100 p-2 fs-5'>
						Total: {formattedTotalPrice}
					</h5>
					<button
						onClick={() => navigate(-1)}
						className='btn btn-outline-info w-25 d-block'
					>
						Back
					</button>
					<button className='btn btn-outline-info w-25'>Pay</button>
				</div>
				<div>
					{products.length ? (
						products.map((product) => (
							<>
								<div className='row' key={product.id}>
									<div className='col'>
										<Link to={`/productDetails/${product.id}`}>
											<img
												src={product.image}
												alt={product.name}
												style={{
													maxWidth: "100px",
													maxHeight: "100px",
												}}
											/>
										</Link>
									</div>
									<div className='col'>
										<p className=' card-title'>
											<Link to={`/productDetails/${product.id}`}>
												{product.name}
											</Link>
										</p>
									</div>
									<div className='col'>{product.description}</div>
									<div className='col'>
										<p className='text-success'>
											{shekel} {product.price}
										</p>
									</div>
									<div className='col'>
										<button
											className='btn btn-warning w-50'
											onClick={() => {}}
										>
											{plus}
										</button>
										<h5 className='px-1'>2</h5>
										<button
											className='btn btn-warning w-50'
											onClick={() => {}}
										>
											{minus}
										</button>
									</div>
									<div className='col'>
										<button
											className='btn btn-danger'
											onClick={() => setProductToDelete(product)}
										>
											{deleteItem}
										</button>
									</div>
								</div>
								<hr className='border border-danger p-1 bg-black' />
							</>
						))
					) : (
						<div className='row'>
							<p>No data</p>
							<button
								className='btn btn-primary  w-75 m-auto mb-5'
								onClick={() => navigate("/products")}
							>
								<span className='fs-4'>Start Shopping</span>
							</button>
						</div>
					)}
				</div>

				<MiniNav />
			</main>
			<Modal
				showing={!!productToDelete}
				onHide={() => setProductToDelete(null)}
				title='Delete Product'
				text='Are you sure you want to delete this item?'
				onConfirm={() => {
					if (productToDelete) {
						handleRemoveProduct(productToDelete);
						setProductToDelete(null);
					}
				}}
			/>
		</>
	);
};

export default Cart;
