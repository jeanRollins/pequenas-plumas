import React , {useState} from 'react'
import { Modal, Button } from 'react-bootstrap'


export const  ModalLarge = ( props ) => {

    ///let showModal = props.state

    //const [show, setShow] = useState(showModal);
    //const handleClose = () => setShow(false);
    //const handleShow = () => setShow(true);

    console.log('props.state' , props.state) 
    
    let showModal = props.state

    const [show, setShow] = useState(showModal)
    const handleClose = () => setShow(!showModal)
    const handleShow = () => setShow(!showModal)
    



    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}