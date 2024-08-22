import { useState, useEffect } from 'react'
import  axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Footer } from './html/css/Footer'

function App() {

  const [data, setData] = useState({
    usuario:'',
    clave:''
  })

  const navigate = useNavigate();

  const [token, setToken] = useState(null)
 const sendData = async (e)=>{
    e.preventDefault()
    console.log(data.usuario)
    if(!data.usuario || !data.clave){
      alert('Debes rellenar todos los campos')
      return
    }
    try{
      const response = await axios.post('http://localhost:3000/api/login', data)
      const informacion = response.data
      //console.log(informacion)
      setToken(informacion.token)
      localStorage.setItem('token', informacion.token)
      localStorage.setItem('user', informacion.user._id)
      localStorage.setItem('rol', informacion.user.rol)
      console.log(informacion.user)
      navigate('/privada')
    }catch(error){
      console.log(error)
      alert(error.response.data.message)
    }

    
  }
  
 /* const privado =  async (e)=>{
    e.preventDefault()
    console.log(token)
    try{
      const response = await axios.get('http://localhost:3000/api/users', {
        headers: {
          'authorization': token
        }
      })
      const informacion = response.data
      console.log(informacion)
    }catch(err){
      console.log(err.response.data.message)
    }
    if(!token){
      alert('Debes iniciar sesion')
      return
    }
    
  }*/


  /*useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response)=>response.json())
    .then((json)=>setData(json))
  },[])*/

  const validarInputs = (e) => {
    const clave =  document.getElementById('clave')
   

    clave.addEventListener('keypress', (event) => {
        const regex = /^[a-zA-Z0-9_.+-]+$/;
        if(!regex.test(event.key)){
            event.preventDefault();
        }
    })
  }

  useEffect(() => {
    validarInputs()
  }, [])

  return (
    <>  

    <section id="secL">
      <div id='divL'>
        <img 
          src="../../public/Imagenes-Proyecto/logo shop.png" 
          alt="" />
          <p>MyStore</p>
        </div>

        <div id='divR'>
            <h3>Inicia Sesión</h3>

            <form action="" id='register' onSubmit={sendData}>
              <label htmlFor="usuario"  className='left'>Usuario</label>
              <input type="text" name="usuario" pattern='^[a-zA-Z0-9_.+-]+$' title='Solo se aceptan letras y numeros' minLength={5}  maxLength={20} id="usuario" placeholder='Ingresa tu usuario' className='left' onChange={(e)=>{setData({...data, usuario:e.target.value})}}/>

              <label htmlFor="clave"  className='left'>Clave</label>
              <input type="password" name="clave" id="clave" minLength={8}  maxLength={20}  placeholder='Ingresa tu clave' className='left'  onChange={(e)=>{setData({...data, clave:e.target.value})}}/>

              <input type="submit" id='submit' value="Iniciar Sesion"/>
            </form>  
            <p id='pR'>¿Aún no tines cuenta? <a href="/register" id='aR'>Regístrate</a></p>
        </div>
    </section>   

    <Footer/>
    </>
  )
}



export default App;