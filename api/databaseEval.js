const express = require("express");
const Router = express.Router();
const con = require('../DbConnectors/mysql_connector')
const mongoose = require('../DbConnectors/mongodb-Connector')
const tableSchema = require('../modals/TableDeatils')
var bodyParser = require('body-parser');
Router.use(bodyParser.urlencoded({ extended: false }));
Router.use(bodyParser.json());
Router.get('/FetchLogs', (req, res) => {
    const dName = req.query.dName || 'githubdatabase';
    var tName = req.query.tName || 'emp'

    let statement = `desc ` + tName
    con.query(statement, (err, result) => {
        if (err) {
            console.log(err);
            res.json({ 'type': 'error', 'message': "Econter an error" })
        }
        else {
            let databaseColumns = []
            let colName = ""
            for (var i in result) {
                databaseColumns.push({ 'name': result[i].Field, 'type': result[i].Type })
                colName += "count(" + result[i].Field + ")/count(*) as " + result[i].Field + ","

            }
            statement = `select ${colName.substring(0, colName.length - 1)}  from ` + tName
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
    var dName = req.query.dName || 'githubdatabase'
    var tName = req.query.tName || 'emp'
    tableSc.findOne({}, (err, result) => {
        if (err) { console.log(err) }
        else {
            con.query(`SELECT create_time as createdAt FROM INFORMATION_SCHEMA.TABLES WHERE table_schema = '${dName}' AND table_name = '${tName}'`, (err, mysqlres) => {
                console.log("fetched from database")
                if (err) {
                    console.log(err)
                    res.json({ "type": "sucess", "data": result })
                } else {
                    con.query(`SELECT UPDATE_TIME as LastModified FROM   information_schema.tables WHERE  TABLE_SCHEMA = 'githubdatabase' AND TABLE_NAME = '${tName}'`, (err, myres) => {
                        if (err) {
                            res.json({ "type": "sucess", "data": result, "createdAt": mysqlres[0]['createdAt'] })
                            console.log(err)
                        }
                        else {
                            res.json({ "type": "sucess", "data": result, "createdAt": mysqlres[0]['createdAt'], "LastModified": myres[0]['LastModified'] })
                        }
                    })

                    // console.log(mysqlres)
                }
            })

        }
    })
})

Router.get('/FetchContent', (req, res) => {
    var dName = req.query.dName || 'githubdatabase'
    var tName = req.query.tName || 'emp'
    retdata = {};
    con.query("select ROUND((DATA_LENGTH + INDEX_LENGTH) / 1024 / 1024) as size,table_rows as row_count from information_Schema.tables where table_name like '%" + tName + "%' ", (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            result = result[0]
            var size = { "Total": null, "Latest": result['size'] }
            var rows = { "Total": result['row_count'], "Latest": result['row_count'] }
            tableSc.findOne({ tName: tName }, (err, result) => {
                if (err) { console.log(err) }
                else {
                    res.json({ "type": "sucess", "data": { "size": size, "rows": rows, "tableReport": result } })
                }
            })
        }
    })

})


Router.get('/partitionDetails', (req, res) => {
    var tableName = req.query.tableName || 'emp'
    con.query(`select  ROUND((DATA_LENGTH + INDEX_LENGTH) / 1024 / 1024) as size,table_rows as row_count from information_schema.partitions where table_Schema='githubdatabase' and table_name='${tableName}'`, (err, result) => {
        if (err) { console.log(err), res.json({ 'type': 'failed', 'response': err }) }
        else {
            res.json({ 'type': 'sucessful', 'response': result })
        }
    })
})


Router.get('/tableTags', (req, res) => {
    var dName = req.query.dName || 'githubdatabase';
    var tName = req.query.tName || 'emp'
    tableSc.findOne({ tName: tName, dName: dName }, 'tagList', (err, result) => {
        if (err) {
            console.log("error occured while finding the description", err)
            return res.json({ 'type': 'fail' })
        }
        else {
            return res.json({
                'type': 'sucess', data: {
                    tagList: result['tagList']
                }
            })
        }
    })

})
Router.post('/updateTags', (req, res) => {
    console.log(req.body)
    var conditions = { tableId: req.body.tableId }
        , update = { tagList: req.body.updatedTags }
        , options = { multi: false };
    console.log(conditions, update)
    tableSc.updateOne(conditions, update, callback);
    function callback(err, numAffected) {
        if (err) {
            console.log(err);
            res.json({ 'type': 'failed', 'err': err })
        }
        else {
            res.json({ 'type': 'sucessful', 'response': 'updated on row', 'details': numAffected })
        }
    }

})


Router.get('/tableOnCall', (req, res) => {
    var dName = req.query.dName || 'githubdatabase';
    var tName = req.query.tName || 'emp'
    tableSc.findOne({ tName: tName, dName: dName }, 'onCallList', (err, result) => {
        if (err) {
            console.log("error occured while finding the description", err)
            return res.json({ 'type': 'fail' })
        }
        else {
            return res.json({
                'type': 'sucess', data: {
                    onCallList: result['onCallList'] || ["..."]
                }
            })
        }
    })

})
Router.post('/updateOnCall', (req, res) => {
    console.log(req.body)
    var conditions = { tableId: req.body.tableId }
        , update = { onCallList: req.body.updatedOnCall }
        , options = { multi: false };
    console.log(conditions, update)
    tableSc.updateOne(conditions, update, callback);
    function callback(err, numAffected) {
        if (err) {
            console.log(err);
            res.json({ 'type': 'failed', 'err': err })
        }
        else {
            res.json({ 'type': 'sucessful', 'response': 'updated on row', 'details': numAffected })
        }
    }

})


Router.get('/tableDescription', (req, res) => {
    var dName = req.query.dName || 'githubdatabase';
    var tName = req.query.tName || 'emp'
    tableSc.findOne({ tName: tName, dName: dName }, 'description', (err, result) => {
        if (err) {
            console.log("error occured while finding the description", err)
            return res.json({ 'type': 'fail' })
        }
        else {
            console.log('data sent',result['description'])
            return res.json({
                'type': 'sucess',
                data: {
                    description: result['description']
                }
            })
        }
    })
})
Router.post('/updateDescription', (req, res) => {
    // console.log(req.body)
    var conditions = { tableId: req.body.tableId }
        , update = { description: req.body.updatedDescription }
        , options = { multi: false };
    console.log(conditions, update)
    tableSc.updateOne(conditions, update, callback);
    function callback(err, numAffected) {
        if (err) {
            console.log(err);
            res.json({ 'type': 'failed', 'err': err })
        }
        else {
            res.json({ 'type': 'sucessful', 'response': 'updated on row', 'details': numAffected })
        }
    }

})

module.exports = Router