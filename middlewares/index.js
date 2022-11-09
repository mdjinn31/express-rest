
const validateJWT = require('../middlewares/validate-jwt');
const validateRole = require('../middlewares/validate-roles');
const validateFields = require('../middlewares/validate-fields');
const ifNameComes = require('../middlewares/validate-name');
const validateCategoryName = require('../middlewares/validate-category');

module.exports = {
    ...validateFields,
    ...validateRole,
    ...validateJWT,
    ...ifNameComes,
    ...validateCategoryName
}