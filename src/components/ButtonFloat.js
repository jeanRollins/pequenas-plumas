import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { CELL_NUMBER } from '../globals'


export default function ButtonFloat(){
    
    const style = {
        position : 'fixed'  ,
        width    : '60px' , 
        height   : '60px' ,
        bottom   : '40px' ,
        right    : '40px' ,
        backgroundColor : '#25d366' ,
        color : '#FFF' ,
        borderRadius : '50px' ,
        textAlign : 'center',
        fontSize  : '30px',
        boxShadow : '2px 2px 3px #999',
        zIndex    : '100'
    }

    return(
        <a  
            style={style}
            href={"https://api.whatsapp.com/send?phone=569" + CELL_NUMBER + "$&text=."} 
            className="float" 
            target="_blank">
            <FaWhatsapp style={{marginTop:'7px'}}/>
        </a>
    )


}