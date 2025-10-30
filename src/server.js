const express = require('express');
const path = require('path');
const { Survey, Division, District, Upazila } = require('./models');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.get('/', async (req, res) => {
  const surveys = await Survey.findAll();
  const divisions = await Division.findAll();
  const districts = await District.findAll();
  const upazilas = await Upazila.findAll();

  res.render('index', { surveys, divisions, districts, upazilas });
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
