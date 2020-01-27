const router = require('express').Router();
const Date = require('../models/date');
const Company = require('../models/company');

router.route('/').get((req, res) => {
  Date.find()
    .then(date => res.json(date))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Date.findById(req.params.id)
    .then(date => res.json(date.companies))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/addDate').post((req, res) => {
  const name = req.body.name;
  Company.find().then(companies => {
    const newDate = new Date({ name, companies });
    newDate
      .save()
      .then(() => res.json('Date added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
});

router.route('/addCompany/:id').post((req, res) => {
  Date.findByIdAndUpdate(req.params.id).then(date => {
    const companyName = req.body.companyName;
    const taxOffice = req.body.taxOffice;
    const taxNumber = req.body.taxNumber;

    const newCompany = new Company({ companyName, taxOffice, taxNumber });

    newCompany
      .save()
      .then(() => res.json(newCompany.bordro))
      .catch(err => res.status(400).json('Error: ' + err));

    date.companies.push(newCompany);
    date.save();
  });
});

router.route('/editCompany/:id').post((req, res) => {
  Date.findByIdAndUpdate(req.params.id).then(date => {
    const companyId = req.body._id;
    date.companies[date.companies.findIndex(el => el.id === companyId)] =
      req.body;
    date.save();
    res.send('Done');
  });
});

router.route('/deleteCompany/:id').delete((req, res) => {
  Date.findByIdAndUpdate(req.params.id).then(date => {
    const companyId = req.body._id;
    date.companies[date.companies.findIndex(el => el.id === companyId)] =
      req.body;
    console.log();
    date.save();
    res.send('Done');
  });
});

module.exports = router;
