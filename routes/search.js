
const { Router } = require('express');
const { check } = require('express-validator');
const { search } = require('../controllers/search');
const { isValidCategory } = require('../herlpers/db-validations');
const { validateFields  } = require('../middlewares');

const router = Router();

router.get('/:colection/:term',search);

/*
router.get('/cat/:colection/:term', 
            [
                check('colection').custom(isValidCategory),
                validateFields
            ], 
            search);
*/
module.exports = router;