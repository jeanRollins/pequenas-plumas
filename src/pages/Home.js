import React from 'react' 

import CarouselResponsive from '../components/CarrouselResponsive'

//import firebase from '../firebase'

function Home() {
  return (
    <div className="">
      <CarouselResponsive imgSrc={ getResources() }/>
      { getFilesFirebase() }

    </div>
  )
}

function getResources(){

  var data = [
    {
      url    : 'https://firebasestorage.googleapis.com/v0/b/my-app-notice.appspot.com/o/home%2Floros-e1530830031479.jpg?alt=media&token=f6828008-f6d7-45d7-b6ef-c194bd4d6f41' , 
      legend :  'Lorem ipzum dolor is simple text of the test.' 
    },
    {
      url    : 'https://firebasestorage.googleapis.com/v0/b/my-app-notice.appspot.com/o/home%2Floro-727x409.jpg?alt=media&token=d473cf8b-8ad4-4838-9aea-3a0eb05b846c' , 
      legend :  'Lorem ipzum dolor is simple text of the test.' 
    },
    {
      url    : 'https://firebasestorage.googleapis.com/v0/b/my-app-notice.appspot.com/o/home%2Fcuidados-de-tu-loro.jpg?alt=media&token=f98e0054-a685-4f4c-a3fa-85b07f821424' , 
      legend :  'Lorem ipzum dolor is simple text of the test.' 
    }
  ]

  return data
}

function getFilesFirebase(){  

}

export default Home 