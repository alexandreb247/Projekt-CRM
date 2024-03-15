const express = require('express');
const router = express.Router();
const ActionApiController = require('../controllers/ActionApiController');


// GET 
router.get("/actions/list", ActionApiController.list)

// GET by ID
router.get("/actions/:id", ActionApiController.getActions)

// POST
router.post("/actions/addaction", ActionApiController.addAction)

// PUT 
router.put('/actions/add/:id', ActionApiController.updateActionByID)

// DELETE 
router.delete('/actions/delete/:id', ActionApiController.delete)

module.exports = router;