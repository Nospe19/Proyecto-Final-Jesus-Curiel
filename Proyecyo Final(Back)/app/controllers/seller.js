const UserModel = require('../models/users')

const obtenerVendedores = (req,res)=>{
    res.status(200).json({message: 'Ruta para ser vendedor, y esta protegida!'})
}

const crearVendedor = async (req,res)=>{
    try{
        const { id } = req.params    /*puede que aqui falta un '.id'*/ 
        const { nombreDeEmpresa, numeroDeContacto, rol } = req.body
        
        const user = await UserModel.findByIdAndUpdate(id, {
            nombreDeEmpresa,
            numeroDeContacto,
            rol: ['seller']
        })
        if(!user){
            return res.status(400).json({message: 'Usuario no encontrado'})
        }

        res.status(201).json({message: "Vendedor creado exitosamente", user})
    }catch(e){
        console.log(e)
        res.status(404).json({error: e})
    }
}

module.exports = { obtenerVendedores, crearVendedor }   