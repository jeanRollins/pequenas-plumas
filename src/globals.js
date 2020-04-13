
//Globals
global.ROUTE = 'http://localhost:3000/'

global.COLOR_TEXT = '#595959'

global.COLOR_PRIMARY = 'rgb(0, 77, 26)'

export const LOGO = 'https://firebasestorage.googleapis.com/v0/b/my-app-notice.appspot.com/o/logo.png?alt=media&token=aef1ebc1-e9d0-4a9c-8194-ac3fdaf0dc00' 

export function showHideElement(id)
{
    let element = document.querySelector('#' + id )
    element.style.display = 'block' 
    setTimeout(() => {
        element.style.display = 'none' 
    }, 4000);
}