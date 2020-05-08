import React, {useState, useEffect} from 'react'
import {auth} from '../../firebase'
import {  withRouter } from 'react-router-dom' 
import { Container ,Row, Col, Form, Button , Spinner} from 'react-bootstrap'
import Title from '../../components/Title'
import {GetDate , GetTime} from '../../globals'
import {ToastsContainer, ToastsStore} from 'react-toasts'

import {GetCollection , AddCollection , GetDocumentWhere, UpdateDocument} from '../../firebaseData'
import SpinnerLoad from '../../components/SpinnerLoad'
import TableResponsive from '../../components/back/TableResponsive'
import { confirmAlert } from 'react-confirm-alert'; // Import

function ConfSales(props) {

    const [ user , setUser ] = useState( false  )
    let [ btnAdd , setBtnAdd ] = useState( true  )
    let [ btnAddLoading , setBtnAddLoading ] = useState( false )

    const [ name , setName ] = useState( '' )
    const [ email , setEmail ] = useState( '' )
    const [ typeBird , setTypeBird ] = useState( '' )
    const [ quanityBirds , setQuanityBirds ] = useState( '' )
    const [ mount , setMount ] = useState( '' )

    const [ textName , setTextName ] = useState( false )
    const [ textEmail , setTextEmail ] = useState( false )
    const [ textTypeBird , setTextTypeBird ] = useState( false)
    const [ textQuantityBirds , setTextQuantityBirds ] = useState( false)
    const [ textMount , setTextMount ] = useState( false)

    const [ valueSelect , setValueSelect ] = useState( false )
    const [ sales , setSales ] = useState( false )
    const [ isAdd , setIsAdd ] = useState( false )
    const [ nameTypeBird , setNameTypeBird ] = useState( false )

    const configTable = {
        headerTable : ['Cliente' , 'Email', 'Tipo ave', 'Cantidad', 'Monto' , 'Fecha' , 'Hora'] ,
        keys : [
            { type : 'text'     , resource : 'nameClient'  } ,
            { type : 'text'     , resource : 'emailClient' } ,
            { type : 'text'     , resource : 'nameType'  } ,
            { type : 'text'     , resource : 'quanityBirds'  },
            { type : 'number'   , resource : 'mount'  } , 
            { type : 'text'     , resource : 'date'  } ,
            { type : 'text'     , resource : 'time'  } ,
            { type : 'function' , resource : 'id' , method : async (id) => {
                console.log('id**' , id)
                try {
                    let validator = window.confirm('¿Desea eliminar venta?')
                    
                    if( !validator ) {
                        return false
                    }
                    

                    let response = await UpdateDocument('sales' , id , { status : 0 }  )
                    fetchApi()
                } catch (error) {}
            }} ,

        ] 
    }

    let submit = () => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                label: 'Yes',
                onClick: () => alert('Click Yes')
                },
                {
                label: 'No',
                onClick: () => alert('Click No')
                }
            ]
        });
    }

    const fetchApi = async () => {
        const collection   = await GetCollection( 'birds_type' )
        const salesFounded = await GetDocumentWhere( 'sales' , 'status' , 1 )
        const dataSelect   = await collection.map( ( row ) => ({ name : row.name , value : row.key  }))
        
        setSales( salesFounded )
        setValueSelect( dataSelect )
    }

    const resetForm = () => {
        setName('')
        setEmail('')
        setTypeBird('')
        setQuanityBirds('')
        setMount('')
    }

    const selectChange = (e) => {
        setTypeBird( e.target.value ) ; 
        var index = e.nativeEvent.target.selectedIndex
        setNameTypeBird( e.nativeEvent.target[index].text )
    }

    const changeButtons = (state) => {
        if( state ){
            setBtnAdd(true)
            setBtnAddLoading(false)    
        }
        else {
            setBtnAdd(false)
            setBtnAddLoading(true)
        }
    }

    const changeStatusAdd = () =>{
        setIsAdd(!isAdd )
    } 

    const validateForm = (e) => {
        e.preventDefault()
        
        if( name == ''){
            setTextName(true)
            return false
        }

        if( email == ''){
            setTextName(false)
            setTextEmail(true)
            return false
        }

        if( typeBird == ''){
            setTextName(false)
            setTextEmail(false)
            setTextTypeBird(true)
            return false
        }

        if( quanityBirds == ''){
            setTextName(false)
            setTextEmail(false)
            setTextTypeBird(false)
            setTextQuantityBirds(true)
            return false
        }

        if( mount == ''){
            setTextName(false)
            setTextEmail(false)
            setTextTypeBird(false)
            setTextQuantityBirds(false)
            setTextMount(true)
            return false
        }

        setTextName(false)
        setTextEmail(false)
        setTextTypeBird(false)
        setTextQuantityBirds(false)
        setTextMount(false)

        return true
    }

    const addSale = async (e) => {
        changeButtons(false)

        let validate = await validateForm(e) 

        if( !validate ){
            changeButtons(true)
            return false
        }

        try {
            
            const documentToInsert = {
                nameClient  :  name.trim() ,
                emailClient : email.trim() ,
                quanityBirds : parseInt( quanityBirds ) , 
                date : GetDate().trim() , 
                time : GetTime().trim() ,
                mount:  parseInt( mount ) ,
                key : typeBird.trim() ,
                nameType : nameTypeBird ,
                nameTypeBird : typeBird.trim() ,
                status : 1
            }
            
            if( AddCollection( 'sales' ,documentToInsert ) ){
                fetchApi()
                resetForm()
                ToastsStore.success("Venta guardada : ) " )
            }
            else {
                ToastsStore.warning("Hubo un problema, intente más tarde :( " )
            }
            changeButtons(true)

        } catch (error) {  }
    }

    useEffect( () => {
        if( auth.currentUser){
            fetchApi()
            setUser( auth.currentUser )
        }
        else{
            props.history.push('/backLogin')
        }
    },[])

    return ( ( valueSelect !== false ) && 
             ( user !== false ) && 
             ( sales  !== false ) ) ? (
        <>
            <ToastsContainer position={ToastsStore.TOP_LEFT} store={ToastsStore}/>

            <div className="my-3">
                <Title  nameTitle = { 'Ventas' } />
            </div>

            <Container>
                <Row>
                    <Col>
                        <TableResponsive
                            data   = { sales }
                            config = { configTable }
                        />
            <hr/>

                    </Col>
                </Row>
            </Container>

            { (isAdd) && (
                <>
                    <Title class="my-2" nameTitle = { 'Agregar Ventas' } />
                
                    <Container className="my-4">
                    
                        <Row>
                            <Col 
                                sm = {12} 
                                md = {6}
                                lg = {6}
                                xl = {6}
                                className=""
                            >
                                <Form.Group controlId="">
                                    <Form.Label>Nombre cliente :</Form.Label>
                                    <Form.Control type="text" value={ name } onChange = {e => setName( e.target.value ) } placeholder="Juan Perez" />
                                    { (textName) && ( <p style={styleTextFail}> Nombre requerido. </p> )}
                                
                                </Form.Group>
                            
                            </Col>
                            <Col 
                                sm = {12} 
                                md = {6}
                                lg = {6}
                                xl = {6}
                                className=""
                            >
                            
                                <Form.Group controlId="">
                                    <Form.Label>Correo cliente :</Form.Label>
                                    <Form.Control type="email" value={ email } onChange = {e => setEmail( e.target.value ) } placeholder="mauricio@ejemplo.com" />
                                    { (textEmail) && ( <p style={styleTextFail}> Email requerido. </p> )}
                                </Form.Group>
                            </Col>
                            <Col 
                                sm = {12} 
                                md = {6}
                                lg = {6}
                                xl = {6}
                                className=""
                            >
                                <Form.Group controlId="">
                            
                                    <Form.Label>Tipo de ave :</Form.Label>
                                    <Form.Control as="select" value={ typeBird }  onChange = { e => selectChange(e) }>
                                        <option  value = { '' }>Seleccione tipo de ave... </option>

                                        { valueSelect.map( (row , i) => (
                                            <option key = { i } value = { row.value }>{  row.name} </option>
                                        ))}
                                    </Form.Control>
                                    { (textTypeBird) && ( <p style={styleTextFail}> Tipo de ave requerido. </p> )}

                                </Form.Group>
                            </Col>

                            <Col 
                                sm = {12} 
                                md = {6}
                                lg = {6}
                                xl = {6}
                                className=""
                            >
                                <Form.Group controlId="">
                                    <Form.Label>Cantidad ave :</Form.Label>
                                    <Form.Control type="number" value={ quanityBirds } onChange = {e => setQuanityBirds( e.target.value ) } placeholder="" />
                                    { (textQuantityBirds) && ( <p style={styleTextFail}> Cantidad requerido. </p> )}

                                </Form.Group>
                            </Col>
                            <Col 
                                sm = {12} 
                                md = {6}
                                lg = {6}
                                xl = {6}
                                className=""
                            >
                                <Form.Group controlId="">
                                    <Form.Label>Monto :</Form.Label>
                                    <Form.Control type="number" value={ mount } onChange = {e => setMount( e.target.value ) } placeholder="" />
                                    { (textMount) && ( <p style={styleTextFail}> Monto requerido. </p> )}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col 
                            sm = {0} 
                            md = {2}
                            lg = {3}
                            xl = {3}
                            
                            >
                            </Col>
                            <Col 
                            sm = {12} 
                            md = {8}
                            lg = {6}
                            xl = {6}
                            
                            >
                                { (btnAddLoading) && ( 
                                    <Button variant="primary"  block  disabled>
                                        <Spinner
                                            as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                        Agregando...
                                    </Button>
                                )}
                                { (btnAdd) && (  <Button variant="primary" onClick = { e => addSale(e) } block>Agregar</Button> ) }
                                
                            </Col>
                        </Row>
                    </Container>
                </>
            )}


           

            <Container>
                <Row>
                    <Col>
                        <Button variant="success" className="my-3" onClick={ e => changeStatusAdd() }> { (isAdd) ? 'Ocultar Venta' : 'Agregar Venta' } </Button>
                    </Col>
                </Row>
            </Container>
        </>
    ) : (
        <SpinnerLoad/>
    )
}

const styleTextFail = {
    color : 'red'
}

export default withRouter(ConfSales)