import db , {storage}from './firebase'


export function GetDocumentWhere( collection , where , type )
{
  const fetch = async () => {
    const response = await db.collection( collection ).where( where , '==' ,  type ).get()
    const data     =  response.docs.map( doc =>  {
                                              var dataTemp = doc.data()
                                              dataTemp.id  = doc.id
                                              return dataTemp
                                        })
    return data
  }
  return fetch()
}

export function GetDocumentWhereConditionals( collection , where , type,  where2 , type2 )
{
  const fetch = async () => {
    const response = await db.collection( collection )
    .where( where  , '==' , type )
    .where( where2 , '==' , type2 )
    .get()
    const data     =  response.docs.map( doc =>  {
                                              var dataTemp = doc.data()
                                              dataTemp.id  = doc.id
                                              return dataTemp
                                        })
    return data
  }
  return fetch()
}

export function GetCollection(collection)
{
  const fetch = async () => {
    const response =  await db.collection(collection).get()
    const data     =  response.docs.map( doc =>  {
                        var dataTemp = doc.data()
                        dataTemp.id  = doc.id
                        return dataTemp
                      })
    return data
  }
  return fetch()
}

export function UpdateDocument( collection, id , object)
{
  const fetch = async () => {
    await db.collection( collection ).doc( id ).update( object )
    return true
  }
  return fetch()
}

export function DeleteDocument( collection, id )
{
  const fetch = async () => {
    await db.collection( collection ).doc( id ).delete()
    return true
  }
  return fetch()
}

export function AddCollection(collection, document)
{
  const fetch = async () => {
    const response = await db.collection(collection).add( document )
    return response
  }
  return fetch()
}

//functions Storage
export function DeleteFileStorage(rute)
{
  const fetch = async () => {
    var storageRef = storage().ref();
    var desertRef = storageRef.child(rute);
    await desertRef.delete()
  }
  return fetch() 
}

export function AddFileStorage( file , rutePath ){

  const storageRef =  storage().ref( rutePath + file.name )
  const response   =  storageRef.put( file ) 
  

}


