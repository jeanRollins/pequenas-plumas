import db from '../firebase'
import React, { useState,  useEffect } from 'react'
import {Card, Button, Container ,Row, Col , CardColumns}  from 'react-bootstrap'
import { useMediaQuery }  from 'react-responsive'
import {Link} from 'react-router-dom'

export function MyCard(props){
    
    return(
        <Card style={{ width: '100%' , height : '100%' }}>
            <Card.Img variant="top" src={props.image} />
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                
                <Card.Text className="">{props.short_description} </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    )
}


export function CardGroup(props) {

    const Desktop = ({ children }) => {
        const isDesktop = useMediaQuery({ minWidth: 992 })
        return isDesktop ? children : null
    }

    const Tablet = ({ children }) => {
        const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
        return isTablet ? children : null
    }
      const Mobile = ({ children }) => {
        const isMobile = useMediaQuery({ maxWidth: 767 })
        return isMobile ? children : null
    }

    const [about , setAbout] = useState([])
    const [aboutText , setAboutText] = useState([])
    const [loop , setLoop] = useState(true)
    
    const fetchApi = async () => {
        
        const data = await db.collection(props.type).get()
        setAbout( data.docs.map( doc =>  doc.data() ))

        console.log('about' , about)
        
        var description = Object.keys(about).map( data => {
            let _about = about[data]
            return  (<Col 
                        key = { _about.image }
                        sm  = { 12} 
                        md  = { 4 }
                        lg  = { 3 } 
                        xl  = { 3 } 
                    >
                        <Card key={_about.image}>
                      
                            <Desktop>
                                <Card.Img 
                                    variant="top" 
                                    style={ {height : '150px'} } 
                                    src = { _about.image } />
                            </Desktop>

                            <Tablet> 
                                <Card.Img 
                                    variant="top" 
                                    style={ {height : '150px'} } 
                                    src = { _about.image } 
                                    /> 
                            </Tablet>

                            <Mobile> 
                                <Card.Img 
                                    variant="top"  
                                    src = { _about.image } 
                                    /> 
                            </Mobile>
                            <Card.Body>
                                <Card.Title>{ _about.title }</Card.Title>

                                <Desktop> 
                                    <Card.Text 
                                        style={{ height : '210px' }}
                                        > 
                                        { _about.short_description } 
                                    </Card.Text> 
                                </Desktop>

                                <Tablet> 
                                    <Card.Text 
                                        style={{ height : '210px' }}
                                        >
                                        { _about.short_description } 
                                    </Card.Text> 
                                </Tablet>
                                <Mobile> 
                                    <Card.Text 
                                    > 
                                    { _about.short_description } 
                                    </Card.Text> 
                                </Mobile>

                                <Link 
                                    to={ _about.url }  
                                    className="" 
                                    > 
                                    Tipos de Aves 
                                </Link>

                            </Card.Body>
                        </Card>
                    </Col>
                    )      
        })
        setAboutText(description)
        setLoop(false)
    }

    useEffect( () => {
        
        fetchApi()
   
    }, [loop])

    return(
        <Container className="mt-5">
            <Row>
                {aboutText}
            </Row>
        </Container>
    )
}

export function CardAbout(){

    const [about , setAbout] = useState([])
    const [aboutText , setAboutText] = useState([])
    const [loop , setLoop] = useState(true)

    const fetchApi = async () => {
        
        const data = await db.collection('about').get()
        setAbout( data.docs.map( doc =>  doc.data() ))

        var description = Object.keys(about).map( data => {
            let _about = about[data]
            return <Card className="text-center"  
                         key   = { _about.subtitle } 
                    >
                        <Card.Header> { _about.subtitle }</Card.Header>
                        <Card.Body>
                            <Card.Title>{ _about.title }</Card.Title>
                            <Card.Text>
                                { _about.about }
                            </Card.Text>
                        </Card.Body>
                    </Card> 
        })
        setAboutText(description)
        setLoop(false)
    }

    useEffect( () => {
        
        fetchApi()
   
    }, [loop])

    return(
        <div>
            {aboutText}
        </div>
    )
}