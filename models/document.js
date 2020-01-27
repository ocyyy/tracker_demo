const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DocumentSchema = new Schema(
  {
    companyName: {
      type: String
    },
    description: {
      type: String
    },
    documentType: {
      type: String
    },
    userName: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Document = mongoose.model('Document', DocumentSchema, 'documents');
module.exports = Document;
