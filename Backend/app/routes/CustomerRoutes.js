const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/CustomerController');

module.exports = () => {

    // GET 
    router.get('/customers', CustomerController.list)

    // GET by ID 
    router.get('/customers/:id', CustomerController.getByID)

    // POST 
    router.post('/customers', CustomerController.create)

    // PUT 
    router.put('/customers/:id', CustomerController.updateByID)

    // DELETE 
    router.delete('/customers/:id', CustomerController.delete)

    return router 
}