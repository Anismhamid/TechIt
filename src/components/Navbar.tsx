import {FunctionComponent} from "react";
import {NavLink, useNavigate} from "react-router-dom";

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
	const navigate = useNavigate();
	return (
		<>
			<nav className='navbar navbar-expand-lg bg-dark' data-bs-theme='dark'>
				<div className='container-fluid'>
					<NavLink className='navbar-brand' to='/home'>
						TechIt
					</NavLink>
					<button
						className='navbar-toggler'
						type='button'
						data-bs-toggle='collapse'
						data-bs-target='#navbarSupportedContent'
						aria-controls='navbarSupportedContent'
						aria-expanded='false'
						aria-label='Toggle navigation'
					>
						<span className='navbar-toggler-icon'></span>
					</button>
					<div className='collapse navbar-collapse' id='navbarSupportedContent'>
						<ul className='navbar-nav me-auto mb-2 mb-lg-0'>
							<li className='nav-item'>
								<NavLink
									className='nav-link'
									aria-current='page'
									to='/home'
								>
									Home
								</NavLink>
							</li>
							<li className='nav-item'>
								<NavLink
									className='nav-link'
									aria-current='page'
									to='/profile'
								>
									Profile
								</NavLink>
							</li>
							<li className='nav-item'>
								<NavLink
									className='nav-link'
									aria-current='page'
									to='/products'
								>
									Products
								</NavLink>
							</li>
							<li className='nav-item'>
								<NavLink
									className='nav-link'
									aria-current='page'
									to='/cart'
								>
									Cart
								</NavLink>
							</li>
						</ul>
						<form className='d-flex' role='search'>
							<button
								onClick={() => {
									navigate("/");
									localStorage.setItem(
										"logedIn",
										JSON.stringify(false),
									);
									localStorage.removeItem("admin");
									localStorage.removeItem("userId");
								}}
								className='btn btn-outline-primary'
							>
								Logout
							</button>
						</form>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
