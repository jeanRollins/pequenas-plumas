import React from 'react' 
import { slide as Menu } from 'react-burger-menu'

//Bootstrap Components
import {Navbar, Nav} from 'react-bootstrap'


import {Link} from 'react-router-dom'


function showSettings (e) {
  e.preventDefault() 
}


function Header () {

  return (

    <div className="">
       
      <Navbar  className="bgPrimary" variant="dark">
        <Navbar.Brand >Pequeñas Plumas</Navbar.Brand>
        <Nav className="mr-auto">
          
          <Nav.Link  
            className=" d-xs-none d-sm-none" 
            xs="false"
            sm="false" 
            md={stylesMD} 
            lg={stylesLG}     
            >
            <Link to="/" className="navLink"> Home </Link>
          </Nav.Link>

          <Nav.Link className="" >
            <Link to="/about"  className="navLink"> About </Link>
          </Nav.Link>

          <Nav.Link to="/about" >
            <Link to="/gallery"  className="navLink" > Gallery </Link>
          </Nav.Link>

          <Menu right styles={ styles }>

            <Link to="/" 
              className="bmMenuItem" 

            > Home </Link>

            <Link to="/about" className="bmMenuItem"> About </Link>

            <Link to="/contact" className="bmMenuItem"> Contact </Link>
   
          </Menu>  
        </Nav>

      </Navbar>

    </div>
    
  )
}

var stylesXS = {
  headerNavNone : {
    display : 'none',
  }
}

var stylesSM = {
  headerNavNone : {
    display : 'none',
  }
}

var stylesMD = {
  headerNavNone : {
    display : 'none',
  }
}

var stylesLG = {
  headerNavNone : {
    display : 'block',
  }
}

var stylesXL = {
  headerNavNone : {
    display : 'block',
  }
}
var styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    left: '36px',
    top: '36px'
  },
  bmBurgerBars: {
    background: '#373a47'
  },
  bmBurgerBarsHover: {
    background: '#a90000', 
    color : '#cccccc'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
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
    margin : '10px 10px 10px 10px'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
}




export default Header

