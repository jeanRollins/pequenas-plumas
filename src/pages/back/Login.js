import React, {useState,useEffect} from 'react'
import { validate, isAuthPage } from '../../libs/Login' 

import { withRouter } from 'react-router-dom'

import { Container , Row , Col , Card , Form , Button } from 'react-bootstrap'

function Login(props){
  
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [textEmail, setTextEmail] = useState(false)
    const [textPassword, setTextPassword] = useState(false)

    const [textAuthFail, setTextAuthFail] = useState(false)
    

    const styleTextError = {  color : 'red'  }

    const login = React.useCallback( async ()  =>  {

        if( !email ){
            setTextEmail(true)
            return false
        }

        if( !password ){
            setTextPassword(true)
            return false
        }
        try {
            const response = await validate( email , password )
            props.history.push('/backDashboard')
        } 
        catch (error) {
            setTextAuthFail(true)
        }
        
    },[email, password] ) 
    
    return(

        <div>
            <Container className="mt-3">
              <Row>
                <Col>
                    <Card className="text-center mt-5">
                        <Card.Body className="text-center ">
                            <Card.Title>Acces To Pequeñas Plumas </Card.Title>
                            
                            <Form>
                                <Form.Group align="left" controlId="formBasicEmail">
                                    <Form.Label >Email : </Form.Label>
                                    <Form.Control 
                                        value={email} 
                                        type="email" 
                                        placeholder="Enter email" 
                                        onChange={ e =>  setEmail(e.target.value)}
                                    />
                                   { (textEmail) ?  <p style={ styleTextError}> Email requerida. </p> : null } 
                                </Form.Group>

                                <Form.Group align="left" controlId="formBasicPassword">
                                    <Form.Label>Password : </Form.Label>
                                    <Form.Control
                                        value={password} 
                                        type="password" 
                                        placeholder="Password" 
                                        onChange={ e =>  setPassword(e.target.value)}
                                    />

                                   { (textPassword) ?   <p style={ styleTextError } > Password requerida. </p> : null } 
                                   { (textAuthFail) ?   <p style={ styleTextError } > Usuario o contraseña no valida. </p> : null } 

                                </Form.Group>
              
                                <Button 
                                    variant="primary" 
                                    onClick = { (e) => { 
                                        e.preventDefault() ; 
                                        login( email , password ) } 
                                    }  className="btn btn-success btn-block" type="submit">
                                    Entrar
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
              </Row>
            </Container>
          
        </div>
    )
}

export default  withRouter(Login)