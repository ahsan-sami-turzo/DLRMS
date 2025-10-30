const express = require('express');
const { Survey, Division } = require('./models');

const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', async (req, res) => {
  const surveys = await Survey.findAll();
  const divisions = await Division.findAll();
  res.render('index', { surveys, divisions });
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
