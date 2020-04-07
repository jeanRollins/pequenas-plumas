import React from 'react'
import './resources/css/styles.css'

//components
import Header from './components/Header'
import FooterComponent from './components/FooterComponent'

//pages
import Home from './pages/Home'
import AvesTipo from './pages/AvesTipo'
import About from './pages/About'
import Gallery from './pages/Gallery'
import AveDescripcion from './pages/AveDescripcion'

import { BrowserRouter as Router, Route, Switch, useParams } from 'react-router-dom'
import ButtonFloat from './components/ButtonFloat'


function App() {
  return (
    <Router>

      <div>
        <Header/>
        <ButtonFloat/>
          <Switch>
            
            <Route path="/" exact component={Home} /> 
            <Route path="/avestipo" component={AvesTipo} />  
            <Route path="/gallery"  component={Gallery} /> 
            <Route path="/about" component={About} />
            <Route path="/:type" children={<AveDescripcion/>} />
   
          </Switch>
      
        <FooterComponent/>
      </div>

    </Router>
  );
}

export default App