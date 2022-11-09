
const { Router } = require('express');
const { check } = require('express-validator');
const { createProduct, getProducts, getProduct, getProductsByCategory } = require('../controllers/product');
const { validateProductID } = require('../herlpers/db-validations');
const { validateJWT, validateFields, validateCategoryName } = require('../middlewares');



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
                    check('name', 'The name of the product is required').not().isEmpty(),
                    check('category', 'The name of the category is required').not().isEmpty(),
                    validateFields
                ],
                createProduct);
/******************************/            

// Get - get all products - Public
    router.get('/', getProducts);
/******************************/       

// Get - get product by ID - Public
    router.get('/:id', 
               [
                   check('id', `It's not a valid Mongo ID`).isMongoId(),
                   check('id').custom(validateProductID),
                   validateFields
               ], 
               getProduct);
/******************************/       

// Get - get products by Category - Public
    router.get('/category/:name', 
               [
                   check('name', 'The name of the category is required').not().isEmpty(),
                   validateCategoryName,
                   validateFields
               ], 
               getProductsByCategory);
/******************************/       


module.exports = router;            