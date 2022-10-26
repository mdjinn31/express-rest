const { Router } = require('express');
const { check } = require('express-validator');

const { 
        getUser, 
        postUser, 
        patchUser, 
        deleteUser, 
        putUser 
                    } = require('../controllers/user');

const router = Router();


router.get('/', getUser);

router.put('/:id?', putUser);

router.post('/', [
                check('name', "Name must be included").not().isEmpty(),
                check('password', "Password must be included").isLength({min: 8}),
                check('email', "Email must be valid email").isEmail(),
                check('role', "Role must be included").not().isEmpty()
            ],            
            postUser);

router.patch('/', patchUser);

router.delete('/', deleteUser);

router.get('*', (req,res) => res.sendStatus(404));

/*
router.get('/api', (req,res) => {
    res.send('Quibo raza');
});
*/


module.exports = router;