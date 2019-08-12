const express = require('express');
const router = express.Router();
const middleware = require('../middleware');

/**
 * @route /
 * @method GET
 * @description Displays a not allowed message
 * @access Public
*/
router.get('/', middleware.isAlreadyLoggedIn, (req, res) => {
  res.render('index');
});

/**
 * @route /testing
 * @method GET
 * @description TESTING ROUTE
 * @access Public
*/
if (process.env.NODE_ENV !== 'production') {
  router.get('/test', (req, res) => {
    res.send(req.user);
  });
};
module.exports = router;
