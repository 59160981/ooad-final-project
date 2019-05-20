const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Build = new Schema({
    buildID: { type: String },
    name: { type: String }
}, {
        collection: 'build'
    })

module.exports = mongoose.model('Build', Build)