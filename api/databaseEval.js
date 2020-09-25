const express = require("express");
const Router = express.Router();
const con = require('../DbConnectors/mysql_connector')
const mongoose = require('../DbConnectors/mongodb-Connector')
const tableSchema = require('../modals/TableDeatils')
// const mongoose = require('mongoose')
Router.get('/FetchLogs', (req, res) => {
    const dbName = req.query.dbName || 'emp';
    // for logs
    let statement = `desc ` + dbName
    con.query(statement, (err, result) => {
        if (err) {
            console.log(err);
            res.json({ 'type': 'error', 'message': "Econter an error" })
        }
        else {
            // recieved the sturcture of the table
            // con.query('')
            let databaseColumns = []
            let colName = ""
            for (var i in result) {
                databaseColumns.push({ 'name': result[i].Field, 'type': result[i].Type })
                colName += "count(" + result[i].Field + ")/count(*) as " + result[i].Field + ","

            }

            statement = `select ${colName.substring(0, colName.length - 1)}  from ` + dbName
            con.query(statement, (err, result) => {
                if (err) {
                    console.log(err);
                    res.json({ 'type': 'error', 'message': 'error in finding the null % for columns' })
                }
                else {
                    console.log(result)
                    for (var i in Object.keys(result[0])) {

                        databaseColumns[i]['Fill'] = result[0][databaseColumns[i]['name']]

                    }
                    console.log(databaseColumns)
                    res.json({ 'type': 'sucess', 'colDetails': JSON.stringify(databaseColumns) })
                }


            })


            // res.json({ 'type': 'sucess', "Result": JSON.stringify(databaseColumns) })
        }
    })

    // res.send(200)

})
const tableSc = mongoose.model('tableDetails', tableSchema)

Router.get('/FetchAbout', (req, res) => {
    tableSc.findOne({}, (err, result) => {
        if (err) { console.log(err) }
        else {
            // console.log(result)
            console.log("fetched from database")
            res.json({ "type": "sucess", "data": result })
        }
    })
})

Router.get('/FetchContent', (req, res) => {
    var dbName = req.query.dbName || 'emp',
        retdata = {};
    con.query("select ROUND((DATA_LENGTH + INDEX_LENGTH) / 1024 / 1024) as size,table_rows as row_count from information_Schema.tables where table_name like '%" + dbName + "%' ", (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            result = result[0]
            var size = { "Total": null, "Latest": result['size'] }
            var rows = { "Total": result['row_count'], "Latest": result['row_count'] }
            tableSc.findOne({}, (err, result) => {
                if (err) { console.log(err) }
                else {
                    res.json({ "type": "sucess", "data": { "size": size, "rows": rows, "TableReport": result } })
                }
            })
        }
    })

})

module.exports = Router