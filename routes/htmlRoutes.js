// dependencies
const path = require('path');
const htmlRouter = require('express').Router();

// GET request  for notes.html
htmlRouter.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
}
)

// Wildcard to return to home when incorrect path is entered in browser
htmlRouter.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
});

module.exports = htmlRouter;