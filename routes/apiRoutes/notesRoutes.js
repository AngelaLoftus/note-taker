const router = require('express').Router();
const uniqid = require('uniqid'); 
//need fs to readFile later on
const fs = require('fs');
const util = require('util'); 

//turns read and write file into asynchronous functions to handle promise
const readFileAsync  = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile); 


//get the objects (notes) that are already in db.json file
router.get('/notes', (req, res) => {
    console.log('getNotes route hit');

    readFileAsync('./db/db.json', 'utf8').then(notes => { 
    
    notes = JSON.parse(notes);
    return res.json(notes); 
    })      
});


//add more objects (notes) to the existing db.json file 
router.post('/notes', (req, res) => {
    console.log('post notes route hit');
    console.log(req.body); 

    readFileAsync('./db/db.json', 'utf8').then(notes => {
        notes = JSON.parse(notes);
        
        var newNote = req.body;
        newNote.id = uniqid(); 
        console.log(newNote);   
        
        notes.push(newNote); 
        
        writeFileAsync('./db/db.json', JSON.stringify(notes));
        return newNote; 
    });    
    res.json(newNote);
});

//delete route to delete a note upon button click using array methods
router.delete('/notes/:id', (req, res) => { 
    //check if route was pinged
    console.log('delete route hit');
    //must read the existing data file
    readFileAsync('./db/db.json', 'utf8').then(notes => { 
        
        //for loop to check the ids in the array
        for (let i = 0; i< notes.length; i ++) { 
        
        //turn the notes id from string into an integer
        let notesid = parseInt(req.params.id);

        //check the search parameter on delete button click
        console.log("req.params.id", req.params.id);
        console.log("notes id", notesid); 

        notes = JSON.parse(notes);
        
        //delete note from the array
        notes.splice(notes[i], 1);
    
        //rewrite the file
        writeFileAsync('./db/db.json', JSON.stringify(notes));
        //return the updated files without the deleted file
        return res.json(notes); 
        }
    });        
});

//export router to use elsewhere
module.exports = router; 

