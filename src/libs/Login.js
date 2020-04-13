import {auth} from '../firebase'
import { withRouter } from 'react-router-dom'


export async  function validate(email, password){
  const response = await auth.signInWithEmailAndPassword(email, password)
  return response
}

export async function GetAuth () {
  return await auth 
} 

export async function logout(props){
  await auth.signOut()
}

export async function observer(){
  await auth.onAuthStateChanged( function( user ) {
    if (user) {
      let $user = JSON.stringify(user) 
      localStorage.setItem('user', $user ) 
      return true
    }
    else {
      localStorage.clear();
      return false
    }
  })
}

export async function isAuthPage() {
  const dataUser = await auth.currentUser
  console.log( 'dataUser' , dataUser )
  return dataUser
}
