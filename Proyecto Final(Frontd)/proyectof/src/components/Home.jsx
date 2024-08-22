import axios from 'axios';
import { useState, useEffect } from 'react';
import '../resources/index.css';
import { Navbar } from './html/css/Navbar';
import { Main } from '../components/html/css/Main';
import { Footer } from './html/css/Footer';
 

export function Home() {
    const [products, setProducts] = useState([]);

    const [productsB, setProductsB] = useState([]);

    const [totalPages, setTotalPages] = useState(0);

    const [page, setPage] = useState(1);

    const [ data, setData ] = useState({
        categoria: '',
        precio: Number
    });

    const [busqueda, setBusqueda] = useState('');

    const [busquedas, setBusquedas] = useState([]);

    const [resultados, setResultados] = useState([]);

    const idProduct = localStorage.getItem('idProduct');
    
    const idUser = {
        idComprador: localStorage.getItem('user')
    };

    


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
    }, [page]);*/


    /*const searchCategory = async () => {
        try{

            const response = await axios.get('http://localhost:3000/api/prueba/filtro',{
                params: {
                    'categoria': data.categoria,
                    'precio': data.precio
                }
            })
            const informacion = response.data.docs
            setProductsB(informacion) 
        }catch(error){
            console.log(error.response.data.message)
            alert(error.response.data.message)
        }
    }
*/


    /*const next = () => {
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
    };*/

    const buscador = async () => {
        try{
            const response = await axios.get('http://localhost:3000/api/prueba/find')
            const informacion = response.data
            console.log(informacion)
            setResultados(informacion)
            setBusquedas(informacion)
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

    const añadirAlCarrito = async () => {
        try{
            const response = await axios.post('http://localhost:3000/api/carrito' + '/' + idProduct, idUser) 
            const informacion = response.data
            console.log(informacion)
        }catch(error){
            console.log(error.response.data)
        }
    }

    

    return (
        <>
            <Navbar />
            <Main />
            <Footer />
        

        </>
    );
}