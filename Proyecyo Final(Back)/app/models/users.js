const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio'],
        maxLenght: [50,  'El nombre no puede superar los 50 caracteres'],
        minLenght: [2, 'El nombre no puede tener menos de 2 caracteres'],
    },
    apellido:{
        type: String,
        required: [true, 'El apellido es obligatorio'],
        maxLenght: [50,  'El apellido no puede superar los 50 caracteres'],
        minLenght: [2, 'El apellido no puede tener menos de 2 caracteres']
    },
    correo:{
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        required: true
    },
    usuario:{
        type: String,
        unique:true
    },
    clave:{
        type: String,
        maxLenght: [50, 'La contraseña no puede superar los 50 caracteres'],
        minLenght: [6, 'La contraseña no puede ser menor de 6 caracteres'],
        required: true  
    },

    rol:{
        type: Array,
        default: ['user'],
        allowedValues: ['user', 'admin', 'seller'],
        required: true,

    },
    nombreDeEmpresa:{
        type: String,
        minLenght: [2, 'El nombre de la empresa no puede ser menor de 2 caracteres'],
        maxLenght: [20, 'El nombre de la empresa no puede superar los 50 caracteres'],
    },
    direccion:{
        type: String,
        minLenght: [2, 'La dirección no puede ser menor de 2 caracteres'],
        maxLenght: [200, 'La dirección no puede superar los 50 caracteres'],
        required: true,
    },
    numeroDeContacto:{
        type: String,
        minLenght: [2, 'El numero de contacto no puede ser menor de 2 caracteres'],
        maxLenght: [20, 'El numero de contacto no puede superar los 50 caracteres'],
    },
    suspension:{
        type: Boolean,
        default: false,
        required: true
    },
    ingresosTotales:{
        type: Number,
        default: 0
    },
    totalVentas:{
        type: Number,
        default: 0
    }

},{
    timestamps: true,
    versionKey: false
})

UserSchema.statics.encryptPassword = async(clave)=>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(clave,salt).then((hashedPassword)=>{
        return hashedPassword
    })
}

UserSchema.statics.comparePassword = async(clave, claveEncriptada)=>{
    return await bcrypt.compare(clave, claveEncriptada)
}


module.exports = mongoose.model('users', UserSchema)