const prisma = require('../prisma/client');

const criarVenda = async (payload) => {
  try {
    if (!payload || typeof payload != 'object' || Array.isArray(payload)) {
      throw new Error('Corpo da requisição não é válido');
    }

    return await prisma.$transaction(async (tx) => {
      const { operadorId, paymentType, produtos } = payload;

      const valorTotal = produtos.reduce((prev, curr) => {
        let subtotal = curr.quantidade * parseFloat(curr.valorUnitario);
        return subtotal + prev;
      }, 0);

      const venda = await tx.venda.create({
        data: {
          operadorId: operadorId,
          metodoPagamento: paymentType,
          valorTotal: valorTotal,
        },
      });
      console.log('DADOS SALVOS NO BANCO ->', venda);

      const vendaId = venda.id;

      for (const produto of produtos) {
        const { produtoId, valorUnitario, quantidade } = produto;
        await tx.produtosVenda.create({
          data: {
            vendaId: vendaId,
            produtoId: produtoId,
            valorUnitario: valorUnitario,
            qtd: quantidade,
            valorTotal: quantidade * parseFloat(valorUnitario),
          },
        });
      }

      return venda;
    });
  } catch (erro) {
    throw erro;
  }
};

module.exports = { criarVenda };
