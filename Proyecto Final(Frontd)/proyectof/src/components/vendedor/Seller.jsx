import  { Functions }  from './Functions.jsx'
import { Navbar } from '../html/css/Navbar.jsx'
import { Footer } from '../html/css/Footer.jsx'



export function Seller(){
    const cerrarSesion = ()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('rol')
        localStorage.removeItem('idProduct')
        window.location.reload()
    } 

    
    return(
        <>
            <Navbar/>
            <div id='userDP'>
                <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                    <i class="fa-solid fa-user"></i>
                    <p>{localStorage.getItem('nombre')} {localStorage.getItem('apellido')}</p>
                </div>
                <button className='closeS' onClick={cerrarSesion}>Cerrar sesion</button>
            </div>
            <Functions/>
            <Footer/>
        </>
    )
}