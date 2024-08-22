import { useState, useEffect } from 'react'
import  axios from 'axios'

export function Main() {

    const [categories, setCategories] = useState([])
    const [idProductB, setIdProductB] = useState('');
    const [gameProduct, setGameProduct] = useState([]);
    const [tecnologia, setTecnologia] = useState([]);
    const [productos, setProductos] = useState([]);
    const category = async (event) => {

       
        const categoria = event.target.id
        try{
            localStorage.setItem('category', categoria)
        }catch(error){
            console.log(error.response.data.message)
        }
    }


    const getCategories = async () => {
        try{

            const response = await axios.get('http://localhost:3000/api/prueba/filtro',{
                params: {
                    'categoria': 'deportes',
                    'precio': Number
                }
            })

            const informacion = response.data.docs
            setCategories(informacion.slice(0, 5))
        }catch(error){
            console.log(error.response.data.message)
        }
    }
   

    useEffect(() => {
        getCategories() 
    }, [])


    const viewProductB = async () => {
        try{
           localStorage.setItem('viewProduct', idProductB.id)
        }catch(error){
            console.log(error.response.data.message)
        }
    }

    useEffect(() => {
        viewProductB()
    }, [idProductB]);




    const categoryB = async (event) => {
        const categoria = event.target.id
        try{
            localStorage.setItem('category', categoria)
        }catch(error){
            console.log(error.response.data.message)
        }
    }
    

    const getCategoriesB = async () => {
        try{

            const response = await axios.get('http://localhost:3000/api/prueba/filtro',{
                params: {
                    'categoria': 'videojuegos',
                    'precio': Number
                }
            })

            const informacion = response.data.docs
            setGameProduct(informacion.slice(0, 4))
        }catch(error){
            console.log(error.response.data.message)
        }
    }
   

    useEffect(() => {
        getCategoriesB() 
    }, [])

    const getCategoriesC = async () => {
        try{

            const response = await axios.get('http://localhost:3000/api/prueba/filtro',{
                params: {
                    'categoria': 'tecnologia',
                    'precio': Number
                }
            })

            const informacion = response.data.docs
            console.log(informacion)
            setTecnologia(informacion.slice(0, 5))
        }catch(error){
            console.log(error.response.data.message)
        }
    }
   

    useEffect(() => {
        getCategoriesC() 
    }, [])


    const getProducts = async () => {
        try{
            const response = await axios.get('http://localhost:3000/api/prueba/find')
            const informacion = response.data
            setProductos(informacion.slice(0, 8))
        }catch(error){
            console.log(error.response.data.message)
        }
    }

    useEffect(() => {
        getProducts()
    }, [])


    return (
        <>
            <main>
                <section id="sectionM">
                    <div>
                        <p>¿Quieres comenzar a ganar dinero con nosotros?</p>
                        <a href="/uploads"><button className="button" >Vender Ya</button></a>
                    </div>
                </section>

                <section id="sectionC">

                    <div id="explorerA">
                        <p>Explora <br /> lo mejor en Gaming</p>
                        <a href="/categorias/videojuegos"><button className="button" id="videojuegos" onClick={category}>Explorar</button></a>
                    </div>

                    <div id="explorerB">
                        <p>Descubre lo mejor <br /> para el Fitness</p>
                        <a href="/categorias/deporte"><button className="button" id='deporte' onClick={category}>Ver más</button></a>
                    </div>

                </section>

                <section id="sectionD">
                    <p>EL MEJOR SITIO PARA COMPRAR Y VENDER GRAN VARIEDAD DE PRODUCTOS</p>
                </section>


                <section id="sectionE">
                    <div><p>Los Mejores Productos en Deportes y Actividades al Aire Libre</p></div>
                    <section id="secImg">
                        {categories.map((category) => {
                            return (
                                <div>
                                    <a href="/viewProduct" id={category._id}  onClick={(e)=>{setIdProductB({...idProductB, id: category._id})}}>
                                        <img 
                                            src={`http://localhost:3000/${category.image}`}
                                            alt="error: imagen de producto" />
                                    </a>
                                </div>
                            )
                        })}
                    </section>
                </section>
                <div id='categoriasP'>
                    <p>Nuestras Categorias</p>
                </div>


                <section id='sectionF'>

                        <section id='miniF'>
                            <div className='miniFB'>
                                <p className='miniFBP'>Deportes</p>
                                <img id='ropa'
                                    src="../public/Imagenes-Proyecto/ropa-portada.jpg" 
                                    alt="" />
                                <a href='/categorias/deporte' id='deporte' onClick={categoryB} className='aFBP'>ver más</a>
                            </div>

                            <div className='miniFB' id='pcD'>
                                <p className='miniFBP'>Tecnologia</p>
                                <img id='pc'
                                    src="../public/Imagenes-Proyecto/labtop.jpg" 
                                    alt="" />
                                <a href='/categorias/tecnologia' id='tecnologia' onClick={categoryB} className='aFBP'>ver más</a>
                            </div>
                        </section>

                        <section id='miniFB'>
                            <div className='miniFB' id='ps4Div'>
                                <p className='miniFBP'>Videojuegos</p>
                                <img id='ps4'
                                    src="../public/Imagenes-Proyecto/ps4nopng.jpg" 
                                    alt="" />
                                <a href='/categorias/videojuegos' id='videojuegos' onClick={categoryB} className='aFBP'>ver más</a>
                            </div>

                            <div className='miniFB'>
                                <p className='miniFBP'>Música</p>
                                <img src="../public/Imagenes-Proyecto/guitarra.jpg" alt="" />
                                <a href='/categorias/musica' id='musica' onClick={categoryB} className='aFBP'>ver más</a>
                            </div>
                        </section>
                </section>

                <section id="sectionH">
                    <div><p>Los Mejores Productos en Videojuegos</p></div>
                    <section id="secImgB">
                        {gameProduct.map((category) => {
                            return (
                                <div>
                                    <a href="/viewProduct" id={category._id}  onClick={(e)=>{setIdProductB({...idProductB, id: category._id})}}>
                                        <img 
                                            src={`http://localhost:3000/${category.image}`}
                                            alt="error: imagen de producto" />
                                    </a>
                                </div>
                            )
                        })}
                    </section>
                </section>

                <section id="sectionI">
                    <div><p>Tecnologia de Punta para todas las Areas</p></div>
                    <section id="secImgC">
                        {tecnologia.map((category) => {
                            return (
                                <div>
                                    <a href="/viewProduct" id={category._id}  onClick={(e)=>{setIdProductB({...idProductB, id: category._id})}}>
                                        <img 
                                            src={`http://localhost:3000/${category.image}`}
                                            alt="error: imagen de producto" />
                                    </a>
                                </div>
                            )
                        })}
                    </section>
                </section>

                <div id='explora'>
                    <p id='exploraP'>Explora una gran variedad de productos</p>
                </div>

                <section id='sectionJ'>
                    {productos.map((product) => {
                        return (
                            <div className='divJ'>
                                <div className='divJB'>
                                    <img className='imgJ'
                                        src={`http://localhost:3000/${product.image}`}
                                        alt="" />
                                </div>
                                <a href="/viewProduct" className='aFBP' id={product._id} onClick={(e)=>{setIdProductB({...idProductB, id: product._id})}}>ver producto</a>
                            </div>
                        )
                    })}
                </section>
                
            </main>
        </>
    )
}