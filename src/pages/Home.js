import db from '../firebase'
import React ,{useEffect, useState} from 'react' 
import CarouselResponsive from '../components/CarrouselResponsive'
import { CardAbout } from '../components/MyCard'

import { Container ,Row, Col} from 'react-bootstrap'
import MapDirection from '../components/MapDirection'



function Home() {

  const [dataCarousel , setDataCarousel] = useState([])
  const [carousel , setCarousel] = useState([])
  const [loop , setLoop] = useState(true)

  const fetchData = async () => {

    const data = await db.collection('files_home_carousel').get()
    setDataCarousel( data.docs.map( doc =>  doc.data()  ))
    
    setCarousel( <CarouselResponsive
                    resources={dataCarousel}
                  /> ) 
    
    setLoop(false)
  }
  
  useEffect( () => {
    fetchData()
  },[loop] )
  
  return (
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

      
      
    </div>
  )
}

export default Home 