const express = require('express');
const cors = require('cors');
const produtoRoutes = require('./routes/produtoRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/produtos', produtoRoutes); //preciso estudar como essa linha funciona!!!

const port = 3000;

app.listen(port, () => {
  console.log('ta operando essa bagaça!!!!');
});
