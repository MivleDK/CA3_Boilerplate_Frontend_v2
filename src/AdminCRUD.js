import React, { useState, useEffect } from 'react';
import { AllUsers, DeleteUser, EditUser, AddUser } from './settings'
import { Container, Row, Col, Button, Table, Form, Modal } from "react-bootstrap";


function AdminCrud() {

    const [person, setPerson] = useState([]);
    const [personDelete, setPersonDelete] = useState("");
    const [personEdit, setPersonEdit] = useState([]);
    const [personAdd, setPersonAdd] = useState([]);

    /* Handle modal for delete */
    const [showDel, setShowDel] = useState(false);
    const handleCloseDel = () => setShowDel(false);
    const handleShowDel = () => setShowDel(true);

    /* Handle modal for edit */
    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);

    /* Handle modal for add */
    const [showAdd, setShowAdd] = useState(false);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    const fetchPerson = () => {
        fetch(AllUsers).then(res => res.json()).then(data => {
            setPerson(data);
        })

    }

    const deletePerson = (email) => {
        console.log(email);
        //const options = makeOptions("DELETE");

        //fetch(DeleteUser + email, options).then(res => res.json()).then(data => {
        //    setPersonDelete(data);
        //})


        //INDSÆT BODY TIL EN PUT

    }

    /*
    Error check
    */
    function fetchWithErrorCheck(res) {
        if (!res.ok) {
            return Promise.reject({ status: res.status, fullError: res.json() })
        }
        return res.json();
    }

    /*
    Function for POST, PUT and DELETE
    */
    function makeOptions(method, body) {
        const opts = {
            method: method,
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json"
            }
        }
        if (body) {
            opts.body = JSON.stringify(body);
        }
        return opts;
    }


    useEffect(() => {
        fetchPerson();
    }, []);

    //console.log(person);

    return (
        <div>
            <Container>
                <h2>CRUD for users</h2>
                <Row className="mt-4">
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>First name</th>
                                    <th>Last name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Street</th>
                                    <th>City</th>
                                    <th>Zip</th>
                                    <th>Hobby</th>
                                    <th colSpan="2">&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                                {person.all && person.all.map(element => {
                                    return (
                                        <tr key={element.email}>
                                            <td>{element.firstName}</td>
                                            <td>{element.lastName}</td>
                                            <td>{element.email}</td>
                                            <td>{element.phone}</td>
                                            <td>{element.street}</td>
                                            <td>{element.city}</td>
                                            <td>{element.zipcode}</td>
                                            <td>{element.hobbyList.map(el => el + ", ")}</td>
                                            <td>
                                                <Button variant="warning" onClick={handleShowEdit}>Edit</Button>
                                            </td>
                                            <td>
                                                <Button variant="danger" onClick={handleShowDel}>Delete</Button>
                                            </td>
                                        </tr>
                                    )
                                }
                                )}
                            </tbody>
                        </Table>
                        <Button variant="info" onClick={handleShowAdd}>Add new user</Button>
                    </Col>
                </Row>


            </Container>

            {/* Modal for delete person */}
            <Modal show={showDel} onHide={handleCloseDel}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you really want to delete these records? This process cannot be undone.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDel}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleCloseDel}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal for edit person */}
            <Modal show={showEdit} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Person</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="firstName">
                            <Form.Label>First name</Form.Label>
                            <Form.Control type="text" placeholder="First name" />
                        </Form.Group>
                        <Form.Group controlId="lastName">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control type="text" placeholder="Last name" />
                        </Form.Group>
                        <Form.Group controlId="phone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="text" placeholder="Phone" />
                        </Form.Group>
                        <Form.Group controlId="street">
                            <Form.Label>Street</Form.Label>
                            <Form.Control type="text" placeholder="Street" />
                        </Form.Group>
                        <Form.Group controlId="city">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" placeholder="City" />
                        </Form.Group>
                        <Form.Group controlId="zipcode">
                            <Form.Label>Zipcode</Form.Label>
                            <Form.Control type="text" placeholder="Zipcode" />
                        </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEdit}>
                        Close
                    </Button>
                    <Button variant="info" onClick={handleCloseEdit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal for add person */}
            <Modal show={showAdd} onHide={handleCloseAdd}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new Person</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="firstName">
                            <Form.Label>First name</Form.Label>
                            <Form.Control type="text" placeholder="First name" />
                        </Form.Group>
                        <Form.Group controlId="lastName">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control type="text" placeholder="Last name" />
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Email" />
                        </Form.Group>
                        <Form.Group controlId="phone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="text" placeholder="Phone" />
                        </Form.Group>
                        <Form.Group controlId="street">
                            <Form.Label>Street</Form.Label>
                            <Form.Control type="text" placeholder="Street" />
                        </Form.Group>
                        <Form.Group controlId="city">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" placeholder="City" />
                        </Form.Group>
                        <Form.Group controlId="zipcode">
                            <Form.Label>Zipcode</Form.Label>
                            <Form.Control type="text" placeholder="Zipcode" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAdd}>
                        Close
                    </Button>
                    <Button variant="info" onClick={handleCloseAdd}>
                        Add person
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AdminCrud;