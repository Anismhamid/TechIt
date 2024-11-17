import {FunctionComponent} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

interface ModaleProps {
	title: string;
	text: string;
	showing: boolean;
	onHide: () => void;
	onConfirm: () => void;
}

const Modale: FunctionComponent<ModaleProps> = ({
	title,
	text,
	showing,
	onHide,
	onConfirm,
}) => {
	return (
		<Modal show={showing} onHide={onHide} backdrop='static' keyboard={false}>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{text}</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={onHide}>
					Close
				</Button>
				<Button variant='primary' onClick={onConfirm}>
					Confirm
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default Modale;
