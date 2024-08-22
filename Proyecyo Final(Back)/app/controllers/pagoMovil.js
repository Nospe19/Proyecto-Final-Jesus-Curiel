const PagoMovilModel = require('../models/pagomovil');

const create = async (req, res) => {
    const  idComprador  = req.params.id
    const { direccionDeEntrega, numeroDeReferencia, monto } = req.body
    const { idProductos, metodoDePago, nombreComprador, nombreDeProducto, subTotal, apellidoComprador, numeroDeFactura  } = req.query
    

    try{

        const pago = await PagoMovilModel.create({

            idComprador,
            direccionDeEntrega,
            numeroDeReferencia,
            monto,
            idProductos,
            metodoDePago,
            nombreComprador,
            nombreDeProducto,
            subTotal,
            apellidoComprador,
            numeroDeFactura
        })
        res.status(201).json({message: "Pago creado exitosamente", pago})

    }catch(e){
        res.status(404).json({error: e})
    }
}


const verPagos = async (req, res) => {
    try{
        const  id  = req.params

        const pagos = await PagoMovilModel.find(id)

        if(!pagos){
        return res.status(404).json({message: "Pagos no encontrados"})
        }

        res.json(pagos)
    }catch(e){
        res.status(404).json({error: e})
    }
}

const aprobarPago = async (req,res) =>{
    try{
    const { id } = req.params
    const { pagoVerificado } = req.body

    const pago = await PagoMovilModel.findByIdAndUpdate(id, {
        pagoVerificado: true
    })

    if(!pago){
        return res.status(404).json({message: "Pago no encontrado"})
    }

    res.status(200).json({message: "Pago verificado"})

    }catch(e){
        res.status(404).json({error: e})
    }
}

const borrarPago = async (req, res)=>{
    try{
        const { id } = req.params

        const pago = await PagoMovilModel.findByIdAndDelete(id)


       
    

        res.status(200).json({message: "Pago eliminado"})
    }catch(e){
        res.status(404).json({error: e})
    }
}

const pagosPendientes = async (req, res) => {
    try {
        const { idComprador } = req.params;
        //const { pagoVerificado } = req.body;
        const { pagoVerificado } = req.query

        // Asegúrate de que los datos pasados a find son correctos y que coinciden con la estructura de tu modelo
        const pago = await PagoMovilModel.find({idComprador, pagoVerificado });

        if (!pago || pago.length === 0) {
            return res.status(404).json({ message: "Pago no encontrado" });
        }

        res.json(pago);
    }catch (e) {
        res.status(404).json({ error: e });
    }
}


const pagosAprobados = async (req, res) => {
    try {
        const { pagoVerificado } = req.query

        // Asegúrate de que los datos pasados a find son correctos y que coinciden con la estructura de tu modelo
        const pago = await PagoMovilModel.find({pagoVerificado });
        console.log(pago)
        /*if (!pago || pago.length === 0) {
            return res.status(404).json({ error: "0" });
        }*/

        res.json(pago);
    }catch (error) {
        console.log(error)
        res.status(404).json({ error: error });
    }
}


module.exports = { create, verPagos, aprobarPago, borrarPago, pagosPendientes, pagosAprobados }