import React ,{ useState} from 'react'
import { Table} from 'react-bootstrap'
import {Encrypt , Decrypt} from '../../libs/Encrypt'

import { Modal, Button } from 'react-bootstrap'


const TableResponsive = (props) => {

    console.log( 'props**' , props);
    
    const keys       =  props.config.keys
    const header     =  props.config.headerTable
    const data       =  props.data
    const [stateModal, setStateModal] = useState(false)
    const [message, setMessage] = useState(false)
    const [nameMessage, setNameMessage] = useState(false)
    const [emailMessage, setEmailMessage] = useState(false)
    const [emailDate, setEmailDate] = useState(false)

    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow  = () => setShow(true)

    const openModal = ( emailData ) => {
        
        const messageDecrypt = Decrypt( emailData.message )
        setMessage(messageDecrypt)
        setNameMessage( emailData.name )
        setEmailMessage(emailData.email)
        setEmailDate(emailData.date)

        handleShow(true)
    }

    return (
      <>
        { (show) && (
            <Modal show={true} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title> Email </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Nombre : {nameMessage}
                    <br/>
                    Email : {emailMessage}
                    <br/>
                    Fecha de envío : {emailDate}
                    <br/>
                    <br/>
                    {message}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        )}

        
        <Table responsive>
            <thead>
                <tr>
                    { header.map( (row , index) => (
                        <th key = {index}>{ row }</th>
                    ))}
            
                </tr>
            </thead>
            <tbody>
                { data.map( (row , index) => (

                    <tr key = {index} >

                        { keys.map( (keyData, i) => (

                            <td key = {i}> 

                                { ( keyData.type == 'text' ) && (
                                    row[keyData.resource]
                                )}

                                { ( keyData.type == 'link' ) && (

                                    <a href="#" onClick={ (e) => { e.preventDefault()   
                                                                     openModal(row )} }
                                                            > 
                                                            {keyData.name} 
                                    </a>
                                )}
                            </td> 
                        ))}
                    </tr>
                ))}

            </tbody>
        </Table>
      </>
    )
}

export default TableResponsive
