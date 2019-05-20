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
                res.render('course', { login: userLoginDetail, term: term, course: course, err: false })
            })
        })
    }
})

Router.route('/').post(function (req, res) {
    if (userLogin == "") {
        res.redirect('/home')
    } else {
        const subject_id = req.body.subject_idAdd
        const numGroup = parseInt(req.body.numberGroup)
        Term.findOne(function (err, term) {
            Subject.findOne({ subject_id: subject_id }, function (err, subject) {
                if (subject) {
                    Course.find({ term: term.term, year: term.year, subject_id: subject_id }, function (err, course) {
                        if (course.length == 0) {
                            for (let i = 0; i < numGroup; i++) {
                                var Data = new Course({
                                    year: term.year,
                                    term: term.term,
                                    group: i + 1,
                                    subject_id: subject.subject_id,
                                    subject_EngName: subject.subject_EngName,
                                    subject_ThName: subject.subject_ThName,
                                    subject_credit: subject.subject_credit,
                                    subject_teacher: [],
                                    subject_student: [],
                                    exam:[{
                                        type: "",
                                        room: "",
                                        timein: "",
                                        timeout: "",
                                        date: "",
                                        examiner: []
                                    }]
                                })
                                Data.save()
                            }
                        } else {
                            for (let i = 0; i < numGroup; i++) {
                                var Data = new Course({
                                    year: term.year,
                                    term: term.term,
                                    group: course.length + 1,
                                    subject_id: subject.subject_id,
                                    subject_EngName: subject.subject_EngName,
                                    subject_ThName: subject.subject_ThName,
                                    subject_credit: subject.subject_credit,
                                    subject_teacher: [],
                                    subject_student: [],
                                    exam:[{
                                        type: "",
                                        room: "",
                                        timein: "",
                                        timeout: "",
                                        date: "",
                                        examiner: []
                                    }]
                                })
                                Data.save()
                            }
                        }
                    })
                    Course.find({ term: term.term, year: term.year }, function (err, course) {
                        res.render('course', { login: userLoginDetail, term: term, course: course, err: false })
                    })
                } else {
                    Course.find({ term: term.term, year: term.year }, function (err, course) {
                        res.render('course', { login: userLoginDetail, term: term, course: course, err: true })
                    })
                }
            })
        })
    }
})

Router.route('/delete/:id').get(function (req, res) {
    if (userLogin == "") {
        res.redirect('/home')
    } else {
        const id = req.params.id
        Course.findByIdAndRemove(id, function (err, course) {
            res.redirect('/home/course')
        })
    }
})

courseID = ""
Router.route('/addStudent/:id').get(function (req, res) {
    if (userLogin == "") {
        res.redirect('/home')
    } else {
        courseID = req.params.id
        Course.findById(courseID, function (err, course) {
            Term.findOne(function (err, term) {
                User.find({ type: "นิสิต" }, function (err, user) {
                    User.find({ _id: course.subject_student }, function (err, userInCoruse) {
                        res.render('course-addStudent', { login: userLoginDetail, term: term, course: course, err: false, user: user, userInCoruse: userInCoruse })
                    })
                })
            })
        })
    }
})

Router.route('/addStudent').post(function (req, res) {
    if (userLogin == "") {
        res.redirect('/home')
    } else {
        const userid = req.body.addUser
        Course.findById(courseID, function (err, course) {
            console.log(course)
            Course.findOne({ subject_student: userid, subject_id: course.subject_id, year: course.year, term: course.term }, function (err, userInCoruse) {
                console.log(userInCoruse)

                if (!userInCoruse) {
                    User.findById(userid, function (err, user) {
                        user.subject.push(courseID)
                        user.save()
                    })
                    course.subject_student.push(userid)
                    course.save()
                }
            })
            Term.findOne(function (err, term) {
                User.find({ type: "นิสิต" }, function (err, user) {
                    User.find({ _id: course.subject_student }, function (err, userInCoruse) {
                        res.render('course-addStudent', { login: userLoginDetail, term: term, course: course, err: false, user: user, userInCoruse: userInCoruse })
                    })
                })
            })
        })
    }
})

Router.route('/deleteStudent').post(function (req, res) {
    if (userLogin == "") {
        res.redirect('/home')
    } else {
        const userid = req.body.deleteUser
        Course.findById(courseID, function (err, course) {
            for (let i = 0; i < course.subject_student.length; i++) {
                if (course.subject_student[i] == userid) {
                    course.subject_student.splice(i, 1)
                }
            }
            course.save()
            Term.findOne(function (err, term) {
                User.find({ type: "นิสิต" }, function (err, user) {
                    User.find({ _id: course.subject_student }, function (err, userInCoruse) {
                        res.render('course-addStudent', { login: userLoginDetail, term: term, course: course, err: false, user: user, userInCoruse: userInCoruse })
                    })
                })
            })
        })
    }
})

courseID = ""
Router.route('/addTeacher/:id').get(function (req, res) {
    if (userLogin == "") {
        res.redirect('/home')
    } else {
        courseID = req.params.id
        Course.findById(courseID, function (err, course) {
            Term.findOne(function (err, term) {
                User.find({ type: "อาจารย์" }, function (err, user) {
                    User.find({ _id: course.subject_teacher }, function (err, userInCoruse) {
                        res.render('course-addTeacher', { login: userLoginDetail, term: term, course: course, err: false, user: user, userInCoruse: userInCoruse })
                    })
                })
            })
        })
    }
})

Router.route('/addTeacher').post(function (req, res) {
    if (userLogin == "") {
        res.redirect('/home')
    } else {
        const userid = req.body.addUser
        Course.findById(courseID, function (err, course) {
            Course.findOne({ subject_teacher: userid, _id: course._id}, function (err, userInCoruse) {
                if (!userInCoruse) {
                    User.findById(userid, function (err, user) {
                        user.subject.push(courseID)
                        user.save()
                    })
                    course.subject_teacher.push(userid)
                    course.save()
                }
            })
            Term.findOne(function (err, term) {
                User.find({ type: "อาจารย์" }, function (err, user) {
                    User.find({ _id: course.subject_teacher }, function (err, userInCoruse) {
                        res.render('course-addTeacher', { login: userLoginDetail, term: term, course: course, err: false, user: user, userInCoruse: userInCoruse })
                    })
                })
            })
        })
    }
})

Router.route('/deleteTeacher').post(function (req, res) {
    if (userLogin == "") {
        res.redirect('/home')
    } else {
        const userid = req.body.deleteUser
        Course.findById(courseID, function (err, course) {
            for (let i = 0; i < course.subject_teacher.length; i++) {
                if (course.subject_teacher[i] == userid) {
                    course.subject_teacher.splice(i, 1)
                }
            }
            course.save()
            Term.findOne(function (err, term) {
                User.find({ type: "อาจารย์" }, function (err, user) {
                    User.find({ _id: course.subject_teacher }, function (err, userInCoruse) {
                        res.render('course-addTeacher', { login: userLoginDetail, term: term, course: course, err: false, user: user, userInCoruse: userInCoruse })
                    })
                })
            })
        })
    }
})
module.exports = Router