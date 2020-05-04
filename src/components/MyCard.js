import db from '../firebase'
import React, { useState,  useEffect } from 'react'
import {Card, Button, Container ,Row, Col }  from 'react-bootstrap'
import MediaQuery  from '../components/commons/MediaQuery'
import {Link} from 'react-router-dom'

export function MyCard(props){
    
    return(
        <Card style={{ width: '100%' , height : '100%' }}>
            <Card.Img variant="top" src={props.image} fluid/>
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                
            </Card.Body>
        </Card>
    )
}


export function CardResponsive(props) {

    const Desktop = MediaQuery('desktop')
    const Tablet  = MediaQuery('tablet')
    const Mobile  = MediaQuery('mobile')

    return(
        <Card
            className = "my-3  effectShadowStatic textColorPrimary"
        >
            <Desktop>
                <Card.Img 
                    variant="top" 
                    style={ {height : '150px'} } 
                    src = { props.image } />
            </Desktop>

            <Tablet> 
                <Card.Img 
                    variant="top" 
                    style={ {height : '150px'} } 
                    src = { props.image } 
                    /> 
            </Tablet>

            <Mobile> 
                <Card.Img 
                    variant="top"  
                    src = { props.image } 
                    /> 
            </Mobile>
            <Card.Body>
                <Card.Title>{ props.name }</Card.Title>

                <Desktop> 
                    <Card.Text 
                        style={{ height : '210px' }}
                        > 
                        { props.shortDescription } 
                    </Card.Text> 
                </Desktop>

                <Tablet> 
                    <Card.Text 
                        style={{ height : '210px' }}
                        >
                        { props.shortDescription } 
                    </Card.Text> 
                </Tablet>
                <Mobile> 
                    <Card.Text 
                    > 
                    { props.shortDescription } 
                    </Card.Text> 
                </Mobile>

                <Link 
                    to={ props.url }  
                    className="" 
                    > 
                    {"Ver más"}
                </Link>

            </Card.Body>
        </Card>
    )
}

export function CardInline(props){

    return(
        <div className="card mb-3 textColorPrimary effectShadowStatic" >
            <div className="row no-gutters">
                <div className="col-md-4">
                    <img 
                        alt=""
                        src ={ props.img }
                        className = "card-img" 
                        style = {{ height : '250px' }} 
                    />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title"> { props.title } </h5>
                        <p className="card-text">{ props.content }.</p>
                        <p className="card-text"><small className="text-muted">{ props.textMuted }</small></p>
                    </div>
                </div>
            </div>
        </div>
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
        <>
            {aboutText}
        </>
    )
}