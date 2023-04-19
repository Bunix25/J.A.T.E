// Import the Express library
const express = require('express');

// Create a new Express app
const app = express();

// Set the port number to listen on
const PORT = process.env.PORT || 3000;

// Serve static files from the ../client/dist directory
app.use(express.static('../client/dist'));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Require the htmlRoutes module and pass the app object as a parameter
require('./routes/htmlRoutes')(app);

// Start listening for requests on the specified port
app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
