import React from 'react' 
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'

function CarouselResponsive(props) {
  
  let src = props.imgSrc 
  
  var image = src.map( (data , i) =>  
    <div key={i}>
      <img src={data.url} alt={data.legend}/>
      <p className="legend">Lorem ipzum</p>
    </div>
  )
  
  return (
    <Carousel>
      { image }
    </Carousel>
     
  )
}

export default CarouselResponsive 