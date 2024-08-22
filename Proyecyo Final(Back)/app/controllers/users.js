const UserModel = require('../models/users')

const obtenerUsuarios = (req,res)=>{
    res.status(200).json({message: 'Ruta para obtener usuarios, y esta protegida!'})
}

/*const obtenerUsuarios =  async (req,res)=>{
    let products = await UserModel.find();
    res.json(products);
} 
*/
const crearUsuario = async (req,res)=>{
    try{
        const {nombre, apellido, correo, usuario, direccion, clave} = req.body
        const user = await UserModel.create({
            nombre, 
            apellido, 
            correo, 
            usuario, 
            direccion,
            clave : await UserModel.encryptPassword(clave)
        })
        res.status(201).json({message: "Usuario creado exitosamente", user})

    }catch(e){
        res.status(404).json({error: e})
    }
    
}


const buscarUsuario = async (req,res)=>{

    try{
        const {id} = req.params
        const user = await UserModel.findById(id)

        res.json(user)

    }catch(e){
        res.status(404).json({error: e})
    }

}



module.exports = { obtenerUsuarios, crearUsuario, buscarUsuario,  }