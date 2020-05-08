import React, {useState, useEffect} from 'react'
//data
import {auth} from '../../firebase'


//modules
import {  withRouter } from 'react-router-dom' 
import {Container, Row, Col, Table} from 'react-bootstrap'

//components
import {GetDocumentWhere} from '../../firebaseData'
import TableResponsive from '../../components/back/TableResponsive'
import SpinnerLoad from '../../components/SpinnerLoad'

function ConfEmail(props){

    const [ user , setUser ] = useState( false  )
    const [ emails , setEmails ] = useState( false  )
    const [ messageHtml , setMessageHtml ] = useState( '' )


    const configTable = {
        
        headerTable : ['Fecha' , 'Email', 'Nombre', 'Link'] ,

        keys : [
            { type : 'text' , resource : 'date'  } , 
            { type : 'text' , resource : 'email' } ,
            { type : 'text' , resource : 'name'  } ,
            { type     : 'link'    , 
            resource : 'message' , 
            name     : 'Abrir'   , 
            isMethod : true      
            }
        ] 
    }

    const fetch = async () => {
        const data  =  await GetDocumentWhere('mails', 'status' , 1 )
        setEmails( data )
        console.log('data' , data)
    }

    useEffect( () => {
        if( auth.currentUser){
            setUser( auth.currentUser )
        }
        else{
            props.history.push('/backLogin')
        }

        fetch()
    },[])
    
    return ( emails !== false ) ? (
        <>
        <Container>
            <Row>
                <Col>
                    <TableResponsive
                        data   = { emails }
                        config = { configTable }
                    />    
                </Col>
            </Row>
        </Container>
        <hr/>
        <Container>
            <Row>
                <Col>
                    {messageHtml}
                </Col>
            </Row>
        </Container>
            
        </>
    ) : (
        <SpinnerLoad/>
    )
}

export default withRouter(ConfEmail)