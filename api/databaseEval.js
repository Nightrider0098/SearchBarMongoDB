const express = require("express");
const Router = express.Router();
const con = require('../DbConnectors/mysql_connector')
const postCon = require('../DbConnectors/postgresqlConnector')
const mongoose = require('../DbConnectors/mongodb-Connector')
const tableSchema = require('../modals/TableDeatils')
var bodyParser = require('body-parser');
Router.use(bodyParser.urlencoded({ extended: false }));
Router.use(bodyParser.json());
const tableSc = mongoose.model('tableDetails', tableSchema)


Router.get('/FetchLogs', (req, res) => {
    var dbName = req.query.dbName || 'githubdatabase'
    var tName = req.query.tName || 'emp'
    var dbType = req.query.dbType || 'mysql'
    let statement = `desc ` + tName
    if (dbType === "mysql")
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
            }
        })
    else if (dbType === "pg") {
        const dbName = req.query.dbName || 'oexslycq';
        var tName = req.query.tName || 'turtle_life_table'
        statement = `SELECT   column_name as name,    data_type as type FROM    information_schema.columns  WHERE    table_name = '${tName}'`

        postCon.query(statement, (err, result) => {
            if (err) {
                console.log(err);
                res.json({ 'type': 'error', 'message': "Econter an error" })
            }
            else {
                let databaseColumns = []
                let colName = ""
                const result1 = result.rows
                for (var i in result1) {
                    databaseColumns.push({ 'name': result1[i].name, 'type': result1[i].type })
                    colName += "count(" + result1[i].name + ")/count(*) as " + result1[i].name + ","
                }
                statement = `select ${colName.substring(0, colName.length - 1)}  from ` + tName
                postCon.query(statement, (err, result) => {
                    if (err) {
                        console.log(err);
                        res.json({ 'type': 'error', 'message': 'error in finding the null % for columns' })
                    }
                    else {
                        result = result.rows[0]
                        for (var i in Object.keys(result)) {

                            databaseColumns[i]['Fill'] = result[databaseColumns[i]['name']]

                        }
                        console.log(databaseColumns)
                        res.json({ 'type': 'sucess', 'colDetails': JSON.stringify(databaseColumns) })
                    }

                })
            }
        })
    }
})

// Router.get('/FetchAbout', (req, res) => {
//     var dbName = req.query.dbName || 'githubdatabase'
//     var tName = req.query.tName || 'emp'
//     var dbType = req.query.dbType || 'mysql'
//     console.log({ dbName: dbName, tName: tName, dbType: dbType })
//     tableSc.findOne({ dbName: dbName, tName: tName, dbType: dbType }, (err, result) => {
//         if (err) { console.log(err) }
//         else {
//             con.query(`SELECT create_time as createdAt FROM INFORMATION_SCHEMA.TABLES WHERE table_schema = '${dbName}' AND table_name = '${tName}'`, (err, mysqlres) => {
//                 console.log("fetched from database")
//                 if (err) {
//                     console.log(err)
//                     res.json({ "type": "sucess", "data": result })
//                 } else {
//                     con.query(`SELECT UPDATE_TIME as LastModified FROM   information_schema.tables WHERE  TABLE_SCHEMA = 'githubdatabase' AND TABLE_NAME = '${tName}'`, (err, myres) => {
//                         if (err) {
//                             res.json({ "type": "sucess", "data": result, "createdAt": mysqlres[0]['createdAt'] })
//                             console.log(err)
//                         }
//                         else {
//                             res.json({ "type": "sucess", "data": result, "createdAt": mysqlres[0]['createdAt'], "LastModified": myres[0]['LastModified'] })
//                         }
//                     })

//                     // console.log(mysqlres)
//                 }
//             })

//         }
//     })
// })

Router.get('/FetchContent', (req, res) => {
    var dbName = req.query.dbName || 'githubdatabase'
    var tName = req.query.tName || 'emp'
    var dbType = req.query.dbType || 'mysql'
    if (dbType === "mysql") {
        retdata = {};
        con.query("select ROUND((DATA_LENGTH + INDEX_LENGTH) / 1024 / 1024)  as size,table_rows as row_count from information_Schema.tables where table_name like '%" + tName + "%' ", (err, result) => {
            if (err) {
                console.log(err)
            }
            else {
                result = result[0]
                var size = { "Total": null, "Latest": result['size'] }
                var rows = { "Total": result['row_count'], "Latest": result['row_count'] }
                tableSc.findOne({ tName: tName }, (err, result) => {
                    if (err) { console.log(err) }
                    if (result && result.updateSizeList && result.updateSizeList.data && result.updateSizeList.labels) {
                        res.json({ "type": "sucess", "data": { "size": size, "rows": rows, "updateSizeList": result.updateSizeList } })
                        console.log(result, "fetchedcontent resutl")
                    }
                    else {
                        res.json(
                            {
                                "type": "sucess",
                                "data": {
                                    "size": size, "rows": rows,
                                    "updateSizeList": { data: [1, 5, 10, 45, 60, 100, 150, 200], labels: [0, 1, 2, 3, 4, 5, 6, 7] }
                                }
                            })
                        console.log(result, "fetchedcontent resutl")
                    }

                })
            }
        })
    }
    else if (dbType === "pg") {
        postCon.query("select pg_size_pretty( pg_total_relation_size('" + tName + "') ) as size;select count(*) as row_count from " + tName, (err, result) => {
            if (err) {
                console.log(err)
            }
            else {
                result1 = result[1].rows[0]
                result = result[0].rows[0]


                var size = { "Total": result['size'], "Latest": result['size'] }
                var rows = { "Total": result1['row_count'], "Latest": result1['row_count'] }
                tableSc.findOne({ tName: tName, dbType: dbType, dbName: dbName }, (err, result) => {
                    if (err) { return console.log(err) }
                    if (result && result.updateSizeList && result.updateSizeList.data && result.updateSizeList.labels) {
                        res.json({ "type": "sucess", "data": { "size": size, "rows": rows, "updateSizeList": result.updateSizeList } })
                        console.log(result, "fetchedcontent resutl")
                    }
                    else {
                        res.json(
                            {
                                "type": "sucess",
                                "data": {
                                    "size": size, "rows": rows,
                                    "updateSizeList": { data: [1, 5, 10, 45, 60, 100, 150, 200], labels: [0, 1, 2, 3, 4, 5, 6, 7] }
                                }
                            })
                        console.log(result, "fetchedcontent resutl")
                    }

                })
            }
        })

    }
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
    var dbName = req.query.dbName || 'githubdatabase'
    var tName = req.query.tName || 'emp'
    var dbType = req.query.dbType || 'mysql'
    tableSc.findOne({ dbName: dbName, tName: tName, dbType: dbType }, 'tagList', (err, result) => {
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
    var dbName = req.body.dbName || 'githubdatabase'
    var tName = req.body.tName || 'emp'
    var dbType = req.body.dbType || 'mysql'
    var tagList = req.body.updatedTags 
    console.log(dbName,tName,tagList)
    var conditions = { dbName: dbName, tName: tName, dbType: dbType }
        , update = { tagList:tagList }
        , options = { multi: false };
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
    var dbName = req.query.dbName || 'githubdatabase'
    var tName = req.query.tName || 'emp'
    var dbType = req.query.dbType || 'mysql'
    tableSc.findOne({ dbName: dbName, tName: tName, dbType: dbType }, 'onCallList', (err, result) => {
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
    var dbName = req.body.dbName || 'githubdatabase'
    var tName = req.body.tName || 'emp'
    var dbType = req.body.dbType || 'mysql'
    var conditions = { dbName: dbName, tName: tName, dbType: dbType }
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
    var dbName = req.query.dbName || 'githubdatabase'
    var tName = req.query.tName || 'emp'
    var dbType = req.query.dbType || 'mysql'
    console.log({ dbName: dbName, tName: tName, dbType: dbType })
    tableSc.findOne({ dbName: dbName, tName: tName, dbType: dbType }, 'description', (err, result) => {
        if (err) {
            console.log("error occured while finding the description", err)
            return res.json({ 'type': 'fail' })
        }
        else {
            console.log('data sent', result['description'])
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
    var dbName = req.body.dbName || 'githubdatabase'
    var tName = req.body.tName || 'emp'
    var dbType = req.body.dbType || 'mysql'
    var conditions = { dbName: dbName, tName: tName, dbType: dbType }
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