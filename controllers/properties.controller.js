// controllers/properties.controller.js
// Translates HTTP <-> service. Knows about req/res. Calls service for data.

const propertiesService = require('../services/properties.service.js');

function getAll(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 10, 100);
    const properties = propertiesService.findAll({page, limit});
    res.status(200).json(properties);
}

function getById(req, res) {
    const id = parseInt(req.params.id);
    const property = propertiesService.findById(id);

    if (!property) {
        return res.status(404).json({error: "Property not found"});
    }

    res.status(200).json(property);
}

function create(req, res) {
    if (!req.body.title || !req.body.city) {
        return res.status(400).json({error: "Title and City are required"});
    }

    const newProperty = propertiesService.create(req.body);
    res.status(201).json(newProperty);
}

function update(req, res) {
    const id = parseInt(req.params.id);
    if (!req.body.title || !req.body.city) {
        return res.status(400).json({error: "Title and City are required"});
    }

    const property = propertiesService.update(id, req.body);

    if (!property) {
        return res.status(404).json({error: "Property not found"});
    }

    res.status(200).json(property);
}

function remove(req, res) {
    const id = parseInt(req.params.id);

    const propertyRemoved = propertiesService.remove(id);

    if (!propertyRemoved) {
        return res.status(404).json({error: 'Property not found'});
    }

    res.status(204).send();
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};