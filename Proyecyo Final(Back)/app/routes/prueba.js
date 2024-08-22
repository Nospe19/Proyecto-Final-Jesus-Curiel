const express = require('express');
const router = express.Router();
const { obtenerTodosLosProductos, filtrarCategoria, filtrarPrecio, filtro, filtrarProducto } = require('../controllers/prueba');


router.get('/', obtenerTodosLosProductos)

router.get('/find', filtrarProducto)
//router.get('/categoria', filtrarCategoria)

//router.get('/precios', filtrarPrecio)

router.get('/filtro', filtro)

module.exports = router