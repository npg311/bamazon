const mysql = require("mysql");
const inquirer = require("inquirer");


var connection = mysql.createConnection({
  host: "localhost",

  
  port: 3000,

  // Your username
  user: "root",

  // Your password
  password: "npg12345",
  database: "bamazon"
});

