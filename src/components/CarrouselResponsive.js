import React  from 'react' 
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'

export default function CarouselResponsive(props) {
  var src = props.resources
  console.log('props**' , props);
  
  
  var galery = src.map( row =>
    
    <div key={row.file}>
      <img src={row.file} alt=""/>
      <p className="legend">{row.legend}</p>
    </div>
  )

  return <Carousel>
    {galery }
  </Carousel>
}
