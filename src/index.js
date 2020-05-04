import React from 'react';
import ReactDOM from 'react-dom';

//Bootstrap library
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import BackApp from './BackApp';



import './globals.js'
//import * as serviceWorker from './serviceWorker';

let url = window.location.pathname.substr(0,5)


console.log('window.location.pathname**' , window.location.pathname);

console.log('url**' , url);

if( url != '/back' ){
    
    ReactDOM.render(<App />, document.getElementById('root'));
    
}else{
    ReactDOM.render(<BackApp />, document.getElementById('root'));
    
}





//serviceWorker.unregister();
