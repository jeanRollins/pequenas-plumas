import React from 'react' 
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'

function CarouselResponsive() {
  return (
    <Carousel>
      <div>
        <img src="https://firebasestorage.googleapis.com/v0/b/my-app-notice.appspot.com/o/home%2Fcuidados-de-tu-loro.jpg?alt=media&token=f98e0054-a685-4f4c-a3fa-85b07f821424" />
        { /* <p className="legend"></p> */} 
      </div>
      <div>
        <img src="https://firebasestorage.googleapis.com/v0/b/my-app-notice.appspot.com/o/home%2Floro-727x409.jpg?alt=media&token=d473cf8b-8ad4-4838-9aea-3a0eb05b846c" />
        <p className="legend">Legend 2</p>
      </div>
      <div>
        <img src="https://firebasestorage.googleapis.com/v0/b/my-app-notice.appspot.com/o/home%2Floros-e1530830031479.jpg?alt=media&token=f6828008-f6d7-45d7-b6ef-c194bd4d6f41" />
        <p className="legend">Legend 3</p>
      </div>
    </Carousel>
  )
}

export default CarouselResponsive 