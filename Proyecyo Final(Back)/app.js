require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
const { dbConnect } = require('./config/mongo');
const upload = require('./app/middleware/upload');
const Product = require('./app/models/productos');
const users = require('./app/models/users');
require('path')
dbConnect();

app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ["Content-Type", "Authorization", "parameter", "administrator", "precio", "categoria"],
};

app.use(cors(corsOptions));



app.post('/api/uploads', upload.single('image'), async (req, res) => {
  try{
    const user = await users.findById(req.body.idVendedor);
    const {nombre, categoria, cantidad, precio, descripcion, image} = req.body
    const product = await Product.create({
        nombre, 
        categoria,
        cantidad,
        precio,
        descripcion,
        image: req.file.path,
        idVendedor: user._id,
        nombreVendedor: user.usuario
    })
    res.status(201).json({message: "Producto creado exitosamente", product})
  }catch(e){
    res.status(500).json({ error: e });
    console.log(e)
  }
})

/*app.use('/api/products', require('./app/routes/products'));
app.use('/api/users', require('./app/routes/users'));
app.use('/api/seller', require('./app/routes/seller'));
app.use('/api/login', require('./app/routes/login'));
app.use('/api/admin', require('./app/routes/admin'));*/
/*app.use('/api/products', require('./app/routes/products'));*/ 

app.use('/api', require('./app/routes/index'));

app.listen(PORT, () => {
  console.log('La API esta corriendo en el puerto ' + PORT);
});