import React, {useState, useEffect} from 'react'

import {  withRouter } from 'react-router-dom' 
import {auth} from '../../firebase'
import {GetDocumentWhere} from '../../firebaseData'

import SpinnerLoad from '../../components/SpinnerLoad'
import Menu from '../../components/back/Menu'

import { Container ,Row, Col, Table, Card} from 'react-bootstrap'


import MyBarChart from '../../components/back/MyBarChart'



const Dashboard = (props) => {

    const [ user , setUser ] = useState( null  )
    const [ userFirebase , setUserFirebase ] = useState( false  )

    const userGet = async () => {
    
        const data =  await GetDocumentWhere('users', 'id' , auth.currentUser.uid )
        setUserFirebase(data.map( row => row ))
    }

    
    
    
    useEffect( () => {
        if( auth.currentUser){
            setUser( auth.currentUser )
            
            userGet()
        }
        else{
            props.history.push('/backLogin')
        }
    },[])

    return  (!userFirebase) ? 
        (
            <SpinnerLoad/>
        ) : (
        <>   
        
            <Container className="my-4">
                
                <Row>
                    <Col 
                        sm = {0} 
                        md = {0}
                        lg = {3}
                        xl = {3}
                    >
                        <Card className="effectShadow p-3">
                            <Menu />
                        </Card>    
                    </Col>
                    <Col 
                        sm = {12} 
                        md = {6}
                        lg = {4}
                        xl = {4}
                        className="p-3"
                    >
                        <MyBarChart className="mt-3"/>
                    </Col>

                    <Col className="my-4 px-3"
                        sm = {12} 
                        md = {6}
                        lg = {5}
                        xl = {5}
                    >
                        <h5 className="my-4" style={{color : global.COLOR_TEXT}}>Ultimas Ventas : </h5>

                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Ave</th>
                                    <th>Monto</th>
                                    <th>Fecha</th>
                                    <th>Total</th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Loro</td>
                                    <td>$10.000</td>
                                    <td>20/02/2020</td>
                                    <td>$10.000</td>

                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Catita</td>
                                    <td>$10.000</td>
                                    <td>20/02/2020</td>
                                    <td>$10.000</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Canario</td>
                                    <td>$10.000</td>
                                    <td>20/02/2020</td>
                                    <td>$10.000</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>Paloma</td>
                                    <td>$10.000</td>
                                    <td>20/02/2020</td>
                                    <td>$10.000</td>
                                </tr>
                            </tbody>
                        </Table>
                        
                    </Col>
                </Row>
            </Container>
        </>
    )
}



export default withRouter(Dashboard)