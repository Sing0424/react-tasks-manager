import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { v4 } from "uuid";
import { ReactComponent as AddTask } from '../../img/addTask.svg';
import { db, auth } from "../../firebase";
import { set, ref } from "firebase/database";

export default function NewTask() {
	const [show, setShow] = useState(false);
	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);

	// const [input, setInput] = useState({});
	// const handleChange = ({ target }) => {
	// 	const { id, value } = target;
	// 	setInput(prevInput => ({
	// 		...prevInput,
	// 		[id]: value
	// 	}));
	// };
	const key = v4()
	const [id, setId] = useState(1)

	const date = new Date()
	const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
	const nowDay = date.getFullYear('en-US') + "-" + months[date.getMonth()] + "-" + date.getDate('en-US')
	const nowTime = date.toLocaleTimeString('en-US', { hour12: false })
	const createDateTime = nowDay + " " + nowTime

	const [name, setName] = useState("");
	const nameChange = e => {
		setName(e.target.value)
	}

	const [description, setDescription] = useState("");
	const descriptionChange = e => {
		setDescription(e.target.value)
	}

	const [assignedTo, setAssignedTo] = useState("");
	const assignedToChange = e => {
		setAssignedTo(e.target.value)
	}

	const [dueDate, setDueDate] = useState(nowDay);
	const dueDateChange = e => {
		setDueDate(e.target.value)
	}

	const [status, setStatus] = useState("NEW");
	const statusChange = e => {
		setStatus(e.target.value)
	}

	const handleSubmit = e => {
		e.preventDefault()
		setId(prev => prev + 1)
		set(ref(db, `/${auth.currentUser.uid}/${key}`), {
			key: key,
			id: id,
			name: name,
			description: description,
			assignedTo: assignedTo,
			dueDate: dueDate,
			status: status,
			createDateTime: createDateTime
		})
		setShow(false)
		setName("")
		setDescription("")
		setAssignedTo("")
		setDueDate(nowDay)
		setStatus("NEW")
	}

	return (
		<div className="newTask" >
			<Button className="addTaskbtn rounded-circle" size="md" onClick={handleShow}>
				<AddTask />
			</Button>

			<Modal show={show} onHide={handleClose} backdrop="static">
				<Modal.Header closeButton>
					<Modal.Title><p>New Task</p></Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Form onSubmit={handleSubmit} className="d-grid">
						<Form.Group className="mb-3">
							<Form.Label><p>Name</p></Form.Label>
							<Form.Control id="name" placeholder="Name" value={name} onChange={nameChange} required />
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label><p>Description</p></Form.Label>
							<Form.Control id="description" as="textarea" placeholder="Description" value={description} onChange={descriptionChange} />
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label><p>Assigned To</p></Form.Label>
							<Form.Control placeholder="Assigned To" value={assignedTo} onChange={assignedToChange} />
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label><p>Due Date</p></Form.Label>
							<Form.Control type="date" value={dueDate} onChange={dueDateChange} />
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label><p>Status</p></Form.Label>
							<Form.Select defaultValue={status} onChange={statusChange} >
								<option value="NEW">NEW</option>
								<option value="DONE">DONE</option>
							</Form.Select>
						</Form.Group>

						<Button variant="success" type="submit">
							Submit
						</Button>
					</Form>
				</Modal.Body>

				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}