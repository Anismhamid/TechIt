import {useFormik} from "formik";
import {FunctionComponent, useState} from "react";
import * as yup from "yup";
import {User} from "../interfaces/User";
import {Link, useNavigate} from "react-router-dom";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
	const [isAdmin, setIsAdmin] = useState<boolean>(false);
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
			setIsAdmin(!isAdmin);
			localStorage.setItem("kkk", JSON.stringify(true));
			navigate("/home");
		},
	});

	return (
		<div className='login-container'>
			<div className='login m-auto'>
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
		</div>
	);
};

export default Login;
