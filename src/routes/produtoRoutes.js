const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

router.post('/', produtoController.criaProduto);
router.get('/', produtoController.todosProdutos);
router.get('/:id', produtoController.produtoPorId);
router.put('/:id', produtoController.atualizaProduto);
router.delete('/:id', produtoController.deletaProduto);

module.exports = router;
