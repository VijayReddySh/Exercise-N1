const cool = require('cool-ascii-faces');
const express1 = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://cluster0.8pwjl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
const dataSchema = {
  ID: String,
  Name: String
}
const data = mongoose.model('VijayW', dataSchema);
express1()
  .use(express1.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/db', (req, res) => {
    data.find({}, function(err, r) {
        res.render('pages/db', {
            results: r
        })
    })
})
  .get('/times', (req, res) => res.send(showTimes()))
  .get('/cool', (req, res) => res.send(cool()))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

  showTimes = () => {
    let result = '';
    const times = process.env.TIMES || 5;
    for (i = 0; i < times; i++) {
      result += i + ' ';
    }
    return result;
  }