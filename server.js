var express = require('express');
const session = require('express-session');
var app = express();
var mongoose = require('mongoose');
var atob = require('atob');
const path = require("path");
app.use(express.static(path.join(__dirname, "\\Public\\")));
mongoose.connect('mongodb://localhost/student', { useNewUrlParser: true, useUnifiedTopology: true });
const port = process.env.PORT || 5400;
var YourDBVarName = undefined;
const appDeatailsSchema = new mongoose.Schema({
    name: String,
    views: Number,
    user: Number,
    lastUpdate: Date,
    premiumAvailable: Boolean,
})

var connection = mongoose.connection;
connection.once('open', function () {
    connection.db.collection("appDetails", function (err, collection) { YourDBVarName = collection });
});

function mongodbQuery(query) {
    var final_query = { '$and': [] }
    var name1 = query.name[0];
    var name2 = query.name[1];
    var name3 = query.name[2];
    var view1 = query.view[0];
    var view2 = query.view[1];
    var view3 = query.view[2];
    var user1 = query.user[0];
    var user2 = query.user[1];
    var user3 = query.user[2];
    var premium = query.premium[0];
    var date1 = query.date[0];

    // console.log(query.name[0])
    var full_object = [name1, name2, name3]

    for (ac in full_object) {
        // console.log(ac)
        var pattern = ""
        var name_1 = full_object[ac];
        if (name_1 !== '') {
            var a = Object.keys(name_1);
            console.log(a, name_1)
            if (a == 'Have') pattern = '.*' + name_1[a] + '.*';
            else if (a == 'End with') pattern = '.*?' + name_1[a] + '$';
            else if (a == 'Start with') pattern = '^' + name_1[a] + ".*";
            else if (a == 'dont contain') pattern = '?!.*' + name_1[a] + ".*"
            if (pattern !== "") { final_query['$and'].push({ 'name': { '$regex': pattern } }) }
        }
    }
    full_object = [view1, view2, view3]
    for (ac in full_object) {
        var pattern = ""
        var view_1 = full_object[ac];
        if (view_1 !== '') {
            name_1 = view_1
            var a = Object.keys(name_1);
            if (a == 'More than') final_query['$and'].push({ 'views': { '$gte': name_1[a] } });
            else if (a == 'less than') final_query['$and'].push({ 'views': { '$lte': name_1[a] } });
            else if (a == 'Equal to') final_query['$eq'].push({ 'views': { '$eq': name_1[a] } });
        }
    }

    full_object = [user1, user2, user3]
    for (ac in full_object) {
        var pattern = ""
        var view_1 = full_object[ac];
        if (view_1 !== '') {
            name_1 = view_1
            var a = Object.keys(name_1);
            if (a == 'More than') final_query['$and'].push({ 'user': { '$gte': name_1[a] } });
            else if (a == 'less than') final_query['$and'].push({ 'user': { '$lte': name_1[a] } });
            else if (a == 'Equal to') final_query['$eq'].push({ 'user': { '$eq': name_1[a] } });
        }
    }

    if (premium == '1') { final_query['$and'].push({ 'premiumAvailable': { '$eq': true } }) }
    else { final_query['$and'].push({ 'premiumAvailable': { '$eq': false } }) }

    full_object = [date1]
    for (ac in full_object) {
        var pattern = ""
        var view_1 = full_object[ac];
        if (view_1 !== '') {
            name_1 = view_1
            var a = Object.keys(name_1);
            if (a == 'After') final_query['$and'].push({ 'lastUpdate': { '$gte': new Date(name_1[a]) } });
            else if (a == 'Before') final_query['$and'].push({ 'lastUpdate': { '$lte': new Date(name_1[a]) } });
            else if (a == 'Between') {
                final_query['$and'].push({ 'lastUpdate': { '$gte': new Date(name_1[a]) } });
                final_query['$and'].push({ 'lastUpdate': { '$lte': new Date(Object.values(query.date[1])) } });
            }
        }
    }
    console.log(JSON.stringify(final_query))
    console.log(JSON.stringify(query))
    return final_query;
}


app.get('/dbQuery', function (req, res) {
    decoded = atob(req.query.query)
    originalX = JSON.parse(decoded)
    // console.log(decoded)
    amp = mongodbQuery(originalX)
    // console.log(JSON.stringify(amp))
    res.set({ 'Set-Cookie': 'SameSite:Strict' })
    YourDBVarName.find(amp, function (err, data) {
        if (err) {
            res.send(err.message);
        }
        else {
            data.toArray((err, data) => {
                res.send(data);
            })

        }
    });
});


app.get('/smQuery', function (req, res) {
    res.setHeader('Set-Cookie', 'SameSite:Strict')
    decoded = atob(req.query.query)


    YourDBVarName.find({ name: { $regex: '.*' + decoded + ".*" } }, function (err, data) {
        if (err) {
            res.send(err.message);
        }
        else {
            console.log({ name: { $regex: '.*' + decoded + ".*" } })
            data.toArray((err, data) => {
                res.send(data);
            })

        }
    });
});


app.get("/", (req, res) => {
    res.setHeader('access-control-allow-credentials', 'false')
    res.setHeader('Set-Cookie', 'SameSite:Strict')
    res.sendFile("C:\\Users\\Admin\\Desktop\\Project\\USA\\search.html");
})

app.listen(port, () => {
    console.log(`listining on port ${port}`);
});
