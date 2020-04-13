import db from '../firebase'
import React ,{useEffect, useState} from 'react' 
import CarouselResponsive from '../components/CarrouselResponsive'
import { CardAbout } from '../components/MyCard'
import FooterComponent from '../components/FooterComponent'

import { Container ,Row, Col} from 'react-bootstrap'
import MapDirection from '../components/MapDirection'
import SpinnerLoad from '../components/SpinnerLoad'



function Home() {

  const [dataCarousel , setDataCarousel] = useState([])
  const [carousel , setCarousel] = useState([])
  const [loop , setLoop] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = async () => {

    setIsLoading(true);
    const data = await db.collection('files_home_carousel').get()
    setDataCarousel( data.docs.map( doc =>  doc.data()  ))
    
    setCarousel( <CarouselResponsive
                    resources={dataCarousel}
                  /> ) 
    
    setLoop(false)
    setIsLoading(false)
  }
  
  useEffect( () => {
    fetchData()
  },[loop] )
  
  return (
    <div>
      {isLoading ? (
        <SpinnerLoad/>
      ) : (
        <div>
           {carousel}

            <Container className="mt-3">
              <Row>
                <Col>
                  <CardAbout/>
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
        </div>
      )}
    </div>
  )
}

export default Home 