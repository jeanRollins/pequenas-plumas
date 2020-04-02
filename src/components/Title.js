import React from 'react'

export default function Title(props){
    
    return( 
        <h1 
            style={ getStyle() }  
            align="center"
        >
            {props.nameTitle}
        </h1>
    )

}

function getStyle(){
    
    const style = {
        color : global.COLOR_TEXT, 
        margin : '10px 0px 10px 0px' 
    }

    return style 
}


