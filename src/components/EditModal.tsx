import {useEffect, useState} from "react";
import {useFormik} from "formik";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "redux";
import {useParams} from "react-router-dom";
import {ProductsAction, updateProductReducer} from "../redux/ProductsReducer";
import {
	editSpicificProductFromProduct,
	getTheProducts,
	getTheSpicificProduct,
} from "../services/ProductsServices";
import {Product} from "../interfaces/Product";
import {Button, Form, Modal} from "react-bootstrap";

interface EditModalProps {}

const EditModal: React.FunctionComponent<EditModalProps> = () => {
	const {id} = useParams<{id: string}>();
	const dispatch = useDispatch<Dispatch<ProductsAction>>();

	const [show, setShow] = useState(false);
	const [product, setProduct] = useState<Product | null>(null);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	useEffect(() => {
		// Fetch the specific product when the component mounts
		if (id) {
			getTheSpicificProduct(id)
				.then((res) => {
					dispatch(updateProductReducer(res.data)); 
				})
				.catch((err) => console.error("Error fetching product:", err));
		}
	}, [id]);

	const formik = useFormik({
		enableReinitialize: true, // Re-initialize the form when the product data changes
		initialValues: {
			id: product?.id || "",
			name: product?.name || "",
			category: product?.category || "",
			image: product?.image || "",
			description: product?.description || "",
			price: product?.price || 0,
			quantity: product?.quantity || 0,
		},
		validationSchema: yup.object({
			name: yup.string().required("Name is required"),
			category: yup.string().required("Category is required"),
			description: yup.string().required("Description is required"),
			image: yup.string().required("Image URL is required"),
			price: yup
				.number()
				.required("Price is required")
				.positive("Price must be positive"),
			quantity: yup
				.number()
				.required("Quantity is required")
				.min(0, "Quantity cannot be negative"),
		}),
		onSubmit: async (values) => {
			try {
				// Call the API to update the product
				const res = await editSpicificProductFromProduct(values as Product);

				// Dispatch the updated product data to Redux
				dispatch(updateProductReducer(res.data)); // Assuming res.data contains the updated product

				// Close the modal
				handleClose();
			} catch (err) {
				console.error("Error updating product:", err);
				// You could also show an error message to the user here
			}
		},
	});

	return (
		<>
			<Button variant='warning' onClick={handleShow}>
				Edit
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Edit Product</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={formik.handleSubmit}>
						<div className='form-floating mb-3'>
							<input
								type='text'
								className='form-control'
								id='name'
								placeholder='Product Name'
								{...formik.getFieldProps("name")}
							/>
							<label htmlFor='name'>Name</label>
						</div>

						<div className='form-floating mb-3'>
							<input
								type='text'
								className='form-control'
								id='category'
								placeholder='Category'
								{...formik.getFieldProps("category")}
							/>
							<label htmlFor='category'>Category</label>
						</div>

						<div className='form-floating mb-3'>
							<textarea
								className='form-control'
								id='description'
								placeholder='Description'
								{...formik.getFieldProps("description")}
								style={{height: "100px"}}
							/>
							<label htmlFor='description'>Description</label>
						</div>

						<div className='form-floating mb-3'>
							<input
								type='text'
								className='form-control'
								id='image'
								placeholder='Image URL'
								{...formik.getFieldProps("image")}
							/>
							<label htmlFor='image'>Image URL</label>
						</div>

						<div className='form-floating mb-3'>
							<input
								type='number'
								className='form-control'
								id='price'
								placeholder='Price'
								{...formik.getFieldProps("price")}
							/>
							<label htmlFor='price'>Price</label>
						</div>

						<div className='form-floating mb-3'>
							<input
								type='number'
								className='form-control'
								id='quantity'
								placeholder='Quantity'
								{...formik.getFieldProps("quantity")}
							/>
							<label htmlFor='quantity'>Quantity</label>
						</div>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Close
					</Button>
					<Button onClick={()=>formik.handleSubmit} variant='primary' type='submit'>
						Update
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default EditModal;
