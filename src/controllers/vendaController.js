const vendaService = require('../services/vendaService');

const handleCreateVenda = async (req, res) => {
  try {
    const venda = await vendaService.createVenda(req.body);
    res.status(201).json({ msg: 'venda criada', venda: venda });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error });
  }
};

module.exports = { handleCreateVenda };
