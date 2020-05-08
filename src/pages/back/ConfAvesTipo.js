import React ,{useEffect , useState}  from 'react'
import {GetCollection , AddCollection ,  DeleteFileStorage , DeleteDocument, GetDocumentWhere, UpdateDocument} from '../../firebaseData'
import { Container , Row , Col , Form, Figure, Button , Spinner, Modal, Badge} from 'react-bootstrap'
import Title from '../../components/Title'
import {CreateUrl} from '../../globals'

import { storage } from '../../firebase'
import SpinnerLoad from '../../components/SpinnerLoad'
import {ToastsContainer, ToastsStore} from 'react-toasts'
import MediaQuery from '../../components/commons/MediaQuery'

export default function ConfAvesTipo(props){

    const [dataBirds , setDataBirds] = useState(false)
    const [name , setName] = useState('')
    const [description , setDescription] = useState('')
    const [image , setImage] = useState([])

    const [textName , setTextName] = useState(false)
    const [textDescription , seTextDescription] = useState(false)
    const [textImage , setTextImage] = useState(false)

    const [btnAdd, setBtnAdd] = useState(true)
    const [btnAddLoad, setBtnAddLoad] = useState(false)
    const [urlPath, setUrlPath] = useState('') 
    const [lightbox, setLightbox] = useState(false)
    const [ stateModal , setStateModal ] = useState( false )

    const [ imgTemp , setImgTemp ] = useState( '' )
    const [ idTemp  , setIdTemp  ] = useState( '' )

    const [ btnEliminar   , setBtnEliminar ]   = useState( true )
    const [ btnCargandoEliminar , setBtnCargandoEliminar ] = useState( false )
    
    const [ toEdit , setToEdit ] = useState( false )
    const [ imageToEdit , setImageToEdit ] = useState( false )
    const [ i , iSet ] = useState( 0 )

    const Mobile  =  MediaQuery('mobile')
    const Tablet  =  MediaQuery('tablet')
    const Desktop =  MediaQuery('desktop')

    const handleClose = () => setStateModal( false )

    const showLightbox = () =>  setLightbox(!lightbox)

    const changeToEdit = async (index) => {
        setTextName(false)
        seTextDescription(false)
        setTextImage(false)

        let bird = await dataBirds[index]
        setName(bird.name)
        setDescription(bird.description)
        iSet(index)
        let imagesFounded = await GetDocumentWhere('birds_type_images' , 'key' , bird.key )

        console.log('imagesFounded', imagesFounded );
        console.log('index****', index );
        setImageToEdit( imagesFounded )
        setToEdit(true)
    }

    const changeStatusType = async ( id ) => {
        
        let rutePath = '' 
        let image    = '' 

        try {
            imageToEdit.map( async (row) => {

                let status = 0
                if( row.id == id ){
                    status = 1 
                    image    = row.file 
                    rutePath = row.rutePath
                }
                let resp = await UpdateDocument( 'birds_type_images' , row.id , { status }  )
            })
            
            console.log('rutePath**' , rutePath)

            let documentForUpdate = {
                image,
                rutePath
            }
            let resp = await UpdateDocument( 'birds_type' , dataBirds[i].id , documentForUpdate )
            let response = await changeToEdit(i)
            ToastsStore.success("Portada actualizada :) " )

        } catch (error) {
            console.log(error)
        }
        
    }

    const updateAbout = async () => {
        
        let validate = await validateForm()
        if(!validate){
            return false
        }

        try {
            let documentForUpdate = {
                description ,
                name ,
                short_description : description
            }
            
            UpdateDocument('birds_type' , dataBirds[i].id , documentForUpdate  )
            ToastsStore.success("Actualizado realizado : ) " )
            backToAdd()
        } 
        catch (error) {
            ToastsStore.warning("Error : actualice más tarde :( " )
            console.log('error ** : ' + error )
        }
    }


    const backToAdd = () => {
        
        setName('')
        setDescription('')
        iSet(0)
        setImageToEdit(false)
        fetchData()
        setToEdit(false)
    } 

    const confirmModal = React.useCallback( async ( img , id ) => { 
        setStateModal( !stateModal )
        setImgTemp(img)
        setIdTemp(id)
    } , [] ) 

    const deleteImage = React.useCallback( async (document) => {
        
        setBtnEliminar(false)
        setBtnCargandoEliminar(true)
        
        try {
            await DeleteFileStorage(imgTemp)
            await DeleteDocument( document, idTemp )
            
            if(toEdit){
                changeToEdit(i)
            }
            else{
                await fetchData()
            } 
            
            setBtnEliminar(true)
            setBtnCargandoEliminar(false)
            setStateModal( !stateModal )

        } 
        catch (error) {}
    }, [ stateModal ] )

    const fetchData = async () => { 
        try {
          const collection = await GetCollection('birds_type')
          console.log('collection**' , collection);
          
          await setDataBirds( collection )
        } 
        catch (error) {
          console.log(error);
        }
    }

    const validateForm =  () => {
        if( name == '' ) {
            setTextName(true)
            return false
        }
        if( description == '' ) {
            seTextDescription(true)
            setTextName(false)
            return false
        }

        
        if(!toEdit){
            if( image == '' ) {
                setTextName(false)
                seTextDescription(false)
                setTextImage(true)
                return false
            }
        }

        
        return true
    }

    const addImageTypeCarousel = async (file) => {
        
        console.log('addImageTypeCarousel')

        const storageRef = storage().ref( '/birds/' + file.name )
        const response   = storageRef.put( file ) 

        await response.on( 'state_changed' , snapshot => {
    
            response.snapshot.ref.getDownloadURL().then( 
                function(downloadURL) { 

                if( !downloadURL){
                    return false
                }
                    
                let document = {
                    file : downloadURL ,
                    key  : dataBirds[i].key ,
                    rutePath : 'birds/' + file.name ,
                    status : 0
                }

                AddCollection( 'birds_type_images' , document )
                
            })
            .then( () => {
                changeToEdit(i)
                ToastsStore.success("Imagen tipo de ave guardada :) " )
            })
  
        }) 
        
    }

    const addTypeBird = async (e) => {
        setBtnAdd(false)
        setBtnAddLoad(true)

        let validate = await validateForm()

        if( !validate ) {
            setBtnAdd(true)
            setBtnAddLoad(false)
            return
        }
        setTextName(false)
        seTextDescription(false)
        setTextImage(false)

   
        
        let url = CreateUrl( name , 'avestipo' , 'url' )
        let key = CreateUrl( name , 'avestipo' , 'key' )

        const storageRef = storage().ref( '/birds/' + image.name )
        const response   = storageRef.put( image ) 

        await response.on( 'state_changed' , snapshot => {
    
            response.snapshot.ref.getDownloadURL().then( 
                async function(downloadURL) { 

                if( !downloadURL){
                    return false
                }  

                let document = {
                    description ,
                    image : downloadURL ,
                    key ,
                    name ,
                    short_description : description ,
                    url ,
                    rutePath : 'birds/' + image.name
                }

                let documentImage = {
                    file : downloadURL ,
                    key ,
                    rutePath : 'birds/' + image.name ,
                    status : 1
                }

                try {
                    let response = await AddCollection( 'birds_type' , document )
                    
                    if(response){

                        let resp = await AddCollection( 'birds_type_images' , documentImage )
                        fetchData()
                        ToastsStore.success("Tipo de ave guardada : ) " )
                        setBtnAdd(true)
                        setBtnAddLoad(false)
                        setDescription('')
                        setName('')
                    }
                    else{
                        ToastsStore.warning("Error : Intente más tarde :( " )
        
                    }
                } 
                catch (error) {
                    ToastsStore.warning("Error : Intente más tarde :( " )
                }
                
            })
            .then( () => {
                fetchData()
                ToastsStore.success("Tipo de ave guardada : ) " )
                setBtnAdd(true)
                setBtnAddLoad(false)
                setDescription('')
                setName('')
            })
  
        }) 

    }
      
    useEffect( () => {
        fetchData()
    } , [] )

    const styleLigthBox = {
        position:'fixed',
        top:'0',
        left:'0',
        width:'100%', 
        height:'100%',
        textAlign:'center',
        background : 'black' ,
        zIndex : '2' ,
        opacity : '0.5'
    }

    const styleBtnEliminar = {
        position: 'absolute',
        right: '4px',
        top: '-8px'
    }
    
    
    return ( dataBirds !== false) ?  (
        <>
            <ToastsContainer position={ToastsStore.TOP_LEFT} store={ToastsStore}/>
            <Modal show={stateModal} onHide={ handleClose }>
                <Modal.Header closeButton>
                    <Modal.Title>{'Eliminar Tipo'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{'¿Desea eliminar imagen?'}</Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={ handleClose }>
                        Cancelar
                    </Button>
                    { ( !btnEliminar ) ? null 
                        : 
                        <Button variant="danger" onClick={ e => (!toEdit) ?  (deleteImage('birds_type')) : (deleteImage('birds_type_images'))  }>
                            Eliminar
                        </Button>
                    }
                   
                    { ( !btnCargandoEliminar ) ? null 
                        : 
                        <Button 
                            variant = "danger" 
                            disabled
                        >
                            <Spinner
                                as = "span"
                                animation = "grow"
                                size = "sm"
                                role = "status"
                                aria-hidden = "true"
                            />
                            Eliminando...
                        </Button>    
                    }
                </Modal.Footer>
            </Modal>
          <Container>
                { (!toEdit) && (
                    <>
                        <Row>
                            <Col className="my-4">
                                <Title
                                    nameTitle = { 'Aves Tipo configuración' }
                                />
                            </Col>
                        </Row>
                        <Row>
                            { dataBirds.map( (row, index) => (
                                
                                <Col 
                                    className="my-3"
                                    key = { row.id }
                                    sm  = { 12} 
                                    md  = { 4 }
                                    lg  = { 3 } 
                                    xl  = { 3 } 
                                >
                                    
                                    <Figure
                                        style = { styleImage }
                                        alt="171x180"
                                        className="effectShadow "
                                    >
                                        <Figure.Image
                                            src   = { row.image }
                                            style = {{height : '100%' , width:'100%'}}
                                            className = "imgHover"
                                            onDoubleClick = { e => changeToEdit(index) }
                                        />
                                            <Button 
                                                className = "py-2 px-3"
                                                style     = {styleBtnEliminar}
                                                variant   = "danger"
                                                size      = "xl"
                                                onClick   = { e =>  confirmModal( row.rutePath , row.id)  }
                                            >
                                                x
                                            </Button>
                                        <Figure.Caption>
                                            {row.name}
                                        </Figure.Caption>
                                    </Figure>
                                </Col>
                            ))}
                        </Row>
                        <hr/>
                    </>
                )}
            <Row>
                <Col className="my-3">
                    <Title
                        nameTitle = { (!toEdit) ?  ('Agregar') : ('Editar ' + name)  }
                    />
                </Col>
            </Row>

            <Row>
                <Col
                    xs = {12}
                    sm = {12}    
                    md = {10}    
                    lg = {10}   
                    xl = {10}    
                >
                    <div>
                        <label htmlFor="file" > Agregar imagen  </label>
                        <br/>
                        
                        <input 
                            className = "py-2 "
                            type = "file"
                            onChange = { e  => (!toEdit) ? setImage( e.target.files[0] ) :  addImageTypeCarousel( e.target.files[0] ) } 
                        />   
                    </div> 
                    { ( textImage ) && (  <p style={styleTextFail} > Imagen requerida. </p> ) } 
                </Col>
            </Row>
            

            { ( (toEdit) && (imageToEdit !== false) ) &&  (
                <>
                    <Row>
                        <Col
                            className="mt-5"
                            sm  = { 12 } 
                            md  = { 12 }
                            lg  = { 12 } 
                            xl  = { 12 } 
                        >
                            <h4 style={{ color: global.COLOR_TEXT }} > Imágenes {name} : </h4>
                        </Col>
                        { imageToEdit.map( (row) => (

                            <Col
                                className="my-4"
                                key = { row.id }
                                sm  = { 12} 
                                md  = { 4 }
                                lg  = { 3 } 
                                xl  = { 3 } 
                            >
                                <img 
                                    src   = { row.file } 
                                    style = {{ height : '100%' , width:'100%' }}
                                    className = "imgHover"
                                    onDoubleClick = { e => changeStatusType(row.id) }
                                />
                                {( row.status == 1 ) && (
                                    <Badge align="center" variant="success">Portada</Badge>
                                )}

                                <Button 
                                    className = "py-2 px-3"
                                    style     = {styleBtnEliminar}
                                    variant   = "danger"
                                    size      = "xl"
                                    onClick   = { e =>  confirmModal( row.rutePath , row.id)  }
                                >
                                    x
                                </Button>
                            </Col>
                        ))}
                    </Row>
                    <hr/>
                </>
            )}
            
            <Row>
                <Col
                    xs = {12}
                    sm = {12}    
                    md = {10}    
                    lg = {10}    
                    xl = {10}    
                >
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" value={name} onChange={ e => setName(e.target.value) } placeholder="Ejemplo : Loro Inglés..." />
                    </Form.Group>
                    { ( textName ) && (  <p style={styleTextFail} > Nombre requerido. </p> ) }     

                </Col>
                <Col
                    xs = {12}
                    sm = {12}    
                    md = {10}    
                    lg = {10}    
                    xl = {10}    
                >
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control as="textarea" value={description} onChange={ e => setDescription(e.target.value) } rows="3" />
                    </Form.Group>
                    { ( textDescription ) && (  <p style={styleTextFail} > Descripción requerida. </p> ) } 

                </Col>

            </Row>

         
            
            <Row>
                <Col
                    xs = {12}
                    sm = {12}    
                    md = {7}    
                    lg = {7}    
                    xl = {7}    
                >
                    { ( btnAdd ) && (
                        <Button 
                            variant="primary" 
                            className="btn btn-block my-4" 
                            onClick = { e => (!toEdit) ?  addTypeBird() : updateAbout() } 
                        >
                        {(!toEdit) ?  ('Agregar') : ('Editar')}  
                            
                        </Button>
                    )}

                    { (btnAddLoad) && (
                        <Button variant="primary"  className="btn btn-block my-4"  disabled>
                            <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            {(!toEdit) ?  ('Agregando...') : ('Editando...')}  
                            
                        </Button>
                    )}
                    
                </Col>

                {(toEdit) && (
                    <>
                        <Mobile>
                            <Col
                                xs = {12}
                                sm = {12}    
                                md = {4}    
                                lg = {4}    
                                xl = {4}    
                                style={{ marginBottom : '32px' }}
                                align="center"
                            >
                                <a href="#" onClick = { e =>{ e.preventDefault() ; backToAdd()} } > Volver a agregar</a>
                            </Col>
                        </Mobile>
                        <Tablet>
                            <Col
                                xs = {12}
                                sm = {12}    
                                md = {4}    
                                lg = {4}    
                                xl = {4}    
                                style={{ marginBottom : '32px' }}
                                align="center"
                            >
                                <a href="#" onClick = { e =>{ e.preventDefault() ; backToAdd()} } > Volver a agregar</a>
                            </Col>
                        </Tablet>

                        <Desktop>
                            <Col
                                xs = {12}
                                sm = {12}    
                                md = {4}    
                                lg = {4}    
                                xl = {4}    
                                style={{ marginTop : '28px' }}
                                align="center"
                            >
                                <a href="#" onClick = { e =>{ e.preventDefault() ; backToAdd()} } > Volver a agregar</a>
                            </Col>                        
                        </Desktop>
                    </>
                )}
             
            </Row>
          </Container>
        </>
    ) : (
    <SpinnerLoad/>
    )
}

const styleImage = {
    width  : '100%' ,
    height : '150px' ,
    zIndex : '100'
}

const styleTextFail = {
    color  : 'red'  
}