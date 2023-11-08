// dependencies + router
const fs = require('fs');
const util = require('util')
const app = require('express').Router();
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);
let notesData = [];

// GET Request for db.json
app.get('/notes', (req, res) => {
    readFileAsync("db/db.json", "utf8").then(function (data) {
        // parse data from db.JSON
        notesData = JSON.parse(data);
        res.json(notesData);
    });

});

// POST request
app.post('/notes', (req, res) => {
    readFileAsync("db/db.json", "utf8").then(function (data) {
        // parse data to get an array of objects
        notesData = JSON.parse(data);

        let newNote = req.body;
        let currentID = notesData.length;

        newNote.id = currentID + 1

        // push new note to aray
        notesData.push(newNote);
        notesData = JSON.stringify(notesData)

        writeFileAsync("db/db.json", notesData).then(function (data) {
            console.log("Note has been saved to file");
        });
        res.json(notesData);
    });
});


// Delete request
app.delete("/notes/:id", (req, res) => {
    let selID = parseInt(req.params.id);
    //  Read JSON file
    for (let i = 0; i < notesData.length; i++) {
        if (selID === notesData[i].id) {
            notesData.splice(i, 1);
            let noteJSON = JSON.stringify(notesData, null, 2);

            writeFileAsync("db/db.json", noteJSON).then(function () {
                console.log("Note has been deleted.");
            });
        }
    }
    res.json(notesData);
});

module.exports = app;