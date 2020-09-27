var express = require('express');
const cors = require('cors')
var app = express();
// var mongoose = require('mongoose');
// var mysqlConnector = require('./DbConnectors/mysql_connector')
var atob = require('atob');
const path = require("path");
const con = require('./DbConnectors/mysql_connector');
//app.use(express.static(path.join(__dirname, "\\Public\\")));
const port = process.env.PORT || 5400;
const datbaseEval =  require('./api/databaseEval')
var YourDBVarName = undefined;
// const appDeatailsSchema = new mongoose.Schema({
    // name: String,
    // views: Number,
    // user: Number,
    // lastUpdate: Date,
    // premiumAvailable: Boolean,
// })

app.use(cors());
var partitionDb = 5;
// var connection = mongoose.connection;
// connection.once('open', function () {
    // connection.db.collection("appDetails", function (err, collection) { YourDBVarName = collection });
// });

// old project
// function mongodbQuery(query) {
//     var final_query = { '$and': [] }
//     var name1 = query.Name[0];
//     var name2 = query.Name[1];
//     var name3 = query.Name[2];
//     var view1 = query.Views[0];
//     var view2 = query.Views[1];
//     var view3 = query.Views[2];
//     var user1 = query.User[0];
//     var user2 = query.User[1];
//     var user3 = query.User[2];
//     var premium = query.Premium;
//     var date1 = query.Date[0];
//     var date2 = query.Date[1];
//     var date3 = query.Date[2];
//     console.log(query)
//     // console.log(query.name[0])
//     var full_object = [name1, name2, name3]

//     for (ac in full_object) {
//         // console.log(ac)
//         var pattern = ""
//         var name_1 = full_object[ac];
//         if (name_1 !== '') {
//             var a = Object.keys(name_1);
//             console.log(a, name_1)
//             if (a == 'Have') pattern = '.*' + name_1[a] + '.*';
//             else if (a == 'End with') pattern = '.*?' + name_1[a] + '$';
//             else if (a == 'Start with') pattern = '^' + name_1[a] + ".*";
//             else if (a == 'dont contain') pattern = '?!.*' + name_1[a] + ".*"
//             if (pattern !== "") { final_query['$and'].push({ 'name': { '$regex': pattern } }) }
//         }
//     }
//     full_object = [view1, view2, view3]
//     for (ac in full_object) {
//         var pattern = ""
//         var view_1 = full_object[ac];
//         if (view_1 !== '') {
//             name_1 = view_1
//             var a = Object.keys(name_1);
//             if (a == 'More than') final_query['$and'].push({ 'views': { '$gte': name_1[a] } });
//             else if (a == 'less than') final_query['$and'].push({ 'views': { '$lte': name_1[a] } });
//             else if (a == 'Equal to') final_query['$eq'].push({ 'views': { '$eq': name_1[a] } });
//         }
//     }

//     full_object = [user1, user2, user3]
//     for (ac in full_object) {
//         var pattern = ""
//         var view_1 = full_object[ac];
//         if (view_1 !== '') {
//             name_1 = view_1
//             var a = Object.keys(name_1);
//             if (a == 'More than') final_query['$and'].push({ 'user': { '$gte': name_1[a] } });
//             else if (a == 'less than') final_query['$and'].push({ 'user': { '$lte': name_1[a] } });
//             else if (a == 'Equal to') final_query['$eq'].push({ 'user': { '$eq': name_1[a] } });
//         }
//     }

//     if (premium[0] == 'Premium') { final_query['$and'].push({ 'premiumAvailable': { '$eq': true } }) }
//     else if (premium[0] == 'Not Premium') { final_query['$and'].push({ 'premiumAvailable': { '$eq': false } }) }

//     full_object = [date1, date2, date3]
//     for (ac in full_object) {
//         var pattern = ""
//         var view_1 = full_object[ac];
//         if (view_1 !== '') {
//             name_1 = view_1
//             var a = Object.keys(name_1);
//             if (a == 'After') final_query['$and'].push({ 'lastUpdate': { '$gte': new Date(name_1[a]) } });
//             else if (a == 'Before') final_query['$and'].push({ 'lastUpdate': { '$lte': new Date(name_1[a]) } });
//             else if (a == 'On') {
//                 final_query['$and'].push({ 'lastUpdate': { '$gte': new Date(name_1[a]) } });

//             }
//         }
//     }
//     console.log(JSON.stringify(final_query))
//     console.log(JSON.stringify(query))
//     return final_query;
// }
// app.get('/home', (req, res) => {
//     res.sendFile(path.join(__dirname, 'progressBar.html'))
// })
// app.get('/dbQuery', function (req, res) {
//     decoded = atob(req.query.query)
//     originalX = JSON.parse(decoded)
//     // console.log(decoded)
//     amp = mongodbQuery(originalX)
//     // console.log(JSON.stringify(amp))
//     res.set({ 'Set-Cookie': 'SameSite:Strict' })
//     if (amp['$and'].length == 0)
//         amp = {}
//     YourDBVarName.find(amp, function (err, data) {
//         if (err) {
//             res.send(err.message);
//         }
//         else {
//             data.toArray((err, data) => {
//                 res.send(data);
//             })

//         }
//     });
// });
// app.get('/smQuery', function (req, res) {
//     res.setHeader('Set-Cookie', 'SameSite:Strict')
//     decoded = atob(req.query.query)


//     YourDBVarName.find({ name: { $regex: '.*' + decoded + ".*" } }, function (err, data) {
//         if (err) {
//             res.send(err.message);
//         }
//         else {
//             console.log({ name: { $regex: '.*' + decoded + ".*" } })
//             data.toArray((err, data) => {
//                 res.send(data);
//             })

//         }
//     });
// });
// app.get("/", (req, res) => {
//     // res.setHeader('access-control-allow-credentials', 'false')
//     // res.setHeader('Set-Cookie', 'SameSite:Strict')
//     res.sendFile(path.join(__dirname, "search.html"));

// })
// function QueryBuilder(parms) {
//     return "1=1"
// }




// new project
app.get("/SearchBig", (req, res) => {
    var database_name = req.query.dName || 'emp2'
    var query_time = new Date()
    var db_length = 0;
    var index = 0
    var query = "d.name like '%a%'" || QueryBuilder(req.query)
    mysqlConnector.query('select count(*) from ' + database_name, (error, result) => {
        if (error) { req.send("error Try later"); console.log('error occured while first request', error); }
        db_length = parseInt(result[0]['count(*)'])
        mysqlConnector.query('select * from ' + database_name + ' join  (select * from ' + database_name + ' limit ' + db_length / partitionDb + ')d on ' + database_name + '.id in (d.id) where ' + query, (error, result) => {
            if (error) { res.send("Try later pls"); console.log("error occured while finding first x terms", error) }
            var time_interval = (new Date() - query_time) * partitionDb;
            res.send({ "exp_time": time_interval, data: result, progress: parseInt(1 / partitionDb * 100) })
        })
    })
})
app.get("/SearchBigContinue", (req, res) => {
    var index = req.query.index || 1
    var db_length = req.query.dbLength || 10040
    var database_name = req.query.dName || 'emp2'
    console.log(index)
    var timeStamp = new Date()
    mysqlConnector.query('select * from ' + database_name + ' join  (select * from ' + database_name + ' limit ' + parseInt(index * db_length / partitionDb) + ',' + db_length / partitionDb + ')d on ' + database_name + '.id in (d.id) where d.name like "%1%"', (error, result) => {
        if (error) { res.send("try later", console.log("error while evaluating join expression", error)) }
        res.send({ data: result, timeInterval: (new Date() - timeStamp), progress: parseInt(index / partitionDb * 100) })
    })

})
app.get('/BigData', (req, res) => {
    // when metadata dont exists;
    var database_name = req.query.dName || 'emp2'

    var data;

    p1 = new Promise(function (resolve, reject) {
        con.query('select emp_no,month(from_date) as from_date from salaries ', (err, result) => {
            if (err) {
                return reject(err)
            }
            resolve(result)
        })
    }).then(ret => { data = ret })
    Promise.all([p1]).then(ret => { res.send(data) })
})


// for datbaseEvalation
app.use('/api',datbaseEval);



// if(process.env.NODE_ENV==='production'){
	app.use(express.static(path.join(__dirname, 'client','build')));
// }


app.use("*",(req,res)=>{
	console.log("sending react index page");
	res.sendFile(path.join(__dirname, 'client','build','index.html'));
})

app.listen(port, () => {
    console.log(`listining on port ${port}`);
});
