const prisma = require('../prisma/client');

const createVenda = async (payload) => {
  try {
    const dados = { data: payload };
    return prisma.venda.create(dados);
  } catch (erro) {
    throw erro;
  }
};

module.exports = { createVenda };
