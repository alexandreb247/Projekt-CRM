const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/CustomerController');


router.get('/customers', CustomerController.list);
router.get('/customers/:id', CustomerController.getByID);
router.post('/customers', CustomerController.create);
router.put('/customers/:id', CustomerController.updateByID);
router.delete('/customers/:id', CustomerController.delete);

module.exports = router;