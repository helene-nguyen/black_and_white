//~import modules
const errorController = require("./error.controller"),
    clc = require('cli-color');
//~datamapper
const mainDatamapper = require('../datamapper/main.datamapper');

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

            if (pageURL === pageInfo) {
                res.render(`pages/${pageInfo}`, {
                    navElements,
                    namePage: pageInfo,
                    title: pageInfo
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