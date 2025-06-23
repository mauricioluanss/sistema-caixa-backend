const prisma = require('../prisma/client');

//Aqui ta o meu CRUD pra model de produtos

exports.criaProduto = async (req, res) => {
  try {
    const objetoProduto = { data: req.body };
    const novoProduto = await prisma.produto.create(objetoProduto);

    res.status(201).json({ msg: 'produto cadastrado', produto: novoProduto });
  } catch (error) {
    console.error('Erro ao criar produto: ', error);
    res.status(500).json({ erro: 'Falha ao cadastrar o(s) produto(s)' });
  }
};

exports.todosProdutos = async (req, res) => {
  try {
    const todosProdutos = await prisma.produto.findMany();

    // pra mostrar o valor do produto com 2 casas decimais
    const valorUnitarioFormatado = todosProdutos.map((produto) => ({
      ...produto,
      valorUnitario: Number(produto.valorUnitario).toFixed(2),
    }));

    res.status(200).json(valorUnitarioFormatado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Falha ao buscar os produtos.' });
  }
};

exports.produtoPorId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const produtoPorId = await prisma.produto.findUnique({
      where: { id: id },
    });

    // pra mostrar o valor do produto com 2 casas decimais
    const produtoFormatado = {
      ...produtoPorId,
      valorUnitario: Number(produtoPorId.valorUnitario).toFixed(2),
    };

    if (!produtoPorId) {
      return res.status(404).json({ erro: `Produto ${id} não encontrado.` });
    }

    res.status(200).json(produtoFormatado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Não foi possivel encontrar o produto.' });
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
