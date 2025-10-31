const express = require('express');
const path = require('path');
const { Survey, Division, District, Upazila, MouzaJLNumber } = require('./models');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));


MouzaJLNumber.count().then(count => {
  console.log(`JL numbers in DB: ${count}`);
});

app.get('/', async (req, res) => {

  const surveys = await Survey.findAll();
  const divisions = await Division.findAll();
  const districts = await District.findAll();
  const upazilas = await Upazila.findAll();
  const mouzas = await MouzaJLNumber.findAll();

  res.render('index', { surveys, divisions, districts, upazilas, mouzas });
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
