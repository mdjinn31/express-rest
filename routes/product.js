
const { Router } = require('express');
const { check } = require('express-validator');
const { createProduct, getProducts } = require('../controllers/product');
const { validateJWT, validateFields } = require('../middlewares');


const router = Router();

const msg = {
    error:{
        no: " Not Found"
    },
    ok:{
        ok: "Enter in Products",
        check: "It's all good man!"
    }
}

/****
 * 
 * {{url}}/api/product
 * 
 */

// Post - create product - Private - Any user with a valid toke
    router.post('/',
                [
                    validateJWT,
                    check('name', 'The name of the proeuct is required').not().isEmpty(),
                    check('category', 'The name of the category is required').not().isEmpty(),
                    validateFields
                ],
                createProduct);
/******************************/            

// Get - get all products - Public
    router.get('/', getProducts);
/******************************/       


module.exports = router;            