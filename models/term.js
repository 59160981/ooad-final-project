const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Term = new Schema({
    year: { type: String },
    term: { type: String }
}, {
        collection: 'semester'
    })

module.exports = mongoose.model('Term', Term)