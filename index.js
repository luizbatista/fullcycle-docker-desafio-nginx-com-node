const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

connection.query(`CREATE TABLE IF NOT EXISTS people (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255), PRIMARY KEY (id))`)
connection.query(`TRUNCATE TABLE people`)
connection.query(`INSERT INTO people(name) values('Luiz Carlos')`)
connection.query(`INSERT INTO people(name) values('Wesley')`)
connection.query(`INSERT INTO people(name) values('Pedro Gabriel')`)
const peoples = []
connection.query(`SELECT * FROM people`, function(err, results){
    if (err) throw err
    for (const people of results) {  
        peoples.push(people)
    }
})
connection.end()

app.get('/', (req,res) => {
    let html = `<h1>Full Cycle</h1>`
    html += `<ul>`
    for (const people of peoples) {  
        html += `<li>${people.name}</li>`
    }
    html += `</ul>`
    res.send(html)
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})