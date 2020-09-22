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
                    res.json({ 'type': 'sucess', 'colDetails': JSON.stringify(databaseColumns)})
                }


            })


            // res.json({ 'type': 'sucess', "Result": JSON.stringify(databaseColumns) })
        }
    })

    // res.send(200)

})

Router.get('/FetchAbout', (req, res) => {

    const tableSc = mongoose.model('tableDetails', tableSchema)
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
    res.json({ "type": "sucess", "data": { "rows": { "Total": null, "Latest": 1240161857 }, "Size": { "Total": 559, "Latest": 9 } } })
})
module.exports = Router