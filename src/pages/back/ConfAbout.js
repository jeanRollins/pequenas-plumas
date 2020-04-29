import React, {useState, useEffect} from 'react'
import {  withRouter } from 'react-router-dom' 
import { Container ,Row, Col, Modal , Button,Spinner} from 'react-bootstrap'
import  Title  from '../../components/Title'

import {storage} from '../../firebase'
import { GetDocumentWhereConditionals, GetDocumentWhere , AddCollecion  ,  DeleteFileStorage , DeleteDocument,  UpdateDocument } from '../../firebaseData'
import MediaQuery from '../../components/commons/MediaQuery'
import SpinnerLoad from '../../components/SpinnerLoad'
import {ToastsContainer, ToastsStore} from 'react-toasts'
import {GetDateTime} from '../../globals'


function ConfAbout(props){

    const [ inputFile , setInputFile ] = useState( false )
    const [ btnCargar   , setBtnCargar ]   = useState( true )
    const [ btnCargando , setBtnCargando ] = useState( false )
    const [ textFailImg , setTextFailImg ] = useState( false )
    const [ dataCarousel , setDataCarousel ] = useState( false )
    const [ stateModal , setStateModal ] = useState( false )

    const [ imgTemp , setImgTemp ] = useState( '' )
    const [ idTemp  , setIdTemp  ] = useState( '' )
    

    const [ btnEliminar   , setBtnEliminar ]   = useState( true )
    const [ btnCargandoEliminar , setBtnCargandoEliminar ] = useState( false )

    const [ imageAbout , setImageAbout ] = useState( false )
    const [ textFailImgAbout , setTextFailImgAbout ] = useState( false )
    const [ btnCargarAbout , setBtnCargarAbout ] = useState( true )
    const [ btnCargandoAbout , setBtnCargandoAbout ] = useState( false )

    const [ idAbout , setIdAbout ] = useState( false )
    const [ dataAbout , setDataAbout ] = useState( false )


    const Mobile  =  MediaQuery('mobile')
    const Tablet  =  MediaQuery('tablet')
    const Desktop =  MediaQuery('desktop')

    const handleClose =  () => setStateModal( false )

    const changeImageAbout = async () => {

        setBtnCargarAbout(false)
        setBtnCargandoAbout(true)
         
        if(!imageAbout){
            setTextFailImgAbout(true)
            setBtnCargarAbout(true)
            setBtnCargandoAbout(false)
            return false
        }

        setTextFailImgAbout(false)

        const storageRef = await storage().ref( '/about/' + imageAbout.name )
        const response   = storageRef.put( imageAbout ) 
       
        response.on( 'state_changed' , snapshot => {
            
            response.snapshot.ref.getDownloadURL().then( 
                function(downloadURL) { 
                   
                let collectionAbout = {
                    about     : dataAbout.about  ,
                    image     : downloadURL ,
                    key       : dataAbout.key ,
                    name      : dataAbout.name ,
                    subtitle  : dataAbout.subtitle ,
                    title     : dataAbout.title ,
                    storage   : '/about/' + imageAbout.name
                }

                const responseAdd = UpdateDocument( 'about', dataAbout.id , collectionAbout )
                DeleteFileStorage(dataAbout.storage)
            })
            .then( () => {
                getData()
                setBtnCargarAbout(true)
                setBtnCargandoAbout(false)
                ToastsStore.success("Cambio de imagen realizado : ) " )
            })
        }) 
    }

    const getData = async () => {
        const data  =  await GetDocumentWhereConditionals( 'files_home_carousel', 'type' , 'about' , 'status' , 1 )
        const aboutData =  await GetDocumentWhere('about', 'key' , 'about' )
        await setDataCarousel(data)
        await setDataAbout(aboutData[0])
        await setIdAbout( aboutData[0].id )
    }

    const styleBtnEliminar = {
        position: 'absolute',
        right: '4px',
        top: '-8px'
    }
    
    const confirmModal = React.useCallback( async ( img , id ) => {
        setStateModal( !stateModal )
        setImgTemp(img)
        setIdTemp(id)

    } , [imgTemp , idTemp, stateModal] ) 



    const deleteImage = React.useCallback( async () => {
        
        setBtnEliminar(false)
        setBtnCargandoEliminar(true)
        
        try {
            await DeleteFileStorage(imgTemp)
            await DeleteDocument( 'files_home_carousel' ,idTemp )
            await getData()
            
            setBtnEliminar(true)
            setBtnCargandoEliminar(false)
            setStateModal( !stateModal )
        } 
        catch (error) {}
    }, [ stateModal ] )

    const uploadImage = async () => {

        setBtnCargar(false)
        setBtnCargando(true)
        
        if(!inputFile){
            setTextFailImg(true)
            setBtnCargar(true)
            setBtnCargando(false)
            return false
        }
        setTextFailImg(false)

        const storageRef = await storage().ref( '/home/' + inputFile.name )
        const response   =  storageRef.put( inputFile ) 
       
        response.on( 'state_changed' , snapshot => {
            
            response.snapshot.ref.getDownloadURL().then( 
                function(downloadURL) { 

                let collectionCarousel = {
                    file     : downloadURL  ,
                    legend   : 'Lorem Ipzum dolor' ,
                    status   : 1 ,
                    date     : GetDateTime() ,
                    rutePath : 'home/' + inputFile.name ,
                    type     : 'about'
                }

                const responseAdd = AddCollecion( 'files_home_carousel' , collectionCarousel )
                getData()
            })
            .then( () => {
                setBtnCargar(true)
                setBtnCargando(false)
            })
        }) 
    }

    useEffect( () => {
        getData()

    }, [])
    
    return ( ( dataCarousel !== false ) && ( dataAbout !== false ) )  ? (
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
            <Container className="mt-3 mb-3">
                <Row>
                    <Col 
                        sm = {12} 
                        md = {12}
                        lg = {12}
                        xl = {12}
                        className=" p-3"
                        style={{borderRadius : '8px'}}
                    >   
                        <Title nameTitle = "Carousel Acerca de mí" />
                        <Container>
                            <Row className="mt-3">
                                <Col >
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
                    </Col>
                </Row>
            </Container>

            <hr/>
            <Container>
                <h5 className="my-4" style={{color : global.COLOR_TEXT}}> Imagenes carousel :</h5>
                <Row>
                    { Object.keys(dataCarousel).map( data => (
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
                                        src = {dataCarousel[data].file} 
                                        style = {{ width : '100%' , height : '200px'}}
                                    /> 
                                </Mobile>

                                <Tablet> 
                                    <img 
                                        src = {dataCarousel[data].file} 
                                        style = {{ width : '100%' , height : '150px'}}
                                    /> 
                                </Tablet>

                                <Desktop> 
                                    <img 
                                        src = {dataCarousel[data].file} 
                                        style = {{ width : '100%' , height : '120px'}}
                                    /> 
                                </Desktop>

                                <Button 
                                    className = "py-2 px-3"
                                    style     = {styleBtnEliminar}
                                    variant   = "danger"
                                    size      = "xl"
                                    onClick   = { e => {  
                                        e.preventDefault()               
                                        confirmModal( dataCarousel[data].rutePath , dataCarousel[data].id) } 
                                    }
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
                <Row>
          
                    <Col 
                        sm = {12} 
                        md = {12}
                        lg = {12}
                        xl = {12}
                        className = " p-3"
                        style = {{borderRadius : '8px'}}
                    >   
                        <Title nameTitle = "Imagenes Acerca de mí" />
                        <Container>
                            <Row className="mt-3">
                                <Col 
                                    sm = {12} 
                                    md = {6}
                                    lg = {6}
                                    xl = {6}
                                >
                                    <div >
                                        <label 
                                            htmlFor="file"
                                        >
                                            Cambia imagen  : 
                                        </label>
                                        <input 
                                            className = "py-2 "
                                            type = "file" 
                                            onChange = { e  => setImageAbout( e.target.files[0] )  } 
                                        />   
                                    </div> 
                                    
                                </Col>
                                <Col 
                                    sm = {12} 
                                    md = {2}
                                    lg = {2}
                                    xl = {2}
                                    className="mt-4"
                                > 
                                    { (!btnCargarAbout) ? null : 
                                        <>
                                            <Button 
                                                className="mb-3"
                                                onClick = { e  =>  { 
                                                    e.preventDefault()
                                                    changeImageAbout()
                                                    
                                                }}
                                            >
                                                Cambiar
                                            </Button>
                                            { (!textFailImgAbout) ? null : 
                                                <p style={{ color : 'red' }}> Debe agregar imagen.</p>
                                            }
                                        </>
                                    }
                                    
                                    { ( !btnCargandoAbout ) ? null : 
                                    
                                        <Button 
                                            className="mb-3"
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
                                            Cambiando...
                                        </Button>
                                    }
                                </Col>
                                <Col
                                    sm = {12} 
                                    md = {4}
                                    lg = {4}
                                    xl = {4}
                                >

                                    <img src = {dataAbout.image} className="img-fluid"/>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
              
                </Row>
            </Container>
        </>
    ) : (
        <SpinnerLoad/>
    )
}

export default withRouter(ConfAbout) 

