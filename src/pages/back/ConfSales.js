import React, {useState, useEffect} from 'react'
import {auth} from '../../firebase'
import {  withRouter } from 'react-router-dom' 



function ConfSales(props){
    const [ user , setUser ] = useState( null  )

    useEffect( () => {
        if( auth.currentUser){
            setUser( auth.currentUser )
        }
        else{
            props.history.push('/backLogin')
        }
    },[])

    return (
        <>
            **************ConfSales!!
        </>
    )
}

export default withRouter(ConfSales)