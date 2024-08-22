const express = require('express');
const router = express.Router();
const { obtenerUsuarios, borrarUsuarios, editarUsuarios, suspenderUsuarios, quitarSuspension } = require('../controllers/adminFunctions');

router.get('/', obtenerUsuarios);
router.delete('/:id', borrarUsuarios);
router.patch('/:id', editarUsuarios);
router.patch('/suspender/:id', suspenderUsuarios);
router.patch('/quitarSuspension/:id', quitarSuspension);


module.exports = router