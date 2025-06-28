const vendaService = require('../services/vendaService');

const handleCriarVenda = async (req, res) => {
  try {
    const venda = await vendaService.criarVenda(req.body);
    return res.status(201).json({ msg: 'venda realizada', venda: venda });
  } catch (error) {
    if (error.message.includes('Corpo da requisição não é válido')) {
      return res.status(400).json({ msg: error.message });
    }
    console.error(error);
    return res.status(500).json({ msg: error });
  }
};

module.exports = { handleCriarVenda };
