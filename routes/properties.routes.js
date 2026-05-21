// routes/properties.routes.js
const express = require('express');
const router = express.Router();

//In memory data store
let properties = [];
let nextId = 1;


router.get('/', (req, res) => {
    res.status(200).json(properties);
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const property = properties.find(p => p.id === id);

    if (!property) {
        return res.status(404).json({error: "Property not found"});
    }

    res.status(200).json(property);

})

router.post('/', (req, res) => {
    if(!req.body.title || !req.body.city){
        return res.status(400).json({error: "Title and City are required"});
    }

    const newProperty = {
        id: nextId,
        title: req.body.title,
        city: req.body.city,
        monthly_rent: req.body.monthly_rent || null,
        bedrooms: req.body.bedrooms || null,
        is_available: req.body.is_available ?? true,
        created_at: new Date().toISOString()
    }

    properties.push(newProperty);
    nextId++;

    res.status(201).json(newProperty)
});

router.put('/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const property = properties.find(p => p.id === id);

    if (!property) {
        return res.status(404).json({error: "Property not found"});
    }

    if (!req.body.title || !req.body.city){
        return res.status(400).json({error: "Title and City are required"});
    }

    property.title = req.body.title;
    property.city = req.body.city;
    property.monthly_rent = req.body.monthly_rent ?? property.monthly_rent;
    property.bedrooms = req.body.bedrooms ?? property.bedrooms;
    property.is_available = req.body.is_available ?? property.is_available;
    property.updated_at = new Date().toISOString();

    res.status(200).json(property)
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const propertyIndex = properties.findIndex(p => p.id === id);

    if (propertyIndex === -1) {
        return res.status(404).json({error: "Property not found"});
    }

    properties.splice(propertyIndex, 1);

    res.status(204).send();

});

module.exports = router;