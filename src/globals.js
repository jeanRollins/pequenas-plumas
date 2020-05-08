
//Globals
global.ROUTE = 'http://localhost:3000/'

global.COLOR_TEXT = '#595959'

global.COLOR_PRIMARY = 'rgb(0, 77, 26)'

export const LOGO = 'https://firebasestorage.googleapis.com/v0/b/my-app-notice.appspot.com/o/logo.png?alt=media&token=aef1ebc1-e9d0-4a9c-8194-ac3fdaf0dc00'

export const LOGO_SECONDARY = 'https://firebasestorage.googleapis.com/v0/b/my-app-notice.appspot.com/o/logo_secondary.png?alt=media&token=29712269-7524-4053-8392-6f395858b607' 

export const NAME_APP = 'Pequeñas Plumas' 
export const CELL_NUMBER = '32495410' 


export function GetDateTime()
{
    let currentdate = new Date() 
    let dateNow =   currentdate.getHours() +  ':'  +
                    currentdate.getMinutes() + ':' +
                    currentdate.getSeconds() + ' ' + 
                    currentdate.getDate() + '/' +
                    (currentdate.getMonth() + 1) + '/' + 
                    currentdate.getFullYear()

    return dateNow
}

export var formatNumber = {
    separador: ".", // separador para los miles
    sepDecimal: ',', // separador para los decimales
    formatear:function (num){
        num +='';
        var splitStr = num.split('.');
        var splitLeft = splitStr[0];
        var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
        var regx = /(\d+)(\d{3})/;
        while (regx.test(splitLeft)) {
            splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
        }
        return this.simbol + splitLeft +splitRight;
    },
    new:function(num, simbol){
        this.simbol = simbol ||'';
        return this.formatear(num);
    }
}

export function GetDate()
{
    let currentdate = new Date() 
    let dateNow =   currentdate.getDate() + '/' +
                    (currentdate.getMonth() + 1) + '/' + 
                    currentdate.getFullYear()

    return dateNow
}

export function GetTime()
{
    let currentdate = new Date() 
    let dateNow =   currentdate.getHours() +  ':'  +
                    currentdate.getMinutes() + ':' +
                    currentdate.getSeconds() 
    return dateNow
}

export function CreateUrl( type , urlBase , urlKey ){
    type = RemoveAcents( type )
    type = type.replace( ' ','' )


    if( urlKey == 'url' )
        return '/' + urlBase + '/' + type
    if( urlKey == 'key' )
        return type
    
}

export function RemoveAcents( data ) {

    data = data.replace('á','a')
    data = data.replace('é','e')
    data = data.replace('í','i')
    data = data.replace('ó','o')
    data = data.replace('ú','u')
    data = data.replace('ñ','n')
    return data
}