import axios from 'axios'
import { useState, useEffect } from 'react'
import { Navbar } from './html/css/Navbar'
import { Footer } from './html/css/Footer'

export function Usuarios(){
    const idComprador = localStorage.getItem('user')
    const [pagoPendiente, setPagoPendiente] = useState([])
    const [pagoAprobado, setPagoAprobado] = useState([])
    const pagoVerificado = {
        "pagoVerificado":false
    }
    const rol = localStorage.getItem('rol')
    const id = localStorage.getItem('user')
    const cerrarSesion = ()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('rol')
        window.location.reload()
    } 
    const [cantidades, setCantidades] = useState([])

    const getPagosPendientes = async () => {
        try{
            const response = await axios.get(`http://localhost:3000/api/pagoMovil/pendientes/${idComprador}`,{
                params:{
                    "pagoVerificado":false
                }
            })
            const informacion = response.data
            console.log(informacion)
            setPagoPendiente(informacion)
        }catch(error){
            console.log(error.response.data)
        }
    }

    useEffect(() => {
        getPagosPendientes()
    }, [  ])

    const getPagosAprobados = async () => {
        try{
            const response = await axios.get(`http://localhost:3000/api/pagoMovil/pendientes/${idComprador}`,{
                params:{
                    "pagoVerificado":true
                }
            })
            const informacion = response.data
            console.log(informacion)
            setPagoAprobado(informacion)
        }catch(error){
            console.log(error.response.data)
        }
    }

    useEffect(() => {
        getPagosAprobados()
    }, [  ])

    
    const buscarMiUsuario = async () => {
        try{
            const response = await axios.get(`http://localhost:3000/api/users/${idComprador}`)
            const informacion = response.data
            const nombre = informacion.nombre
            const apellido = informacion.apellido
            localStorage.setItem('nombre', nombre)
            localStorage.setItem('apellido', apellido)
        }catch(error){
            console.log(error.response)
        }
    }

    useEffect(() => {
        buscarMiUsuario()
    }, [  ])

    const notificacion = async () => {
        try{
            const response = await axios.get('http://localhost:3000/api/products' + '/' + id)
            const informacion = response.data
            console.log(informacion)
            for (let i = 0; i < informacion.length; i++) {
                if (informacion[i].cantidad <= 2 ) {
                    alert('Tenemos pocas existencias de ' + informacion[i].nombre)
                }
            }
       
        }catch(error){
            console.log(error.response)
        }
    }

    useEffect(() => {
        notificacion()
    }, [])

    const prueba = ()=>{
        console.log(cantidades)
    }

    const facturaView = async (event) => {
        const facturaView = event.target.id
        try{
            localStorage.setItem('viewFactura', facturaView)
        }catch(error){
            console.log(error.response.data.message)
        }
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

            <div id='misPagos'><h3>Mis Pagos pendientes:</h3></div>
            <section id='misPagosP' style={{marginBottom: '20px'}}>
                {pagoPendiente.map((pago)=>(
                    <div key={pago.id} className='misPagosPB'>
                        <p>Direccion de Entrega: {pago.direccionDeEntrega}</p>
                        <p>Numero de Referencia: {pago.numeroDeReferencia}</p>
                        <p>Monto: {pago.monto}</p>
                        <p>Productos: {pago.nombreDeProducto}</p>
                        <p>Metodo de Pago: {pago.metodoDePago}</p>
                        <p>Estado: Verificando</p>
                    </div>
                ))}               
            </section>

            <div id='vDiv'><h3>Mis Pagos verificados (Recibos):</h3></div>
            <div  id='misPagosV'>
            
                    <a href="/factura"  className='misPagosVB' onClick={facturaView} >Haz Click para ver tus Facturas</a>
                             
            </div>
            <Footer/>
        </>
    )
}