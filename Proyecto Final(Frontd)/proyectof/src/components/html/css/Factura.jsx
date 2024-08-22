import axios from 'axios';
import { useState, useEffect } from 'react';
import { Navbar } from './Navbar'
import { Footer } from './Footer'
export function Factura() {
    const idComprador = localStorage.getItem('user')
    const [pagoAprobado, setPagoAprobado] = useState([])
    const [ fecha, setFecha ] = useState('')

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

    //id='facturaS'

    return(
        <>
            <Navbar/>
            <body id='facturaB'>
                {pagoAprobado.map(pago => (
                    <section id='facturaS'>
                        <div className='facturaDiv'>
                            <h2 style={{color:'#1E5B5F'}}>Factura</h2>
                            <div className='facturaDiv2'>
                                <p>Fecha: </p>
                                <p className='facturaFecha'> {pago.createdAt.slice(0,10)} </p> 
                            </div>

                            <div  className='facturaDiv2'> 
                                <p>No.</p>
                                <p className='facturaFecha'> {pago.numeroDeFactura}</p> 
                            </div>
                            
                        </div>

                        <section>
                            <div className='facturaDiv3'>
                                <div className='facturaDiv2'>
                                    <p>Recibí de:</p>
                                    <p  className='facturaFecha' style={{width:'150px'}}>My Store</p>
                                </div>
                            <div className='facturaDiv2'>
                                    <p>Metodo de Pago:</p>
                                    <p  className='facturaFecha'>{pago.metodoDePago}</p>
                                </div>
                            </div>

                            <div className='facturaDiv4'>
                                <p>Cantidad:</p>
                                <p  className='facturaFecha' style={{width:'150px'}}>{pago.idProductos.length}</p>
                            </div>

                            <div className='facturaDiv4'>
                                <p>Concepto:</p>
                                <p  className='facturaFecha'  style={{width:'400px'}}>{pago.nombreDeProducto}</p>
                            </div>

                            <div className='facturaDiv4'>
                                <p>Direccion:</p>
                                <p  className='facturaFecha'  style={{width:'400px'}}>{pago.direccionDeEntrega
                                }</p>
                            </div>

                            <div className='facturaDiv4' style={{paddingLeft:'45px'}}>
                                <p>Recibido por:</p>
                                <p  className='facturaFecha'  style={{width:'400px'}}>{pago.nombreComprador} {pago.apellidoComprador}</p>
                            </div>

                            <div className='facturaDiv4' style={{paddingLeft:'30px'}}>
                                <p>No. Referencia:</p>
                                <p  className='facturaFecha'  style={{width:'400px'}}>{pago.numeroDeReferencia}</p>
                            </div>
                        </section>

                        <section id='facturaSB'>
                            <div className='facturaDiv5'>
                                <img 
                                    src="../public/Imagenes-Proyecto/\logo shop.png" 
                                    alt="imagen del logo" />
                                <p>My Store</p>
                            </div>
                            <div>
                                <p style={{marginBottom:'10px', color:'#1E5B5F'}}>Monto:</p>
                                <p>Sub-Total: {Math.trunc(pago.subTotal)}$</p>
                                <p>Total: {Math.trunc(pago.monto)}$</p>
                            </div>
                        </section>
                    </section>
                ))}
                    
            </body>
            <Footer/>
            
        </>
    )
}