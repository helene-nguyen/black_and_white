//~import modules
const { Router } = require('express');
const router = Router();
const mainController = require('./controller/main.controller');
const { renderHomePage, renderPages } = mainController;
const signupController = require('./controller/signup.controller');
const { rendersignupPage , addUserForm } = signupController;
const historyController = require('./controller/history.controller');
const { renderHistoryPage } = historyController;

//~router
router.get('/', renderHomePage);
router.post('/', addUserForm, renderHomePage); //TODO put here addUser
router.get('/:name', renderPages);
router.post('/signup', rendersignupPage);
router.post('/history', renderHistoryPage);
module.exports = router;
