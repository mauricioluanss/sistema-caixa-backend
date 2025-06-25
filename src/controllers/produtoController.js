// controller para a model de produtos
const produtoService = require('../services/produtoService');

const handleCreateProduto = async (req, res) => {
  try {
    const produto = await produtoService.createProduto(req.body);
    return res
      .status(201)
      .json({ msg: 'produto cadastrado', produto: produto });
  } catch (error) {
    if (error.message === 'Corpo da requisição não é válido') {
      return res.status(400).json({ erro: error.message });
    }
    console.error('Erro ao criar produto: ', error);
    return res.status(500).json({ erro: 'Falha ao cadastrar os produtos' });
  }
};

const handleGetProdutos = async (req, res) => {
  try {
    const todosProdutos = await produtoService.getProdutos();
    return res.status(200).json(todosProdutos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Falha ao buscar os produtos' });
  }
};

const handleGetProduto = async (req, res) => {
  try {
    const id = req.params.id;
    const produto = await produtoService.getProduto(id);
    return res.status(200).json(produto);
  } catch (error) {
    if (error.message.includes('Produto não existe na base')) {
      return res.status(404).json({ erro: error.message });
    }
    console.error(error);
    return res.status(500).json({ erro: 'Não foi possivel realizar a busca.' });
  }
};

const handlePutProduto = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const produtoAtualizado = await produtoService.putProduto(id, body);
    return res
      .status(200)
      .json({ msg: 'Produto atualizado', retorno: produtoAtualizado });
  } catch (error) {
    if (error.message.includes('Produto nao existe na base')) {
      return res.status(404).json({ erro: error.message });
    }
    console.error(error);
    return res
      .status(500)
      .json({ erro: 'Nao foi possivel atualizar o produto' });
  }
};

const handleDeleteProduto = async (req, res) => {
  try {
    const id = req.params.id;
    produtoService.deleteProduto(id);
    return res.status(204).json();
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ erro: 'Não foi possivel excluir o produto informado' });
  }
};

module.exports = {
  handleCreateProduto,
  handleGetProdutos,
  handleGetProduto,
  handlePutProduto,
  handleDeleteProduto,
};
