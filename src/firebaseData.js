import db from './firebase'

/*
function GetDataFirebase(collection){  
  
  var dataFiles = [];
  db.collection(collection)
  .get().then(( querySnapshot ) => {
    
    querySnapshot.forEach( (doc , index) => {
      var file = doc.data()
      dataFiles.push(file)
    })
  })
  
  return dataFiles
}
export default GetDataFirebase


export default function GetDataFirebase(collection){  
  
  var dataFiles = [];
  
  const fetchData = () => {
    
    db.collection(collection)
    .onSnapshot( (data) =>  {
      
      data.docs.map( doc => (
        
        dataFiles.push(doc.data())
        )) 
        
      })
    }
    
    fetchData()
    
    //console.log('dataFiles' , dataFiles);
    
    return dataFiles
    
  }
  
  
  */
 export default async function GetCollection(collection){  
  try {
  
      const data = await db.collection(collection).get()

      const dataCollection = data.docs.map( doc =>  doc.data() )
  
      return dataCollection
    }
  catch(err){ console.log('error : ' , err ) }

    
}