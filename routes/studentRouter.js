const express = require('express')
const Router = express.Router()
const User = require('../models/user')
const Term = require('../models/term')
const Course = require('../models/course')

userLogin = ""

Router.route('/').get(function (req, res) {
    if (userLogin == "") {
        res.redirect('/home')
    } else {
        User.findById(userLogin, function (err, user) {
            Course.find({_id:user.subject},function (err, course) {
                Term.findOne(function (err, term) {
                    res.render('student', { login: userLoginDetail, term: term, course: course })
                })
            })
        })
    }
})
module.exports = Router