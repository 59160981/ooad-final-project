const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Subject = new Schema({
    subject_id: { type: String },
    subject_EngName: { type: String },
    subject_ThName: { type: String },
    subject_credit: { type: String }
}, {
        collection: 'subject'
    })

module.exports = mongoose.model('Subject', Subject)