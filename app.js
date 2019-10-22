
const { Client } = require('pg');
const axios = require('axios');
const config = require('./config/config')
const query = require('./query/query')


axios.get(config.url.api)
  .then(response => {
    res = response.data
    console.log(res.id)
    const client = new Client({
      connectionString: config.url.connectionString,
      ssl: true,
    });

    client.connect();
    client.query(query.get_tables, ['public'], (err, res) => {
      if (err) throw err;
      for (let row of res.rows) {
        if (row.table_name !== 'student') {
          client.query(query.query.create_student_table, (err, res) => {
            if (err) throw err;
          });
        }
      }
    })
    client.query(query.insert_values, [res.id, res.name], (err, res) => {
      if (err) throw err;
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





