//~import modules
const { Router } = require('express');
const router = Router();
const mainController = require('./controller/main.controller');
const { renderHomePage, renderPages } = mainController;
const signinController = require('./controller/signin.controller');
const { addUser } = signinController;

//~router
router.get('/', renderHomePage);
router.get('/:name', renderPages);
router.post('/:name', addUser, renderPages );

module.exports = router;
