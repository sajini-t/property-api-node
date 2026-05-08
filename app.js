// app.js - Express server entry point
const express = require('express');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello from PropertyPulse API');
    
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});