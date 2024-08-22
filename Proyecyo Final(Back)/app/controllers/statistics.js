const UserModel = require('../models/users');
const ProductModel = require('../models/productos');


const ingresos = async (req, res) => {
    try {
        const { id } = req.params;
        const { ingresosTotales, totalVentas } = req.body

        console.log(ingresosTotales, totalVentas);
        // Verificar si los valores son válidos

        const user = await UserModel.findByIdAndUpdate(id, {
            $inc: { 
                ingresosTotales: ingresosTotales,  
                totalVentas: 1
            }
        }, { new: true });  // Devuelve el documento actualizado

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error updating user', error: e.message });
    }
};




const ventas = async (req, res) => {
    try{
        const { id } = req.params
        const { totalVentas } = req.query

        const user = await ProductModel.findByIdAndUpdate(id, {
            $inc: { totalVentas: +1 }
        })

        res.json(user)
    }catch(e){

    }
}





module.exports = { ingresos, ventas }
