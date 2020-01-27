const router = require('express').Router();
const DocumentType = require('../models/documentType');

//Get all Document Types
router.route('/').get((req, res) => {
  DocumentType.find()
    .then(documentTypes => res.json(documentTypes))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Add Document Type
router.route('/add').post((req, res) => {
  const documentTypeName = req.body.documentTypeName;

  const newDocumentType = new DocumentType({ documentTypeName });

  newDocumentType
    .save()
    .then(() => res.json('Document Type added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Update a Document Type
router.route('/edit/:id').post((req, res) => {
  DocumentType.findByIdAndUpdate(req.params.id)
    .then(documentType => {
      documentType.documentTypeName = req.body.documentTypeName;

      documentType
        .save()
        .then(() => res.json('Document Type updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
