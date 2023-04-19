// Import the Node.js path module
const path = require('path');

// Export a function that takes an Express app object as a parameter
module.exports = (app) =>
  // Handle GET requests to the root URL
  app.get('/', (req, res) =>
    // Send the index.html file as a response
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
  );
