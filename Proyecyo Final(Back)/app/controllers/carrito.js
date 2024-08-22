const UserModel = require('../models/productos');


const añadirCarrito = async (req, res) => {
    const { id } = req.params;
    const { idComprador } = req.body;

    try{
    const product = await UserModel.findByIdAndUpdate(id, {
        $push:{ idComprador }
        }
    )
    res.json(product)
    }catch(e){
        res.status(404).json({error: e})
    }
}

const obtenerCarrito = async (req, res) => {
    //const  idComprador  = req.params.idComprador
    //const  { idComprador }  = req.body
    const { idComprador } = req.query 

    try{
        const product = await UserModel.find({ idComprador })
        res.json(product)
    }catch(e){
        res.status(404).json({error: e})
    }

}

const borrarProductoDelCarrito = async (req, res) => {

    const { id } = req.params
    const { idComprador } = req.query
    try{
        const product = await UserModel.findByIdAndUpdate(id, {
            $pull: { idComprador }
        })
        res.json(product)
    }catch(e){
        res.status(404).json({error: e})
    }
}

const borrarIdComprador = async (req, res) => {
    const { id } = req.params
    const { idComprador } = req.query
    try{
        const product = await UserModel(id)
        res.json(product)


    }catch(e){
        res.status(404).json({error: e})
    }
}



module.exports = {  añadirCarrito, obtenerCarrito, borrarProductoDelCarrito, borrarIdComprador }