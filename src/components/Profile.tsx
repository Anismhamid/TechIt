import {FunctionComponent} from "react";
import Navbar from "./Navbar";

interface ProfileProps {}

const Profile: FunctionComponent<ProfileProps> = () => {
	return (
		<>
			<header>
				<Navbar />
			</header>
			<h1>Profile</h1>
		</>
	);
};

export default Profile;
