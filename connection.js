const util = require ('util')
const mysql = require ('mysql')
const inquirer = require(“inquirer”);

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sootball12',
    database: 'employees',
})
connection.connect()
connection.query = util.promisify(connection.query)
module.exports = connection