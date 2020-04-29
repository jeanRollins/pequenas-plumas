
import  firebase from 'firebase/app'
import "firebase/auth";
import 'firebase/firestore'
import 'firebase/storage'


var firebaseConfig = {

  };

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore()

export const fire = firebase
export const auth = firebase.auth()
export const storage = firebase.storage

export default  db

