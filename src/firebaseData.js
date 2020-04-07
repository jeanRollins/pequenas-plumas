import db from './firebase'


export function GetDocumentWhere( collection , where , type )
{
  const fetch = async () => {
    const response = await db.collection( collection ).where( where , '==' ,  type ).get()
    const data     =  response.docs.map( doc =>  doc.data() )
    return data
  }
  
  return fetch()
}

export function GetCollecion(collection)
{
  const fetch = async () => {
    const response = await db.collection(collection).get()
    const data = response.docs.map( doc =>  doc.data() )
    return data
  }
  
  return fetch()
}