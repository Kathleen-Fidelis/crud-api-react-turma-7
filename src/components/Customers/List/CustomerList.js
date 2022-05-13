import React, { useState } from 'react'
import { AiFillCheckCircle } from "react-icons/ai";
import { Container, ListGroup, Row, 
        Col, Button, Modal, 
        Alert, Form } from 'react-bootstrap'

function CustomerList(props) {

    const customers = props.customers || []
    const [customer, setCustomer] = useState({});
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [successDelete, setSuccessDelete] = useState(false);

    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

   

    const renderCustomer = () => {
        return customers.map((item) => {
            return (
                <ListGroup.Item key={item.id}>
                    <Row className="itemTask">
                    <Col xs={6} md={8}>
                           <strong>Nome:</strong> {item.name} -
                           <strong> Idade:</strong> {item.age} -
                           <strong> CPF:</strong> {item.document} -
                           <strong> Telefone:</strong> {item.tel} -
                           <strong> Estado:</strong> {item.state}
                        </Col>

                        <Col>
                            <Button className="mx-3" variant="secondary"
                                onClick={() => {
                                    setCustomer(item)
                                    handleShowEdit()
                                }}>
                                Editar
                            </Button>
                            <Button className="mx-3" variant="danger"
                                onClick={() => {
                                    setCustomer(item)
                                    handleShow()
                                }}>
                                Deletar
                            </Button>
                        </Col>
                    </Row>
                </ListGroup.Item>
            )
        })
    }


    return (
        <Container>
            {
                successDelete
                    ?
                    <Alert key='success' variant='success'>
                        <AiFillCheckCircle size="30" /> Usuario deletado com sucesso!
                    </Alert>
                    :
                    ''
            }

            <Row>
                <Col>
                    <ListGroup variant="flush">
                        {renderCustomer()}
                    </ListGroup>
                </Col>
            </Row>

            {/* //modal edit */}
            <Modal show={showEdit} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Nome:</Form.Label>
                        <Form.Control type="text" placeholder="Digite o novo nome do usuario"
                            value={customer.name}
                            onChange={event => setCustomer({...customer, name: event.target.value})} 
                        />
                        <Form.Label>Idade:</Form.Label>
                        <Form.Control type="text" placeholder="Digite a novo data de nascimento do usuario"
                            value={customer.age}
                            onChange={event => setCustomer({...customer, age: event.target.value})} 
                        />
                        <Form.Label>CPF:</Form.Label>
                         <Form.Control type="text" placeholder="Digite o CPF atualizado do usuario"
                            value={customer.document}
                            onChange={event => setCustomer({...customer, document: event.target.value})} 
                        />
                        <Form.Label>Telefone:</Form.Label>
                         <Form.Control type="text" placeholder="Digite a novo telefone do usuario"
                            value={customer.tel}
                            onChange={event => setCustomer({...customer, tel: event.target.value})} 
                        />
                        <Form.Label>Estado:</Form.Label>
                         <Form.Control type="text" placeholder="Digite o novo estado do usuario"
                            value={customer.state}
                            onChange={event => setCustomer({...customer, state: event.target.value})} 
                        />


                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEdit}>
                        Close
                    </Button>
                    <Button variant="success" onClick={() => {
                        props.editCustomer(customer)
                        handleCloseEdit()
                        }
                    }>
                        Editar
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* //modal delete */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Apagar Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>Deseja apagar o Usuario: <strong>{customer.name}</strong></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={() => {
                        props.delete(customer.id)
                        handleClose()
                        setSuccessDelete(true)
                        setTimeout(
                            () => {
                                setSuccessDelete(false)
                            }, 3000)
                    }}>
                        Apagar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default CustomerList