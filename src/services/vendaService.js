const prisma = require('../prisma/client');
const axios = require('axios');

const criarVenda = async (payload) => {
  try {
    if (!payload || typeof payload != 'object' || Array.isArray(payload)) {
      throw new Error('Corpo da requisição não é válido');
    }
    return await prisma.$transaction(async (tx) => {
      const { operadorId, paymentMethod, paymentType, produtos } = payload;

      // pra eu saber o valor total de todos os produtos do carrinho / requisicao
      const value = produtos.reduce((valorAnterior, produto) => {
        const subtotal = parseFloat(produto.valorUnitario) * produto.quantidade;
        return valorAnterior + subtotal;
      }, 0);

      const payloadPagamento = {
        command: 'payment',
        value: value,
        paymentMethod: paymentMethod,
        paymentType: paymentType,
      };

      const url_req = 'http://localhost:6060/Client/request';
      const url_res = 'http://localhost:6060/Client/response';

      console.log('DADOS SENDO ENVIADOS PARA A PAYER -> ', payloadPagamento);
      await axios.post(url_req, payloadPagamento);

      let tentativas = 20;

      while (tentativas > 0) {
        await new Promise((resolve) => setTimeout(resolve, 3000));

        const response = await axios.get(url_res);
        const status = response.data?.statusTransaction;

        console.log(status);
        if (status === 'APPROVED') {
          const novaVenda = await tx.venda.create({
            data: {
              operadorId: operadorId,
              metodoPagamento: paymentType,
              valorTotal: value,
            },
          });
          console.log('DADOS SALVOS NO EM -VENDA- ->', novaVenda);

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
        }

        if (status === 'REJECTED') {
          throw new Error('pagamento nao autorizado :(');
        }
        if (status === 'CANCELLED') {
          throw new Error('pagamento cancelado');
        }
        if (status === 'ABORTED') {
          throw new Error('pagamento abortada');
        }

        tentativas--;
      }
      throw new Error('Tempo de espera esgotado');
    });
  } catch (erro) {
    console.error('Erro no serviço de API ao chamar venda:', error.message);
    throw erro;
  }
};

module.exports = { criarVenda };
