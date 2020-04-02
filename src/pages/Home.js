import db from '../firebase'
import React ,{useEffect, useState} from 'react' 
import CarouselResponsive from '../components/CarrouselResponsive'
import { CardAbout } from '../components/MyCard'

import { Container ,Row, Col} from 'react-bootstrap'



function Home() {

  const [dataCarousel , setDataCarousel] = useState([])
  const [carousel , setCarousel] = useState([])
  const [loop , setLoop] = useState(true)

  const fetchData = async () => {

    const data = await db.collection('files_home_carousel').get()
    setDataCarousel( data.docs.map( doc =>  doc.data()  ))

    console.log( 'dataCarousel', dataCarousel);
    
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

      <Container className="mt-5">
        <Row>
          <Col>
            <CardAbout/>
          </Col>
        </Row>
      </Container>

    </div>
  )
}

export default Home 