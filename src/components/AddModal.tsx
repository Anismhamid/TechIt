import {FunctionComponent} from "react";
import {useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {FormikValues, useFormik} from "formik";
import * as yup from "yup";
import {Form} from "react-bootstrap";
import {addNewProducts} from "../services/ProductsServices";
import {useDispatch} from "react-redux";
import {Dispatch} from "@reduxjs/toolkit";
import { ProductsAction, addItemToProductsRedux } from "../redux/ProductsReducer";
import { Product } from "../interfaces/Product";

interface AddModalProps {}

const AddModal: FunctionComponent<AddModalProps> = () => {
	const [show, setShow] = useState(false);
	const dispatch = useDispatch<Dispatch<ProductsAction>>();
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const formik: FormikValues = useFormik({
		initialValues: {
			name: "",
			category: "",
			image: "",
			description: "",
			price: 0,
			quantity: 0,
		},
		validationSchema: yup.object({
			name: yup.string().required().min(2),
			category: yup.string().required().min(2),
			image: yup.string().required(),
			description: yup.string().required(),
			price: yup.number().required().min(1),
			quantity: yup.number().required().min(1),
		}),
		onSubmit: (values) => {
			addNewProducts(values as Product).then((res) => {
				dispatch(addItemToProductsRedux(res.data));
				handleClose();
			});
		},
	});
	return (
		<>
			<Button variant='primary' onClick={handleShow}>
				Add Item
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add a new product</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<div className='form-floating mb-3'>
							<input
								type='text'
								className='form-control'
								id='name'
								placeholder='Joy Doe'
								value={formik.values.name}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							{formik.touched.name && formik.errors.name && (
								<div className='text-danger'>{formik.errors.name}</div>
							)}
							<label htmlFor='name'>name</label>
						</div>

						<div className='form-floating mb-3'>
							<input
								value={formik.values.category}
								type='text'
								className='form-control'
								id='category'
								name='category'
								placeholder='category'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							{formik.touched.category && formik.errors.category && (
								<div className='text-danger'>
									{formik.errors.category}
								</div>
							)}
							<label htmlFor='category'>category</label>
						</div>

						<div className='form-floating mb-3'>
							<textarea
								className='form-control'
								placeholder='description'
								id='floatingTextarea2'
								name='description'
								style={{height: " 100px"}}
								value={formik.values.description}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							{formik.touched.description && formik.errors.description && (
								<div className='text-danger'>
									{formik.errors.description}
								</div>
							)}
							<label htmlFor='description'>description</label>
						</div>

						<div className='form-floating mb-3'>
							<input
								type='text'
								name='image'
								className='form-control'
								id='image'
								placeholder='image'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							{formik.touched.image && formik.errors.image && (
								<div className='text-danger'>{formik.errors.image}</div>
							)}
							<label htmlFor='image'>image</label>
						</div>

						<div className='form-floating mb-3'>
							<input
								className='form-control'
								type='number'
								id='price'
								name='price'
								placeholder='price'
								value={formik.values.price}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							{formik.touched.price && formik.errors.price && (
								<div className='text-danger'>{formik.errors.price}</div>
							)}
							<label htmlFor='price'>price</label>
						</div>

						<div className='form-floating mb-3'>
							<input
								value={formik.values.quantity}
								type='number'
								className='form-control'
								name='quantity'
								placeholder='quantity'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							{formik.touched.quantity && formik.errors.quantity && (
								<div className='text-danger'>
									{formik.errors.quantity}
								</div>
							)}
							<label htmlFor='quantity'>quantity</label>
						</div>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Close
					</Button>
					<Button
						onClick={() => formik.handleSubmit()}
						type='submit'
						variant='primary'
					>
						add
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default AddModal;
