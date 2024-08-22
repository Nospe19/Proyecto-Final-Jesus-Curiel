import axios from 'axios';
import { useState, useEffect } from 'react';
import { Navbar } from '../html/css/Navbar';
import { Footer } from '../html/css/Footer';


export function SelectMetodo() {

  const idProductosComprador = localStorage.getItem('idProductosComprador')  
  const [ nombreDeProductos , setNombreDeProductos ] = useState([])
  localStorage.setItem('Nombre_de_productos', nombreDeProductos)

  const id = idProductosComprador.split(",");


  

  

  //ruta:  http://localhost:3000/api/products/find/

  const getNombreDeProductos = async () => {
    const nombres = []
    try{
     for (let i = 0; i < id.length; i++) {
      const response = await axios.get('http://localhost:3000/api/products/find/' + id[i])
      const informacion = response.data.nombre
      nombres.push(informacion)
    }
      setNombreDeProductos(nombres)

  }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    getNombreDeProductos()
  },[])


  

  

    return (
        <>
          <Navbar/>
          <div id='pagoDivA'><p>Seleccionar Método de Pago</p> </div> 

            <section id='sectionPagos'>
              <div id='movilDiv'>
                  <p style={{color:'white', marginTop:'35px', marginBottom:'35px'}}>Pago Móvil</p>

                  <p className='pagoP'>Realiza tu pago móvil</p>
                  <p className='pagoP'>de manera segura a nuestras Cuentas</p>
                  <p className='pagoP'>y brevemente lo verificaremos</p>

                  <a href="/pagoMovil"><button id='movilB'>Pago Móvil</button></a>
              </div>
              
              <div id='transferenciaDiv'>
                  <p style={{color:'white', marginTop:'35px', marginBottom:'35px'}}>Transferencia</p>
                  
                  <p className='pagoP'>Realiza tu Transferencia</p>
                  <p className='pagoP'>de manera segura a nuestras Cuentas</p>
                  <p className='pagoP'>y brevemente lo verificaremos</p>

                  <a href="/transferencia"><button id='transferenciaB'>Transferencia</button></a>
              </div>
          </section>
          <Footer/>
        </>
    )
}
