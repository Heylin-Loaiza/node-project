const express = require('express');
const app = express();
const bodyParser = require('body-parser'); 
const cardsRouter = require('./routes/cardsRouter');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use('/cards', cardsRouter);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => {
  console.log('App listening on port 3000')
});
