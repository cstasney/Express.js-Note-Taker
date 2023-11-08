// dependencies + router
const fs = require('fs');
const util = require('util')
const app = require('express').Router();

const notesData = [];

// GET Request for db.json
app.get('/notes', (req, res) => {
    util.promisify(fs.readFile('db/db.json', "utf8")).then(function (data) {
        // parse data from db.JSON
        notesData = JSON.parse(data);
        res.json(notesData);
    });

});

// POST request
app.post('/notes', (res, req) => {
    util.promisify(fs.readFile('db/db.json', 'utf8')).then(function (data) {
        // parse data to get an array of objects
        notesData = JSON.parse(data);

        let newNote = req.body;
        let currentID = notesData.length;

        newNote.id = currentID + 1

        // push new note to aray
        notesData.push(newNote);
        notesData = JSON.stringify(notesData)

        util.promisify(fs.writeFile('db/db.json', 'utf8')).then(function (data) {
            console.log("Note has been saved to file");
        });
        res.json(notesData);
    });
});


// Delete request
app.delete("/notes/:id", (req, res) => {
    let noteID = parseInt(req.params.id);
    // read JSON
    for (let i = 0; i < notesData.lenth; i++) {
        if (noteID === notesData[i].id) {
            notesData.splice(i, 1);
            let noteJSON = JSON.stringify(notesData, null, 2)

            util.promisify(fs.writeFile('db/db.json', noteJSON).then(function() {
                console.log('Note deleted');
            }));
        };
    };
    res.json(notesData);
});

module.exports = app;