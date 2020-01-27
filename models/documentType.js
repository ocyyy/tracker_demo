const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DocumentTypeSchema = new Schema({
  documentTypeName: {
    type: String,
    required: true,
    unique: true
  }
});

const DocumentType = mongoose.model(
  'DocumentType',
  DocumentTypeSchema,
  'documentTypes'
);
module.exports = DocumentType;
