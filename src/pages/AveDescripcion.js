import React, {useState , useEffect} from 'react' 
//import db from '../firebase'
import {GetDocumentWhere} from '../firebaseData'
import { useParams } from "react-router-dom";
import { Container , Row , Col } from 'react-bootstrap'
import SpinnerLoad from '../components/SpinnerLoad';
import FooterComponent from '../components/FooterComponent';
import Title from '../components/Title';

function AveDescripcion() {
    const [birdsType , setBirdsType] = useState(false)
    const [loop , setLoop] = useState(false)

    const { type } = useParams()
    
    const fetchApi = async () => {

        console.log('type**' , type)
        let responseBirds = await GetDocumentWhere( 'birds_type', 'url' , '/avestipo/' + type )
        console.log('responseBirds**' , responseBirds);

        setBirdsType( responseBirds[0] )
    }

    useEffect( () => {
        fetchApi()
    }, [])
    
    return  ( birdsType !== false ) && 
            ( birdsType !== undefined ) ? (
                <>
                    <div className="my-4" >
                        <Title
                            nameTitle = {'Tipo de aves'}
                        />
                    </div>
                    <Container className="mb-5">
                        <Row>
                            <Col>
                                <div className="card effectShadow">
                                    <div className="card-body">
                                        <img className="w-100 my-3" variant="top" src={ birdsType.image } />
                                        <h3 align="center" className="textColorPrimary my-3"> {birdsType.name} </h3>  

                                        <p className="card-text textColorPrimary">{birdsType.description}</p>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>  
                    <FooterComponent/>
                </>
            ) : (
                <SpinnerLoad/>
            )
}

export default AveDescripcion  