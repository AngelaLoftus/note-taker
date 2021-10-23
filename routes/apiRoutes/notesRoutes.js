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
});

//delete route placeholder
//use array method to delete routes from the array


//export router to use elsewhere
module.exports = router; 

