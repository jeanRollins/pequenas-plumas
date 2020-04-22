
import  firebase from 'firebase/app'
import "firebase/auth";
import 'firebase/firestore'
import 'firebase/storage'


var firebaseConfig = {
  apiKey: "AIzaSyASoBkrXw4aFHu64QqVYP_N5FlOeBgodr8",
  authDomain: "my-app-notice.firebaseapp.com",
  databaseURL: "https://my-app-notice.firebaseio.com",
  projectId: "my-app-notice",
  storageBucket: "my-app-notice.appspot.com",
  messagingSenderId: "697521576493",
  appId: "1:697521576493:web:dacab3d2c575973414f6a4"
};

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore()

export const fire = firebase
export const auth = firebase.auth()
export const storage = firebase.storage

export default  db

