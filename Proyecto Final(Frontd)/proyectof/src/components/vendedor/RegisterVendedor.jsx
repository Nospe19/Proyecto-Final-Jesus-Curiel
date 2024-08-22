import { useState, useEffect } from 'react'
import  axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Footer } from '../html/css/Footer'

export function RegisterVendedor() {
    const [data, setData] = useState({
        nombreDeEmpresa:'',
        numeroDeContacto:''
    })



    const token = localStorage.getItem('token')

    let checkbox = document.getElementById('check')

    const navigate = useNavigate();
    
    const id = localStorage.getItem('user')
    //console.log(id)

    const sendData = async (e)=>{
        e.preventDefault()
        if(!data.nombreDeEmpresa  || !data.numeroDeContacto || !checkbox.checked){
            alert('Debes rellenar todos los campos')
            return
        }
        try{
            const response = await axios.patch('http://localhost:3000/api/seller' + '/' + id , data,{
                headers: {
                    'authorization': token
                }
            })
            const informacion = response.data
            navigate('/sellerconfig')
            localStorage.setItem('rol', 'seller')

        }catch(error){
            console.log(error.response.data.message)
        }
    }

    const validarInputs = (e) => {
        const empresa = document.getElementById('nombreDeEmpresa')
        const contacto = document.getElementById('numeroDeContacto')

        empresa.addEventListener('keypress', (event) => {
            const regex = /^[a-zA-Z0-9\.\-]+$/;
            if(!regex.test(event.key)){
                event.preventDefault();
            }
        })

        contacto.addEventListener('keypress', (event) => {
            const regex = /^[0-9/-]+$/;
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
        <section id='secL'>
            <div id='divL'>
                <img 
                    src="../../public/Imagenes-Proyecto/logo shop.png" 
                    alt="" />
                <p>MyStore</p>
            </div>

            <div id='divR'>
                <h3>Conviertete en vendedor</h3>
                <form action="" id='register' onSubmit={sendData}>
                    <label htmlFor="nombreDeEmpresa" className='left'>Nombre de tu Empresa</label>
                    <input type="text" name= "nombreDeEmpresa" placeholder='Ej. MyStore' className='left' minLength={3} maxLength={20} id="nombreDeEmpresa" onChange={(e)=> setData({...data, nombreDeEmpresa: e.target.value})}  />


                    <label htmlFor="numeroDeContacto" className='left'>Numero de Contacto</label>
                    <input type="text" className='left' placeholder='Ej. 123-456-789' minLength={10} maxLength={25}  name="numeroDeContacto" id="numeroDeContacto" onChange={(e)=> setData({...data, numeroDeContacto: e.target.value})}/>


                    <input id='submit' type="submit" value="Registrar" />

                   <p id='pR'><input type="checkbox" name="" id="check" /> Acepto los Terminos y Condiciones.</p>
                </form>

            </div>
        </section>

        <Footer/>
        </>
    )
}