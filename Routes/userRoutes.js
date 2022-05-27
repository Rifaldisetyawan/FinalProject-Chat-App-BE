const { register } = require('../Controllers/userController');


const router = require('express').Router();

router.post('/register',register)

module.exports = router;