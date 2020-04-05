import React from 'react'
import {
    Row ,
    Col , 
    Container
} from 'react-bootstrap' 

export default function FooterComponent(){

    const style = {
        flexShrink : 'none'
    }


    return (
        <footer style={style} className="bgPrimary mt-3 py-4 text-white-50">
            <div className="container text-center">
                <Container className="mt-5">
                    <Row>
                        <Col>
                            <small>Copyright &copy; Your Website</small>
                        
                        </Col>
                    </Row>
                </Container>
            </div>
        </footer>
    
    )
}