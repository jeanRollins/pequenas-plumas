import React from 'react' 
import { slide as Menu } from 'react-burger-menu'

//Bootstrap Components
import {Navbar, Nav} from 'react-bootstrap'

import {Link} from 'react-router-dom'

import { FaHome ,FaGripHorizontal ,FaUsers, FaImage } from "react-icons/fa";


function showSettings (e) {
  e.preventDefault() 
}


function Header () {

  return (

    <div className="">
       
      <Navbar  className="bgPrimary" variant="dark">
        <Navbar.Brand >Pequeñas Plumas  </Navbar.Brand>
        <Nav className="mr-auto">
       
          <Link 
            to="/" 
            className="navLink d-none d-sm-block"
            
            > Home   </Link>
    
          <Link to="/avestipo"  className="navLink d-none d-sm-block" > Tipos de Aves </Link>

          <Link to="/about"  className="navLink d-none d-sm-block"> Nosotros </Link>
      
          <Link to="/gallery"  className="navLink d-none d-sm-block" > Galería </Link>

        </Nav>

        <Menu right styles={ styles } className="">

          <Link to="/" className="bmMenuItem " > <FaHome className="iconsNav"/> Home   </Link>

          <Link to="/avestipo" className="bmMenuItem ">  <FaGripHorizontal className="iconsNav"/> Tipos de Aves </Link>
          
          <Link to="/about" className="bmMenuItem "> <FaUsers className="iconsNav"/> Nosotros </Link>

          <Link to="/gallery" className="bmMenuItem "> <FaImage className="iconsNav"/> Galería </Link>

        </Menu>  

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

