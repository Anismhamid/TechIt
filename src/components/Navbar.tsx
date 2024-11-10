import {FunctionComponent} from "react";
import {Link, useNavigate} from "react-router-dom";

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
	const navigate = useNavigate();
	return (
		<nav className='navbar bg-dark-subtle'>
			<div className='container-fluid'>
				<Link to={"/"} className='navbar-brand'>
					TechIt
				</Link>
				<button onClick={() => navigate("/")} className='btn btn-outline-success'>
					LogOut
				</button>
			</div>
		</nav>
	);
};

export default Navbar;
