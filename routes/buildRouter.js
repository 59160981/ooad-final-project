const express = require('express')
const Router = express.Router()
const Build = require('../models/build')
const Term = require('../models/term')
userLogin = ""

Router.route('/').get(function (req, res) {
    if (userLogin == "") {
        res.redirect('/home')
    } else {
        Term.findOne(function (err, term) {
            Build.find(function (err, build) {
                res.render('build', { login: userLoginDetail, build: build, term: term })
            })
        })
    }
})

Router.route('/create').get(function (req, res) {
    if (userLogin == "") {
        res.redirect('/home')
    } else {
        const addRoom = 0
        Term.findOne(function (err, term) {
            res.render('addBuild', { login: userLoginDetail, err: false, addRoom: addRoom, term: term })
        })
    }
})

Router.route('/create').post(function (req, res) {
    if (userLogin == "") {
        res.redirect('/home')
    } else {
        const buildID = req.body.buildID
        const DataBuild = new Build(req.body)
        Build.findOne({ buildID: buildID }, function (err, buildInServer) {
            if (buildInServer) {
                Term.findOne(function (err, term) {
                    res.render('addBuild', { login: userLoginDetail, err: true, term: term })
                })
            } else {
                console.log(DataBuild)
                DataBuild.save()
                res.redirect('/home/build')
            }
        })
    }
})

Router.route('/delete/:id').get(function (req, res) {
    if (userLogin == "") {
        res.redirect('/home')
    } else {
        const id = req.params.id
        Build.findByIdAndRemove(id, function (err, build) {
            res.redirect('/home/build')
        })
    }
})

Router.route('/edit/:id').get(function (req, res) {
    if (userLogin == "") {
        res.redirect('/home')
    } else {
        const id = req.params.id
        Build.findById(id, function (err, build) {
            Term.findOne(function (err, term) {
                res.render('editBuild', { login: userLoginDetail, build: build, term: term })
            })
        })
    }
})

Router.route('/edit/:id').post(function (req, res) {
    if (userLogin == "") {
        res.redirect('/home')
    } else {
        const id = req.params.id
        Build.findById(id, function (err, build) {
            build.buildID = req.body.buildID
            build.name = req.body.name
            build.save()
            res.redirect('/home/build')
        })
    }
})

module.exports = Router