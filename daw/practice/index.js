const express = require('express');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'gks0127',
  database: 'my_db',
});
const app = express();

connection.connect();

connection.query('SELECT * from Persons', function(err, rows, fields) {
  if (!err)
    console.log('The solution is: ', rows);
  else
    console.log('Error while performing Query.', err);
});
    
connection.end();
