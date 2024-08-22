const express = require('express');
const router = express.Router();
const {admin, adminAccess} = require('../controllers/admin');
const { verifyAdminToken } = require('../middleware/verifyAdminToken');


router.get('/', verifyAdminToken, adminAccess)
router.post('/', admin)

module.exports = router