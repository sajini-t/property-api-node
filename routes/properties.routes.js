// routes/properties.routes.js
// URL -> controller mapping only. No logic. No data. No HTTP semantics.
const express = require('express');
const router = express.Router();
const propertiesController = require('../controllers/properties.controller.js')

router.get('/', propertiesController.getAll);
router.get('/:id', propertiesController.getById);
router.post('/', propertiesController.create);
router.put('/:id', propertiesController.update);
router.delete('/:id', propertiesController.remove);

module.exports = router;