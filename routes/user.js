const { Router } = require('express');
const { 
        getUser, 
        postUser, 
        patchUser, 
        deleteUser, 
        putUser 
                    } = require('../conroles/user');

const router = Router();


router.get('/', getUser);

router.put('/:id?', putUser);

router.post('/', postUser);

router.patch('/', patchUser);

router.delete('/', deleteUser);

router.get('*', (req,res) => res.sendStatus(404));

/*
router.get('/api', (req,res) => {
    res.send('Quibo raza');
});
*/


module.exports = router;