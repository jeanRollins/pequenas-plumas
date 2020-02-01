import React from 'react'
import './resources/css/styles.css'

import Home from './pages/Home'
import Header from './components/Header'

import About from './pages/About'
import Gallery from './pages/Gallery'

import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'


function App() {
  return (
    <Router>

      <div>
        <Header/>
        <Switch>
          <Route path="/" exact component={Home} />  
          <Route path="/about" component={About} />   
          <Route path="/gallery"  component={Gallery} /> 
          <Header/>
        </Switch>
      
      </div>

    </Router>
  );
}

export default App;
