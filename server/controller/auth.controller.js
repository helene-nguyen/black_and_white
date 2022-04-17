//~import modules
const errorController = require("./error.controller"),
    clc = require('cli-color');
//~datamapper
const authDatamapper = require('../datamapper/auth.datamapper');

//~controller
const authController = {
    async addUser(req, res, next) {
        try {
            console.log(clc.bgGreen.black.bold('AUTH OK'));
            next();
        }
        catch (err) {
            errorController._500(err, req, res);
        }
    }
}

module.exports = authController;