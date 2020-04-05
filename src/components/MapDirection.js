import React, { useState,  useEffect } from 'react'

export default function MapDirection(){
    const style = {
        width  : '100%'  , 
        height : '300px' , 
        border : 0
    }

    return (
        <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d832.2483845619951!2d-70.7365271707424!3d-33.44947487981784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDI2JzU4LjEiUyA3MMKwNDQnMDkuNSJX!5e0!3m2!1ses-419!2scl!4v1585878000442!5m2!1ses-419!2scl"   
            frameBorder={0} 
            style={ style } 
            allowFullScreen 
            aria-hidden="false" 
            tabIndex={0}>    
        </iframe>
    )

}


