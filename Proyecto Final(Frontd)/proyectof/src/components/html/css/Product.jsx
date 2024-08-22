import axios from 'axios';
import { useState, useEffect } from 'react';
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { useNavigate } from 'react-router-dom'

import '../../../resources/index.css';

export function Product() {
    const idProduct = localStorage.getItem('viewProduct')
    const [ product, setProduct ] = useState([])
    const idUser = {
        idComprador: localStorage.getItem('user')
    };

    const navigate = useNavigate();
    const findProduct = async () => {
        try{
            const response = await axios.get('http://localhost:3000/api/products/find/' + idProduct)
            const informacion = response.data
            console.log(informacion)
            setProduct(informacion)
        }catch(error){
            console.log(error.response.data.message)
        }
    }   

    useEffect(() => {
        findProduct()
    }, [])


    const añadirAlCarrito = async () => {
        if(!idUser.idComprador){
            alert('Debes iniciar sesion')
            navigate('/login')
            return
        }
        try{
            const response = await axios.post('http://localhost:3000/api/carrito' + '/' + idProduct, idUser) 
            const informacion = response.data
            console.log(informacion)
        }catch(error){
            console.log(error.response.data)
        }
    }

    return( 
    <>
        <Navbar/>
        <hr id='hrP'/>
            <section id='secProduct'>
                <div id='producto'>
                    <div id='divImg'>
                        <img id='imgPrincipal'
                            src={`http://localhost:3000/${product.image}`} 
                            alt={`imagen de ${product.nombre}`} />
                    </div>
                    <div id='divImgB'>
                        <img id='imgSecundaria'
                            src={`http://localhost:3000/${product.image}`} 
                            alt={`imagen de ${product.nombre}`} />
                    </div>
                </div>
                
                <div id='descripcion'>
                    <div id='divPNombre'>
                        <h1>{product.nombre}</h1>
                        
                    </div>
                    <h2 style={{color: '#1E5B5F'}}>{product.precio}$</h2>
                    <hr id='hrPrice'/>
                    <h4 style={{marginTop: '20px'}}>Información del producto:</h4>

                    <div id='divDesc'>
                        <p>{product.descripcion}</p>
                    </div>
                </div>
                <div id='cuadro'>
                    <h3>Producto Nuevo</h3>
                    <h3>{product.precio}$</h3>
                    <h3>Entrega Luego de 24hs de la compra</h3>
                    <h3>Enviado por: MyStore</h3>
                    <h3>Vendido por: {product.nombreVendedor}</h3>

                    <button id='btnAdd' onClick={ añadirAlCarrito }>Agregar al Carrito</button>
                </div>
            </section>
        <Footer/>
    </>
    )
   
}