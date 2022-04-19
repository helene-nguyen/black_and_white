//~import modules
const errorController = require("./error.controller"),
    clc = require('cli-color');


//~controller
const historyController = {
    //renderHistoryPage
    async renderHistoryPage(req, res, next) {
        try {
            res.render('pages/history', {
                title: 'History',
                namePage: 'history'
            });
        } catch (err) {
            errorController._500(err, req, res);
        }
    }
}

module.exports = historyController;