import React from 'react' 
import {LOGO} from '../globals'
//Bootstrap Components
import {Navbar, Nav, NavItem} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { FaHome ,FaGripHorizontal ,FaUsers, FaImage } from "react-icons/fa";



function Header () {

  const routes = [
    {
      name : 'Home' ,
      url  : '/'
    },
    {
      name : 'Tipos de Aves' ,
      url  : '/avestipo'
    },
    {
      name : 'Nosotros' ,
      url  : '/about'
    },
    {
      name : 'Contacto' ,
      url  : '/contact'
    },
  ]

  return (

    <div className="effectShadow text-white">

      <Navbar className="bgPrimary text-white"  expand="lg">
        <Link 
          to="/" 
          className="navLink  text-decoration-none" > 
          <img src={LOGO} style={stylesLogo} className="" />  
        </Link> 
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="mr-auto">
            
            {routes.map( (row) => (
                <NavItem 
                  key = { row.name }  
                  className="m-2"
                >
                  <Link 
                    to = { row.url } 
                    className="navLink  " > 
                    { row.name }   
                  </Link>
                </NavItem>
            ))}

          
           
          </Nav>
        
        </Navbar.Collapse>
      </Navbar>

     
      
    </div>
    
  )
}

var stylesLogo = {
  
  width: '179px' ,
  height: '88px'
}

export default Header

