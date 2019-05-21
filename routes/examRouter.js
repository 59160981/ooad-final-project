const express = require('express')
const Router = express.Router()
const Term = require('../models/term')
const Course = require('../models/course')
const Room = require('../models/room')
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

courseID = ""
Router.route('/show/:id').get(function (req, res) {
    if (userLogin == "") {
        res.redirect('/home')
    } else {
        courseID = req.params.id
        Term.findOne(function (err, term) {
            Course.findById(courseID, function (err, course) {
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
            Course.findById(courseID, function (err, course) {
                Room.find(function (err, room) {
                    res.render('exam-create', { login: userLoginDetail, term: term, course: course, err: false, room: room })
                })
            })
        })
    }
})

Router.route('/create').post(function (req, res) {
    if (userLogin == "") {
        res.redirect('/home')
    } else {
        Term.findOne(function (err, term) {
            Course.findById(courseID, function (err, course) {
                course.exam.push({
                    type: req.body.type,
                    date: req.body.date,
                    timein: req.body.timein,
                    timeout: req.body.timeout,
                    room: req.body.room,
                    examiner: [],
                    student: [course.subject_student]
                })
                course.save()
                res.render('exam-show', { login: userLoginDetail, term: term, course: course, err: false })
            })
        })
    }
})


Router.route('/addExaminer').get(function (req, res) {
    if (userLogin == "") {
        res.redirect('/home')
    } else {
        var examiner = []
        Term.findOne(function (err, term) {
            Course.findById(courseID, function (err, course) {
                User.find(function (err, user) {
                    for (const i in user) {
                        if (user[i].type != "นิสิต") {
                            examiner.push(user[i])
                        }
                    }
                    res.render('exam-addExaminer', { login: userLoginDetail, term: term, course: course, err: false, user: examiner, userInCoruse: [] })
                })
            })
        })
    }
})

Router.route('/addExaminer').post(function (req, res) {
    if (userLogin == "") {
        res.redirect('/home')
    } else {
        var examiner = []
        var addUser = req.body.addUser
        Term.findOne(function (err, term) {
            Course.findById(courseID, function (err, course) {
                course.exam[0].examiner.push(addUser)
                console.log(course.exam[0].examiner)
                course.save()
                User.find(function (err, user) {
                    for (const i in user) {
                        if (user[i].type != "นิสิต") {
                            examiner.push(user[i])
                        }
                    }
                    User.find({ _id: course.exam[0].examiner }, function (err, userInCoruse) {
                        res.render('exam-addExaminer', { login: userLoginDetail, term: term, course: course, err: false, user: examiner, userInCoruse: userInCoruse })
                    })
                })
            })
        })
    }
})

module.exports = Router