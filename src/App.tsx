import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./components/Login";
import Registry from "./components/Registry";
import Navbar from "./components/Navbar";
import {Provider} from "react-redux";
import store from "./redux/Store";
import Home from "./components/Home";

function App() {
	return (
		<div className='App w-100'>
			<Provider store={store}>
				<Router
					future={{
						v7_startTransition: true,
						v7_relativeSplatPath: true,
					}}
				>
					<header>
						<Navbar />
					</header>
					<main>
						<Routes>
							<Route path='/' element={<Login />} />
							<Route path='/registery' element={<Registry />} />
							<Route path='/home' element={<Home />} />
						</Routes>
					</main>
					<footer>Footer</footer>
				</Router>
			</Provider>
		</div>
	);
}

export default App;
