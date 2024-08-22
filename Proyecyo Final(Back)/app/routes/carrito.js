const express = require('express');
const router = express.Router();
const { añadirCarrito, obtenerCarrito, borrarProductoDelCarrito, borrarIdComprador} = require('../controllers/carrito');


router.post('/:id', añadirCarrito)
router.get('/', obtenerCarrito)
router.delete('/:id', borrarProductoDelCarrito)
router.delete('/', borrarIdComprador)



module.exports = router