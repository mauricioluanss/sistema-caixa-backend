const prisma = require('../prisma/client');

const criarVenda = async (dadosDoCarrinho) => {
  try {
    if (
      !dadosDoCarrinho ||
      typeof dadosDoCarrinho != 'object' ||
      Array.isArray(dadosDoCarrinho)
    ) {
      throw new Error('Corpo da requisição não é válido');
    }
    return await prisma.$transaction(async (tx) => {
      const { operadorId, paymentType, produtos } = dadosDoCarrinho;

      // pra eu saber o valor total de todos os produtos do carrinho / requisicao
      const valorTotal = produtos.reduce((valorAnterior, produto) => {
        const subtotal = parseFloat(produto.valorUnitario) * produto.quantidade;
        return valorAnterior + subtotal;
      }, 0);

      // salva a venda no db.
      const novaVenda = await tx.venda.create({
        data: {
          operadorId: operadorId,
          metodoPagamento: paymentType,
          valorTotal: valorTotal,
        },
      });
      console.log('DADOS SALVOS NO DB ->', novaVenda);

      const vendaId = novaVenda.id;
      for (const produto of produtos) {
        const { produtoId, quantidade, valorUnitario } = produto;
        await tx.produtosVenda.create({
          data: {
            vendaId: vendaId,
            produtoId: produtoId,
            valorUnitario: valorUnitario,
            qtd: quantidade,
            valorTotal: parseFloat(valorUnitario) * quantidade,
          },
        });
      }

      return novaVenda;
    });
  } catch (erro) {
    throw erro;
  }
};

module.exports = { criarVenda };
