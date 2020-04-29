import React from 'react'
import CryptoJS from 'crypto-js'

export const Encrypt = (data) => {
    
    let dataEncrypt = CryptoJS.AES.encrypt( data , '123')
    return  dataEncrypt.toString()
}

export const Decrypt = (data) => {
    
    let bytes  = CryptoJS.AES.decrypt( data , '123')
    return bytes.toString(CryptoJS.enc.Utf8)
}

