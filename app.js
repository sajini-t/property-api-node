// app.js - Express server entry point
const express = require('express'); //load express from node_modules
const propertyRoutes = require('./routes/properties.routes.js');

const app = express(); //create an express object
const PORT = 3000;

//express middleware for parsing json request bodies into javascript req.body
app.use(express.json());
app.use('/properties', propertyRoutes); 

app.get('/', (req, res) => {
    res.send('Hello from PropertyPulse API');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});