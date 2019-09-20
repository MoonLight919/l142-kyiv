const { Client } = require('pg');

const client = new Client({
    user: "cwcbppxhhgeitk",
    password: "01d0f2bf9664a2edb8fdb4defdd098b7fe7180b9de2aee82b8fca9feaac8989f",
    database: "db5mcm1v2fkdei",
    port: 5432,
    host: "ec2-46-137-113-157.eu-west-1.compute.amazonaws.com",
    ssl: true
  });

client.connect();

exports.createNewsTable = function()
{ 
    client.query(`CREATE TABLE News(
        id BIGSERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        published DATE NOT NULL,
        contentId TEXT NOT NULL,
        photoId TEXT NOT NULL
      )`, (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
    client.end();
  });
}
exports.dropNewsTable = function()
{ 
    client.query(`DROP TABLE News`, (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
    client.end();
  });
}
exports.createAdditionalTable = function()
{ 
    client.query(`CREATE TABLE Additional
        WITH ENCODING 'UTF8'(
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
    client.query(`SELECT table_schema,table_name 
                  FROM information_schema.tables;`, (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
    client.end();
  });
}
exports.insertNews = function(title, published, contentId, photoId)
{ 
    client.query(`INSERT INTO News (title, published, contentId, photoId) 
                  VALUES (
                    '${title}', 
                    '${published}', 
                    '${contentId}', 
                    '${photoId}
      ')`, (err, res) => {
    if (err) {
      console.log(err);
      
    throw err;
    }
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
    client.end();
  });
  client.query(`UPDATE Additional 
                SET value = value + 1 
                WHERE name like 'NewsRowsCount'`, (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
    client.end();
  });
}
exports.createNewsRowsCount = function()
{ 
    client.query(`INSERT INTO Additional (name, value) 
                  VALUES ('NewsRowsCount', 0)`, (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
    client.end();
  });
}
exports.getNews = function(page, amount)
{
  let result = [];
  client.query(`SELECT *
                FROM News 
                WHERE id > 
                (SELECT TOP 1 value 
                FROM Additional 
                WHERE name like 'NewsRowsCount') - ${amount * page}`, (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      result.push(JSON.stringify(row));
    }
    client.end();
  });
  return result;
}
// exports.getNews = function(page, amount)
// {
//     client.query(`SELECT number, * FROM (SELECT ROW_NUMBER() OVER (PARTITION BY id ORDER BY published DESC) AS number,* FROM News) WHERE number >= ${page * amount} AND number <= ${page * amount + amount}`, (err, res) => {
//         if (err) throw err;
//         for (let row of res.rows) {
//           console.log(JSON.stringify(row));
//         }
//         client.end();
//         return res.rows;
//     });
// }