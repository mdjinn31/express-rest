const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');

const {validateFields} = require('../middlewares/validate-fields');
const {userExists} = require('../herlpers/db-validations');


const router = Router();

router.post('/login',
            [
                check('email', 'Please enter a valid emai').isEmail().custom(userExists),
                check('password', 'Please enter a password').not().isEmpty(),
                validateFields
            ]
            ,login);

module.exports = router;    