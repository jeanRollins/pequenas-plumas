import React from 'react' 
import { slide as Menu } from 'react-burger-menu'
import {LOGO} from '../globals'
//Bootstrap Components
import {Navbar, Nav,NavDropdown, NavItem} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { FaHome ,FaGripHorizontal ,FaUsers, FaImage } from "react-icons/fa";



function Header () {

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
            
            <NavItem className="m-2">
              <Link 
                to="/" 
                className="navLink  " > 
                Home   
              </Link>
            </NavItem>

            <NavItem className="m-2">
              <Link 
                to="/avestipo"  
                className="navLink  " > 
                Tipos de Aves 
              </Link>
            </NavItem>

            <NavItem  className="m-2">
              <Link 
                to="/about"  
                className="navLink  "> 
                Nosotros 
              </Link>
            </NavItem>
           
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

