import {FunctionComponent, useEffect, useState} from "react";
import Navbar from "./Navbar";
import {Product} from "../interfaces/Product";
import {
	getTheProducts,
	removeSpicificProductFromProduct,
} from "../services/ProductsServices";
import {Link} from "react-router-dom";
import {cart, deleteItem, edit, shekel} from "../fontAwesome/FontAwesome";
import {postProductToCart} from "../services/CartServices";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "@reduxjs/toolkit";
import {errorMsg, successMsg} from "../services/Toastify";
import MiniNav from "./MiniNav";
import AddModal from "./AddModal";
import {
	ProductsAction,
	ProductsState,
	addItemToProductsRedux,
	deleteItemFromProductsReducer,
} from "../redux/ProductsReducer";

interface ProductsProps {}

const Products: FunctionComponent<ProductsProps> = () => {
	const dispatch = useDispatch<Dispatch<ProductsAction>>();
	const products = useSelector((state: ProductsState) => state.products);
	const isAdmin = localStorage.getItem("admin") === "true";

	useEffect(() => {
		getTheProducts()
			.then((res) => {
				dispatch(addItemToProductsRedux(res.data));
				console.log(Products);
			})
			.catch((err) => console.log(`${err}`));
	}, []);

	const handleDelete = async (productId: string) => {
		try {
			const res = await removeSpicificProductFromProduct(productId);
			dispatch(deleteItemFromProductsReducer(res.data));
			successMsg("The product has been removed");
		} catch (err) {
			errorMsg(`${err}`);
		}
	};

	return (
		<>
			<header className='sticky-top w-100'>
				<Navbar />
			</header>
			<main className='container-fluid text-center bg-dark min-vh-100 products'>
				<h1 className='text-light bg-black'>Products</h1>
				<AddModal />
				<div className='row'>
					{products.length ? (
						products.map((product: Product) => (
							<div
								className='col-md-6 col-sm-12 col-lg-3 mt-5'
								key={product.id}
							>
								<div className='card'>
									<div className='card-img'>
										<Link to={`/productDetails/${product.id}`}>
											<img
												className='card-img-top'
												src={product.image}
												alt={product.name}
											/>
										</Link>
									</div>
									<button
										disabled={!product.quantity}
										onClick={() => {
											postProductToCart(product);
											successMsg(
												"The product has been added to cart",
											);
										}}
										className='btn btn-primary w-50 rounded-start-0 my-2'
									>
										{cart} Buy
									</button>
									<div className='card-body'>
										<h6>{product.category}</h6>
										<Link to={`/productDetails/${product.id}`}>
											<h5 className='card-title'>{product.name}</h5>
										</Link>
										<h5 className='card-text'>
											{product.description}
										</h5>
										<h5 className='card-text'>
											<p className='text-success'>
												{shekel} {product.price.toLocaleString()}
											</p>
										</h5>
										<h5 className='card-text'>
											<p
												className={
													product.quantity
														? "text-dark-emphasis"
														: "text-danger"
												}
											>
												{product.quantity
													? `quantity: ${product.quantity}`
													: "Out of stock"}
											</p>
										</h5>
										{isAdmin && (
											<div className='w-100 d-flex align-items-center justify-content-around bg-black'>
												<button className='btn w-25 btn-warning mx-4'>
													{edit}
												</button>
												<button
													onClick={() =>
														handleDelete(product.id as string)
													}
													className='btn w-25 btn-danger my-2'
												>
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
				<MiniNav />
			</main>
		</>
	);
};

export default Products;
