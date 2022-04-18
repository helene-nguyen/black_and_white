//~import modules
const errorController = require("./error.controller"),
    clc = require('cli-color');
//~datamapper
const signinDatamapper = require('../datamapper/signin.datamapper');
const {
    addUser,
    getAllInputNames
} = signinDatamapper;

//~controller
const signinController = {
    //add user
    async addUser(req, res, next) {
        try {
            console.log(clc.bgGreen.black.bold('signin OK'));
            console.log(req.body);
            next();
        } catch (err) {
            errorController._500(err, req, res);
        }
    }
}

module.exports = signinController;