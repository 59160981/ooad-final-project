const express = require('express')
const Router = express.Router()
const Term = require('../models/term')
userLogin = ""

Router.route('/').get(function (req, res) {
    if (userLogin == "") {
        res.redirect('/home')
    } else {
        Term.findOne(function (err, term) {
            res.render('term', { login: userLoginDetail, term: term })
        })
    }
})

Router.route('/').post(function (req, res) {
    if (userLogin == "") {
        res.redirect('/home')
    } else {
        Term.findOne(function (err, term) {
            term.year = req.body.year
            term.term = req.body.term
            term.save()
            res.render('term', { login: userLoginDetail, term: term })
        })
    }
})

module.exports = Router