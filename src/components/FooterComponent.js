import React from 'react'
import {
    Row ,
    Col , 
    Container
} from 'react-bootstrap' 

import { NAME_APP, LOGO, CELL_NUMBER } from '../globals'
import MediaQuery  from '../components/commons/MediaQuery'

export default function FooterComponent(){

    const style = {
        flexShrink : 'none' ,
        width      : '100%' 
    }

    const Desktop = MediaQuery('desktop')
    const Tablet  = MediaQuery('tablet')
    const Mobile  = MediaQuery('mobile')

    return (
        <footer style={style} className=" bgPrimary mt-3 py-4 text-white-50">
            <div className="container text-center">

                <Container className="">
                    <Row>
                        <Col>
                            <Desktop>
                                <img src={LOGO}  style={{ width : '28%'}} />  
                            </Desktop>
                            <Tablet>
                                <img src={LOGO}  className="img-fluid" />  
                            </Tablet>
                            <Mobile>
                                <img src={LOGO}  style={{ width : '50%'}} />  
                            </Mobile>
                        </Col>
  
                        <Col> <p className="mt-3"> Contacto : <br/> { "+569 " + CELL_NUMBER} </p>  </Col>
                    </Row>
                </Container>
                <Container className="mt-2">
                    <Row>
                        <Col>
                            <small>Copyright &copy; {NAME_APP + ' 2020'}</small>
                        
                        </Col>
                    </Row>
                </Container>

            </div>
        </footer>
    
    )
}