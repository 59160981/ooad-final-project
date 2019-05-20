const express = require('express')
const Router = express.Router()
const User = require('../models/user')
const Term = require('../models/term')
userLogin = ""

Router.route('/').get(function (req, res) {
    if (userLogin == "") {
        res.redirect('/home')
    } else {
        User.find(function (err, users) {
            Term.findOne(function (err, term) {
                res.render('users', { login: userLoginDetail, users: users, term: term })
            })
        })
    }
})

Router.route('/create').get(function (req, res) {
    if (userLogin == "") {
        res.redirect('/home')
    } else {
        Term.findOne(function (err, term) {
            res.render('addUsers', { login: userLoginDetail, err: false, term: term })
        })
    }
})

Router.route('/create').post(function (req, res) {
    if (userLogin == "") {
        res.redirect('/home')
    } else {
        const DataUser = new User(req.body)
        const username = req.body.username
        User.findOne({ username: username }, function (err, userInServer) {
            if (userInServer) {
                User.find(function (err, users) {
                    Term.findOne(function (err, term) {
                        res.render('addUsers', { login: userLoginDetail, err: true, term: term })
                    })
                })
            } else {
                DataUser.save()
                res.redirect('/home/users')
            }
        })
    }
})

Router.route('/edit/:id').get(function (req, res) {
    if (userLogin == "") {
        res.redirect('/home')
    } else {
        const id = req.params.id
        User.findById(id, function (err, user) {
            Term.findOne(function (err, term) {
                res.render('edit', { login: userLoginDetail, user: user, term: term })
            })
        })
    }
})

Router.route('/edit/:id').post(function (req, res) {
    if (userLogin == "") {
        res.redirect('/home')
    } else {
        const id = req.params.id
        User.findById(id, function (err, user) {
            user.username = req.body.username
            user.password = req.body.password
            user.firstName = req.body.firstName
            user.lastName = req.body.lastName
            user.type = req.body.type
            user.subject = []
            user.save()
            res.redirect('/home/users')
        })
    }
})

Router.route('/delete/:id').get(function (req, res) {
    if (userLogin == "") {
        res.redirect('/home')
    } else {
        const id = req.params.id
        User.findByIdAndRemove(id , function (err, user) {
            res.redirect('/home/users')
        })
    }
})

module.exports = Router