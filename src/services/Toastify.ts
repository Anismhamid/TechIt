import {toast} from "react-toastify";

export function successMsg(msg: string) {
	return toast.success(msg, {
		position: "top-left",
		autoClose: 3000, // Increased duration for better visibility
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "colored"
	});
}

export function errorMsg(msg: string) {
	return toast.error(msg, {
		position: "top-left",
		autoClose: 3000, // Increased duration for better visibility
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	theme:"colored"
	});
}
