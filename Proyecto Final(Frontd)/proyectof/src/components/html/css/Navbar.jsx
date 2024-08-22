import axios from 'axios';
import { useState, useEffect } from 'react';
import '../../../resources/index.css'

export function Navbar() {


    const [busqueda, setBusqueda] = useState('');
    const [busquedas, setBusquedas] = useState([]);
    const [resultados, setResultados] = useState([]);

    


    const buscador = async () => {
        try{
            const response = await axios.get('http://localhost:3000/api/prueba/find')
            const informacion = response.data
            setResultados(informacion)
            setBusquedas(informacion)
        }catch(error){
            console.log(error.response.data.message)
        }
    }

    const viewProductZ = (event) => {
        const id = event.target.id
        try{
            localStorage.setItem('viewProduct', id)
        }catch(error){
            console.log(error.response.data.message)
        }
    }

    

    useEffect(() => {
        buscador()
    }, []);

    const handleChange = (event) => {
        setBusqueda(event.target.value)
        searchProduct(event.target.value)   
    }

    const searchProduct = (word) => {
        
        var results =busquedas.filter((product)=>{
            if(product.nombre.toLowerCase().includes(word.toLowerCase()) ||
                product.categoria.toLowerCase().includes(word.toLowerCase()) ||
                product.descripcion.toLowerCase().includes(word.toLowerCase())
        ){
                return product
            }
        })
        setResultados(results)
    }


    


    const pathName = window.location.pathname
    const pageName = pathName.split('/').pop()


    const category = async (event) => {
        const categoria = event.target.id
        try{
            localStorage.setItem('category', categoria)
        }catch(error){
            console.log(error.response.data.message)
        }
    }

    
    return (
        <>
            <nav id="nav">
                <section id="sectionNav">
                        
                        <div style={{display: 'flex'}}>
                            <a href="/">
                                <img id='logo'
                                    src='../../../Imagenes-Proyecto/logo shop.png' 
                                    alt="imagen del logo" />
                            </a>
                            <p id='logoP'>My Store</p>
                        </div>


                        <div>
                            <i id='lupa' className="fa-solid fa-magnifying-glass" style={{color: '#1E5B5F'}}></i>
                            <input id='search' type="text" onChange={handleChange} value={busqueda} placeholder="Buscar Articulos"  />
                            <div id='buscador' style={{ display: busqueda.length < 2 ? 'none' : 'block' }}>
                            {resultados.map((result) => (
                                <div key={result._id} className='div' >
                                    <a href="/viewProduct" className='avp' value={result._id} id={result._id} onClick={ viewProductZ } >{result.nombre}</a>
                                </div>
                            ))}
                </div>
                        </div>
                        
                        <div>
                            <a href="/register" id='reg' style={{display : localStorage.getItem('token') ? 'none' : ''}}>Regístrate |</a>
                            <a href="/login" id='log'  style={{display : localStorage.getItem('token') ? 'none' : ''}}> Inicia Sesión</a>
                            <p id='wel' style={{display : localStorage.getItem('token') ? '' : 'none'}}>Bienvenido {localStorage.getItem('nombre')}</p>
                        </div>
                </section>
                <hr />
                <section id="sectionNav2">
                    <div id='divA'>
                        <a href="/" style={{color: pageName === '' || pageName === 'nav' ? '#1E5B5F' : ''}}>Inicio</a>
                        <a href="/categorias/videojuegos" id='videojuegos' onClick={category} style={{color: pageName === 'videojuegos' ? '#1E5B5F' : ''}}>Videojuegos</a>
                        <a href="/categorias/tecnologia" id='tecnologia' onClick={category} style={{color: pageName === 'tecnologia' ? '#1E5B5F' : ''}}>Tecnologia</a>
                        <a href="/categorias/musica" id='musica' onClick={category}  style={{color: pageName === 'musica' ? '#1E5B5F' : ''}}>Música</a>
                        <a href="/categorias/deporte" id='deportes' onClick={category} style={{color: pageName === 'deporte' ? '#1E5B5F' : ''}}>Deporte</a>
                        <a href="/sellerConfig" style={{color: pageName === 'sellerConfig' ? '#1E5B5F' : ''}} >Ventas</a>
                        <a href="/privada" style={{color: pageName === 'privada' ? '#1E5B5F' : ''}} >Perfil</a>
                        <a href="/uploads" style={{color: pageName === 'uploads' ? '#1E5B5F' : ''}} >Publicar</a>
                        <a href="/admin" style={{color: pageName === 'admin' ? '#1E5B5F' : '', display: localStorage.getItem('rol') === 'admin' ? '' : 'none' }}>Panel</a>
                    </div>
                    <div id='divB'>
                        <i className="fa-solid fa-cart-shopping"></i>
                        <a href="/carrito">Carrito</a>
                    </div>
                </section>
            </nav>
        </>
    )
}