import { useState, useEffect } from 'react'
import  axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Footer } from '../html/css/Footer'
import { Navbar } from '../html/css/Navbar'


export function Admin(){
    const [data, setData] = useState({
        usuario:'',
        correo:'',
        clave:''
    })

    const navigate = useNavigate();

    const [token, setToken] = useState(null)

    const sendData = async (e)=>{
        e.preventDefault()
        if(!data.usuario || !data.correo || !data.clave){
            alert('Debes rellenar todos los campos')
            return
        }
        try{
            const response = await axios.post('http://localhost:3000/api/admin', data)
            const informacion = response.data
            //console.log(informacion)
            setToken(informacion.token)
            localStorage.setItem('token', informacion.token)
            localStorage.setItem('user', informacion.user._id)
            localStorage.setItem('rol', informacion.user.rol)
            navigate('/adminAccess/users')
        }catch(error){
            console.log(error.response.data.message)
            alert(error.response.data.message)
        }
    }

    const validarInputs = (e) => {
        const clave =  document.getElementById('clave')
        const correo = document.getElementById('correo')

        clave.addEventListener('keypress', (event) => {
            const regex = /^[a-zA-Z0-9_+-]+$/;
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
            <h3>Sesión de Administrador</h3>
            <form action="" id='register' onSubmit={sendData}>
                <label htmlFor="usuario" className='left'>Usuario</label>
                <input type="text" name="usuario" placeholder='Administrador' pattern='^[a-zA-Z0-9_.+-]+$' title='Solo se aceptan letras y numeros' minLength={4}  maxLength={10} className='left' id="usuario" onChange={(e)=>{setData({...data, usuario:e.target.value})}}/>

                <label htmlFor="correo" className='left'>Correo</label>
                <input type="email" name="correo" placeholder='Correo de Administrador' className='left' id="correo" onChange={(e)=>{setData({...data, correo:e.target.value})}}/>

                <label htmlFor="clave" className='left'>Clave</label>
                <input type="password" className='left' placeholder='Contraseña' name="clave" id="clave"  onChange={(e)=>{setData({...data, clave:e.target.value})}}/>
      
                <input type="submit" id='submit' value="Iniciar Sesion"/>
          
            </form>   
            <p id='pR'>¿No eres Administrador? <a href="/" id='aR'>Volver</a></p>
            </div>
        </section>
        <Footer/>  
          </>
    )
}