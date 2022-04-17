const { Client } = require('pg');

//Get all info of DB thanks to psql
const client = new Client();

client.connect();

module.exports = client; 