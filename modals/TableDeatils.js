const mongoose = require('mongoose')
const tableSchema = new mongoose.Schema({
    tableId: String,
    tableName: String,
    Description: String,
    tags: Object,
    Owner: String,
    createdBy: String,
    createdAt: String,
    LastModified: String,
    dataQuality: String,
    updatedSizeList: Object

})

module.exports = tableSchema