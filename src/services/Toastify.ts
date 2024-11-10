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
		bodyStyle: {
			color: "#7a7b7c", // Green text color for success
			fontWeight: "bold", // Bold text
			fontSize: "16px", // Font size for better readability
			padding: "10px 20px", // Padding for better spacing
			borderRadius: "5px", // Rounded corners for the body
			backgroundColor: "#48DA25", // Light green background color
			boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for a modern look
		},
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
		bodyStyle: {
			color: "#7a7b7c", // light text color for error
			fontWeight: "bold", // Bold text for emphasis
			fontSize: "16px", // Consistent font size with success
			padding: "10px 20px", // Padding for better spacing
			borderRadius: "5px", // Rounded corners for the body
			backgroundColor: "#ffd5db", // Light red background color for errors
			boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
		},
	});
}
