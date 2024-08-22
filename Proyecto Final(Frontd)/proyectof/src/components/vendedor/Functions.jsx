import  axios from 'axios'
import { useState, useEffect } from 'react'
import '../../resources/index.css'
import { reactDOM } from 'react-dom'


export function Functions(){
    const [ventas, setVentas] = useState(0)
    const [ingresos, setIngresos] = useState(0)
    const [product, setProduct] = useState([])
    const [user, setUser] = useState([])
    const id = localStorage.getItem('user')
    const [data, setData] = useState({
        nombre:'',
        categoria:'',
        precio:Number,
        cantidad:'',
        descripcion:'',
    })
    const [idProduct, setIdProduct] = useState('')

    const search = async ()=>{
        let tr = document.getElementById('trb')
        tr.style.display = 'contents'
        try{
            const response = await axios.get('http://localhost:3000/api/products' + '/' + id)
            const informacion = response.data
            console.log(informacion)

            setProduct(informacion)             
            

        }catch(error){
            console.log(error.response.data.message)
    }
}

useEffect(()=>{
    search()
},[])

const deleteProduct = async (e)=>{
    const id = e.target.value
    console.log(id)
    try{
        const response = await axios.delete('http://localhost:3000/api/products' + '/' + id)
        const informacion = response.data
        console.log(informacion)
        search()
    }catch(error){
        console.log(error.response.data.message)
}
}
const updateProduct = async (e)=>{
    const id = localStorage.getItem('idProduct')
    let form = document.getElementById('formPub')
    let divF = document.getElementById('divFormB')
    console.log(id)
    e.preventDefault()
    if(!data.nombre || !data.categoria || !data.precio || !data.cantidad || !data.descripcion){
        alert('Debes rellenar todos los campos')
        return
    }
    try{
        const response = await axios.patch('http://localhost:3000/api/products' + '/' + id, data)
        search()
        form.style.display = 'none'
        form.reset()
        divF.style.display = 'none'
        categoria.value = 'null'
        setIdProduct('')
    }catch(error){
        console.log(error.response.data.message)
    }
}

const display = async (e)=>{
    let form = document.getElementById('formPub')
    let divF = document.getElementById('divFormB')
    form.style.display = 'block'
    divF.style.display = 'block'
    try{
        localStorage.setItem('idProduct', e.target.value)
        setIdProduct(e.target.value)
    }catch(error){
        console.log(error.response.data.message)
    }
}

const users = async ()=>{
    try{
        const response = await axios.get('http://localhost:3000/api/users' + '/' + id)
        const informacion = response.data

        console.log(informacion.totalVentas)
        console.log(informacion.ingresosTotales)
        
        setVentas(informacion.totalVentas)
        setIngresos(informacion.ingresosTotales)
    }catch(error){
        console.log(error.response.data.message)
    }
}

useEffect(()=>{
    users()
},[])


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



    return(
        <>
        <section id='secSell'>
            <h3>Mis Productos:</h3>
            <div id='divSell'>
                <table id='tableS'>
                    <thead id='thead'>
                        <tr id='trb'>
                            <th>Nombre</th>
                            <th>Categoría</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Total Ventas</th>
                            <th className='vanish'>Descripcion</th>
                        </tr>
                    </thead>
                    <tbody id='data'>
                        {product.map((product)=>{
                            return(
                                <tr className='trSel'  style={{color: idProduct === product._id ? 'yellow' : 'aliceblue'}}>
                                    <td className='tdSel' style={{width:'200px'}}>{product.nombre}</td>
                                    <td className='tdSel' style={{width:'130px'}}>{product.categoria}</td>
                                    <td className='tdSel' style={{width:'80px'}}>{product.precio}</td>
                                    <td className='tdSel' style={{width:'80px'}}>{product.cantidad}</td>
                                    <td className='tdSel'  style={{width:'80px'}}>{product.totalVentas}</td>
                                    <td className='tdSel' id='vanish'  style={{width:'450px'}}> {product.descripcion}</td>
                                    <button value={product._id} id='eraser' onClick={deleteProduct}>Eliminar</button>
                                    <a href="#formPub"><button id={product._id} className='edit' value={product._id} onClick={display}>Editar</button></a>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>


            <div id='divFormB' style={{display:'none'}}>
                <div id='divFormC'>
                    <form action="" id='formPub' style={{display:'none'}} onSubmit={updateProduct} encType="multipart/form-data">

                        <label htmlFor="nombre" id='labelA'>Nombre</label>
                        <input type="text"  className='text-area' name="nombre" id="nombre" placeholder='Nombre del producto'  onChange={(e)=>{setData({...data, nombre:e.target.value})}}/>

                        <label htmlFor="cantidad" id='labelC'>Cantidad</label>
                        <input type="text" maxLength={2} placeholder='Tu inventario disponible' name="cantidad" id="cantidad" className='text-area'  onChange={(e)=>{setData({...data, cantidad:e.target.value})}}/>

                        
                        <label htmlFor="precio" id='labelD'>Precio</label>
                        <input type="texr" maxLength={4} name="precio" placeholder='El Precio de tu producto' id="precio" className='text-area' onChange={(e)=>{setData({...data, precio:e.target.value})}} />


                        <label htmlFor="descripcion" id='labelE'>Descripción</label>
                        <textarea type="text" name="descripcion" id="descripcionB" maxLength={300} placeholder='Agrega una descripción del producto' onChange={(e)=>{setData({...data, descripcion:e.target.value})}} />

                        <label htmlFor="categoria" id='labelB'>Categoria</label>
                        <select name="categoria" id="categoria"  className='text-area' onChange={(e) => setData({...data, categoria: e.target.value})}>
                            <option value="null" disabled selected className='option' >Elige una categoria</option>
                            <option value="videojuegos"  className='option'>Videojuegos</option>
                            <option value="deportes"  className='option'>Deportes</option>
                            <option value="tecnologia"  className='option'>Tecnologia</option>
                            <option value="musica"  className='option'>Música</option>
                        </select>

                        
                        
                        <input id='boton' type="submit" value="Enviar" />
                    </form>
                </div>
            </div>
            <section id='registroSec'>
                <h3>Registro de tus Ventas:</h3>
                <div>
                    <p>Tus Ingresos Totales: {ingresos}</p>
                    <p>Tus Numero de Ventas Totales: {ventas}</p>
                </div>
            </section>
        </section>
        </>
    )
}