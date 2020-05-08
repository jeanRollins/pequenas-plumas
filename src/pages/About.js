import React, { useEffect, useState } from 'react' 
import SpinnerLoad from '../components/SpinnerLoad'
import { Container ,Row, Col} from 'react-bootstrap'
import { GetCollection , GetDocumentWhereConditionals } from '../firebaseData'
import { CardInline } from '../components/MyCard'
import FooterComponent from '../components/FooterComponent'
import { CarouselBootstrap } from '../components/CarrouselResponsive'



function About() {

  const [dataCarousel, setDataCarousel] = useState(false)

  const [dataAbout, setDataAbout] = useState(false)


  const fetchApi = async () => {
    const data = await GetCollection('about')
    const dataTemp  =  await GetDocumentWhereConditionals( 'files_home_carousel', 'type' , 'about' , 'status' , 1 )
    setDataCarousel(dataTemp)
    setDataAbout(data)
  }

  console.log('dataCarousel' , dataCarousel);
  

  useEffect(() => {

    fetchApi()
    
  }, [])

  return (  ( dataAbout    !== false ) && 
            ( dataCarousel !== false ) )  ? (
    <> 
      <Container className="mt-5">
        <Row>
          <Col>
            <CardInline
              img = {dataAbout[0].image}
              title = {dataAbout[0].title}
              content = {dataAbout[0].about}
              textMuted = {dataAbout[0].name}
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <CarouselBootstrap
              data = { dataCarousel }
            />
          </Col>
            
        </Row>
      </Container> 
      <FooterComponent/>
    </>  
  ) : ( 
    <SpinnerLoad/>
  )
}

export default About  