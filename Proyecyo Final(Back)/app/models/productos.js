const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const ProductSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio'],
        maxLenght: [50,  'El nombre no puede superar los 50 caracteres'],
        minLenght: [2, 'El nombre no puede tener menos de 2 caracteres'],
    },
    categoria:{
        type: String,
        required: [true, 'La categoria es obligatoria'],
        maxLenght: [50,  'La categoria no puede superar los 50 caracteres'],
        minLenght: [2, 'La categoria no puede tener menos de 2 caracteres'],
    },
    cantidad:{
        type: Number,
        required: [true, 'La cantidad es obligatoria'],
        maxLenght: [2,  'La cantidad no puede superar los 50 caracteres'],
        minLenght: [1, 'La cantidad no puede tener menos de 2 caracteres'],
    },
    precio:{
        type: Number,
        required: [true, 'El precio es obligatorio'],
        maxLenght: [4,  'El nombre no puede superar los 50 caracteres'],
        minLenght: [2, 'El nombre no puede tener menos de 2 caracteres'],
    },
    descripcion:{
        type: String,
        required: [true, 'La descripción es obligatoria'],
        maxLenght: [10000,  'La descripción no puede superar los 50 caracteres'],
        minLenght: [2, 'La descripción no puede tener menos de 2 caracteres'],
    },
    image:{
        type: String,
        required: [true, 'La imagen es obligatoria'],
    },
    idVendedor:{
        type: mongoose.Types.ObjectId,
        ref: 'users',
        required: [true, 'El id del vendedor es obligatorio'],
    },
    nombreVendedor:{
        type: String,
        required: [true, 'El nombre del vendedor es obligatorio'],
    },
    idComprador:{
        type: Array,
        ref: 'users',
    },
    aprobado:{
        type: Boolean,
        default: false
    },
    totalVentas:{
        type: Number,
        default: 0
    }
},{
    timestamps: true,
    versionKey: false
})


ProductSchema.plugin(mongoosePaginate);

const Product = mongoose.model('products', ProductSchema);
module.exports = Product;