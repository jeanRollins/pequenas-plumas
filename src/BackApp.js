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
                console.log('SI****')
                setUserData(user)
                
            }
            else{
                console.log('NO****')
                setUserFirebase(true)
                setUserData(null)
            }
        })
    }, [])

    return userData !== false ? (
        <>
            <Router>
                
                <Header
                    userFirebase = {userFirebase[0]}
                />      
                <Switch>
                    { (window.location.pathname == '/backLogin' && userData ) ? <Dashboard/>  : (
                        <>
                            <Route path = "/backLogin"     exact={true} component = { Login }  />
                            <Route path = "/backDashboard" exact={true} component = { Dashboard }  />
                            <Route path = "/backConfHome"  exact={true} component = { ConfHome }  />
                        </>
                        
                        )
                        
                        
                    }
                    
                    <Route path = "*"  component = { PageNotFound }  />

                </Switch>
            </Router>
        </>
   
    ) : (
        <>
        
            <SpinnerLoad/>
        </>
        
    )
}

export default BackApp