const UserModel = require('../models/productos')

const obtenerProductos = async (req,res)=>{
    try{
       const  idVendedor  = req.params;

       const product = await UserModel.find(idVendedor)

        if(!product){
            return res.status(404).json({message: "Producto no encontrado"});
        }

        res.json(product);
        
    }catch(e){
        res.status(404).json({error: e})
    }
}


const obtenerTodosLosProductos = async (req,res)=>{
    try{
        const products = await UserModel.find()
        res.json(products)
    }catch(e){
        res.status(404).json({error: e})
    }
}

const filtrarAprobado = async (req,res)=>{
    const aprobado = true
    try{
        const products = await UserModel.find( )
        res.json(products)
    }catch(e){
        res.status(404).json({error: e})
    }
}



const borrarProducto = async (req,res)=>{
    try{
        const  { id }  = req.params;  /*da error si el id no tiene {} el: id*/

        const product = await UserModel.findByIdAndDelete(id)
        if(!product){
            return res.status(404).json({message: "Producto no encontrado"});
        }

        res.status(200).json({message: "Producto eliminado"});

    }catch(e){
        res.status(404).json({error: e})
    }
}

const editarProducto = async (req,res)=>{
    try{
        const  { id }  = req.params;
        const { nombre, categoria, cantidad, precio,descripcion } = req.body;

        const product = await UserModel.findByIdAndUpdate(id, {
            nombre,
            categoria,
            cantidad,
            precio,
            descripcion
        })
        if(!product){
            return res.status(404).json({message: "Producto no encontrado"});
        }
        res.status(200).json({message: "Producto editado"});

    }catch(e){
        res.status(404).json({error: e})
    }
}

const buscarUnProducto = async (req,res)=>{
    try{
        const { id } = req.params
        const product = await UserModel.findById(id)
        res.json(product)
    }catch(e){
        res.status(404).json({error: e})
    }
}

const restarCantidad = async (req,res)=>{
    try{
        const { id } = req.params
        const { cantidad } = req.params

        const product = await UserModel.findByIdAndUpdate(id, {
            $inc: { cantidad: -1 }
        })

        res.json(product)
    }catch(e){
        res.status(404).json({error: e})
    }
}

const aprobar = async (req,res)=>{
    try{
        const { id } = req.params
        const { aprobado } = req.query

        const product = await UserModel.findByIdAndUpdate(id, {
            aprobado: true
        })

        if(!product){
            return res.status(404).json({message: "Producto no encontrado"});
        }

        res.json(product)

    }catch(e){
        res.status(404).json({error: e})
    }
}



module.exports =  {  obtenerProductos, borrarProducto, editarProducto, obtenerTodosLosProductos, buscarUnProducto, restarCantidad
                    ,aprobar, filtrarAprobado}