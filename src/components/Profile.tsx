import {FunctionComponent, useEffect, useState} from "react";
import Navbar from "./Navbar";
import {getUserById} from "../services/UserServices";
import {User} from "../interfaces/User";
import MiniNav from "./MiniNav";

interface ProfileProps {}

const Profile: FunctionComponent<ProfileProps> = () => {
	const id = localStorage.getItem("userId") || "null";
	const [userDetails, setUserDetails] = useState<User[]>([]);
	useEffect(() => {
		try {
			getUserById(id)
				.then((res) => {
					setUserDetails(res.data);
				})
				.catch((err) => {
					console.log("Failed to fetch user data", err);
				});
		} catch (error) {
			console.log(error);
		}
	}, [id]);
	return (
		<>
			<header className='sticky-top w-100'>
				<Navbar />
			</header>
			<main className='container-fluid text-center bg-dark min-vh-100'>
				<MiniNav />
				<h1 className='text-light bg-black'>Profile</h1>
				<div className='my-5 text-start'>
					{userDetails.length ? (
						<table className='table table-striped w-75 m-auto'>
							<thead>
								<tr>
									<th colSpan={4}>name</th>
									<th colSpan={4}>email</th>
									<th colSpan={4}>Administration</th>
								</tr>
							</thead>
							<tbody>
								{userDetails.length ? (
									userDetails.map((user) => (
										<tr key={user.id}>
											<td colSpan={4}>{user.name}</td>
											<td colSpan={4}>{user.email}</td>
											<td colSpan={4}>
												{user.isAdmin ? "Admin" : "Client"}
											</td>
										</tr>
									))
								) : (
									<p className='text-danger'>No Data</p>
								)}
							</tbody>
						</table>
					) : (
						<p>No Data Available</p>
					)}
				</div>
			</main>
		</>
	);
};

export default Profile;
