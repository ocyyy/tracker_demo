const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json()); //parse the gelen json

const port = process.env.PORT || 5000;

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const documentsRouter = require('./routes/documents');
const companiesRouter = require('./routes/companies');
const documentTypesRouter = require('./routes/documentTypes');
const usersRouter = require('./routes/users');

app.use('/companies', companiesRouter);
app.use('/documents', documentsRouter);
app.use('/documentTypes', documentTypesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
