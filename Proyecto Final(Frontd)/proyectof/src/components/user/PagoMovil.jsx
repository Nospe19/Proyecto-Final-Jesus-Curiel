import axios from 'axios';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../html/css/Navbar'
import { Footer } from '../html/css/Footer'

export function PagoMovil() {

    const navigate = useNavigate()

    //Datos necesarios para el pago

    const monto = localStorage.getItem('total')
    const idComprador = localStorage.getItem('user') 
    const idProductos = localStorage.getItem('idProductosComprador')
    const nombreComprador = localStorage.getItem('nombre')
    const nombreDeProducto = localStorage.getItem('Nombre_de_productos')
    const subTotal = localStorage.getItem('subtotal')
    const apellidoComprador = localStorage.getItem('apellido')
    const [ numeroFactura, setNumeroFactura ] = useState(0) 

    const [idCompradores , setIdCompradores] = useState([])
    

    //

    const idCompradorB = {
        idComprador: localStorage.getItem('user')
    }
    

    const id = idProductos.split(',')


    const [ data, setData ] = useState({
        direccionDeEntrega:'',
        numeroDeReferencia: '',
	    monto: monto
    })



    const ids = async () => {
        try{
            for (let i = 0; i < id.length; i++) {
                const response = await axios.get('http://localhost:3000/api/products/find/' + id[i])
                const informacion = response.data
                console.log(informacion)
            }
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        ids()
    },[])



    const pagosAprobados = async () => {
        try{
        const response = await axios.get('http://localhost:3000/api/pagoMovil/')
        const informacion = response.data
        console.log(informacion)
        if(response.data.length === 0){
           const factura = response.data.length + 1
            setNumeroFactura(factura)
           return
        }
        

        if(response.data.length > 0){
            const factura = informacion.length + 1
            setNumeroFactura(factura)

            return
        }


    }catch(error){
        console.log(error.response.data)
        }
    }


    useEffect(() => {
        pagosAprobados()
        console.log(numeroFactura)

    },[])

    const sendData = async (e) => {
        e.preventDefault()

        if(!data.direccionDeEntrega || !data.numeroDeReferencia){
            alert('Debes rellenar todos los campos')
            return
        }

        try{
            const response = await axios.post('http://localhost:3000/api/pagoMovil' + '/' + idComprador, data, {
                params:{
                    idProductos: idProductos,
                    metodoDePago: 'Pago Móvil',
                    nombreComprador: nombreComprador,
                    nombreDeProducto: nombreDeProducto,
                    subTotal: subTotal,
                    apellidoComprador: apellidoComprador,
                    numeroDeFactura: numeroFactura
                }
            })
            const informacion = response.data
            console.log(informacion.data)
            borrarContenido();
            alert('Tu pago ha sido registrado, pronto sera verificado, gracias por tu compra')
            return navigate('/')
        }catch(error){
            console.log(error)
        }
    }


    const borrarContenido = async () => {
        
        for(let i = 0; i < id.length; i++){
            const response = await axios.delete('http://localhost:3000/api/carrito' + '/' + id[i],
                {
                    params:{
                        'idComprador': idCompradorB.idComprador
                    }                    
                }
            )
            const informacion = response.data
            console.log(informacion)
        }
    }

    const volverAlCarrito = () => {
        navigate('/carrito')
    }

    const prueba = () => {
        console.log(numeroFactura)
    }

    const validarInputs = (e) => {
        const direccion = document.getElementById('direccion')
        const referencia = document.getElementById('confirmacion')

        direccion.addEventListener('keypress', (event) => {
            const regex = /^[a-zA-Z0-9\.\,\s]+$/;
            if(!regex.test(event.key)){
                event.preventDefault();
            }
        })

       referencia.addEventListener('keypress', (event) => {
            const regex = /^[0-9\-]+$/;
            if(!regex.test(event.key)){
                event.preventDefault();
            }
        })
    }

    useEffect(() => {
        validarInputs()
    }, [])

    return (
        <>
            <Navbar />
            <div id='pagoJ'><h4>Pago Móvil</h4></div>

            <section id='pagoSecA'>
            <section id='pagoSec'>
                <div>
                    <p className='white' style={{marginTop:'-20px'}}>Datos del Pago</p>

                    <label htmlFor="banco" className='white' >·Banco:</label>
                    <p id="banco" className='white' name="banco" style={{marginTop:'-2px'}}>Banesco(0134)</p>

                    <label htmlFor="banco"  className='white'>·C.I. :</label>
                    <p id="banco" name="banco" style={{marginTop:'-2px'}} className='white'>31.002.456</p>

                    <label htmlFor="banco" className='white' >·Numero Celular:</label>
                    <p id="banco" name="banco" style={{marginTop:'-2px'}} className='white'>0412-4218654</p>

                    <label htmlFor="monto" className='white' >·Monto:</label>
                    <p id="monto" name="monto" className='white' style={{marginTop:'-2px'}}>{Math.trunc(monto)}$</p>

                </div>
                
                
                <div>
                    <p className='white'>Confirmacion de Envio y Pago</p>

                    <label className='white' htmlFor="direccion" >Direccion de Envio:</label> <br />
                    <input className='white'maxLength={35} type="text" id="direccion"  name="direccion" style={{marginBottom:'30px', color:'black' }}  onChange={(e) => setData({...data, direccionDeEntrega: e.target.value})} /> <br />

                    <label className='white' htmlFor="confirmacion">Numero de Referencia:</label> <br />
                    <input className='white' maxLength={25} type="text" id="confirmacion" name="confirmacion" style={{color:'black' }} onChange={(e) => setData({...data, numeroDeReferencia: e.target.value})}/>
                    <br />
                    <button onClick={sendData} style={{marginTop:'30px', marginRight:'30px'}} className='whiteB'>Pagar</button>

                    <button onClick={volverAlCarrito} style={{marginTop:'30px'}} className='whiteB'>Cancelar</button>
                  
                </div>
            </section>
            </section>
            <Footer />
        </>
    )
}