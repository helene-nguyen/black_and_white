//~import modules
const { Router } = require('express');
const router = Router();
const mainController = require('./controller/main.controller');
const { renderHomePage, renderPages } = mainController;
const signinController = require('./controller/signin.controller');
const { addUser, createSignInForm } = signinController;

//~router
router.get('/', renderHomePage);
router.get('/:name', renderPages);
router.post('/:name', createSignInForm, addUser, renderPages );

module.exports = router;
