import React ,{useEffect, useState} from 'react' 
import CarouselResponsive from '../components/CarrouselResponsive/index'
import { CardInline } from '../components/MyCard'
import FooterComponent from '../components/FooterComponent'

import { Container ,Row, Col} from 'react-bootstrap'
import MapDirection from '../components/MapDirection'
import SpinnerLoad from '../components/SpinnerLoad'
import { GetCollecion , GetDocumentWhereConditionals } from '../firebaseData'

function Home() {

  const [dataCarousel , setDataCarousel] = useState(false)
  const [about, setAbout] = useState(false)


  const fetchData = async () => {

    const dataAb  = await GetCollecion('about')
    const dataCar = await GetDocumentWhereConditionals( 'files_home_carousel', 'type' , 'home' , 'status' , 1 )
    setAbout(dataAb)
    setDataCarousel( dataCar )
  }
  
  useEffect( () => {
    fetchData()
  },[] )
  console.log('about', about);
  
  return ( ( dataCarousel !== false)  &&  
           ( about !== false) )  ? (
    <>
       <CarouselResponsive
          resources={dataCarousel}
        />
      <Container className="mt-3">
        <Row>
          <Col>
            <CardInline
              img = {about[0].image}
              title = {about[0].title}
              content = {about[0].about}
              textMuted = {about[0].name}
            />
          </Col>
        </Row>
      </Container>

      <Container className="mt-5">
        <Row>
          <Col>
            <MapDirection/>
          </Col>
        </Row>
      </Container>
      <FooterComponent/>
    </>
    ) : (
      <SpinnerLoad/>
  )
}

export default Home 