const express = require('express');
const router = express.Router();
const { obtenerProductos, borrarProducto, editarProducto, obtenerTodosLosProductos, buscarUnProducto,filtrarAprobado, restarCantidad, aprobar  } = require('../controllers/products')
const { ventas } = require('../controllers/statistics')
router.get('/:idVendedor', obtenerProductos)
router.delete('/:id', borrarProducto)
router.patch('/:id', editarProducto)
router.get('/', obtenerTodosLosProductos)
router.get('/aprobados', filtrarAprobado)
router.get('/find/:id', buscarUnProducto)
router.patch('/restar/:id', restarCantidad)
router.patch('/aprobar/:id', aprobar)
router.patch('/ventas/:id', ventas)


module.exports = router
