import React from 'react' 
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'

function CarouselResponsive(props) {
  
  let src = props.imgSrc 

  var image = src.map( (img, i) =>
      <div key={i}>
        <img src={img.url} alt={img.legend}/>
      </div>
  ) 
  
  return (
    <Carousel>
      { image }
    </Carousel>
     
  )
}

export default CarouselResponsive 