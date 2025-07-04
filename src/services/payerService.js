const axios = require('axios');

const payer = async (data) => {
  try {
    const { paymentMethod, paymentType, produtos } = data;

    const value = produtos.reduce((prev, curr) => {
      let subtotal = parseFloat(curr.valorUnitario) * curr.quantidade;
      return subtotal + prev;
    }, 0);

    const payload = {
      command: 'payment',
      value: value,
      paymentMethod: paymentMethod,
      paymentType: paymentType,
    };

    console.log(payload);
    await axios.post('http://localhost:6060/Client/request', payload);
  } catch (error) {
    throw error;
  }
};

module.exports = { payer };
