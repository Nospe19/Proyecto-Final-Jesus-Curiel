import axios from 'axios';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../html/css/Navbar'
import { Footer } from '../html/css/Footer'


export function Transferencia() {

    const navigate = useNavigate()

    const monto = localStorage.getItem('total')
    const idComprador = localStorage.getItem('user') 
    const idProductos = localStorage.getItem('idProductosComprador')
    const nombreComprador = localStorage.getItem('nombre')
    const nombreDeProducto = localStorage.getItem('Nombre_de_productos')
    const subTotal = localStorage.getItem('subtotal')
    const apellidoComprador = localStorage.getItem('apellido')
    const [ numeroFactura, setNumeroFactura ] = useState(0) 

    const idCompradorB = {
        idComprador: localStorage.getItem('user')
    }
    

    const id = idProductos.split(',')


    const [ data, setData ] = useState({
        direccionDeEntrega:'',
        numeroDeReferencia: '',
	    monto: monto
    })


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
                    metodoDePago: 'Transferencia',
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
           <div id='pagoJ'><h4>Transferencias</h4></div>

           <section id='pagoSecA'>
           <section id='pagoSecB'>
                <div>
                    <p className='white' style={{marginTop:'-40px'}}>Datos del Pago</p>

                    <label htmlFor="banco" className='white' >·Cuenta Bancaria:</label>
                    <p id="banco" name="banco" className='white' style={{marginTop:'-2px'}}>0134-0205-12-2053030170</p>

                    <label htmlFor="banco" className='white' >·C.I. :</label>
                    <p id="banco" className='white' name="banco" style={{marginTop:'-2px'}}>31.002.456</p>

                    <label htmlFor="monto" className='white' >·Monto:</label>
                    <p id="monto" name="monto" className='white' style={{marginTop:'-2px'}}>{Math.trunc(monto)}$</p>

                </div>
                
                
                <div>
                    <p className='white'>Confirmacion de Envio y Pago</p>

                    <label htmlFor="direccion" className='white' >Direccion de Envio:</label> <br />
                    <input type="text" id="direccion" maxLength={35} className='white' name="direccion" style={{marginBottom:'30px', color:'black'}} onChange={(e) => setData({...data, direccionDeEntrega: e.target.value})} /> <br />

                    <label htmlFor="confirmacion" className='white'>Numero de Referencia:</label> <br />
                    <input type="text" style={{color:'black' }} id="confirmacion" className='white'maxLength={25} name="confirmacion" onChange={(e) => setData({...data, numeroDeReferencia: e.target.value})} />
                    <br />
                    <button onClick={sendData} className='whiteB' style={{marginTop:'30px', marginRight:'30px'}}>Pagar</button>

                    <button onClick={volverAlCarrito}  className='whiteB' style={{marginTop:'30px'}}>Cancelar</button>
                  
                </div>
            </section>
            </section>
            <Footer />
        </>
    )
}