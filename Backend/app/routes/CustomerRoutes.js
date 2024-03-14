const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/CustomerController');

module.exports = () => {

    // GET 
    router.get('/customers/list', CustomerController.list)

    // GET by ID 
    router.get('/customers/:id', CustomerController.getByID)

    // POST 
    router.post('/customers/addcustomer', CustomerController.create)

    // PUT 
    router.put('/customers/:id/add', CustomerController.updateByID)

    // DELETE 
    router.delete('/customers/delete/:id', CustomerController.delete)

    return router 
}