import {useFormik} from "formik";
import {FunctionComponent, useEffect, useState} from "react";
import * as yup from "yup";
import {User} from "../interfaces/User";
import {Link, useNavigate} from "react-router-dom";
import {getAllUsers} from "../services/UserServices";
import {useDispatch, useSelector} from "react-redux";
import { login, setAllUsersAction } from "../redux/LoginState";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
	const navigate = useNavigate();
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [users, setUsers] = useState<User[]>([]); // Local state to store users
	const dispatch = useDispatch();

	// Fetch users on component mount
	useEffect(() => {
		getAllUsers()
			.then((res) => {
				setUsers(res.data); // Store the fetched users in local state
				setAllUsersAction(res.data)
			})
			.catch((err) => {
				console.error("Error fetching users:", err);
				setErrorMessage("Failed to load users. Please try again later.");
			});
	}, []);

	// Formik setup for login form
	const formik = useFormik<User>({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: yup.object({
			email: yup
				.string()
				.required("Email is required")
				.email("Invalid email format"),
			password: yup
				.string()
				.required("Password is required")
				.min(8, "Password must be at least 8 characters"),
		}),
		onSubmit: (values) => {
			// Find the user in the fetched users list
			const foundUser = users.find(
				(user) =>
					user.email === values.email && user.password === values.password,
			);

			if (foundUser) {
				// Dispatch login action if user is found
				dispatch(login(foundUser)as any);
				navigate("/home"); // Redirect after login (adjust route as needed)
			} else {
				// Set error message if credentials are incorrect
				setErrorMessage("Invalid email or password");
			}
		},
	});

	return (
		<div className='login-container'>
			<div className='login m-auto'>
				<h3>Login</h3>
				{errorMessage && <p className='text-danger'>{errorMessage}</p>}{" "}
				{/* Error Message */}
				<form onSubmit={formik.handleSubmit}>
					<div className='form-group'>
						<input
							type='email'
							placeholder='Email'
							name='email'
							id='email'
							className='form-control'
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							value={formik.values.email}
						/>
						{formik.touched.email && formik.errors.email && (
							<p className='text-danger'>{formik.errors.email}</p>
						)}
					</div>

					<div className='form-group'>
						<input
							type='password'
							placeholder='Password'
							name='password'
							id='password'
							className='form-control my-3'
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							value={formik.values.password}
						/>
						{formik.touched.password && formik.errors.password && (
							<p className='text-danger'>{formik.errors.password}</p>
						)}
					</div>

					<button className='btn w-100 btn-primary' type='submit'>
						Login
					</button>
				</form>
				<h5 className='my-3 text-center'>
					New user? <Link to='/registery'>Register</Link>
				</h5>
			</div>
		</div>
	);
};

export default Login;
