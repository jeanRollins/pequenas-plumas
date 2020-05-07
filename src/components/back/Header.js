import React from 'react' 
import {LOGO} from '../../globals'
//Bootstrap Components
import {Navbar, Nav, NavItem, Image} from 'react-bootstrap'
import { withRouter,Link } from 'react-router-dom'

import {logout} from '../../libs/Login'

import MediaQuery from '../../components/commons/MediaQuery'


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
    to    : '/backConfAvesTipo' ,
    name  : 'Conf Aves Tipo' 
  },
  {
    to    : '/backConfAbout' ,
    name  : 'Conf About' 
  },
  {
    to    : '/backConfEmail' ,
    name  : 'Correos recibidos' 
  },
  {
    to    : '/backConfSales' ,
    name  : 'Ventas' 
  }
]


function Header (props) { 

  const Mobile  =  MediaQuery('mobile')
  const Tablet  =  MediaQuery('tablet')
  const Desktop =  MediaQuery('desktop')

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

                      { menuItems.map( (row ,index) => (
                        <NavItem key = { index } className="my-2">
                          <Link 
                            to = { row.to } 
                            className="navLink  " > 
                            { row.name }   
                          </Link>
                        </NavItem>
                      ))}
                     
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
                          
                      { menuItems.map( (row, index) => (
                        <NavItem key = { index } className="m-2">
                          <Link 
                            key = { index }
                            to = { row.to } 
                            className="navLink  " > 
                            { row.name }  
                          </Link>
                        </NavItem>
                      ))}
                     
                      <NavItem className="m-2">
                        <Link 
                          to="/backLogin"
                          className="navLink" 
                          onClick = { (e) => { 
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

