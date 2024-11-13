import {useFormik} from "formik";
import {FunctionComponent, useState} from "react";
import * as yup from "yup";
import {User} from "../interfaces/User";
import {Link, useNavigate} from "react-router-dom";
import {checkUser} from "../services/UserServices";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
	const [isLogedIn, setIsLogedIn] = useState<boolean>(false);
	const navigate = useNavigate();

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
		onSubmit: (values: User) => {
			checkUser(values).then((res) => {
				if (res.data.length) {
					localStorage.setItem("logedIn", JSON.stringify(!isLogedIn));
					localStorage.setItem("admin", JSON.stringify(res.data[0].isAdmin));
					localStorage.setItem("userId", res.data[0].id);
					navigate("/home");
				} else {
					navigate("/");
					setIsLogedIn(false);
				}
			});
		},
	});

	return (
		<main className='container text-center pt-5 min-vh-100'>
			<div className='login'>
				<h3>Login</h3>
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
		</main>
	);
};

export default Login;
