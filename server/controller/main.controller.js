//~import modules
const errorController = require('./error.controller'),
    clc = require('cli-color');

//~datamapper
const mainDatamapper = require('../datamapper/main.datamapper');
const signinDatamapper = require('../datamapper/signin.datamapper'),
    {
        getAllInputNames
    } = signinDatamapper;

//~controller
const mainController = {

    async renderHomePage(req, res, next) {
        try {
            const navElements = await mainDatamapper.findNavElements();
            res.render('pages/home', {
                navElements,
                namePage: "home",
                title: "Home"
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
            const allInputNames = await getAllInputNames();
            console.log(allInputNames);
            

            if (pageURL === pageInfo) {
                res.render(`pages/${pageInfo}`, {
                    navElements,
                    namePage: pageInfo,
                    title: pageInfo,
                    allInputNames
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