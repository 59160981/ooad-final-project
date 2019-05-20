const express = require('express')
const Router = express.Router()
const User = require('../models/user')
const Term = require('../models/term')
userLogin = ""

Router.route('/').get(function (req, res) {
    res.render('login', { err: false })
});

Router.route("/login").post(function (req, res) {
    const username = req.body.username
    const password = req.body.password
    User.findOne({ username: username, password: password }, function (err, user) {
        if (user) {
            userLogin = user._id
            res.redirect('/home/index')
        } else {
            res.render("login", { err: true })
        }
    })
})

Router.route('/index').get(function (req, res) {
    if (userLogin == "") {
        res.redirect('/home')
    } else {
        User.findById(userLogin, function (err, user) {
            userLoginDetail = user.firstName + " " + user.lastName
            Term.findOne(function (err, term) {
                res.render('index', { login: userLoginDetail, user: user, term: term })
            })
        })
    }
})

module.exports = Router