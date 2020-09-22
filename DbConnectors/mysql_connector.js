var mysql = require('mysql');
var con = mysql.createConnection({
    host: "db4free.net",
    user: "zoomlearner0098",
    password: "MITohnasan@12345",
    database: "githubdatabase",
    multipleStatements: true
});
con.connect(function (err) {
    if (err) return console.log("failed to connect to book_store pls download mysql", err);
    else console.log("connection established with mysql database");
});
module.exports  = con;