import React, {useState ,useEffect} from 'react'

import { Container , Row , Col} from 'react-bootstrap'
import  {CardResponsive} from '../components/MyCard'
import SpinnerLoad from '../components/SpinnerLoad'
import FooterComponent from '../components/FooterComponent'
import {GetCollecion} from '../firebaseData'

function AvesTipo() {

  const [dataBirds , setDataBirds] = useState(false)
 
  const fetchData = async () => { 
    
    try {
      const collection = await GetCollecion('birds_type')
      await setDataBirds( collection )
    } 
    catch (error) {
      console.log(error);
    }
  }
  
  useEffect( () => {
    fetchData()
  },[] )
  
  return ( dataBirds !== false) ?  (
    <>
      <Container  className="mt-5">
        <Row>
          {dataBirds.map( (row) => (

            <Col 
              key   = { row.id }
              sm  = { 12} 
              md  = { 4 }
              lg  = { 3 } 
              xl  = { 3 } 
            >
              <CardResponsive
                image = { row.image }
                name  = { row.name } 
                url   = { row.url } 
                shortDescription = { row.short_description }
              />
            </Col>

          ))}

          {dataBirds.map( (row) => (

            <Col 
              key   = { row.id }
              sm  = { 12} 
              md  = { 4 }
              lg  = { 3 } 
              xl  = { 3 } 
              >
              <CardResponsive
                image = { row.image }
                name  = { row.name } 
                url   = { row.url } 
                shortDescription = { row.short_description }

              />
            </Col>

          ))}
        </Row>
      </Container>
      <FooterComponent/>
    </>

  ) : (
    <SpinnerLoad/>
  )
}


export default AvesTipo
