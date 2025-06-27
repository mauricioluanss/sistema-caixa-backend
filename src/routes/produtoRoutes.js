const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

router.post('/produtos', produtoController.handleCreateProduto);
router.get('/produtos', produtoController.handleGetProdutos);
router.get('/produtos/:id', produtoController.handleGetProduto);
router.put('/produtos/:id', produtoController.handlePutProduto);
router.delete('/produtos/:id', produtoController.handleDeleteProduto);

module.exports = router;
