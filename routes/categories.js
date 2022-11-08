const { Router } = require('express');
const { check } = require('express-validator');
const { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } = require('../controllers/categories');
const { validateCategoryID, ifCategoryExists } = require('../herlpers/db-validations');

const { validateJWT, validateFields, checkIfAdmin, ifNameComes } = require('../middlewares');

const router = Router();

const msgs = {
    error:{
        no: " Not Found"
    },
    ok:{
        ok: "Enter in Categories",
        check: "It's all good man!"
    }
}
/**
 * 
 * {{url}}/api/categories
 * 
 */

// Get all Categories - Public
router.get('/', getCategories);

// Get a Category by Id - Public
router.get('/:id',
            [
                check('id', `'It's not a valid Mongo ID`).isMongoId(),
                check('id').custom(validateCategoryID),
                validateFields,
            ]
            , getCategoryById);

// Create a Category - Private - Any user with a valid token
router.post('/', 
            [
                validateJWT,
                check('name', 'Name of the Catagory is required').not().isEmpty(),
                validateFields,
            ],
            createCategory
);

// Update a Category - Private - Any user with a valid token
router.put('/:id',
            [
                validateJWT,
                check('id', `'It's not a valid Mongo ID`).isMongoId(),
                check('id').custom(validateCategoryID),
                //ifNameComes,
                check('name').custom(ifCategoryExists),
                validateFields,                
            ], 
            updateCategory);

// Delete a Category - Private - Only Admin Users
router.delete('/:id', 
               [
                    validateJWT,
                    checkIfAdmin,
                    check('id', `'It's not a valid Mongo ID`).isMongoId(),                    
                    validateFields
               ],
               deleteCategory);


module.exports = router;