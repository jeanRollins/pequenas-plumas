import React, {useState ,useEffect} from 'react'

//import Title from '../components/Title';
import { Container ,Row, Col} from 'react-bootstrap'
import  {CardGroup} from '../components/MyCard'



function AvesTipo() {

  const collection = 'birds_type'
  
  return (
    <div>
        <CardGroup
          type={ collection }
        />
      
    </div>

  )
}


export default AvesTipo
