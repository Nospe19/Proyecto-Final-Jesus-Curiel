const express = require('express');
const router = express.Router();
const { create, verPagos, aprobarPago, borrarPago, pagosPendientes, pagosAprobados  } = require('../controllers/pagoMovil');


router.post('/:id', create)
router.get('/', verPagos)
router.patch('/:id', aprobarPago)
router.delete('/:id', borrarPago)

router.get('/pendientes/:idComprador', pagosPendientes)
router.get('/aprobados', pagosAprobados)


module.exports = router