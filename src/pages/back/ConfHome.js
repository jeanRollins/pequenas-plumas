import React, {useState, useEffect} from 'react'
import {  withRouter } from 'react-router-dom' 

import {auth, storage} from '../../firebase'

import SpinnerLoad from '../../components/SpinnerLoad'

import { Container ,Row, Col, Form, Modal , Button,Spinner} from 'react-bootstrap'
import  Title  from '../../components/Title'

import {GetDocumentWhere , GetDocumentWhereConditionals , AddCollecion  ,  DeleteFileStorage , DeleteDocument,  UpdateDocument } from '../../firebaseData'

import MediaQuery from '../../components/commons/MediaQuery'
import {ToastsContainer, ToastsStore} from 'react-toasts'
const styleBtnEliminar = {
    position: 'absolute',
    right: '4px',
    top: '-8px'
}

function ConfHome(props){

    const [ user , setUser ] = useState( null )
    const [ inputFile , setInputFile ] = useState( false )
    const [ stateModal , setStateModal ] = useState( false )
    const [ userFirebase , setUserFirebase ] = useState( false )
    const [ imagesCarousel , setImagesCarousel ] = useState( false )
    const [ dataAbout , setDataAbout ] = useState( false )

    const [ btnCargar   , setBtnCargar ]   = useState( true )
    const [ btnCargando , setBtnCargando ] = useState( false )
    const [ textFailImg , setTextFailImg ] = useState( false )

    const [ btnEliminar   , setBtnEliminar ]   = useState( true )
    const [ btnCargandoEliminar , setBtnCargandoEliminar ] = useState( false )

    const [ imgTemp , setImgTemp ] = useState( '' )
    const [ idTemp  , setIdTemp  ] = useState( '' )

    const [ headerTitle , setHeaderTitle ] = useState( '' )
    const [ title , setTitle ] = useState( '' )
    const [ content , setContent ] = useState( '' )

    const [ textFailHeaderTitle , setTextFailHeaderTitle ] = useState( false )
    const [ textFailTitle , setTextFailTitle] = useState( false )
    const [ textFailContent , setTextFailContent ] = useState( false )
    
    const [ idAbout , setIdAbout ] = useState( false )


    const handleClose = () => setStateModal( false )
    const Mobile  =  MediaQuery('mobile')
    const Tablet  =  MediaQuery('tablet')
    const Desktop =  MediaQuery('desktop')

    const userGet = async () => {
        
        const aboutData =  await GetDocumentWhere('about', 'key' , 'about' )
        const data      =  await GetDocumentWhere('users', 'id' , auth.currentUser.uid )
        const dataImg   =  await GetDocumentWhereConditionals( 'files_home_carousel', 'type' , 'home' , 'status' , 1 )
        
        await setDataAbout( aboutData.map( row => row ) )
        await setImagesCarousel( dataImg.map( row => row ) )
        await setUserFirebase( data.map( row => row ) )
        await setIdAbout( aboutData[0].id )

        setHeaderTitle( aboutData[0].subtitle ) 
        setTitle( aboutData[0].title ) 
        setContent( aboutData[0].about )
    }

    const deleteImage = React.useCallback( async () => {
        
        setBtnEliminar(false)
        setBtnCargandoEliminar(true)
        
        try {
            await DeleteFileStorage(imgTemp)
            await DeleteDocument( 'files_home_carousel' ,idTemp )
            await userGet()
            
            setBtnEliminar(true)
            setBtnCargandoEliminar(false)
            setStateModal( !stateModal )
        } 
        catch (error) {}
    }, [ stateModal ] )

    const confirmModal = React.useCallback( async ( img , id ) => {
        
        setStateModal( !stateModal )

        setImgTemp(img)
        setIdTemp(id)

    } , [imgTemp , idTemp, stateModal] ) 

    const uploadImage = async () => {

        setBtnCargar(false)
        setBtnCargando(true)
        
        if(!inputFile){
            setTextFailImg(true)
            console.log('Debe agregar imagen.')
            setBtnCargar(true)
            setBtnCargando(false)
            return false
        }
        setTextFailImg(false)

        
        const storageRef = storage().ref( '/home/' + inputFile.name )
        const response   = storageRef.put( inputFile ) 
       
        await response.on( 'state_changed' , snapshot => {
    
            response.snapshot.ref.getDownloadURL().then( 
                function(downloadURL) { 
                    
                var currentdate = new Date(); 
                let dateNow = currentdate.getHours() +  ':'  +
                              currentdate.getMinutes() + ':' +
                              currentdate.getSeconds() + ' ' + 
                              currentdate.getDate() + '/' +
                              (currentdate.getMonth() + 1) + '/' + 
                              currentdate.getFullYear()

                let collectionCarousel = {
                    file     : downloadURL  ,
                    legend   : 'Lorem Ipzum dolor' ,
                    status   : 1 ,
                    date     : dateNow ,
                    rutePath : 'home/' + inputFile.name ,
                    type     : 'home'
                } 
                const responseAdd = AddCollecion( 'files_home_carousel' , collectionCarousel )

                userGet()
               
            })
            .then( () => {
                setBtnCargar(true)
                setBtnCargando(false)
            
            })
            
        }) 
    }

    const updateAbout = async () => {
        
        if( !headerTitle ){
            setTextFailHeaderTitle(true)
            return false 
        }
        setTextFailHeaderTitle(false)

        if( !title ){
            setTextFailTitle(true)
            return false 
        }
        setTextFailTitle(false)

        if( !content ){
            setTextFailContent(true)
            return false 
        }
        setTextFailContent(false)

        try {

            let  dataForUpdate = {
                about    : content     ,
                key      : 'about'     ,
                subtitle : headerTitle , 
                title    : title
            }
            UpdateDocument('about' , idAbout , dataForUpdate  )
            ToastsStore.success("Actualizado realizado : ) " )
        } 
        catch (error) {
            ToastsStore.warning("Error : actualice más tarde :( " )
            console.log('error ** : ' + error )
            
        }

    }

    useEffect( () => {
        if( auth.currentUser) {
            userGet()
            setUser( auth.currentUser )
        }
        else{
            props.history.push('/backLogin')
        }
    },[ ])
    
    
    
    return  (!userFirebase) &&  ( !dataAbout !== false) ? 
        (
            <SpinnerLoad/>
        ) : (
        <>  
            <ToastsContainer position={ToastsStore.TOP_LEFT} store={ToastsStore}/>
            <Modal show={stateModal} onHide={ handleClose }>
                <Modal.Header closeButton>
                    <Modal.Title>{'Imagen'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{'¿Desea eliminar imagen?'}</Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={ handleClose }>
                        Cancelar
                    </Button>
                    { ( !btnEliminar ) ? null 
                        : 
                        <Button variant="danger" onClick={ e => deleteImage()}>
                            Eliminar Imagen
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
        
            <Container className="mt-4 mb-3">
                
                <Row>

                    <Col 
                        sm = {12} 
                        md = {12}
                        lg = {12}
                        xl = {12}
                        className=" p-3"
                        style={{borderRadius : '8px'}}
                    >   
                        <Title nameTitle = "Carousel Home" />
                        <Container>
                            <Row className="mt-3">
                                <Col>
                                    <div >
                                        <label 
                                            htmlFor="file"
                                        >
                                            Agregar imagen a carousel : 
                                        </label>
                                        <input 
                                            className = "py-2 "
                                            type = "file" 
                                            onChange = { e  => setInputFile( e.target.files[0] )  } 
                                        />   
                                    </div> 
                                    
                                </Col>
                                <Col className="mt-4"> 
                                    { (!btnCargar) ? null : 
                                        <>
                                            <Button 
                                                onClick = { e  =>  { 
                                                    e.preventDefault()
                                                    uploadImage()
                                                }}
                                            >
                                                Cargar Imagen
                                            </Button>
                                            { (!textFailImg) ? null : 
                                                <p style={{ color : 'red' }}> Debe agregar imagen.</p>
                                            }
                                        </>
                                    }
                                    
                                    { ( !btnCargando ) ? null : 
                                    
                                    <Button 
                                        variant="primary" 
                                        disabled
                                    >
                                        <Spinner
                                            as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                        Cargando...
                                    </Button>
                                    }
                                    
                                </Col>
                            </Row>
                        </Container>
                        
                        <hr/>
                        <Container>
                        <h5 className="my-4" style={{color : global.COLOR_TEXT}}> Imagenes carousel :</h5>
                            <Row>
                                { Object.keys(imagesCarousel).map( data => (
                                    <Col 
                                        sm = {2} 
                                        md = {3}
                                        lg = {3}
                                        xl = {3}
                                        key =  {data}
                                        className="my-2"
                                    >
                                        <a href="#" >

                                            <Mobile> 
                                                <img 
                                                    src = {imagesCarousel[data].file} 
                                                    style = {{ width : '100%' , height : '200px'}}
                                                /> 
                                            </Mobile>

                                            <Tablet> 
                                                <img 
                                                    src = {imagesCarousel[data].file} 
                                                    style = {{ width : '100%' , height : '150px'}}
                                                /> 
                                            </Tablet>

                                            <Desktop> 
                                                <img 
                                                    src = {imagesCarousel[data].file} 
                                                    style = {{ width : '100%' , height : '120px'}}
                                                /> 
                                            </Desktop>

                                            

                                            <Button 
                                                className = "py-2 px-3"
                                                style     = {styleBtnEliminar}
                                                variant   = "danger"
                                                size      = "xl"
                                                onClick   = { e =>  confirmModal( imagesCarousel[data].rutePath , imagesCarousel[data].id) }
                                            >
                                                x
                                            </Button>
                                        </a>
                                    
                                    </Col>
                                ))}
                       
                            </Row>
                        </Container>
                        <hr/>
                        <Container>
                        <Title nameTitle = "Acerca de mí" />
                            <Row className="mt-3">
                                <Col 
                                      sm = {12} 
                                      md = {12}
                                      lg = {8}
                                      xl = {8}>
                                    <Form>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Header</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                value = {headerTitle } 
                                                onChange = { e => setHeaderTitle( e.target.value)}
                                            />
                                            { (textFailHeaderTitle) && (
                                                <p style = {styleFail}>Título header requerido. </p>
                                            ) }
                                        </Form.Group>

                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Label>Título</Form.Label>
                                            <Form.Control 
                                                type  = "text"  
                                                value = { title} 
                                                onChange = { e => setTitle( e.target.value)}
                                            />
                                            { (textFailTitle) && (
                                                <p style = {styleFail}>Título header requerido. </p>
                                            )}
                                        </Form.Group>

                                        <Form.Group controlId="exampleForm.ControlTextarea1">
                                            <Form.Label>Contenido</Form.Label>
                                            <Form.Control 
                                                as="textarea" 
                                                rows="3" 
                                                onChange = { e => setContent( e.target.value)}
                                                value = { content  }     
                                            />
                                            { (textFailContent) && (
                                                <p style = {styleFail}> Contenido requerido.  </p>
                                            ) }
                                        </Form.Group>
                                        
                                        <Button variant="primary" onClick = { e  =>  { 
                                                    e.preventDefault()
                                                    updateAbout()
                                                } } > Actualizar </Button>
                                    </Form>
                                    
                                </Col>
                              
                            </Row>
                        </Container>
                        
                    </Col>

                 
                </Row>
            </Container>
        </>
    )
}

const styleFail = {
    color : 'red' 
}

export default withRouter(ConfHome) 