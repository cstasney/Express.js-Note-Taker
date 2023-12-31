// Imports and dependencies
const express = require('express')
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes')

// Intialize Express.js and specify port
const PORT = process.env.PORT || 3001;
const app = express();

// static middleware
app.use(express.static('public'));


// middleware for parsing JSON data and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes)

// Listen for port
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
)