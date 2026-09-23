const express = require('express');
const { add, subtract } = require('./add');

const app = express();

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/add', (req, res) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    return res.status(400).json({ error: 'a y b deben ser numeros' });
  }

  return res.json({ result: add(a, b) });
});

app.get('/subtract', (req, res) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    return res.status(400).json({ error: 'a y b deben ser numeros' });
  }

  return res.json({ result: a - b });
});

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Escuchando en puerto ${PORT}`));
}

module.exports = app;
