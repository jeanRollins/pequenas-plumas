import React from 'react'
import { Nav } from 'react-bootstrap'

import { menuItems } from '../../components/back/Header'
import { withRouter,Link } from 'react-router-dom'



export default  function Menu (){

    console.log('menuItems',menuItems[0]);
    
    const styleLink = {
        color : global.COLOR_PRIMARY,
        "&:hover": {
            color : "#808080" ,
            textDecoration : 'none' 
        }
    }

    return (
        <>
            <Nav defaultActiveKey="/home" className="flex-column">
                 { menuItems.map( (data,index) => {

                    return (
                        <Link
                            style = { styleLink } 
                            to  = { data.to }
                            key = { index }
                            className = "m-2 "
                        >
                            {data.name}
                        </Link>
                    )
                })}
            </Nav>

        </>
    )
}