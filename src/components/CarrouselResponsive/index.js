import React  from 'react' 
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel as ReactCarousel } from 'react-responsive-carousel'
import { Carousel } from 'react-bootstrap'

import './style.css'

export default function CarouselResponsive(props) {
  let src = props.resources
  
  const galery = src.map( row =>
    
    <div
      className = "imgSlider" 
      key={row.file} 
      style={{width:'100%' }}>
      <img src={row.file} style={{width:'100%' , height : '100%' }} alt=""/>
     
    </div>
  )

  return (
    <>
      <ReactCarousel>
        {galery}
      </ReactCarousel>
    </>
  )
}



export const CarouselBootstrap = (props) => {

  console.log('props**' , props) 
  
  return(
    <Carousel>
      { props.data.map( (row) => (
        <Carousel.Item 
          key = {row.id}
        >
          <img
            className = "d-block w-100"
            src = {row.file}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>{row.legend}</h3>
            {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>  */ }
          </Carousel.Caption>
        </Carousel.Item>
      ))}
      
    </Carousel>
  )
}
