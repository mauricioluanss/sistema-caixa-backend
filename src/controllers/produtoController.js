const prisma = require('../prisma/client');
const produtoService = require('../services/produtoService');

//Aqui ta o meu CRUD pra model de produtos

const handleCreateProduto = async (req, res) => {
  try {
    const produto = await produtoService.createProduto(req.body);
    return res
      .status(201)
      .json({ msg: 'produto cadastrado', produto: produto });
  } catch (error) {
    if (error.message.includes('Corpo da requisição não é válido')) {
      return res.status(400).json({ erro: error.message });
    }
    console.error('Erro ao criar produto: ', error);
    return res.status(500).json({ erro: 'Falha ao cadastrar o(s) produto(s)' });
  }
};

const handleGetProdutos = async (req, res) => {
  try {
    const produtos = await produtoService.getProdutos();
    return res.status(200).json(produtos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Falha ao buscar os produtos' });
  }
};

const handleGetProdutoPorId = async (req, res) => {
  try {
    const id = req.params.id;
    const produto = await produtoService.getProdutoPorId(id);
    return res.status(200).json(produto);
  } catch (error) {
    if (error.message.includes('produto não encontrado')) {
      return res.status(404).json({ erro: error.message });
    }
    console.error(error);
    return res.status(500).json({ erro: 'Falha ao buscar o produto' });
  }
};

exports.atualizaProduto = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const atualizarProduto = await prisma.produto.update({
      where: { id: id },
      data: req.body,
    });

    res
      .status(200)
      .json({ msg: 'Produto atualizado', retorno: atualizarProduto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Nao foi possivel atualizar o produto.' });
  }
};

exports.deletaProduto = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.produto.delete({
      where: { id: id },
    });

    res.status(204).json();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ erro: 'Não foi possivel excluir o produto informado.' });
  }
};

module.exports = {
  handleCreateProduto,
  handleGetProdutos,
  handleGetProdutoPorId,
};
