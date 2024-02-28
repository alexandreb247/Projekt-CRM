const express = require('express');
const ActionApiController = require('../controllers/ActionApiController');
const router = express.Router();

router.post("/:id/add", ActionApiController.addAction)
router.get("/:id/actions", ActionApiController.getActions)

module.exports = router;