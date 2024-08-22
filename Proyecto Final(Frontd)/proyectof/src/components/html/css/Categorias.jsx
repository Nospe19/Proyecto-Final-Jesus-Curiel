import { Navbar } from "./Navbar"
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Footer } from "./Footer"
export function Categorias() {

    const categoria = localStorage.getItem('category')
    const [ data, setData ] = useState({
        categoria: '',
        precio: Number
    });

    const [ products, setProducts ] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    const [page, setPage] = useState(1);
    const [productsB, setProductsB] = useState([]);

    const searchCategory = async (pageToSearch) => {
        try{

            const response = await axios.get('http://localhost:3000/api/prueba/filtro',{
                params: {
                    page: pageToSearch,
                    'categoria': categoria,
                    'precio': data.precio
                }
            })
            const informacion = response.data.docs
            console.log(informacion) 
            setProducts(informacion)
            setTotalPages(response.data.totalPages);
        }catch(error){
            console.log(error.response.data.message)
            alert(error.response.data.message)
        }
    }

    useEffect(() => {
        searchCategory( page )
    }, [ page ] );


    const viewProduct = (event) => {
        const id = event.target.id
        try{
            localStorage.setItem('viewProduct', id)
        }catch(error){
            console.log(error.response.data.message)
        }
    }


   /* const search = async (pageToSearch) => {
        try {
            //console.log('Fetching page:', pageToSearch);
            const response = await axios.get('http://localhost:3000/api/prueba', { params: { page: pageToSearch } });
            const informacion = response.data.docs;
            console.log('Informacion:', informacion);
            //console.log('Response Data:', response.data);
            localStorage.setItem('idProduct', informacion[0]._id);

            setProducts(informacion);
            setTotalPages(response.data.totalPages); // Ajustar para la estructura de respuesta
        } catch (error) {
            console.log('Error:', error.response?.data?.message || error.message);
        }
    };

    useEffect(() => {
        search(page);
    }, [page]);
    */


    const next = () => {
        if (page < totalPages) {
            setPage((prevPage) => {
                const newPage = prevPage + 1;
                console.log('Next Page:', newPage);
                return newPage;
            });
        }
    };

    const prev = () => {
        if (page > 1) {
            setPage((prevPage) => {
                const newPage = prevPage - 1;
                console.log('Previous Page:', newPage);
                return newPage;
            });
        }
    };

    return (

        <>

            <Navbar />
            <section id="results">
                <p>Resultados</p>

                <div id="resultsD">          
                    <input id="price" placeholder="Escribe el precio máximo" type="text" onChange={(e) => setData({...data, precio: e.target.value})} />
                    <button onClick={searchCategory}>Buscar</button>
                </div> 
            </section>
                
            <section id="products">
                {products.map((product) => (
                    <div className="card">
                        <div className="image-container">
                            <img className="image"
                                src={`http://localhost:3000/${product.image}`}
                                alt="error: imagen de producto" />
                        </div>

                        <div className="info">
                            <p>{product.nombre}</p>
                        </div>

                        <p className="priceB">{product.precio}$</p>
                        <a className="viewProduct" id={product._id} onClick={viewProduct} href="/viewProduct" >ver producto</a>
                    </div>
                ))}
            </section>
            <div id="pagination" style={{ marginTop: '10px' }}>
                <button onClick={prev} id="prev">Prev</button>
                <span>{page}</span> -
                <span>{totalPages}</span>
                <button onClick={next} id="next">Next</button>
            </div>
            

            <Footer />
        </>

    )
}