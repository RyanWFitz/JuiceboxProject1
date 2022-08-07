// start up sql: sudo service postgresql start
require('dotenv').config();

const { PORT = 3000 } = process.env
const express = require('express');
const server = express();


const morgan = require('morgan');
server.use(morgan('dev'));

server.use(express.json());

const { client } = require('./db');
client.connect();

const apiRouter = require('./api');
server.use('/api', apiRouter);


server.listen(PORT, () => {
  console.log('The server is up on port', PORT)
});