import React, {useState, useEffect} from 'react'
import {  withRouter } from 'react-router-dom' 

import {auth, storage} from '../../firebase'
import {GetDocumentWhere} from '../../firebaseData'

import SpinnerLoad from '../../components/SpinnerLoad'
import Menu from '../../components/back/Menu'


import { Container ,Row, Col, Card, Modal , Button,Spinner} from 'react-bootstrap'
import  Title  from '../../components/Title'
import {GetCollecion, AddCollecion, DeleteFileStorage, DeleteDocument} from '../../firebaseData'

function ConfHome(props){

    const [ user , setUser ] = useState( null )
    const [ inputFile , setInputFile ] = useState( false )
    const [ stateModal , setStateModal ] = useState( false )
    const [ userFirebase , setUserFirebase ] = useState( false )
    const [ imagesCarousel , setImagesCarousel ] = useState( false )

    const [ btnCargar   , setBtnCargar ]   = useState( true )
    const [ btnCargando , setBtnCargando ] = useState( false )
    const [ textFailImg , setTextFailImg ] = useState( false )

    const [ btnEliminar   , setBtnEliminar ]   = useState( true )
    const [ btnCargandoEliminar , setBtnCargandoEliminar ] = useState( false )

    const [ imgTemp , setImgTemp ] = useState( '' )
    const [ idTemp  , setIdTemp  ] = useState( '' )

    const handleClose = () => setStateModal( false )
    
    const userGet = async () => {
        
        const data    =  await GetDocumentWhere('users', 'id' , auth.currentUser.uid )
        const dataImg =  await GetCollecion('files_home_carousel')
        
        setImagesCarousel( dataImg.map( row => row ) )
        setUserFirebase( data.map( row => row ) )
    }

    const deleteImage = React.useCallback( async (  ) => {
        
        setBtnEliminar(false)
        setBtnCargandoEliminar(true)
        
        try {
            await DeleteFileStorage(imgTemp)
            await DeleteDocument( 'files_home_carousel' ,idTemp )
            await userGet()
            
            setBtnEliminar(true)
            setBtnCargandoEliminar(false)
            setStateModal( !stateModal )
        } catch (error) {
            console.log('error : ',error)
        }
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
                    rutePath : 'home/' + inputFile.name
                } 

                console.log('File available at', downloadURL); 
                const responseAdd = AddCollecion( 'files_home_carousel' , collectionCarousel )

                userGet()
               
            })
            .then( () => {
                setBtnCargar(true)
                setBtnCargando(false)
            
            })
            
        }) 

        
    }
    
    useEffect( () => {
        if( auth.currentUser) {

            setUser( auth.currentUser )
            userGet()
        }
        else{
            props.history.push('/backLogin')
        }
    },[])
    
    return  (!userFirebase) ? 
        (
            <SpinnerLoad/>
        ) : (
        <>
            
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
        
            <Container className="my-4">
                
                <Row>
                    <Col 
                        sm = {0} 
                        md = {0}
                        lg = {3}
                        xl = {3}
                    >
                        <Card className="effectShadow p-3">
                            <Menu />
                        </Card>    
                    </Col>
                    <Col 
                        sm = {12} 
                        md = {12}
                        lg = {9}
                        xl = {9}
                        className="p-3"
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

                        <Container>
                        <h5 className="my-4" style={{color : global.COLOR_TEXT}}> Imagenes carousel :</h5>
                            <Row>
                                { Object.keys(imagesCarousel).map( data => (
                                    <Col 
                                        sm = {2} 
                                        md = {2}
                                        lg = {3}
                                        xl = {3}
                                        key =  {data}
                                        className="my-2"
                                    >
                                        <a href="#" >
                                            <Button 
                                                style = {{  position : 'absolute',
                                                        }}
                                                variant = "danger"
                                                size    = "sm"
                                                onClick = { e =>  confirmModal( imagesCarousel[data].rutePath , imagesCarousel[data].id) }
                                            >
                                                x
                                            </Button>
                                            
                                            <img 
                                                src = {imagesCarousel[data].file} 
                                                style = {{ width : '100%' , height : '150px' }}
                                                
                                            />
                                        </a>
                                    
                                    </Col>
                                ))}
                       
                            </Row>
                        </Container>
                        
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default withRouter(ConfHome) 