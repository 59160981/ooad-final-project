const express = require('express')
const Router = express.Router()
const Term = require('../models/term')
const Subject = require('../models/subject')
userLogin = ""

Router.route('/').get(function (req, res) {
    if (userLogin == "") {
        res.redirect('/home')
    } else {
        Subject.find(function (err, subject) {
            Term.findOne(function (err, term) {
                res.render('subject', { login: userLoginDetail, subject: subject, term: term })
            })
        })
    }
})

Router.route('/create').get(function (req, res) {
    if (userLogin == "") {
        res.redirect('/home')
    } else {
        Term.findOne(function (err, term) {
            res.render('addSubject', { login: userLoginDetail, term: term, err: false })
        })
    }
})

Router.route('/create').post(function (req, res) {
    if (userLogin == "") {
        res.redirect('/home')
    } else {
        const data = Subject(req.body)
        const subject_id = req.body.subject_id
        Subject.findOne({ subject_id: subject_id }, function (err, subject) {
            if (subject) {
                Term.findOne(function (err, term) {
                    res.render('addSubject', { login: userLoginDetail, term: term, err: true })
                })
            } else {
                data.save()
                res.redirect('/home/subject')
            }
        })
    }
})

Router.route('/delete/:id').get(function (req, res) {
    if (userLogin == "") {
        res.redirect('/home')
    } else {
        const id = req.params.id
        Subject.findByIdAndRemove(id, function (err, subject) {
            res.redirect('/home/subject')
        })
    }
})

Router.route('/edit/:id').get(function (req, res) {
    if (userLogin == "") {
        res.redirect('/home')
    } else {
        const id = req.params.id
        Subject.findById(id, function (err, subject) {
            Term.findOne(function (err, term) {
                res.render('editSubject', { login: userLoginDetail, subject: subject, term: term, err: false })
            })
        })
    }
})

Router.route('/edit/:id').post(function (req, res) {
    if (userLogin == "") {
        res.redirect('/home')
    } else {
        const id = req.params.id
        Subject.findById(id, function (err, subject) {
            subject.subject_id = req.body.subject_id
            subject.subject_ThName = req.body.subject_ThName
            subject.subject_EngName = req.body.subject_EngName
            subject.subject_credit = req.body.subject_credit
            subject.save()
            res.redirect('/home/subject')
        })
    }
})

module.exports = Router