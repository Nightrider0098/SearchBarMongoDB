const mongoose = require('mongoose')
const tableSchema = new mongoose.Schema({
    tableId: String,
    tName: String,
    dName: String,
    description: String,
    tagList: Array,
    owner: String,
    onCallList : Array,
    updatedSizeList: Object

})

module.exports = tableSchema