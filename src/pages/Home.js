import React from 'react' 

import CarouselResponsive from '../components/CarrouselResponsive'

import firebase from '../firebase'
import { firestore } from 'firebase'



function Home() {
  return (
    <div className="">

      <CarouselResponsive/>
      { getFilesFirebase() }
    </div>
  )
}

function getFilesFirebase(){

  var firestore = firebase.firestore()

  console.log(firestore.collection('files_home_carousel'))
  
  
}

export default Home 