const prisma = require('../prisma/client');

const createProduto = async (body) => {
  try {
    if (typeof body != 'object' || Array.isArray(body) || body === null) {
      throw new Error('Corpo da requisição não é válido');
    }
    const produto = { data: body };
    return await prisma.produto.create(produto);
  } catch (erro) {
    throw erro;
  }
};

const getProdutos = async () => {
  try {
    return await prisma.produto.findMany();
  } catch (erro) {
    throw erro;
  }
};

const getProdutoPorId = async (id) => {
  try {
    const parseId = parseInt(id);
    const busca = await prisma.produto.findUnique({
      where: { id: parseId },
    });
    if (!busca) {
      throw new Error('produto não encontrado');
    }
    return busca;
  } catch (erro) {
    throw erro;
  }
};

module.exports = { createProduto, getProdutos, getProdutoPorId };
