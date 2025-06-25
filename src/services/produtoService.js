const prisma = require('../prisma/client');

const cria = async (body) => {
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

module.exports = { cria };
