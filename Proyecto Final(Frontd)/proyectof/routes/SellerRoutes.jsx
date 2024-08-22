import { Outlet, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

export function SellerRoutes() {
    const [token, setToken] = useState(null)
    const [tokenValido, setTokenValido] = useState(null)
    const rol = localStorage.getItem('rol')

    useEffect(() => {
        const token = localStorage.getItem('token')
        /*console.log(token)*/
        const validarSesion = async () => {
            try{
                const response = await axios.get('http://localhost:3000/api/users', {
                    headers: {
                        'authorization': token
                }
                })
                const informacion = response.data
                if(informacion){
                    setTokenValido(true)
                }
    }catch(error){
                setTokenValido(false)
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                localStorage.removeItem('rol')
                localStorage.removeItem('idUser')
    }
}

    validarSesion()
    }, [])

    if(tokenValido === null){
        return <p>Cargando...</p>
    }

    if(tokenValido === false){
        return <Navigate to="/login"/>
    }

    if(rol !== 'seller'){
        return <Navigate to="/seller"/>
    }    

    
    return(
        tokenValido ? <Outlet/> : <Navigate to="/login"/>
    )
}