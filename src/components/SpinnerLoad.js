import React from 'react'
import { Spinner }  from 'react-bootstrap'

export default function SpinnerLoad(props){


    //const style = { marginTop: '200px' , display : props.isHide ? 'block' : 'none' }
    const style = { marginTop: '200px' }
    
    return(
        <div style={ style } className="spinnerContainer text-success" align="center">

            <Spinner animation="grow" variant="success" />
            <Spinner animation="grow" variant="success" />
            <Spinner animation="grow" variant="success" />
            <br/>
            <strong> Cargando... </strong> 
         </div>

    )
}