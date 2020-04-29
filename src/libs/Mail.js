import React from 'react'
import axios from 'axios'
import {LOGO_SECONDARY} from '../globals'

const MessageHtml = (from, email, message) => {
    
    const htmlBody = `
        <img src = "${LOGO_SECONDARY}" width="500" height="250" />
        <br>  
        <h4 align="center"> Pequeñas Plumas </h4>
        <br>        
        <p> Nombre  : ${from} </p>
        <p> Correo  : ${email} </p>

        <p>  ${message} </p>
    `
    return htmlBody 
} 

export const SendMail =  (from, email, message) => {

    const url = 'https://mail-service-nodemailer.azurewebsites.net/sendMail'
    
    let info = {
        from    : '"' + from + '" <foo@example.com>', // sender address
        to      : "raphaelle39@ethereal.email <raphaelle39@ethereal.email>", // list of receivers
        subject : "Pequeñas Plumas Contacto", // Subject line
        html    : MessageHtml(from, email, message)// html body
    }
    console.log('info' , info)
    const send = async () => {
        
        const response  = await axios.post(url, info)
        return response
    } 

    return send()
  
}