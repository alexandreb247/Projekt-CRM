const express = require('express');
const router = express.Router();
const CustomersController = require('../controllers/CustomersController');

router.get('/customers', CustomerController.index);
router.post('/addcustomer', CustomersController.create);
router.delete('/delete/:id', CustomersController.delete);

module.exports = router;