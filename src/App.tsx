import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./components/Login";
import Registry from "./components/Registry";
import {Provider} from "react-redux";
import store from "./redux/Store";
import Home from "./components/Home";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify";
import Products from "./components/Products";
import Profile from "./components/Profile";
import Cart from "./components/Cart";
import PageNotFound from "./components/PageNotFound";
import ProductDetails from "./components/ProductDetails";

function App() {
	return (
		<>
			<ToastContainer />
			<Provider store={store}>
				<Router
					future={{
						v7_startTransition: true,
						v7_relativeSplatPath: true,
					}}
				>
					<Routes>
						<Route path='/' element={<Login />} />
						<Route path='/home' element={<Home />} />
						<Route path='/cart' element={<Cart />} />
						<Route path='/registery' element={<Registry />} />
						<Route path='/products' element={<Products />} />
						<Route path='/productDetails' element={<ProductDetails />}>
							<Route path=':id' element={<ProductDetails />} />
						</Route>
						<Route path='/profile' element={<Profile />} />
						<Route path='/pageNotFound' element={<PageNotFound />} />
					</Routes>
				</Router>
			</Provider>
		</>
	);
}

export default App;
