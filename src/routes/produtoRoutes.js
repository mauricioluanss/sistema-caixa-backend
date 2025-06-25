const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

router.post('/', produtoController.handleCreateProduto);
router.get('/', produtoController.handleGetProdutos);
router.get('/:id', produtoController.handleGetProduto);
router.put('/:id', produtoController.handlePutProduto);
router.delete('/:id', produtoController.handleDeleteProduto);

module.exports = router;
