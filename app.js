const { Client } = require('pg'); 
const axios = require('axios');
const config=require('./config/config')

axios.get('http://www.mocky.io/v2/5dad8c282d0000a542e4babb')
  .then(response => {
    res = response.data
    const client = new Client({
      connectionString:config.url.connectionString,
      ssl: true,
    });
    //console.log(client.connectionString)
    client.connect();
    // client.query('Create table Student(id integer,name varchar(50));', (err, res) => {
    //   if (err) throw err;
    //   console.log(res)
      
    // });
    // client.query('INSERT INTO Student VALUES ($2,$1)', [response.data.name, response.data.EmpId], (err, res) => {
    //   if (err) throw err;
    //   console.log(res)
    //  });
    client.query('Select * from Employee;', (err, res) => {
      if (err) throw err;
      //sconsole.log(res)
      for (let row of res.rows) {
        console.log(row)
      }
      client.end();
    });
  })
  .catch(error => {
    console.log(error);
  });





