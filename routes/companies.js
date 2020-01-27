const router = require('express').Router();
const Company = require('../models/company');

//Get all Companies
router.route('/').get((req, res) => {
  Company.find()
    .then(companies => res.json(companies))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Add Company
router.route('/add').post((req, res) => {
  const companyName = req.body.companyName;
  const taxOffice = req.body.taxOffice;
  const taxNumber = req.body.taxNumber;

  const newCompany = new Company({ companyName, taxOffice, taxNumber });

  newCompany
    .save()
    .then(() => res.json('Company added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Delete Company
router.route('/:id').delete((req, res) => {
  Company.findByIdAndDelete(req.params.id)
    .then(() => res.json('Company deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Update a Company
router.route('/edit/:id').post((req, res) => {
  Company.findByIdAndUpdate(req.params.id)
    .then(company => {
      company.companyName = req.body.companyName;
      company.taxOffice = req.body.taxOffice;
      company.taxNumber = req.body.taxNumber;

      company
        .save()
        .then(() => res.json('Company updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
