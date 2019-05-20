const express = require('express')
const Router = express.Router()
const Term = require('../models/term')
const Course = require('../models/course')
const Subject = require('../models/subject')
const User = require('../models/user')
userLogin = ""

Router.route('/').get(function (req, res) {
    if (userLogin == "") {
        res.redirect('/home')
    } else {
        Term.findOne(function (err, term) {
            Course.find({ term: term.term, year: term.year }, function (err, course) {
                res.render('exam', { login: userLoginDetail, term: term, course: course, err: false })
            })
        })
    }
})

Router.route('/show/:id').get(function (req, res) {
    if (userLogin == "") {
        res.redirect('/home')
    } else {
        const id = req.params.id
        Term.findOne(function (err, term) {
            Course.findById(id, function (err, course) {
                console.log("Course : " + course)
                res.render('exam-show', { login: userLoginDetail, term: term, course: course, err: false })
            })
        })
    }
})

Router.route('/create').get(function (req, res) {
    if (userLogin == "") {
        res.redirect('/home')
    } else {
        Term.findOne(function (err, term) {
            Course.find({ term: term.term, year: term.year }, function (err, course) {
                res.render('exam', { login: userLoginDetail, term: term, course: course, err: false })
            })
        })
    }
})

module.exports = Router