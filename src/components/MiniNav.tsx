import {FunctionComponent} from "react";
import {Link} from "react-router-dom";
import {cart, house, productsStor, userProfile} from "../fontAwesome/FontAwesome";

interface MiniNavProps {}

const MiniNav: FunctionComponent<MiniNavProps> = () => {
	return (
		<ul id='bottom-nav' className='nav bottomm bg-dark nav-tabs'>
			<li className='nav-itemn'>
				<h5 className='display-6'>
					<Link className='nav-link ' aria-current='page' to='/home'>
						{house}
					</Link>
				</h5>
			</li>
			<li className='nav-item'>
				<h5 className='display-6'>
					<Link className='nav-link ' aria-current='page' to='/profile'>
						{userProfile}
					</Link>
				</h5>
			</li>
			<li className='nav-item'>
				<h5 className='display-6'>
					<Link className='nav-link' aria-current='page' to='/products'>
						{productsStor}
					</Link>
				</h5>
			</li>
			<li className='nav-item'>
				<h5 className='display-6'>
					<Link className='nav-link' aria-current='page' to='/cart'>
						{cart}
					</Link>
				</h5>
			</li>
		</ul>
	);
};

export default MiniNav;
