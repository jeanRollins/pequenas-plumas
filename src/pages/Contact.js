import React ,{useState, useEffect} from 'react'
import FooterComponent from '../components/FooterComponent'
import {SendMail} from '../libs/Mail'
import {Encrypt , Decrypt} from '../libs/Encrypt'
import {ToastsContainer, ToastsStore} from 'react-toasts'
import {AddCollecion} from '../firebaseData'
import { GetDateTime} from '../globals'
import MediaQuery  from '../components/commons/MediaQuery'
import Title  from '../components/Title'

import { 
    Container ,
    Row , 
    Col ,
    Spinner,
    Form,
    Card ,
    Button
} from 'react-bootstrap'


const Contact =  () => {

    const Desktop = MediaQuery('desktop')
    const Tablet  = MediaQuery('tablet')
    const Mobile  = MediaQuery('mobile')

    
    const [email, setEmail] = useState('')
    const [name, setName]   = useState('')
    const [message, setMessage]   = useState('')

    const [textFailName, setTextFailName]   = useState(false)
    const [textFailEmail, setTextFailEmail] = useState(false)
    const [textFailMessage, setTextFailMessage]  = useState(false)

    const [ btnConsultar , setBtnConsultar ]  = useState(true)
    const [ btnConsultando , setBtnConsultando ]  = useState(false)

    const styleFail = {
        color : 'red'
    }

    const setForm = () => {
        setEmail('')
        setName('')
        setMessage('')
    }

    const sendEmail = async () => {
        
        setBtnConsultar(false)
        setBtnConsultando(true)

        if( name == ''){
            setBtnConsultar(true)
            setBtnConsultando(false)
            setTextFailName(true)
            return 
        }
                
        if( email == ''){
            setTextFailEmail(true)
            setTextFailName(false)
            setBtnConsultar(true)
            setBtnConsultando(false)
            return 
        }

        if( message == ''){
            setTextFailMessage(true)
            setTextFailEmail(false)
            setTextFailName(false)
            setBtnConsultar(true)
            setBtnConsultando(false)
            return 
        }


      try {
        const response = await SendMail( name, email, message )
          
        if( ( response.status == 200 ) && ( response.statusText == "OK" )  ){

            let dataMessageEnc = Encrypt(message) 

            const documentMails = {
                name    ,
                email   ,
                message : dataMessageEnc ,
                date    : GetDateTime()  ,
                status  : 1
            }
            await AddCollecion('mails' , documentMails )
            ToastsStore.success("Consulta enviada :) " )
            setBtnConsultar(true)
            setBtnConsultando(false)
            setForm()
        }
        else {
            ToastsStore.warning("Error : intente más tarde :( " )
            setBtnConsultar(true)
            setBtnConsultando(false)
        }
      } 
      catch (error) {
        setBtnConsultar(true)
        setBtnConsultando(false)
        ToastsStore.warning("Error : intente más tarde :( " )
      }
    } 

    return(
        <>
            <ToastsContainer position = { ToastsStore.TOP_LEFT } store = { ToastsStore }/>
            
            <Container className="mt-5">
                <Row>
                    <Col
                        sm = {0}
                        md = {2}
                        lg = {2}
                        xl = {2}
                    >
                    </Col>
                    <Col
                        sm = {12}
                        md = {9}
                        lg = {7}
                        xl = {7}
                    >
                        <Card 
                            className="effectShadow p-4">
                            <Title
                               
                                nameTitle = {"Formulario contacto vía email"}
                            />
                            <Form  className = "mt-3">
                                <Form.Group 
                                    className="w-70"
                                    controlId="exampleForm.ControlInput1" >
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Ingrese nombre..." 
                                        value = {name}
                                        onChange = { e => setName(e.target.value)}
                                    />
                                    { ( textFailName !== false) && (

                                        <p style = {styleFail}> Debe ingresar nombre.</p>
                                    )}
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control 
                                        type = "email" 
                                        placeholder = "nombre@ejemplo.com" 
                                        value = {email}
                                        onChange = { e => setEmail(e.target.value)}
                                    />
                                    { ( textFailEmail !== false) && (
                                        <p style = {styleFail}> Debe ingresar correo.</p>
                                    )}
                                    
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Consulta</Form.Label>
                                    <Form.Control 
                                        as    = "textarea" 
                                        rows  = "3" 
                                        value = {message}
                                        onChange = { e => setMessage(e.target.value)}    
                                    />
                                    { ( textFailMessage !== false) && (
                                        <p style = {styleFail}> Debe ingresar mensaje.</p>
                                    )}
                                        
                                </Form.Group>

                                <Desktop>

                                    { (!btnConsultar) ? (

                                        <Button variant="success"  disabled>
                                            <Spinner
                                                as="span"
                                                animation="grow"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                            />
                                            Consultando...
                                        </Button>
                                       
                                    ) : (
                                        <Button 
                                            variant="success"
                                            onClick = { e => sendEmail() }
                                        >
                                            Consultar
                                        </Button>
                                    )}
                                   

                                   
                                </Desktop>

                                <Tablet>
                                    { (!btnConsultar) ? (
                                        <Button variant="success" block disabled>
                                            <Spinner
                                                as="span"
                                                animation="grow"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                            />
                                            Consultando...
                                        </Button>
                                    ) : (
                                        <Button 
                                            variant="success"
                                            onClick = { e => sendEmail() }
                                            block
                                        >
                                            Consultar
                                        </Button>
                                    )}
                                   
                                </Tablet>

                                <Mobile>
                                    { (!btnConsultar) ? (
                                        <Button variant="success" block disabled>
                                            <Spinner
                                                as="span"
                                                animation="grow"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                            />
                                            Consultando...
                                            
                                        </Button>
                                    ) : (
                                        <Button 
                                            variant="success"
                                            onClick = { e => sendEmail() }
                                            block
                                        >
                                            Consultar
                                        </Button>
                                    )}
                                    

                                  
                                    
                                </Mobile> 

                                
                                
                            </Form>
                        </Card>
                    </Col>
                </Row>
                
            </Container>

            <Desktop>
                <div style={{height : '145px'}}></div>
            </Desktop>

            <Tablet>
                <div style={{height : '100px'}}></div>

            </Tablet>

            <Mobile>
                <div style={{height : '13px'}}></div>
                
            </Mobile> 
            <FooterComponent/>
        </>
    )
} 

export default Contact