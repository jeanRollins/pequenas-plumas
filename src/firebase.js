import firebase from 'firebase' ;

  // Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyASoBkrXw4aFHu64QqVYP_N5FlOeBgodr8",
    authDomain: "my-app-notice.firebaseapp.com",
    databaseURL: "https://my-app-notice.firebaseio.com",
    projectId: "my-app-notice",
    storageBucket: "my-app-notice.appspot.com",
    messagingSenderId: "697521576493",
    appId: "1:697521576493:web:dacab3d2c575973414f6a4"
};

// Initialize Firebase
const database =  firebase.initializeApp(firebaseConfig);

export default database ; 
