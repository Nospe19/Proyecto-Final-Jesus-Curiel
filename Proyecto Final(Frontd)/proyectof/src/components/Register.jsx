import { useState, useEffect } from 'react'
import  axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../resources/index.css'
import { Footer } from './html/css/Footer'

export function Register(){

    const [data, setData] = useState({
        nombre:'',
        apellido:'',
        correo:'',
        usuario:'',
        direccion:'',
        clave:''
    })

    const navigate = useNavigate();

    const sendData = async (e)=>{
        e.preventDefault()
        if(!data.nombre || !data.apellido || !data.correo || !data.usuario || !data.direccion || !data.clave){
            alert('Debes rellenar todos los campos')
            return
        }
        try{
            const response = await axios.post('http://localhost:3000/api/users', data)
            const informacion = response.data
            console.log(informacion)
            navigate('/login')
        }catch(error){
            console.log(error)
            alert(error)
        }
    }


    const validarInputs = (e) => {
    const clave =  document.getElementById('clave')
    const correo = document.getElementById('correo')
    const direccion = document.getElementById('direccion')
   

    clave.addEventListener('keypress', (event) => {
        const regex = /^[a-zA-Z0-9_.+-]+$/;
        if(!regex.test(event.key)){
            event.preventDefault();
        }
    })

    correo.addEventListener('keypress', (event) => {
        const regex = /^[a-zA-Z0-9\@\.]+$/;
        if(!regex.test(event.key)){
            event.preventDefault();
        }
    })

    direccion.addEventListener('keypress', (event) => {
        const regex = /^[a-zA-Z0-9\.\,\s]+$/;
        if(!regex.test(event.key)){
            event.preventDefault();
        }
    })

    }

    
   

    useEffect(() => {
        validarInputs()
    }, [])

    


    return(
        <>
        <section id="secR">
            <div id='divL'>
                <img 
                    src="../../public/Imagenes-Proyecto/logo shop.png" 
                    alt="" />
                <p>MyStore</p>
            </div>

            <div id='divR'>
                <h3>Regístrate</h3>
                <form action="" id='register' onSubmit={sendData}>
            
                    <label htmlFor="nombre" className='left'>Nombre</label>
                    <input type="text" name="nombre" id="nombre" className='left' placeholder='Nombre' pattern='^[a-zA-Z]+$'  title='Solo se aceptan letras' minLength={2}  maxLength={15} onChange={(e)=>{setData({...data, nombre:e.target.value})}}/>
            
                    <label htmlFor="apellido" className='left'>Apellido</label>
                    <input type="text"  name="apellido" id="apellido"  className='left' placeholder='Apellido' pattern='^[a-zA-Z]+$'  title='Solo se aceptan letras' minLength={2}  maxLength={15} onChange={(e)=>{setData({...data, apellido:e.target.value})}}/>
            
                    <label htmlFor="correo" className='left'>Correo</label>
                    <input type="text" name="correo" id="correo"  className='left' placeholder='Correo'  title='Correo no valido' minLength={10}  maxLength={20} onChange={(e)=>{setData({...data, correo:e.target.value})}}/>

                    <label htmlFor="usuario" className='left'>Usuario</label>
                    <input type="text"   name="usuario" id="usuario"  className='left' placeholder='Usuario' pattern='^[a-zA-Z0-9_.+-]+$' title='Solo se aceptan letras y numeros' minLength={5}  maxLength={15} onChange={(e)=>{setData({...data, usuario:e.target.value})}}/>

                    <label htmlFor="direccion" className='left'>Direccion</label>
                    <input type="text"  name="direccion" id="direccion" className='left' placeholder='Direccion'   onChange={(e)=>{setData({...data, direccion:e.target.value})}}/>

                    <label htmlFor="clave" className='left'>Clave</label>
                    <input type="password"  name="clave" id="clave"  className='left' placeholder='Clave' title='Solo se aceptan letras y numeros' minLength={8}  maxLength={20} onChange={(e)=>{setData({...data, clave:e.target.value})}}/>
           

                    <input id='submit' type="submit" value="Crear Cuenta" />
                </form>

                <p id='pR'>¿Ya tienes cuenta? <a href="/login" id='aR'>Iniciar Sesion</a></p>
            </div>
        </section>
        <Footer/>
        </>
    )
}