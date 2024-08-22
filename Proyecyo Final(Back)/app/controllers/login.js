const UserModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req,res)=>{
    try{
        const {usuario, clave} = req.body;
        const { suspension } = req.body;
        const user = await UserModel.findOne({usuario: usuario});
        /*if(user.usuario === 'Admin'){
            console.log('Admin')
        }*/
        if(!user){
            return res.status(400).json({message:'Usuario no encontrado'})
    }

    if(user.suspension === true){
        return res.status(400).json({message:'Usuario suspendido'})
    }

    const rol = user.rol[0].toString();
    const checkPassword = await UserModel.comparePassword(clave, user.clave);
    if(!checkPassword){
        return res.status(400).json({message:'Contraseña incorrecta'})
    }
    const token = jwt.sign({id:user._id},process.env.DB_KEY,{expiresIn : '15m' })
    const dataUser = {
        rol: rol,
        _id: user._id
    }
    /*para poder visualizarlo en el navegador en el front se debe hacer un set item*/

    res.header('authorization', token).json({token: token, user: dataUser})
    
    

    }catch(e){
        res.status(500).json({error: e})
    }
}

module.exports = { login };