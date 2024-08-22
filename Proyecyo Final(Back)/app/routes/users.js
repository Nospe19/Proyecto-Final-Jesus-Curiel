const express = require('express');
const router = express.Router();
const {obtenerUsuarios, crearUsuario, buscarUsuario, } = require('../controllers/users');
const { ingresos } = require('../controllers/statistics');
const { verifyToken } = require('../middleware/verifyToken');


router.get('/', verifyToken ,obtenerUsuarios); //hicimos la ruta privada con verify token
router.post('/', crearUsuario);
router.get('/:id', buscarUsuario);
router.patch('/:id', ingresos);

module.exports = router;