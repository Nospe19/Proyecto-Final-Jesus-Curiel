const UserModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const adminAccess = async (req, res)=>{
    res.status(200).json({message: 'Ruta de acceso de Administradores, y esta protegida!'})
 }

const admin = async (req, res)=>{
    try{
    const {usuario, correo, clave} = req.body;
    const userAdmin = await UserModel.findOne({usuario: usuario});
    
    if(!userAdmin){
        return res.status(400).json({message:'Acceso Denegado, Usuario incorrecto'})
    }else if(userAdmin.usuario !== 'Admin'){
        return res.status(400).json({message:'Acceso Denegado, no es administrador'})
    }

    const checkEmail = await UserModel.findOne({correo: correo});
    if(!checkEmail){
        return res.status(400).json({message:'Acceso Denegado, Email incorrecto'})
    }else if(checkEmail.correo !== userAdmin.correo){
        return res.status(400).json({message:'Acceso Denegado, no es administrador'})
    }

    const rolB = userAdmin.rol[0].toString();
    const checkPassword = await UserModel.comparePassword(clave, userAdmin.clave);
    if(!checkPassword){
        return res.status(400).json({message:'Contraseña incorrecta'})
    }
    const rol = userAdmin.rol[0]
    console.log(rol)
    

    if(rol !== 'admin'){
        return res.status(400).json({message:'Acceso Denegado, tu rol no es administrador'})
    }

    const token = jwt.sign({id:userAdmin._id},process.env.DB_KEY,{expiresIn : '15m'});
    const dataUser = {
        rol: rolB,
        _id: userAdmin._id
    }
    
    res.header('administrator', token).json({token: token, user: dataUser});

    }catch(e){
        console.log(e)
        res.status(500).json({error: e})
    }
}

 

module.exports = {admin, adminAccess};