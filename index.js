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
    secret: process.env.SESSION_SECRET, // secret used for generating tokens
    resave: true,// auto save session after request
    saveUninitialized: true,// save session even if it's empty
    cookie: { // options concerning cookie cf npmjs.com/package/express-session
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