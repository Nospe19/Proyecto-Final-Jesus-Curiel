const express = require('express');
const router = express.Router();
const {obtenerVendedores, crearVendedor} = require('../controllers/seller');
const { verifyToken } = require('../middleware/verifyToken');

router.get('/', verifyToken ,obtenerVendedores); //hicimos la ruta privada con verify token
router.patch('/:id', verifyToken, crearVendedor);

module.exports = router;