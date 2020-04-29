import React from 'react'

export default function Title(props){
    
    return( 
        <h3 
            style={ style }  
            align="center"
        >
            {props.nameTitle}
        </h3>
    )

}


    
const style = {
    color : global.COLOR_TEXT, 
    margin : '10px 0px 10px 0px' 
}



