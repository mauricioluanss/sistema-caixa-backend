const vendaService = require('../services/vendaService');
const payerService = require('../services/payerService');
const poolingService = require('../services/poolingService');

const handleCriarVenda = async (req, res) => {
  try {
    await payerService.payer(req.body);
    const status = await poolingService.pooling();

    if (status === 'APPROVED') {
      const venda = await vendaService.criarVenda(req.body);
      return res.status(201).json(venda);
    } else {
      return res.status(400).json('falhou');
    }
  } catch (error) {
    if (error.message.includes('Corpo da requisição não é válido')) {
      return res.status(400).json({ msg: error.message });
    }
    console.error(error);
    return res.status(500).json({ msg: error });
  }
};

module.exports = { handleCriarVenda };
