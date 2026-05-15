// app.js - Express server entry point
const express = require('express'); //load express from node_modules

const app = express(); //create an express object
const PORT = 3000;

//express middleware for parsing json request bodies into javascript req.body
app.use(express.json()); 

//In memory data store
let properties = [];
let nextId = 1;

app.get('/', (req, res) => {
    res.send('Hello from PropertyPulse API');
});


app.get('/properties', (req, res) => {
    res.json(properties);
});

app.get('/properties/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const property = properties.find(p => p.id === id);

    if (!property) {
        return res.status(404).json({error: "Property not found"});
    }
    res.status(200).json(property);
});

app.post('/properties', (req, res) => {
    if (!req.body.title || !req.body.city){
        res.status(400).json({error: "Title and City are Required"});
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

    res.status(201).json(newProperty);

});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});