const mongoose = require('mongoose');
const dbConnect = ()=>{
    const DB_URI = process.env.DB_URI;
    mongoose.connect(DB_URI)
    .then(()=>{
        console.log('Base de datos conectada exitosamente');
    })
    .catch(error=>{
        console.error('Error al conectarse a la base de datos', error);
    })
}

module.exports = {dbConnect};