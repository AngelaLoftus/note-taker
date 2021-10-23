const router = require('express').Router();
const uniqid = require('uniqid'); 
//need fs to readFile later on
const fs = require('fs');
const util = require('util'); 
const readFileAsync  = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile); 


//get the objects that are already there in db.json file
router.get('/notes', (req, res) => {
    console.log('getNotes route hit');

    readFileAsync('./db/db.json', 'utf8').then(notes => { 
    
    notes = JSON.parse(notes);
    return res.json(notes); 
    })      
});


//add to the existing db.json file more objects
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

//delete route
//use array method to delete routes from the array



//fs.writeFile(add new note);
//a post route has a request body

//The following API routes should be created:

// GET /api/notes should read the db.json file and return all saved notes as JSON.

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

module.exports = router; 

// let hello = async function() { "Hello" };

// // Use fs.readFile() method to read the file
// fs.readFile('Demo.txt', 'utf8', function(err, data){
      
    //     // Display the file content
//     console.log(data);
// });

    // Use fs.readFile() method to read the file
    // fs.readFile('Demo.txt', 'utf8', function(err, data){
    
//     // Display the file content
//     console.log(data);
// });


//defining New Note as the body of the request, 
//then chaining the id onto it using the uniqid package
// hello();