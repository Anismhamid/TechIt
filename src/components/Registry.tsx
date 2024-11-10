import {useFormik} from "formik";
import {FunctionComponent} from "react";
import {User} from "../interfaces/User";
import * as yup from "yup";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {postUser} from "../services/UserServices";
import {Dispatch} from "@reduxjs/toolkit";

interface RegistryProps {}

const Registry: FunctionComponent<RegistryProps> = () => {
	const dipatch = useDispatch<Dispatch>();
	const navigate = useNavigate();

	const formik = useFormik<User>({
		initialValues: {
			name: "",
			email: "",
			password: "",
			isAdmin: false,
		},
		validationSchema: yup.object({
			name: yup.string().required().min(2),
			email: yup.string().required().email(),
			password: yup
				.string()
				.required()
				.min(8)
				.matches(/[A-Z]/, "Password must contain an uppercase letter"),
			isAdmin: yup.boolean().required(),
		}),
		onSubmit: (values) => {
			postUser(values);
			dipatch(registryAction(values) as any);
			navigate("/");
		},
	});
	return (
		<>
			<div className='m-auto login'>
				<h3>CREATE NEW USER</h3>
				<form onSubmit={formik.handleSubmit}>
					<input
						type='text'
						placeholder='name'
						name='name'
						id='name'
						className='form-control'
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
						value={formik.values.name}
					/>
					{formik.touched.name && formik.errors.name && (
						<p className='text-danger'>{formik.errors.name}</p>
					)}
					<input
						type='email'
						placeholder='email'
						name='email'
						id='email'
						className=' form-control my-2'
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
						value={formik.values.email}
					/>
					{formik.touched.email && formik.errors.email && (
						<p className='text-danger'>{formik.errors.email}</p>
					)}
					<input
						type='password'
						placeholder='password'
						name='password'
						id='password'
						className=' form-control'
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
						value={formik.values.password}
					/>
					{formik.touched.password && formik.errors.password && (
						<p className='text-danger'>{formik.errors.password}</p>
					)}
					<select
						className='form-select form-select-sm my-4 text-center'
						name='isAdmin'
						value={formik.values.isAdmin ? "true" : "false"}
						onBlur={formik.handleBlur}
						onChange={(e) => {
							// Convert the string value back to a boolean
							formik.setFieldValue("isAdmin", e.target.value === "true");
						}}
					>
						<option value=''>Select...</option>
						<option value='true'>Admin</option>
						<option value='false'>Client</option>
					</select>
					<button className='btn w-100 btn-primary' type='submit'>
						Registery
					</button>
				</form>
				<Link
					to='/'
					className='btn w-100 btn-primary mt-3'
					type='submit'
				>
					Login
				</Link>
			</div>
		</>
	);
};

export default Registry;
function registryAction(values: User): any {
	throw new Error("Function not implemented.");
}
