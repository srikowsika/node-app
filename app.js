const express=require('express');
const app=express();
const { Client } = require('pg');
const axios = require('axios');
const config = require('./config/config')
const query = require('./query/query')

app.use(express.static('index.html'))

axios.get(config.url.api)
  .then(response => {
    http_res = response.data
    console.log(http_res)
    const client = new Client({
      connectionString: config.url.connectionString,
      ssl: true,
    });
    
    client.connect();
    client.query(query.get_tables, ['public'], (err, res) => {
      if (err) throw err;
      console.log(res);
      for (let row of res.rows) {
        if (row.table_name !== 'student') {
          client.query(query.create_student_table, (err, res) => {
            if (err) throw err;
            console.log(res);
          });
        }
      }
    })
    
    // client.query('Drop table Student_Detail', (err, res) => {
    //   if (err) throw err;
    //   //console.log(res)
      
    // });
    client.query(query.insert_values, [http_res.Id, http_res.Name,http_res.Type,http_res.attributes], (err, res) => {
      if (err) throw err;
      console.log(res)
    });

    client.query(query.select_table, (err, res) => {
      if (err) throw err;
      for (let row of res.rows) {
        console.log(row)
      }
      client.end();
    });
  })
  .catch(error => {
    console.log(error);
  });





