const { Router } = require('express');
const { check } = require('express-validator');

const {validateFields} = require('../middlewares/validate-fields');
const Role = require('../models/role');

const { 
        getUser, 
        postUser, 
        patchUser, 
        deleteUser, 
        putUser } = require('../controllers/user');

const router = Router();



router.get('/', getUser);

router.put('/:id?', putUser);

router.post('/', [
                check('name', "Name must be included").not().isEmpty(),
                check('password', "Password must be 8 chars long").isLength({min: 8}),
                check('email', "Email must be valid email").isEmail(),
                check('role').custom( async(role = '') => {
                    const roleExists = await Role.findOne({role});
                    if(!roleExists){
                        throw new Error(`The rol: ${role} is not allows, please add role in DB`);
                    }
                }),
                validateFields,
            ],            
            postUser);

router.patch('/', patchUser);

router.delete('/', deleteUser);

router.get('*', (req,res) => res.sendStatus(404));


module.exports = router;