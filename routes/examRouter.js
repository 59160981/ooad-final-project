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
                    student: course.subject_student
                })
                course.save()
                res.render('exam-show', { login: userLoginDetail, term: term, course: course, err: false })
            })
        })
    }
})


Router.route('/delete').post(function (req, res) {
    if (userLogin == "") {
        res.redirect('/home')
    } else {
        const roomID = req.body.deleteRoom
        Term.findOne(function (err, term) {
            Course.findById(courseID, function (err, course) {
                for (let i = 0; i < course.exam.length; i++) {
                    if (course.exam[i].type == roomID) {
                        for (let j = 0; j < course.exam[i].examiner.length; j++) {
                            User.findById(course.exam[i].examiner[j],function(err,user){
                                if (user.examiner[i] == course._id) {
                                    user.examiner.splice(i, 1)
                                    user.save()
                                }
                            })
                        }
                        course.exam.splice(i, 1)
                        course.save()
                    }
                }
                res.render('exam-show', { login: userLoginDetail, term: term, course: course, err: false })
            })
        })
    }
})

type = ""
index = 0
Router.route('/addExaminer/:type').get(function (req, res) {
    if (userLogin == "") {
        res.redirect('/home')
    } else {
        type = req.params.type
        var examiner = []
        var examinerInCourse = []
        Term.findOne(function (err, term) {
            Course.findById(courseID, function (err, course) {
                for (let i = 0; i < course.exam.length; i++) {
                    if (course.exam[i].type == type) {
                        index = i
                    }
                }
                for (let i = 0; i < course.exam[index].examiner.length; i++) {
                    User.findById(course.exam[index].examiner[i], function (err, userInCoruse) {
                        examinerInCourse.push(userInCoruse)
                    })
                }
                User.find(function (err, user) {
                    for (const i in user) {
                        if (user[i].type != "นิสิต") {
                            examiner.push(user[i])
                        }
                    }
                    res.render('exam-addExaminer', { login: userLoginDetail, term: term, course: course, err: false, user: examiner, userInCoruse: examinerInCourse })
                })
            })
        })
    }
})

Router.route('/addExaminer').post(function (req, res) {
    if (userLogin == "") {
        res.redirect('/home')
    } else {
        var addUser = req.body.addUser
        var sum = 0

        Course.findById(courseID, function (err, course) {
            for (let i = 0; i < course.exam[index].examiner.length; i++) {
                if (addUser == course.exam[index].examiner[i]) {
                    sum++
                }
            }
            if (sum == 0) {
                course.exam[index].examiner.push(addUser)
                User.findById(addUser, function (err, user) {
                    user.examiner.push(course._id)
                    user.save()
                })
                course.save()
            }
        })
        res.redirect('addExaminer/${type}')
    }
})

Router.route('/deleteExaminer').post(function (req, res) {
    if (userLogin == "") {
        res.redirect('/home')
    } else {
        const userid = req.body.deleteUser
        Course.findById(courseID, function (err, course) {
            for (let i = 0; i < course.exam[index].examiner.length; i++) {
                if (course.exam[index].examiner[i] == userid) {
                    course.exam[index].examiner.splice(i, 1)
                }
            }
            User.findById(userid, function (err, user) {
                for (let i = 0; i < user.examiner.length ; i++) {
                    if (user.examiner[i] == course._id) {
                        user.examiner.splice(i, 1)
                        user.save()
                    }
                }
            })
            course.save()
            res.redirect('addExaminer/${type}')
        })
    }
})
module.exports = Router