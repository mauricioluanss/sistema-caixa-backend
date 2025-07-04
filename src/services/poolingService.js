const axios = require('axios');

const pooling = async () => {
  try {
    let tentativas = 20;
    while (tentativas > 0) {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const response = await axios.get('http://localhost:6060/Client/response');
      const status = response.data?.statusTransaction;

      console.log(status);

      if (status === 'APPROVED') {
        return status;
      }
      tentativas--;
    }
    throw new Error('tempo esgotado mané');
  } catch (error) {
    throw error;
  }
};

module.exports = { pooling };
