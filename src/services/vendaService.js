const prisma = require('../prisma/client');
/*
cara, essa aqui ta hard de fazer, mas tamo indo kkkkkkkkkkk
o payload virá assim:
{
  "operadorId": 1,
  "metodoPagamento": "Cartão de Crédito",
  "produtos": [
    { "produtoId": 5, "quantidade": 2, "valorUnitario": "10.50" },
    { "produtoId": 8, "quantidade": 1, "valorUnitario": "25.00" }
  ]
}
*/

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
      const { operadorId, metodoPagamento, produtos } = dadosDoCarrinho;

      // pra eu saber o valor total de todos os produtos do carrinho / requisicao
      const valorTotal = produtos.reduce((valorAnterior, produto) => {
        const subtotal = parseFloat(produto.valorUnitario) * produto.quantidade;
        return valorAnterior + subtotal;
      }, 0);

      // salva a venda no db.
      const novaVenda = await tx.venda.create({
        data: {
          operadorId: operadorId,
          metodoPagamento: metodoPagamento,
          valorTotal: valorTotal,
        },
      });

      /*
      esse blco é pra salvar cada produto na entity ProdutosVenda
      exemplo de como deve vir minha requisição do front
      { "produtoId": 5, "quantidade": 2, "valorUnitario": "10.50" },
      { "produtoId": 8, "quantidade": 1, "valorUnitario": "25.00" }
       */
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
