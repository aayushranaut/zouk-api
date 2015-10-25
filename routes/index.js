var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Zouk' });
});

var loans = [
  {name: 'Prathmesh Ranaut', amount: 100000, dob: '24-Oct-1986', employment_type: 'Salaried', salary: 10000, tenure: 24},
];

router.get('/loans', function (req, res) {
  res.json(loans);
});

router.get('/loan/:id', function (req, res) {
  if (loans.length <= req.params.id || req.params.id < 0) {
    res.statusCode = 404;
    return res.send('Error 404: No loan found');
  }
  var q = loans[req.params.id];
  res.json(q);
});

router.post('/loan', function (req, res) {
  if (!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('amount')) {
      res.statusCode = 400;
      return res.json({'error': "Inccorect params for post data"});
  }

  var newLoan = {
    name: req.body.name,
    amount: parseInt(req.body.amount)
  };

    var newLoan = {
        name: req.body.name,
        amount: parseInt(req.body.amount)
        dob: req.body.dob,
        employment_type: req.body.employment_type,
        salary: req.body.salary,
        tenure: req.body.tenure
    };

  loans.push(newLoan);
  res.json(true);
});

router.delete('/loan/:id', function (req, res) {
  if (loans.length <= req.params.id) {
    res.statusCode = 404;
    return res.json({'error': "No load with ID found."});
  }

  loans.splice(req.params.id, 1);
  res.json(true);
});

module.exports = router;
