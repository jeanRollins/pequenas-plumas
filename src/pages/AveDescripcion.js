import React, {useState , useEffect} from 'react' 
//import db from '../firebase'
import {GetDocumentWhere} from '../firebaseData'
import { useParams } from "react-router-dom";
import { Container , Row , Col } from 'react-bootstrap'

function AveDescripcion() {
    const [birdsType , setBirdsType] = useState([])
    const [loop , setLoop] = useState(true)

    const { type } = useParams()
    const fetchApi = async () => {

        const responseBirds = await GetDocumentWhere( 'birds_type', 'url' , '/' + type )
        setBirdsType( responseBirds[0] )
        setLoop(false)
    }

    useEffect( () => {
        fetchApi()
    }, [loop])
    
    return (
        <Container className="mt-5">
            <Row>
                <Col>
                    <div className="card effectShadow">
                        <div className="card-body">
                            <h3 align="center" className="textColorPrimary"> {birdsType.name} </h3>  
                            <img className="w-100 my-3" variant="top" src={ birdsType.image } />
                            <p className="card-text textColorPrimary">{birdsType.description}</p>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>  
    )
}

export default AveDescripcion  