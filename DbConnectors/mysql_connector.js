var mysql = require('mysql');
// var con = mysql.createConnection({
//     host: "db4free.net",
//     user: "zoomlearner0098",
//     password: "MITohnasan@12345",
//     database: "githubdatabase",
//     multipleStatements: true
// });
// con.connect(function (err) {
//     if (err) return console.log("failed to connect to book_store pls download mysql", err);
//     else console.log("connection established with mysql database");
// });

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "db4free.net",
    user: "zoomlearner0098",
    password: "MITohnasan@12345",
    database: "githubdatabase",
    multipleStatements: true
})
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.', err)
        }
    }
    console.log("connection pool establised with the mysql server")

    if (connection) connection.release()

    return
})
module.exports = pool;