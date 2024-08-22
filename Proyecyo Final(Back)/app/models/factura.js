const mongoose = require('mongoose');
const Product = require('./productos');

const FacturaSchema = new mongoose.Schema({
    numeroDeFactura: {
        type: Number,
        required: [true, 'El número de facturas es obligatorio'],
        unique: true,    
    },
    idComprador: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        required: [true, 'El id del comprador es obligatorio'],
    },
    productos:[
        {
            type: mongoose.Types.ObjectId,
            ref: 'products',
            required: [true, 'El id del producto es obligatorio']
        }
    ],
    subTotal:{
        type: Number,
        required: [true, 'El subtotal es obligatorio'],
    },
    total:{
        type: Number,
        required: [true, 'El total es obligatorio'],
    },
    fecha:{
        type: Date,
        default: Date.now,
        inmutable: true
    },
},
    {
        timestamps: true,
        versionKey: false

    })

module.exports = mongoose.model('facturas', FacturaSchema)