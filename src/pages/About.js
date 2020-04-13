import React, { useEffect, useState } from 'react' 
import SpinnerLoad from '../components/SpinnerLoad'
import axios from 'axios'



function About() {

  const [url, setUrl] = useState(
    'https://randomuser.me/api/'
  );

  const [isLoading, setIsLoading] = useState(false)

  const [name, setName] = useState('')
  
  const fetchData = async () => {
    setIsLoading(true)
    const data = await axios(url)
    console.log('data* : ' , data.data.results[0].name)
    setName(data.data.results[0].name)

    
    
    setIsLoading(false)

  }
  
  useEffect(() => {

    fetchData()
    
  }, [url])

  return (
    <div className="">
      { isLoading ? (
        <SpinnerLoad/>
      ) : (
        <h1> {name.first} </h1>  
      )}
    </div>
  )
}

export default About  