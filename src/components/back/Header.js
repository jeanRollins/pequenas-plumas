import React from 'react' 
import {LOGO} from '../../globals'
//Bootstrap Components
import {Navbar, Nav, NavItem, Image} from 'react-bootstrap'
import { withRouter,Link } from 'react-router-dom'

import {logout} from '../../libs/Login'

import { useMediaQuery }  from 'react-responsive'


export const menuItems = [
  {
    to    : '/backDashboard' ,
    name  : 'Home' 
  },
  {
    to    : '/backConfHome' ,
    name  : 'Conf Home' 
  },
  {
    to    : '/backConfHome' ,
    name  : 'Aves Tipo' 
  },
  {
    to    : '/backConfHome' ,
    name  : 'About Gallery' 
  }
]


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
            (props.userFirebase !== undefined)   ? (
              <>
                <Desktop >
                  <Image 
                    src   = { props.userFirebase.img  } 
                    style = {{ width : '40px' , height : '40px' , marginLeft: '400px' }} 
                    roundedCircle 
                  />
                  <h5 style={{margin: '0px 0px 0px 17px' }} >{  'Bienvenido ' + props.userFirebase.name }</h5>  
                  <Link 
                    style = {{ margin : '3px 0px 0px 100px'}}
                    className="navLink " 
                    to="/backLogin" 

                    onClick = {(e) => { 
                      e.preventDefault() 
                      logout() 
                      props.history.push('/backLogin')
                    }} 
                  > 
                    Salir   
                  </Link>
                </Desktop>

                <Tablet>
                  <Image src={props.userFirebase.img}  style={styleImgUser} roundedCircle />
                  <Navbar.Toggle aria-controls="basic-navbar-nav" className="" />

                  <Navbar.Collapse id="basic-navbar-nav " align="left" >
                    <Nav className="mr-auto ">
              
                      <NavItem className="my-2">
                        <Link 
                          to="/backDashboard" 
                          className="navLink  " > 
                          Home   
                        </Link>
                      </NavItem>
                      <NavItem className="my-2">
                        <Link 
                          to="/backConfHome" 
                          className="navLink  " > 
                          Config Home   
                        </Link>
                      </NavItem>

                      <NavItem className="my-2">
                        <Link 
                          to="/backLogin" 
                          className="navLink  " 
                          onClick = {(e) => { 
                            e.preventDefault() 
                            logout() 
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
                           to="/backLogin" 

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

export default withRouter(Header)

