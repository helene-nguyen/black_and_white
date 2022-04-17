//!dotenv
require('dotenv').config();

//~import modules
const express = require('express'),
    app = express(),
    router = require('./server/router'),
    errorController = require('./server/controller/error.controller'),
    session = require('express-session');    
//~data locals
    
//~url encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//~statics
app.use('/', express.static(__dirname + '/front/public'));
//~session
app.use(session({
    secret: process.env.SESSION_SECRET, // le "secret" qui va être utilisé pour générer les tokens.
    resave: true,// sauvegarde automatique de la session à la fin de la requête 
    saveUninitialized: true,// sauvegarde de la session même si elle est vide ?
    cookie: { // des options pour le cookie qui contient le token. cf npmjs.com/package/express-session
    }
}));
//~ MW for history visited pages
app.use((req, res, next) => {
    //if not exist, have to create
    if(!req.session.history){
        req.session.history = [];
    }
    //add current url to history
    req.session.history.push(req.url);
    next();
})
//~motor
app.set('view engine', 'ejs');
app.set('views', __dirname + '/front/views');

//*middlewares
app.use(router);

//*error
app.use(errorController._404);

//*launch app
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Running server on http://localhost:${PORT}`);
})