const mongoose = require('mongoose');
const moment = require('moment');
moment.locale('tr');
const Schema = mongoose.Schema;

const CompanySchema = new Schema(
  {
    companyName: {
      type: String
    },
    taxOffice: {
      type: String,
      default: '-'
    },
    taxNumber: {
      type: String,
      default: '-'
    },
    date: {
      type: String,
      default: moment().format('L')
    }
  },
  {
    timestamps: true
  }
);

const Company = mongoose.model('Company', CompanySchema, 'companies');
module.exports = Company;
