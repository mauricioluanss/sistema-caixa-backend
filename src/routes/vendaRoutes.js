const express = require('express');
const router = express.Router();
const vendaController = require('../controllers/vendaController');

router.post('/vendas', vendaController.handleCreateVenda);

module.exports = router;
