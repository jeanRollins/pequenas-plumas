import React from 'react' 
import {LOGO} from '../../globals'
//Bootstrap Components
import {Navbar, Nav, NavItem, Image} from 'react-bootstrap'
import { withRouter,Link } from 'react-router-dom'

import {logout} from '../../libs/Login'

import { useMediaQuery }  from 'react-responsive'


function Header (props) { 

  const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 992 })
    return isDesktop ? children : null
  }

  const Tablet = ({ children }) => {
      const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
      return isTablet ? children : null
  }

  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 })
    return isMobile ? children : null
  }


  return (
    
    <div className="effectShadow text-white">

      <Navbar className="bgPrimary text-white" expand="lg">

        
        <Link 
          to="/backLogin" 
          className="navLink  text-decoration-none" > 
          <img src={LOGO} style={stylesLogo} className="" />  
        </Link> 
        
          {
            props.userFirebase !== null ? (
              <>
                <Desktop >
                  <Image src={props.userFirebase.img} style={{ width : '40px' , height : '40px' , marginLeft: '400px' }} roundedCircle />
                  <h5 style={{margin: '0px 0px 0px 17px' }} >{  'Bienvenido ' + props.userFirebase.name }</h5>  
                </Desktop>

                <Tablet>
                  <Image src={props.userFirebase.img}  style={styleImgUser} roundedCircle />
                  <Navbar.Toggle aria-controls="basic-navbar-nav" className="" />

                  <Navbar.Collapse id="basic-navbar-nav " align="left" >
                    <Nav className="mr-auto ">
              
                      <NavItem className="m-3">
                        <Link 
                          to="/backDashboard" 
                          className="navLink  " > 
                          Home   
                        </Link>
                      </NavItem>
                      <NavItem className="m-3">
                        <Link 
                          to="/backDashboard" 
                          className="navLink  " > 
                          Config Home   
                        </Link>
                      </NavItem>

                      <NavItem className="m-3">
                        <Link 
                          className="navLink  " 
                          onClick = {(e) => { 
                            e.preventDefault() ; 
                            logout() ;
                            props.history.push('/backLogin')
                          }} 
                        > 
                          Salir   
                        </Link>
                      </NavItem>
                    </Nav>

                  </Navbar.Collapse> 
                </Tablet>

                <Mobile>
                  <Image src={props.userFirebase.img}  style={styleImgUser} roundedCircle />
                  <Navbar.Toggle aria-controls="basic-navbar-nav" className="" />

                  <Navbar.Collapse id="basic-navbar-nav " align="left" >
                    <Nav className="mr-auto ">
              
                      <NavItem className="m-3">
                        <Link 
                          to="/backDashboard" 
                          className="navLink  " > 
                          Home   
                        </Link>
                      </NavItem>
                      <NavItem className="m-3">
                        <Link 
                          to="/backDashboard" 
                          className="navLink  " > 
                          Config Home   
                        </Link>
                      </NavItem>

                      <NavItem className="m-3">
                        <Link 
                          className="navLink  " 
                          onClick = {(e) => { 
                            e.preventDefault() ; 
                            logout() ;
                            props.history.push('/backLogin')
                          }} 
                        > 
                          Salir   
                        </Link>
                      </NavItem>
                    </Nav>

                  </Navbar.Collapse> 
                </Mobile>

               
              </>
            ) : (
                
                null
            )
          }
         
      </Navbar>
    </div>
  )
}

var styleImgUser = {
  width  : '40px' ,
  height : '40px' 
}

var stylesLogo = {
  
  width: '179px' ,
  height: '88px'
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

export default withRouter(Header)

