import React , {useState,useEffect} from 'react'

import {Modal, Button} from 'react-bootstrap'

export function ConfirmModal(props) {

    const [show, setShow] = useState( true );
  
    const handleClose = () => setShow( false )
    const handleShow  = () => setShow( true )
    return (
      <>
        
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{props.textTitle}</Modal.Title>
          </Modal.Header>
            <Modal.Body>{props.textBody}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={ handleClose }>
              Close
            </Button>
            <Button variant="primary" onClick={props.method}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}