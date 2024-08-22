import axios from 'axios';
import { useState, useEffect } from 'react';
import { Navbar } from '../html/css/Navbar'
import { Footer } from '../html/css/Footer'

export function Carrito() {
    

   const idComprador = {
        idComprador: localStorage.getItem('user')
    }

    const [productosCarrito , setProductosCarrito] = useState([])

    const [total, setTotal] = useState(0)

    const [totalB, setTotalB] = useState(0)

    const [idCompra, setIdCompra] = useState([])


    

    localStorage.setItem('idProductosComprador', idCompra )
    localStorage.setItem('total', totalB )
    localStorage.setItem('subtotal', total)

    

    const search = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/carrito',{
                params:{
                    'idComprador': idComprador.idComprador
                }
            })
            const informacion = response.data
            console.log(informacion)
            setProductosCarrito(informacion)
            const idProductos = informacion.map(producto =>  (producto._id))
            setIdCompra(idProductos)
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        search()
    }, [])

    const totalProductos = () => {
        let total = 0
        for (let i = 0; i < productosCarrito.length; i++) {
            total += productosCarrito[i].precio
        }
        setTotal(total)
    }

    useEffect(() => {
        totalProductos()
    }, [productosCarrito])

    const totalProductosIva = ()=>{
        let total = 0
        for (let i = 0; i < productosCarrito.length; i++) {
            total += productosCarrito[i].precio * 1.16 * 1.20
        }
        setTotalB(total)
    }

    useEffect(() => {
        totalProductosIva()
    }, [productosCarrito])



    const borrarContenido = async (id) => {
        try{
            const response = await axios.delete(`http://localhost:3000/api/carrito/${id}`,
                {
                    params:{
                        'idComprador': idComprador.idComprador
                    }                    
                }
            )
            const informacion = response.data
            console.log(informacion)
            search()
        }catch(error){
            console.log(error)            
        }
    }

    const checkbox =  (event) => {
        const price = parseFloat(event.target.value);
        if (event.target.checked) { 
            setTotalB(totalB + price * 1.16 * 1.20);
            setTotal(total + price);

            setIdCompra([...idCompra, event.target.id])
            //return console.log(idCompra)
        } else {
            setTotalB(totalB - price * 1.16 * 1.20);
            setTotal(total - price);

            setIdCompra(idCompra.filter(id => id !== event.target.id))
            //return console.log(idCompra)
        }
    }


    /*
            <h2>Sub-Total: {Math.trunc(total)}</h2>
            <h2>Total: {Math.trunc(totalB)}</h2>
             <button> <a href="/selectMetodo">Comprar</a></button>
    */ 

    return(
        <>
        <Navbar/>
        <body id='bodyC'>
        <section id='carrito'>
            <h1>Carrito</h1>  
            <hr id='hrCar'/>

            {productosCarrito.map((product)=>(
               <div key={product.id} className='divCarrito'>
                <div className='divCarritoA'>
                    <img className='imgCarrito'
                        src={`http://localhost:3000/${product.image}`}
                        alt="" />
                </div>

                
                <div className='divCarritoB'>
                    <div className='nombreStyles'>
                        <p>{product.nombre}</p>
                    </div>
                    <button  onClick={()=>borrarContenido(product._id)} className='botonCar' value={product._id} style={{marginBottom: '10px'}}>Eliminar</button>
                </div>
                
                <div className='divCarritoC'>
                    <p className='pPrice'>{product.precio}$</p>
                    <input className='inputCarrito' type="checkbox" defaultChecked name={product.nombre}  id={product._id} onChange={checkbox} value={product.precio} />
                </div> 
                


               </div>
           ))}
        </section>

        <section id='total'>
            <p>Sub-Total ( {productosCarrito.length} Productos): </p>
            <p style={{color: '#1E5B5F', marginBottom: '30px'}}>{Math.trunc(total)}$</p>

            <p>Total ( {productosCarrito.length} Productos): </p>
            <p style={{color: '#1E5B5F',  marginBottom: '30px'}}>{Math.trunc(totalB)}$</p>

            <button  id='botonCarB'> <a href="/selectMetodo">Comprar</a></button>
        </section>
        </body>
        <Footer/>
        </>
    )
}