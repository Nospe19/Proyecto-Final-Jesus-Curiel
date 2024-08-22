import axios from 'axios'
import { useState, useEffect } from 'react'
import '../../resources/index.css'



export function AdminAccess(){

    const [user, setUser] = useState([])

    const [estado, setEstado] = useState([])

    const [pagos, setPagos] = useState([])

    const [editEstado, setEditEstado] = useState([])

    const [editEstadoB , setEditEstadoB] = useState([])
    const [editEstadoC , setEditEstadoC] = useState([])
    const [estadoB , setEstadoB] = useState([])
    const [product, setProduct] = useState([])
    
    const [dataB, setDataB] = useState({
        nombre:'',
        categoria:'',
        precio:Number,
        cantidad:'',
        descripcion:'',
    })

    const [editingUserId, setEditingUserId] = useState(null);

    const [editingUserIdB, setEditingUserIdB] = useState(null);

    const [idCantidades, setIdCantidades] = useState('')
    const id = idCantidades.split(',')
    const path = window.location.pathname
    const idPath = path.split('/').pop()
    const [ idPathB , setIdPathB ] = useState(idPath)

    const [ idVendedores, setIdVendedores ] = useState([])
    
    const [ ingresos, setIngresos ] = useState([])

    const [ingresosTotal , setIngresosTotal ] = useState(0)
    const [ventasTotal , setVentasTotal ] = useState(0)

    


    const [data, setData] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        usuario: '',
        rol: '',
        direccion: '',
        nombreDeEmpresa: '',
        numeroDeContacto: '',
    })

    const [datab, setDatab] = useState({
        nombre:'',
        apellido:'',
        correo:'',
        usuario:'',
        direccion: '',
        clave:''
    })




    const cerrarSesion = ()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('rol')
        localStorage.removeItem('idUser')
        window.location.reload()
    } 

    const search = async ()=>{
        let tr = document.getElementById('tra')
        tr.style.display = 'contents'
        try{
            const response = await axios.get('http://localhost:3000/api/adminFunctions')
            const informacion = response.data
            console.log(informacion)

            setUser(informacion)
        }catch(error){
            console.log(error.response.data.message)
        }
    }

    const deleteUser = async (e)=>{
        const id = e.target.value
        console.log(id)
        try{
            const response = await axios.delete('http://localhost:3000/api/adminFunctions' + '/' + id)
            const informacion = response.data
            console.log(informacion)
            search()
        }catch(error){
            console.log(error.response.data.message)
        }
    }

    const editUser = async (e)=>{
        const id = editingUserId;
        console.log(id)
        let formb = document.getElementById('formb')
        let formbb = document.getElementById('formbb')
        
        e.preventDefault()
        if(!data.nombre || !data.apellido || !data.correo || !data.usuario || !data.rol || !data.direccion || !data.nombreDeEmpresa || !data.numeroDeContacto){
            alert('Debes rellenar todos los campos')
            return
        }
        try{
            const response = await axios.patch('http://localhost:3000/api/adminFunctions' + '/' + id, data)
            search()
            formb.style.display = 'none'
            formbb.reset()
            rol.value = 'null'
            window.location.reload()
        }catch(error){
            console.log(error.response.data.message)
        }
    }

    const display = async (e) => {
        let forma = document.getElementById('formb');
        forma.style.display = 'flex';
        let titleAdminA = document.getElementById('titleAdminA')
        let userAdminA = document.getElementById('userAdminA')
        let sectionPanelA = document.getElementById('sectionPanelA')
        let sectionPanelC = document.getElementById('sectionPanelC')
        let sectionPanelD = document.getElementById('sectionPanelD')
        let sectionPanelE = document.getElementById('sectionPanelE')
        localStorage.setItem('idUser', e.target.value);
        setEditingUserId(e.target.value);

        titleAdminA.style.display = 'block'
        userAdminA.style.display = 'flex'
        sectionPanelA.style.display = 'block'
        sectionPanelC.style.display = 'none'
        sectionPanelD.style.display = 'none'
        sectionPanelE.style.display = 'none'
    };

    const reload = ()=>{
        if(window.location.reload){
            localStorage.removeItem('idUser')
        }
    }
    reload()


    const sendData = async (e)=>{
        e.preventDefault()
        if(!datab.nombre || !datab.apellido || !datab.correo || !datab.usuario || !datab.clave || !datab.direccion){
            alert('Debes rellenar todos los campos')
            return
        }
        try{
            const response = await axios.post('http://localhost:3000/api/users', datab)
            const informacion = response.data
            console.log(informacion)
            window.location.reload()
        }catch(error){
            console.log(error)
        }
    }

    const displayForm = ()=>{
        let formc = document.getElementById('formc')
        formc.style.display = 'block'
    }


    const displayEstado = async ()=>{
        try{
            let tr = document.getElementById('trab')
            tr.style.display = 'contents'
            let tds = document.getElementsByClassName('estado')
            const response = await axios.get('http://localhost:3000/api/adminFunctions')
            const informacion = response.data
            const suspension = informacion.map(estado => estado.suspension)
            console.log(informacion)
            setEditEstado(suspension)
            console.log(editEstado)
            setEstado(informacion)
            for (let i = 0; i < informacion.length; i++) { 
                if(informacion[i].suspension === true){
                    tds[i].innerHTML = 'Suspendido'
                    tds[i].style.color = 'red'
                }else{
                    tds[i].innerHTML = 'Activo'
                    tds[i].style.color = 'green'
                }
            }
        }catch(error){
            console.log(error.response.data.message)
        }
    }

    const displayEstadoB = async ()=>{
        let total = 2
        try{
            for (let i = 0; i < total; i++) {
                displayEstado()
            }
        }catch(error){
            console.log(error.response)
        }
    }

    const suspenderUser = async (e)=>{
        const id = e.target.value
        console.log(id)
        try{
            const response = await axios.patch('http://localhost:3000/api/adminFunctions/suspender' + '/' + id)
            const informacion = response.data
            console.log(informacion)
            displayEstado()
        }catch(error){
            console.log(error.response.data.message)
        }
    }

    const quitarSuspension = async (e)=>{
        const id = e.target.value
        console.log(id)
        try{
            const response = await axios.patch('http://localhost:3000/api/adminFunctions/quitarSuspension' + '/' + id)
            const informacion = response.data
            console.log(informacion)
            displayEstado()
        }catch(error){
            console.log(error.response.data.message)
        }
    }

    const verPagos = async ()=>{
            let trb = document.getElementById('trac')
            trb.style.display = 'contents'
            let tdsb = document.getElementsByClassName('estadoPago')
        try{
            const response = await axios.get('http://localhost:3000/api/pagoMovil/')
            const informacion = response.data
            const pagoVerificado = informacion.map(pago => pago.verificacion)
            console.log(informacion)

            
            setEstadoB(informacion)
            setPagos(informacion)
            
            
            for (let i = 0; i < informacion.length; i++) { 
                if(informacion[i].pagoVerificado === true){
                    tdsb[i].innerHTML = 'Aprobado'
                    tdsb[i].style.color = 'green'
                }else{
                    tdsb[i].innerHTML = 'En espera'
                    tdsb[i].style.color = 'red'
                }
            }

            if(informacion.length === 0){
                let trb = document.getElementById('trac')
                trb.style.display = 'none'
            }

        }catch(error){
            console.log(error)
        }
    }

    const displayEstadoC = async ()=>{
        let total = 2
        try{
            for (let i = 0; i < total; i++) {
                verPagos()
            }
        }catch(error){
            console.log(error.response)
        }
    }


    const aprobarPagos = async (e)=>{
        const id = e.target.value
        setIdCantidades(e.target.id)
        let trb = document.getElementById('trac')
            trb.style.display = 'none'
        try{
            const response = await axios.patch('http://localhost:3000/api/pagoMovil/' + '/' + id)
            const informacion = response.data
            console.log(informacion)
            displayEstadoC()
            }
        catch(error){
            console.log(error.response.data.message)
        }
    }

    const borrarPagos = async (e)=>{
        const id = e.target.value
        console.log(id)
        try{
            const response = await axios.delete('http://localhost:3000/api/pagoMovil/' + '/' + id)
            const informacion = response.data
            console.log(informacion)
            displayEstadoC()
        }catch(error){
            console.log(error.response.data.message)
        }
    }

    const restarCantidad = async ()=>{

        for (let i = 0; i < id.length; i++) {
            const response = await axios.patch('http://localhost:3000/api/products/restar/' + id[i],{
                params:{
                    cantidad:1
                }
            
            })
            const informacion = response.data
            console.log(informacion)
        }
    }

    const ventasProducts = async ()=>{

        for (let i = 0; i < id.length; i++) {
            const response = await axios.patch('http://localhost:3000/api/products/ventas/' + id[i],{
                params:{
                    totalVentas: 1
                }
            
            })
            const informacion = response.data
            console.log(informacion)
        }
    }

    const buscarProducts = async ()=>{
        const vendedores = []
        const precios = []
        

        for (let i = 0; i < id.length; i++) {
            const response = await axios.get('http://localhost:3000/api/products/find/' + id[i])
            const informacion = response.data

            vendedores.push(informacion.idVendedor)
            precios.push(informacion.precio)


            setIdVendedores(vendedores)
            setIngresos(precios) 
        }
    }

    useEffect(()=>{
        restarCantidad()
        ventasProducts()
        buscarProducts()
    },[id[0]])


    const ventasVendedores = async () => {
        for (let i = 0; i < idVendedores.length; i++) {
            try {
                // Obtener los valores actuales del vendedor
                const vendedorResponse = await axios.get('http://localhost:3000/api/users/' + idVendedores[i]);
                const vendedorData = vendedorResponse.data;
    
                // Sumar los ingresos actuales con los nuevos
                const nuevosIngresosTotales = ingresos[i];
                const nuevasTotalVentas =  1;
    
                // Verificar que los valores no son undefined antes de enviarlos
                console.log('Actualizando vendedor:', {
                    idVendedor: idVendedores[i],
                    ingresosTotales: nuevosIngresosTotales,
                    totalVentas: nuevasTotalVentas
                });

                const data ={
                    ingresosTotales: nuevosIngresosTotales,
                    totalVentas: nuevasTotalVentas
                }
    
                // Enviar la actualización con los valores acumulados como query parameters
                await axios.patch('http://localhost:3000/api/users/' + idVendedores[i],data);
    
            } catch (error) {
                console.log('Error al actualizar:', error.response?.data?.message || error.message);
            }
        }
    };

    useEffect(()=>{
        ventasVendedores()
    },[idVendedores])

   


    const searchProducts = async ()=>{
        let trb = document.getElementById('trad')
        trb.style.display = 'contents'
        let tdsc = document.getElementsByClassName('estadoDelProducto')
   try{
       const response = await axios.get('http://localhost:3000/api/products')
       const informacion = response.data
       const aprobar = informacion.map(producto => producto.aprobado)
       console.log(informacion)
       
       setProduct(informacion)  
       setEditEstadoC(aprobar)      
       
       for (let i = 0; i < informacion.length; i++) { 
        if(informacion[i].aprobado === true){
            tdsc[i].innerHTML = 'Aprobado'
            tdsc[i].style.color = 'green'
        }else{
            tdsc[i].innerHTML = 'En espera'
            tdsc[i].style.color = 'red'
        }
    }
       

   }catch(error){
       console.log(error.response.data.message)
}
}


const displayEstadoD = async ()=>{
    let total = 2
    try{
        for (let i = 0; i < total; i++) {
           searchProducts()
        }
    }catch(error){
        console.log(error.response)
    }
}


const deleteProduct = async (e)=>{
    const id = e.target.value
    console.log(id)
    try{
        const response = await axios.delete('http://localhost:3000/api/products' + '/' + id)
        const informacion = response.data
        console.log(informacion)
        searchProducts()
    }catch(error){
        console.log(error.response.data.message)
}
}


const updateProduct = async (e)=>{
    const id = localStorage.getItem('idProduct')
    let form = document.getElementById('formcc')
    let formbbb = document.getElementById('formbbb')
    e.preventDefault()
    if(!dataB.nombre || !dataB.categoria || !dataB.precio || !dataB.cantidad || !dataB.descripcion){
        alert('Debes rellenar todos los campos')
        return
    }
    try{
        const response = await axios.patch('http://localhost:3000/api/products' + '/' + id, dataB)
        searchProducts()
        form.style.display = 'none'
        formbbb.reset()
        categorias.value = 'null'
        window.location.reload()
    }catch(error){
        console.log(error.response.data.message)
    }
}

const displayFormB = async (e)=>{
    let form = document.getElementById('formcc')
    form.style.display = 'flex'
    setEditingUserIdB(e.target.value)
    try{
        localStorage.setItem('idProduct', e.target.value)
    }catch(error){
        console.log(error.response.data.message)
    }
}


const aprobarProducts = async (e)=>{
    const id = e.target.value

    try{
        const response = await axios.patch('http://localhost:3000/api/products/aprobar' + '/' + id,{
            params:{
                aprobado:true
            }
        })

        const informacion = response.data
        console.log(informacion)
        displayEstadoD()
    }catch(error){
        console.log(error.response.data.message)
    }
}




const ingresosTotales = async ()=>{
    const numeroVentas = []
    const numeroIngresos = []
    try{
        const response = await axios.get('http://localhost:3000/api/adminFunctions')
        const informacion = response.data
        console.log(informacion)

        

        for (let i = 0; i < informacion.length; i++) {
            
            numeroVentas.push(informacion[i].totalVentas)
            numeroIngresos.push(informacion[i].ingresosTotales)

            const numeroIngresosTotal = numeroIngresos.reduce((a, b) => a + b, 0);
            const numeroVentasTotal = numeroVentas.reduce((a, b) => a + b, 0);

            setIngresosTotal(numeroIngresosTotal)
            setVentasTotal(numeroVentasTotal)
        }

    }catch(error){
        console.log(error.response.data.message)
    }
}


useEffect(()=>{
    ingresosTotales()
},[])

const gestionUsers = ()=>{
    setIdPathB('users')
    let titleAdminA = document.getElementById('titleAdminA')
    let userAdminA = document.getElementById('userAdminA')
    let sectionPanelA = document.getElementById('sectionPanelA')
    let sectionPanelC = document.getElementById('sectionPanelC')
    let sectionPanelD = document.getElementById('sectionPanelD')
    let sectionPanelE = document.getElementById('sectionPanelE')
    try{
        titleAdminA.style.display = 'block'
        userAdminA.style.display = 'flex'
        sectionPanelA.style.display = 'block'
        sectionPanelC.style.display = 'none'
        sectionPanelD.style.display = 'none'
        sectionPanelE.style.display = 'none'
        search()
        displayEstadoB()
    }catch(error){
        console.log(error.response.data.message)
    }
}

useEffect(()=>{
    gestionUsers()
},[])

useEffect(()=>{
    search()
    displayEstadoB()
    displayEstadoD()
    displayEstadoC()
},[])

const makeUsers = ()=>{
    setIdPathB('makeUsers')
    let titleAdminA = document.getElementById('titleAdminA')
    let userAdminA = document.getElementById('userAdminA')
    let sectionPanelA = document.getElementById('sectionPanelA')
    let sectionPanelC = document.getElementById('sectionPanelC')
    let sectionPanelD = document.getElementById('sectionPanelD')
    let sectionPanelE = document.getElementById('sectionPanelE')
    try{
        titleAdminA.style.display = 'none'
        userAdminA.style.display = 'none'
        sectionPanelA.style.display = 'none'
        sectionPanelC.style.display = 'block'
        sectionPanelD.style.display = 'none'
        sectionPanelE.style.display = 'none'
    }catch(error){
        console.log(error.response.data.message)
    }
}


const gestionProducts = ()=>{
    setIdPathB('products')
    let titleAdminA = document.getElementById('titleAdminA')
    let userAdminA = document.getElementById('userAdminA')
    let sectionPanelA = document.getElementById('sectionPanelA')
    let sectionPanelC = document.getElementById('sectionPanelC')
    let sectionPanelD = document.getElementById('sectionPanelD')
    let sectionPanelE = document.getElementById('sectionPanelE')
    try{
        titleAdminA.style.display = 'none'
        userAdminA.style.display = 'none'
        sectionPanelA.style.display = 'none'
        sectionPanelC.style.display = 'none'
        sectionPanelD.style.display = 'block'
        sectionPanelE.style.display = 'none'
    }catch(error){
        console.log(error.response.data.message)
    }
}

const gestionPagos = ()=>{
    setIdPathB('pagos')
    let titleAdminA = document.getElementById('titleAdminA')
    let userAdminA = document.getElementById('userAdminA')
    let sectionPanelA = document.getElementById('sectionPanelA')
    let sectionPanelC = document.getElementById('sectionPanelC')
    let sectionPanelD = document.getElementById('sectionPanelD')
    let sectionPanelE = document.getElementById('sectionPanelE')
    try{
        titleAdminA.style.display = 'none'
        userAdminA.style.display = 'none'
        sectionPanelA.style.display = 'none'
        sectionPanelC.style.display = 'none'
        sectionPanelD.style.display = 'none'
        sectionPanelE.style.display = 'block'
    }catch(error){
        console.log(error.response.data.message)
    }
}

/*<label htmlFor="">Descripcion</label>
<input type="text" name="descripcion" id="descripcions" onChange={(e)=>{setDataB({...dataB, descripcion:e.target.value})}}/>
*/

    return(
        <>
            
            <body id='bodyAdmin'>
                <main id='sectionAdmin'>
                    <section id='sectionAdminB'>
                        <div id='userDPB'>
                            <i class="fa-solid fa-user"></i>
                            <p>{localStorage.getItem('nombre')} {localStorage.getItem('apellido')}</p>
                        </div>

                        <button className='buttonAdmin' onClick={gestionUsers} style={{padding: '10px 17px', backgroundColor: idPathB === 'users' ? '#1E5B5F' : 'aliceblue', color: idPathB === 'users' ? 'white' : '#1E5B5F'}} >Gestión de usuarios</button>
                        <button className='buttonAdmin' onClick={gestionProducts} style={{backgroundColor: idPathB === 'products' ? '#1E5B5F' : 'aliceblue', color: idPathB === 'products' ? 'white' : '#1E5B5F'}} >Gestión de productos</button>
                        <button className='buttonAdmin' onClick={makeUsers}  style={{padding: '10px 40px', backgroundColor: idPathB === 'makeUsers' ? '#1E5B5F' : 'aliceblue', color: idPathB === 'makeUsers' ? 'white' : '#1E5B5F'}}>Crear Usuario</button>
                        <button className='buttonAdmin' onClick={gestionPagos} style={{padding: '10px 25px', backgroundColor: idPathB === 'pagos' ? '#1E5B5F' : 'aliceblue', color: idPathB === 'pagos' ? 'white' : '#1E5B5F'}}>Gestión de Pagos</button>

                        <div id='userDPC'>
                            <button onClick={cerrarSesion}>Exit</button>
                        </div>
                    </section>


                    <section id='sectionAdminC'>
                        <section id='sectionPanelA'>
                            <div id='titleAdminA'>   
                                <h1>Gestión de usuarios</h1>
                            </div>
                            <section id='userAdminA'>
                            {user.map((user)=>{
                                return(
                                    
                                        <div className='userAdmin'>
                                            <div  style={{ color: editingUserId === user._id ? 'yellow' : 'aliceblue' }}>
                                                <p>{user.nombre} {user.apellido} ({user.usuario})</p>
                                                <p>{user.rol}</p>
                                                <p>{user.correo}</p>
                                                <p>{user.direccion}</p>
                                                <p>{user.nombreDeEmpresa}</p>
                                                <p>{user.numeroDeContacto}</p>
                                                <p>Ingresos: {user.ingresosTotales}$</p>
                                                <p>Ventas: {user.totalVentas}</p>
                                            </div>
                                            <div className='divButton'>
                                                <a href="#formb"><button value={user._id} className='editAd' onClick={display}>Editar</button></a>
                                                <button value={user._id} className='deleteAd' onClick={deleteUser}>Eliminar</button>
                                            </div>
                                        </div>
                                    
                                )
                            })}

                            <div id='formb'>
                                <h2>Editar Usuario</h2>
                                <form id='formbb'>
    
                                    <label>Nombre</label>
                                    <input type='text' name='nombre' placeholder='nombre' onChange={(e)=>{setData({...data, nombre: e.target.value})}}/>

                                    <label>Apellido</label>
                                    <input type='text' id='apellido' placeholder='apellido' name='apellido' onChange={(e)=>{setData({...data, apellido: e.target.value})}}/>

                                    <label>Correo</label>
                                    <input type='text' id='correo' placeholder='correo' name='correo' onChange={(e)=>{setData({...data, correo: e.target.value})}}/>

                                    <label>Usuario</label>
                                    <input type='text' id='usuario' placeholder='usuario' name='usuario' onChange={(e)=>{setData({...data, usuario: e.target.value})}}/>

                                    <select  name="rol" id="rol" onChange={(e) => setData({...data, rol: e.target.value})}>
                                        <option value="null" disabled selected >Elige un rol</option>
                                        <option value="seller">seller</option>
                                        <option value="user">user</option>
                                    </select>

                                    <label>Direccion</label>
                                    <input type='text' placeholder='direccion' id='direccion' name='direccion' onChange={(e)=>{setData({...data, direccion: e.target.value})}}/>

                                    <label>Nombre de la empresa</label>
                                    <input type='text' placeholder='nombre de la empresa' id='nombreDeEmpresa' name='nombreDeEmpresa' onChange={(e)=>{setData({...data, nombreDeEmpresa: e.target.value})}}/>

                                    <label>Numero de contacto</label>
                                    <input type='text' placeholder='numero de contacto' id='numeroDeContacto' name='numeroDeContacto' onChange={(e)=>{setData({...data, numeroDeContacto: e.target.value})}}/>

                                    <button onClick={editUser} id='buttonEditAd'>Actualizar</button>
                                </form>
                        </div>


                        <section id='sectionPanelB'>
                        {estado.map((estado) => {
                                return ( 
                                    <div className='divEstadoAd'>
                                        <div>
                                            <p>{estado.nombre}</p>
                                            <p>{estado.usuario}</p>
                                            <p className='estado'></p>
                                        </div>

                                        <div  >
                                            <button value={estado._id} onClick={suspenderUser} style={{marginLeft: '-15px'}} className='deleteAd' >Suspender</button>
                                            <button value={estado._id}  onClick={quitarSuspension} className='editAd'>Quitar suspensión</button>
                                        </div>
                                    </div> 
                                ) })}
                        </section>        
                    </section>
                </section>
                <section id='sectionPanelC'>
                    <div id='titleAdminB'>   
                        <h1>Crear Usuario</h1>
                    </div>
                    <section id='userAdminB'>


                    <div id='formCD'>
                        <form action="" id='formC' onSubmit={sendData}>

                            <label htmlFor="nombre">Nombre</label>
                            <input type="text" name="nombre" id="nombrea" placeholder='Nombre'  onChange={(e)=>{setDatab({...datab, nombre:e.target.value})}}/>
            
                            <label htmlFor="apellido">Apellido</label>
                            <input type="text"  name="apellido" id="apellidoa" placeholder='Apellido' onChange={(e)=>{setDatab({...datab, apellido:e.target.value})}}/>
            
                            <label htmlFor="correo">Correo</label>
                            <input type="text" name="correo" id="correoa"  placeholder='Correo' onChange={(e)=>{setDatab({...datab, correo:e.target.value})}}/>

                            <label htmlFor="usuario">Usuario</label>
                            <input type="text"   name="usuario" id="usuarioa"  placeholder='Usuario' onChange={(e)=>{setDatab({...datab, usuario:e.target.value})}}/>
                            
                            <label htmlFor="direccion">Direccion</label>
                            <input type="text" name='direcciona' placeholder='Direccion' id="direcciona" onChange={(e)=>{setDatab({...datab, direccion:e.target.value})}}  /> 

                            <label htmlFor="clave">Clave</label>
                            <input type="password"  name="clave" id="clavea"  placeholder='Clave'  onChange={(e)=>{setDatab({...datab, clave:e.target.value})}}/>
                                  

                            <input type="submit" id="buttonC" value="Register" />
                    
                    </form>
                </div>
                    </section>
                </section>


                <section id='sectionPanelD'>
                    <div id='titleAdminC'>   
                        <h1>Gestión de productos</h1>
                    </div>

                    <section id='userAdminC'>
                    {product.map((product) => {
                        return (
                    <div className='userAdminC'>
                        <div  style={{ color: editingUserIdB === product._id ? 'yellow' : 'aliceblue' }}>
                            <p>{product.nombre.slice(0, 15)}</p>
                            <p>{product.categoria}</p>
                            <p>{product.nombreVendedor}</p>
                            <p>{product.precio}$</p>
                            <p>Cantidad: {product.cantidad}</p>
                            <p>Ventas:{product.totalVentas}</p>
                            <p>{product.descripcion.slice(0, 30)}</p>
                            <p className='estadoDelProducto'></p>
                            <p></p>
                        </div>
                        <div className='divButtonC'>
                            <button value={product._id} className='deleteAd' onClick={deleteProduct}>Eliminar</button>
                            <a href="#formcc"><button id={product._id} className='buttonEditAd' value={product._id} onClick={displayFormB}>Editar</button></a>
                            <button value={product._id}  className='editAd' onClick={aprobarProducts}>Aprobar</button>
                        </div> 
                    </div>
                        )
                    })}

                    <div id='formcc'>
                        <form id='formbbb'  action="">
                            <h2>Editar Producto</h2>
                            <label htmlFor="">Nombre</label>
                            <input type="text" name="nombre" placeholder='Nombre' id="nombre" onChange={(e)=>{setDataB({...dataB, nombre:e.target.value})}}/>

                            <label htmlFor="">Precio</label>
                            <input type="text" name="precio" id="precio" placeholder='Precio' onChange={(e)=>{setDataB({...dataB, precio:e.target.value})}}/>

                            <label htmlFor="">Cantidad</label>
                            <input type="text" name="cantidad" id="cantidad" placeholder='Cantidad' onChange={(e)=>{setDataB({...dataB, cantidad:e.target.value})}}/>

                            <select name="categoria" id="categorias" onChange={(e) => setDataB({...dataB, categoria: e.target.value})}>
                                <option value="null" disabled selected >Elige una categoria</option>
                                <option value="videojuegos">videojuegos</option>
                                <option value="deportes"  className='option'>Deportes</option>
                                <option value="tecnologia"  className='option'>Tecnologia</option>
                                <option value="musica"  className='option'>Música</option>
                            </select>

                            <label htmlFor="descripcion">Descripción</label>
                            <textarea type="text" name="descripcion" id="descripcionT" maxLength={300} placeholder='Agrega una descripción del producto'  onChange={(e)=>{setDataB({...dataB, descripcion:e.target.value})}} />

                            <button id='buttonEditAd' onClick={updateProduct}>Actualizar</button>
                        </form>
                    </div>

                    </section>
                </section>

                <section id='sectionPanelE'>
                    <div id='titleAdminD'>   
                        <h1>Gestión de pagos</h1>
                    </div>
                    <section id='userAdminD'>
                    {pagos.map((pago) => {
                        return (
                        <div className='userAdminD'>
                            <div>
                                <p>{pago.nombreComprador}</p>
                                <p>{pago.direccionDeEntrega}</p>
                                <p>{pago.numeroDeReferencia}</p>
                                <p>{pago.monto}</p>
                                <p>{pago.metodoDePago}</p>
                                <p>{pago.nombreDeProducto}</p>
                                <p className='estadoPago'></p>
                            </div>

                            <div className='divButtonC'>
                                <button value={pago._id} id={pago.idProductos}  className='buttonEditAdB' onClick={aprobarPagos} >Verificar</button>
                                <button value={pago._id} onClick={borrarPagos} className='deleteAd' >Eliminar</button>
                             </div> 
                           
                        </div>
                        )
                    })}

                    <section id='estadisticasSS'>
                        <p>Estadísticas de Ventas:</p>
                        <p>Numero Total de Ingresos: {ingresosTotal}</p>
                        <p>Numero de Ventas: {ventasTotal}</p>
                    </section>

                    </section>

                    
                </section>
                            
                    </section>
                </main>
            </body>

































































            <section >
                <div style={{display: 'none'}}>
                    <button onClick={search} >Lista de usuarios</button>

                    <table>
                        <thead>
                            <tr id='tra'>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Correo</th>
                                <th>Usuario</th>
                                <th>Rol</th>
                                <th>Direccion</th>
                                <th>Nombre de la empresa</th>
                                <th>Numero de contacto</th>
                                <th>Ventas</th>
                                <th>Ingresos</th>
                                
                            </tr>
                        </thead>

                        <tbody id='tbody'>
                            {user.map((user) => {
                                return (
                                    <tr key={user._id} id={user._id} style={{ color: editingUserId === user._id ? 'red' : 'black' }}>
                                    <td>{user.nombre}</td>
                                    <td>{user.apellido}</td>
                                    <td>{user.correo}</td>
                                    <td>{user.usuario}</td>
                                    <td>{user.rol}</td>
                                    <td>{user.direccion}</td>
                                    <td>{user.nombreDeEmpresa}</td>
                                    <td>{user.numeroDeContacto}</td>
                                    <td>{user.totalVentas}</td>
                                    <table>{user.ingresosTotales}</table>
                                    <td><button value={user._id} onClick={deleteUser}>Eliminar</button></td>
                                    <td><button value={user._id} onClick={display}>Editar</button></td>
            </tr>
        );
    })}
</tbody>
                    </table>
                </div>

                <div>

                    <form id='formbff' style={{display: 'none'}}>
                        <label>Nombre</label>
                        <input type='text' name='nombre'  onChange={(e)=>{setData({...data, nombre: e.target.value})}}/>

                        <label>Apellido</label>
                        <input type='text' id='apellido' name='apellido' onChange={(e)=>{setData({...data, apellido: e.target.value})}}/>

                        <label>Correo</label>
                        <input type='text' id='correo' name='correo' onChange={(e)=>{setData({...data, correo: e.target.value})}}/>

                        <label>Usuario</label>
                        <input type='text' id='usuario' name='usuario' onChange={(e)=>{setData({...data, usuario: e.target.value})}}/>

                        <select name="rol" id="rol" onChange={(e) => setData({...data, rol: e.target.value})}>
                        <option value="null" disabled selected >Elige un rol</option>
                        <option value="seller">seller</option>
                        <option value="user">user</option>
                    </select>

                        <label>Direccion</label>
                        <input type='text' id='direccion' name='direccion' onChange={(e)=>{setData({...data, direccion: e.target.value})}}/>

                        <label>Nombre de la empresa</label>
                        <input type='text' id='nombreDeEmpresa' name='nombreDeEmpresa' onChange={(e)=>{setData({...data, nombreDeEmpresa: e.target.value})}}/>

                        <label>Numero de contacto</label>
                        <input type='text' id='numeroDeContacto' name='numeroDeContacto' onChange={(e)=>{setData({...data, numeroDeContacto: e.target.value})}}/>

                        <button onClick={editUser}>Actualizar</button>
                    </form>
                </div>

                <div>
                    <button onClick={displayForm} style={{display: 'none'}}>Crear Usuario</button>

                    <form action="" id='formc' onSubmit={sendData}>

                        <label htmlFor="nombre">Nombre</label>
                        <input type="text" name="nombre" id="nombrea"  onChange={(e)=>{setDatab({...datab, nombre:e.target.value})}}/>
            
                        <label htmlFor="apellido">Apellido</label>
                        <input type="text"  name="apellido" id="apellidoa"  onChange={(e)=>{setDatab({...datab, apellido:e.target.value})}}/>
            
                        <label htmlFor="correo">Correo</label>
                        <input type="text" name="correo" id="correoa"  onChange={(e)=>{setDatab({...datab, correo:e.target.value})}}/>

                        <label htmlFor="usuario">Usuario</label>
                        <input type="text"   name="usuario" id="usuarioa"  onChange={(e)=>{setDatab({...datab, usuario:e.target.value})}}/>

                        <label htmlFor="clave">Clave</label>
                        <input type="password"  name="clave" id="clavea"  onChange={(e)=>{setDatab({...datab, clave:e.target.value})}}/>
           

                        <input type="submit" value="Register" />
                    
                    </form>
                </div>

                <div>
                    <button onClick={displayEstadoB} style={{display: 'none'}}>Cambiar estado de usuario</button>

                    <table style={{display: 'none'}}>
                        <thead>
                            <tr id='trab'>
                                <th>Nombre</th>
                                <th>Usuario</th>
                                <th>Estado</th>
                            </tr>
                        </thead>

                        <tbody id='tbodyb'>
                            {estado.map((estado) => {
                                return (
                            <tr>
                                    <td>{estado.nombre}</td>
                                    <td>{estado.usuario}</td>
                                    <td className='estado'></td>
                                    <td><button value={estado._id} onClick={suspenderUser} >Suspender</button></td>
                                    <td><button value={estado._id}  onClick={quitarSuspension}>Quitar suspensión</button></td>
                            </tr>
        );
    })}
</tbody>
                    </table>
                </div>    


                <div style={{display: 'none'}}>
                    <button onClick={displayEstadoC}>Ver Pagos</button>

                    <table>
                        <thead>
                            <tr id='trac'>
                                <th>Nombre</th>
                                <th>Direccion de entrega</th>
                                <th>Numero de referencia</th>
                                <th>Monto</th>
                                <th>Metodo de pago</th>
                                <th>Estado</th>
                            </tr>
                        </thead>

                        <tbody id='tbodyc'>
                            {pagos.map((pago) => {
                                return (
                            <tr>
                                    <td>{pago.nombreComprador}</td>
                                    <td>{pago.direccionDeEntrega}</td>
                                    <td>{pago.numeroDeReferencia}</td>
                                    <td>{pago.monto}</td>
                                    <td>{pago.metodoDePago}</td>
                                    <td className='estadoPago'></td>
                                    <button value={pago._id} id={pago.idProductos} onClick={aprobarPagos} >Verificar</button>
                                    <button value={pago._id} onClick={borrarPagos}>Eliminar</button>
                            </tr>
        );
    })}
</tbody>
                    </table>
                </div>

                <div style={{display: 'none'}}>
                    <div>
                    <button onClick={displayEstadoD}>Ver Productos</button>

                    <table>
                    <thead>
                        <tr id='trad'>
                            <th>Nombre</th>
                            <th>Categoría</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Descripcion</th>
                            <th>Ventas</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {product.map((product)=>{
                            return(
                                <tr>
                                    <td>{product.nombre}</td>
                                    <td>{product.categoria}</td>
                                    <td>{product.precio}</td>
                                    <td>{product.cantidad}</td>
                                    <td>{product.descripcion}</td>
                                    <td>{product.totalVentas}</td>
                                    <td className='estadoDelProducto'></td>
                                    <td><button value={product._id} onClick={deleteProduct}>Eliminar</button></td>
                                    <td><button id={product._id} value={product._id} onClick={displayFormB}>Editar</button></td>
                                    <td><button value={product._id} onClick={aprobarProducts}>Aprobar</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                </div>
                
            </div>
                        
            
            </section>
        </>
    )
}