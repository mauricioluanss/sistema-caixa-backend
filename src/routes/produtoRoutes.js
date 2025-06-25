const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

router.post('/', produtoController.handleCreateProduto);
router.get('/', produtoController.handleGetProdutos);
router.get('/:id', produtoController.handleGetProdutoPorId);
router.put('/:id', produtoController.atualizaProduto);
router.delete('/:id', produtoController.deletaProduto);

module.exports = router;
