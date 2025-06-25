const prisma = require('../prisma/client');

const createProduto = async (body) => {
  try {
    if (typeof body != 'object' || Array.isArray(body) || body === null) {
      throw new Error('Corpo da requisição não é válido');
    }
    const produto = { data: body };
    return await prisma.produto.create(produto);
  } catch (erro) {
    console.error(erro);
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

const getProduto = async (id) => {
  try {
    const parseId = parseInt(id);
    const produto = await prisma.produto.findUnique({
      where: { id: parseId },
    });

    if (!produto) {
      throw new Error('Produto não existe na base');
    }

    return produto;
  } catch (erro) {
    throw erro;
  }
};

const putProduto = async (id, body) => {
  try {
    const parseId = parseInt(id);
    const produto = await prisma.produto.update({
      where: { id: parseId },
      data: body,
    });

    if (!produto) {
      throw new Error('Produto nao existe na base');
    }
    return produto;
  } catch (erro) {
    throw erro;
  }
};

const deleteProduto = async (id) => {
  try {
    const parseId = parseInt(id);
    const produto = await prisma.produto.delete({
      where: { id: parseId },
    });
    return produto;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createProduto,
  getProdutos,
  getProduto,
  putProduto,
  deleteProduto,
};
