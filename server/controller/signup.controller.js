//~import modules
const errorController = require("./error.controller"),
    clc = require('cli-color');
//~datamapper
const mainDatamapper = require('../datamapper/main.datamapper')
const signupDatamapper = require('../datamapper/signup.datamapper');
const {
    addUser,
    getAllInputNames
} = signupDatamapper;

//~controller
const signupController = {
    //&render signup page
    async rendersignupPage(req, res, next) {
        console.log(clc.bgGreen.black.bold('signup OK'));
        const navElements = await mainDatamapper.findNavElements();
        const allInputNames = await getAllInputNames();

        try {
            res.render('pages/signup', {
                title: 'Sign Up',
                namePage: 'signup',
                navElements,
                allInputNames
            })
        } catch (err) {
            errorController._500(err, req, res);
        }
    },
    //&add user
    async addUserForm(req, res, next) {
        try {
            console.log(clc.bgGreen.black.bold('renderUser OK'));
            const userInfo = req.body;
            const userLogin = req.body.first_name;
            //!register in req.session
            req.session.first_name = userLogin;

            const inserted = await signupDatamapper.addUser(userInfo);

            if (inserted) {
                res.redirect('/');
                //TODO 
            } else {
                throw new Error('Any profile have been created')
            }

        } catch (err) {
            errorController._500(err, req, res);
        }
    }
}

module.exports = signupController;