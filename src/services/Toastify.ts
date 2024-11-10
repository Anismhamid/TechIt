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
		theme: "dark",
		bodyStyle: {
			color: "#7a7b7c", // Green text color for success
			fontWeight: "bold", // Bold text
			fontSize: "16px", // Font size for better readability
			padding: "20px 10px", // Padding for better spacing
			borderRadius: "5px", // Rounded corners for the body
			backgroundColor: "#48DA25",// Light green background color
			width:"300vw",
			boxShadow:
				"0 4px 12px rgba(0, 0, 0, 0.829) inset, 4px 0 12px rgba(0, 0, 0, 0.829) inset", // Subtle shadow for a modern look
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
			boxShadow:
				"0 4px 12px rgba(0, 0, 0, 0.829) inset, 4px 0 12px rgba(0, 0, 0, 0.829) inset", // Subtle shadow
		},
	});
}
