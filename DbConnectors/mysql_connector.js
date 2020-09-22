var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "employees",
    multipleStatements: true
});
con.connect(function (err) {
    if (err) return console.log("failed to connect to book_store pls download mysql", err);
    else console.log("connection established with mysql database");
});
module.exports  = con;