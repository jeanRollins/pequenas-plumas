import React from 'react' 

import Home from './pages/Home'
import About from './pages/About'
import Gallery from './pages/Gallery'

import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'


function Header() {
  return (
    <div className="">
      <React.Fragment>
        <Router>
          <Switch>
            <Router exact path="/" component={Home}/>
            <Router  path="/about" component={About}/>
            <Router  path="/gallery" component={Gallery}/>
          </Switch>
        </Router>
      </React.Fragment>
    </div>
  );
}

export default Header ;
