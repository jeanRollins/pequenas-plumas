import React from 'react' 
import { slide as Menu } from 'react-burger-menu'

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
                Pequeñas Plumas  
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


var styles = {
  bmBurgerButton: {
    position: 'relative',
    width: '36px',
    height: '30px',
    left: '0px',
    top: '0px'
  },
  bmBurgerBars: {
    background: '#fff'
  },
  bmBurgerBarsHover: {
    background: '#a90000', 
    color : '#cccccc'
  },
  bmCrossButton: {
    height: '30px',
    width: '30px'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%'
  },
  bmMenu: {
    background: '#004d1a',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em'
  },
  bmItem: {
    display: 'inline-block' ,
    width : '100%' ,
    textDecoration : 'none', 
    color : '#fff', 
    margin : '13px 13px 13px 13px'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
}

export default Header

