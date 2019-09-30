const { Client } = require('pg');
const { Pool } = require('pg');

let config = {
  user: "cwcbppxhhgeitk",
  password: "01d0f2bf9664a2edb8fdb4defdd098b7fe7180b9de2aee82b8fca9feaac8989f",
  database: "db5mcm1v2fkdei",
  port: 5432,
  host: "ec2-46-137-113-157.eu-west-1.compute.amazonaws.com",
  ssl: true
};

const client = new Client(config);
const pool = new Pool(config);

exports.createNewsTable = function()
{ 
  client.connect();
  client.query(`CREATE TABLE News
    (
      id BIGSERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      published DATE NOT NULL,
      contentName TEXT NOT NULL,
      imageFile TEXT NOT NULL
    )`, (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
    client.end();
  });
}
exports.dropTable = function(name)
{ 
  client.connect();
  client.query(`DROP TABLE ${name}`, (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
    client.end();
  });
}
exports.truncateTable = function(name)
{ 
  client.connect();
  client.query(`TRUNCATE ${name} RESTART IDENTITY;`, (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
    client.end();
  });
}
exports.changeEncoding = function()
{ 
  client.connect();
  client.query(`SET CLIENT_ENCODING TO 'UTF8';`, (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
    client.end();
  });
}
exports.showEncoding = function()
{ 
  client.connect();
  client.query(`SHOW client_encoding;`, (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
    client.end();
  });
}
exports.createAdditionalTable = function()
{ 
  client.connect();
  client.query(`CREATE TABLE Additional
    (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    value TEXT NOT NULL
    )`, (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
    client.end();
  });
}
exports.checkConnection = function()
{ 
  client.connect();
  client.query(`SELECT table_schema,table_name 
                  FROM information_schema.tables;`, (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
    client.end();
  });
}
exports.insertNews = function(title, published, contentName, imageFile)
{ 
  client.connect();
  client.query(`INSERT INTO News (title, published, contentName, imageFile) 
                VALUES (
                  '${title}', 
                  '${published}', 
                  '${contentName}', 
                  '${imageFile}
                '); 
                UPDATE Additional 
                SET value = value::int + 1 
                WHERE name like 'NewsRowsCount'`, (err, res) => {
    if (err) {
      console.log(err);
      
    throw err;
    }
    client.end();
  });
}
exports.createNewsRowsCount = function()
{ 
  client.connect();
  client.query(`INSERT INTO Additional (name, value) 
                VALUES ('NewsRowsCount', 0)`, (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
    client.end();
  });
}
exports.getManyNews = async function(page, amount)
{
  let client = await pool.connect()
  let result = await client.query({
    rowMode: 'array',
    text: `SELECT *
          FROM News 
          WHERE id::int >= 
          ((SELECT value 
          FROM Additional 
          WHERE name like 'NewsRowsCount'
          limit 1)::int - ${amount * page})`,
  });
  await client.end()
  console.log('Sending news...');
  return result.rows;
}
exports.getNewsByIndex = async function(index)
{
  let client = await pool.connect()
  let result = await client.query({
    rowMode: 'array',
    text: `SELECT contentName FROM news WHERE id = ${index}`,
  });
  await client.end()
  console.log(result.rows[0]);
  return result.rows[0];
}