import React, { useState, useEffect } from 'react'
import './resources/css/styles.css'

//components
import Header from './components/back/Header'
import SpinnerLoad from './components/SpinnerLoad'

//pages Back
import Login from './pages/back/Login'
import Dashboard from './pages/back/Dashboard' 
import ConfHome from './pages/back/ConfHome' 
import PageNotFound from './pages/PageNotFound' 

import { BrowserRouter as Router, Route, Switch , withRouter, useHistory } from 'react-router-dom' 
import { auth } from './firebase'
import {GetDocumentWhere} from './firebaseData'
import Menu from './components/back/Menu'

import { Container ,Row, Col, Table} from 'react-bootstrap'


function BackApp  () {
  
    const [ userData, setUserData ] = useState( false ) 
    const [ userFirebase , setUserFirebase ] = useState( false )

    const userGet = async () => {
        const data =  await GetDocumentWhere('users', 'id' , auth.currentUser.uid )
        setUserFirebase(data.map( row => row ))
    }

    useEffect( () => {
        auth.onAuthStateChanged( user => {
            if(user){
                userGet()
                setUserData(user)
                
            }
            else{
                setUserFirebase(true)
                setUserData(null)
            }
        })
    }, [])

    

    return (
        <Router>
        {(userData !== false) ? (
        
            <>

            <Header
                userFirebase = {userFirebase[0]}
            />      
            <Container className="my-4">
                
                <Row>
                    
                  
                        <>
                            {(auth.currentUser == null) ? (
                                <>
                                <Login/>
                                {console.log('true***')}
                                </> 
                            ) : (
                                <>
                                     <Col 
                                        sm = {0} 
                                        md = {0}
                                        lg = {3}
                                        xl = {3}
                                    >
                                        <Menu/>
                                        
                                    </Col>
                                    <Col 
                                        sm = {12} 
                                        md = {6}
                                        lg = {9}
                                        xl = {9}
                                        className="card effectShadow mt-5"
                                    >
                                        <Switch>
                                            <>
                                                <Route path = "/backDashboard" exact component = { Dashboard }  />
                                                <Route path = "/backLogin"     exact component = { Login }  />
                                                <Route path = "/backConfHome"  exact component = { ConfHome }  />
                                            </> 
                                            <Route path = "*"  component = { PageNotFound }  />
                                        </Switch>
                                    </Col>

                                </>

                            )}
                           
                        </>
                
                  
                </Row>
            </Container>
              
        </>
        ) : (
            <>

                <SpinnerLoad/>
                      
            </>
            
        )}
    </Router>
    )
}

export default BackApp