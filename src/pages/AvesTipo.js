import React, {useState ,useEffect} from 'react'

//import Title from '../components/Title';
import { Container ,Row, Col} from 'react-bootstrap'
import  {CardGroup} from '../components/MyCard'
import SpinnerLoad from '../components/SpinnerLoad'
import FooterComponent from '../components/FooterComponent'


function AvesTipo() {

  const [isLoading, setIsLoading] = useState(false)
  const [cards, setCards] = useState([])
  const [loop , setLoop] = useState(true)
  
  const collection = 'birds_type'

  const fetchData = async () => {    
    setLoop(false)
    setIsLoading(true)

    var _cards = <CardGroup
                  type={ collection }
                />
    setCards(_cards)
    setIsLoading(false)

  }

  
  useEffect(  () => {
     fetchData()
  },[loop ] )
  
  return (
    <div>
      {isLoading ? (
        <SpinnerLoad/>
      ) : (

        <div>
          {cards}
          <FooterComponent/>
        </div>
      )}
    </div>

  )
}


export default AvesTipo
