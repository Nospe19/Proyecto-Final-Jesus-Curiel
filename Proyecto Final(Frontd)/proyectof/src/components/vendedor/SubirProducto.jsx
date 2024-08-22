import { useState, useEffect } from 'react'
import  axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../html/css/Navbar'
import { Footer } from '../html/css/Footer'



export function SubirProducto() {
    const [product, setProduct] = useState({
        nombre:'',
        categoria:'',
        cantidad: Number,
        precio: Number, 
        descripcion:'',
        image: File,
        idVendedor: localStorage.getItem('user')
    })
    const submit = async (e) => {
        e.preventDefault()
        if(!product.nombre || !product.categoria || !product.cantidad || !product.precio || !product.descripcion || !product.image){
            alert('Debes rellenar todos los campos')
            return
        }
        try{
            const response = await axios.post('http://localhost:3000/api/uploads', product,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(response)
            alert('Subido con exito')
            window.location.reload()
        }catch(error){
            console.log(error.response.data.message)
        }
    }

    const validarInputs = (e) => {
        const nombre = document.getElementById('nombre')
        const cantidad = document.getElementById('cantidad')
        const precio = document.getElementById('precio')
        const descripcion = document.getElementById('descripcionB')
       
        nombre.addEventListener('keypress', (event) => {
            const regex =  /^[a-zA-Z0-9\.\,\s]+$/
            if(!regex.test(event.key)){
                event.preventDefault()
            }  
        })

        cantidad.addEventListener('keypress', (event) => {
            const regex =  /^[0-9]+$/
            if(!regex.test(event.key)){
                event.preventDefault()
            }  
        })

        precio.addEventListener('keypress', (event) => {
            const regex =  /^[0-9]+$/
            if(!regex.test(event.key)){
                event.preventDefault()
            }  
        })

        descripcion.addEventListener('keypress', (event) => {
            const regex =  /^[a-zA-Z0-9\.\,\s]+$/
            if(!regex.test(event.key)){
                event.preventDefault()
            }  
        })
    }


    useEffect(() => {
        validarInputs()
    }, [])
    
    return (
        <>
            <Navbar />
            <div id='divPub'>
                <p>Publica tu producto</p>
            </div>

            <div id='divFormB'>
                <div id='divFormC'>
                    <form action="" id='formPub' onSubmit={submit} encType="multipart/form-data">

                        <label htmlFor="nombre" id='labelA'>Nombre</label>
                        <input type="text"  className='text-area' name="nombre"  id="nombre" placeholder='El nombre y titulo del producto'  onChange={(e) => setProduct({...product, nombre: e.target.value})} />

                        <label htmlFor="cantidad" id='labelC'>Cantidad</label>
                        <input type="text" maxLength={2} placeholder='Tu inventario disponible' name="cantidad" id="cantidad" className='text-area'  onChange={(e) => setProduct({...product, cantidad: e.target.value})} />

                        
                        <label htmlFor="precio" id='labelD'>Precio</label>
                        <input type="texr" maxLength={4} name="precio" placeholder='El Precio de tu producto' id="precio" className='text-area' onChange={(e) => setProduct({...product, precio: e.target.value})} />


                        <label htmlFor="descripcion" id='labelE'>Descripción</label>
                        <textarea type="text" name="descripcion" id="descripcionB" maxLength={300} placeholder='Agrega una descripción del producto' onChange={(e) => setProduct({...product, descripcion: e.target.value})} />

                        <label htmlFor="categoria" id='labelB'>Categoria</label>
                        <select name="categoria" id="categoria"  className='text-area' onChange={(e) => setProduct({...product, categoria: e.target.value})}>
                            <option value="null" disabled selected className='option' >Elige una categoria</option>
                            <option value="videojuegos"  className='option'>Videojuegos</option>
                            <option value="deportes"  className='option'>Deportes</option>
                            <option value="tecnologia"  className='option'>Tecnologia</option>
                            <option value="musica"  className='option'>Música</option>
                        </select>

                        
                        <label htmlFor="image" id='labelF'>Imagen</label>
                        <input type="file" name="image" id="image"   onChange={(e) => setProduct({...product, image: e.target.files[0]})} />
                        
                        <input id='boton' type="submit" value="Enviar" />
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )

}
