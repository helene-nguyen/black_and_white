//~import modules
const errorController = require('./error.controller'),
    clc = require('cli-color');

//~datamapper
const mainDatamapper = require('../datamapper/main.datamapper');
const addUserInfo = require('./signup.controller');
const { userInfo } = addUserInfo;

//~controller
const mainController = {

    async renderHomePage(req, res, next) {
        
        try {
            //!get first_name register in req.session on sign up controller
            const { first_name } = req.session;

            const navElements = await mainDatamapper.findNavElements();
            res.render('pages/home', {
                navElements,
                namePage: "home",
                title: "Home",
                user: first_name
            });
        } catch (err) {
            errorController._500(err, req, res);
        }

    },
    async renderPages(req, res, next) {

        try {
            const pageURL = req.url.substring(1)
            const pageInfo = req.params.name;
            const navElements = await mainDatamapper.findNavElements();

            if (pageURL === pageInfo) {
                res.render(`pages/${pageInfo}`, {
                    navElements,
                    namePage: pageInfo,
                    title: pageInfo,
                    user:''
                });
                return;
            } else {
                throw new Error('Aucune page trouvée !')
            }


        } catch (err) {
            errorController._500(err, res, res);
        }
    }
}

module.exports = mainController;