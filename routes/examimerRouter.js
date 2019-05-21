const express = require('express')
const Router = express.Router()
const Term = require('../models/term')
const Course = require('../models/course')
const User = require('../models/user')
userLogin = ""

Router.route('/').get(function (req, res) {
    if (userLogin == "") {
        res.redirect('/home')
    } else {
        var examinerCourse = []
        Term.findOne(function (err, term) {
            User.findById(userLogin, function (err, user) {
                Course.find({ _id: user.examiner }, function (err, course) {
                    for (let i = 0; i < course.length; i++) {
                        for (let j = 0; j < course[i].exam.length; j++) {
                            for (let k = 0; k < course[i].exam[j].examiner.length; k++) {
                                if(course[i].exam[j].examiner[k] == userLogin){
                                    examinerCourse.push({
                                        group: course[i].group,
                                        subject_id: course[i].subject_id,
                                        subject_EngName: course[i].subject_EngName,
                                        subject_ThName: course[i].subject_ThName,
                                        room:course[i].exam[j].room,
                                        date:course[i].exam[j].date,
                                        timein:course[i].exam[j].timein,
                                        timeout:course[i].exam[j].timeout
                                    })
                                }
                            }
                        }
                    }
                    res.render('examiner', { login: userLoginDetail, term: term, err: false,course:examinerCourse })
                })
            })
        })
    }
})

module.exports = Router