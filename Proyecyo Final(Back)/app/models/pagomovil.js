const mongoose = require('mongoose');

const pagoSchema = new mongoose.Schema({

    idComprador: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        required: [true, 'El id del comprador es obligatorio'],
    },
    direccionDeEntrega: {
        type: String,
        required: [true, 'La dirección de entrega es obligatoria'],
        maxLenght: [100, 'La dirección de entrega no puede superar los 200 caracteres'],
        minLenght: [10, 'La dirección de entrega no puede ser menor de 2 caracteres'],
    },numeroDeReferencia: {
        type: String,
        required: [true, 'El número de referencia es obligatorio'],
        maxLenght: [25, 'El número de referencia no puede superar los 200 caracteres'],
        minLenght: [10, 'El número de referencia no puede ser menor de 2 caracteres']
    },
    monto: {
        type: Number,
        required: [true, 'El monto es obligatorio'],
    },
    idProductos: {
        type: Array,
        ref: 'products',
        required: [true, 'El id del producto es obligatorio'],
    },
    pagoVerificado: {
        type: Boolean,
        default: false
    },
    metodoDePago: {
        type: String,
        required: [true, 'El método de pago es obligatorio'],
    },
    nombreComprador: {
        type: String,
        required: [true, 'El nombre del comprador es obligatorio'],
    },
    nombreDeProducto: {
        type: Array,
        ref: 'products',
        required: [true, 'El nombre del producto es obligatorio'],
    },
    subTotal: {
        type: Number,
        required: [true, 'El subtotal es obligatorio'],
    },
    apellidoComprador: {
        type: String,
        required: [true, 'El apellido del comprador es obligatorio'],
    },
    numeroDeFactura: {
        type: Number,
    }
},
{
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('pagomovil', pagoSchema)