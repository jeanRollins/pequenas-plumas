import React from 'react'
import { Nav, Card } from 'react-bootstrap'

import { menuItems } from '../../components/back/Header'
import { withRouter,Link } from 'react-router-dom'



export default  function Menu (){
    
    const styleLink = {
        color : global.COLOR_PRIMARY,
        "&:hover": {
            color : "#808080" ,
            textDecoration : 'none' 
        }
    }

    return (
        <Card style={{borderRadius: '8px'}} className="mt-5 effectShadow p-3 d-none d-sm-block d-xs-block mr-4">
            <Nav defaultActiveKey="/home" className="flex-column ">
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
        </Card>
            
    )
}