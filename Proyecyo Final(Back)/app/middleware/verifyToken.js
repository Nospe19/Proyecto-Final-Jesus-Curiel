const jwt = require('jsonwebtoken');
const UserModel = require('../models/users');

const verifyToken = async (req, res, next)=>{
    const token = req.headers['authorization'];

    if(!token){
        return res.status(403).json({message: 'No token enviado!'})
    }
    try{
        const decoded = jwt.verify(token, process.env.DB_KEY);
        req.userId = decoded.id;
        const user = await UserModel.findById(req.userId);

        if(!user){
        return res.status(401).json({message: 'No encontrado'})
        }
        next();
    }catch(error){
        res.status(401).json({message: 'error'})
    }
}

module.exports = {verifyToken}