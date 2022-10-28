const { Router } = require('express');
const { check } = require('express-validator');

const {validateFields} = require('../middlewares/validate-fields');
const {validateRole, validEmail, validateId} = require('../herlpers/db-validations');

const { 
        getUser, 
        postUser, 
        patchUser, 
        deleteUser, 
        putUser } = require('../controllers/user');

const router = Router();


router.get('/', getUser);

router.put('/:id?',
            [
                check('id', `'It's not a valid Mongo ID`).isMongoId(),
                check('id').custom(validateId),
                check('password', "Password must be 8 chars long").optional().isLength({min: 8}),
                check('email', "Email must be valid email").optional().isEmail().custom(validEmail),
                check('role').optional().custom(validateRole),
                validateFields,
            ],
            putUser);

router.post('/', 
            [
                check('name', "Name must be included").not().isEmpty(),
                check('password', "Password must be 8 chars long").isLength({min: 8}),
                check('email', "Email must be valid email").isEmail(),
                check('email').custom(validEmail),
                check('role').custom(validateRole),
                validateFields,
            ],            
            postUser);

router.patch('/', patchUser);

router.delete('/', deleteUser);

router.get('*', (req,res) => res.sendStatus(404));


module.exports = router;