import React from 'react'
import './resources/css/styles.css'

//components
import Header from './components/Header'

//pages
import Home from './pages/Home'
import AvesTipo from './pages/AvesTipo'
import About from './pages/About'
import Gallery from './pages/Gallery'
import AveDescripcion from './pages/AveDescripcion'
import Contact from './pages/Contact'
import PageNotFound from './pages/PageNotFound' 


import { BrowserRouter as Router , Route , Switch } from 'react-router-dom'
import ButtonFloat from './components/ButtonFloat'

function App(props) {  
  return (
    
    <Router>

      <div>
        <Header/>
          <ButtonFloat/>
          <Switch>
            
            <Route path="/"         exact component = { Home } /> 
            <Route path="/avestipo" exact component = { AvesTipo } />  
            <Route path="/gallery"  exact component = { Gallery } /> 
            <Route path="/about"    exact component = { About } />
            <Route path="/contact"  exact component = { Contact } />
            <Route path="/avestipo/:type"    children = { <AveDescripcion/> } />

            <Route path = "*"  component = { PageNotFound }  />
          </Switch>
      </div>

    </Router>
  );
}

export default App