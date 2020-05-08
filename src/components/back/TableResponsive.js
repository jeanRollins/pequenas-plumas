import React ,{ useState} from 'react'
import { Table, Button, Modal} from 'react-bootstrap'
import { AiOutlineMail } from "react-icons/ai"
import { FaTrashAlt } from "react-icons/fa"
import { Decrypt} from '../../libs/Encrypt'
import {formatNumber} from '../../globals'

const TableResponsive = ( props ) => {
    
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
                    <Modal.Title> Email <AiOutlineMail style={{ margin : '-2px 0px 0px 0px' }}/> </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table>
                        <tr>
                            <td> Nombre :  </td>
                            <td> {nameMessage} </td>
                        </tr>
                        <tr>
                            <td> Email :  </td>
                            <td> {emailMessage} </td>
                        </tr>
                        <tr>
                            <td> Fecha de envío :  </td>
                            <td> {emailDate} </td>
                        </tr>
                    </table>
                    
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

        
        <Table responsive  hover>
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

                                { ( keyData.type == 'number' ) && (
                                   '$' + formatNumber.new( row[keyData.resource] )
                                )}

                                { ( keyData.type == 'function' ) && (
                                    
                                   <Button onClick={ e => keyData.method( row[keyData.resource] ) }  variant="outline-danger"> <FaTrashAlt/> </Button>
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
