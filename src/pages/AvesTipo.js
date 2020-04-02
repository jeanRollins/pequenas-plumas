import React, {useState ,useEffect} from 'react'

import db from '../firebase'
//import Title from '../components/Title';
import { Container ,Row, Col} from 'react-bootstrap'
import MyCard from '../components/MyCard';


function AvesTipo()
{
  const [birdsFounded, setBirdsFounded] = useState( false )
  const [cardsBird, setCardsBird] = useState(false)
  const [loop, setLoop] = useState(true)

  var data = []

  const fetchData = async () => {
        
    data = await db.collection('birds_type').get()

    setBirdsFounded( data.docs.map( doc =>  doc.data()  ))

    var cards = Object.keys(birdsFounded).map( data => {
      let _birds = birdsFounded[data]
      return <Col key   = { _birds.image }> 
                <MyCard
                  image = { _birds.image }
                  name  = { _birds.name  }
                  description ={_birds.description }
                />
              </Col> 
    })
    setCardsBird(cards)  
    //Evita loop infinito
    setLoop(false)
  }

  useEffect( () => {

    fetchData()    
  }, [loop] )

  return (
    <Container className="mt-5">
      <Row>
        {cardsBird}
      </Row>
    </Container>
    
  );
}


export default AvesTipo
