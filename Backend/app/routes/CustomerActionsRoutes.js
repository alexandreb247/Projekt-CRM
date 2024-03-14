const express = require('express');
const ActionApiController = require('../controllers/ActionApiController');
const router = express.Router();

router.post("/customers/:id/add", ActionApiController.addAction)
router.get("/customers/:id/actions", ActionApiController.getActions)

module.exports = router;