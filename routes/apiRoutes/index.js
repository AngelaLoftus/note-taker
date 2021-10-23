//requires express package and notesRoutes file
const router = require('express').Router();
const notesRoutes = require('../apiRoutes/notesRoutes');

//tells the router to use the notesRoutes file
router.use(notesRoutes);

//exports router to use in server.js
module.exports = router; 