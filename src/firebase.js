
import  firebase from 'firebase/app'

import 'firebase/firestore'



firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

export default  db