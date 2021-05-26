module.exports = function(app) {
    const notes = require('../controllers/note.control');

    // create a new note
    app.post('/postNote', notes.create);

    // get all notes
    app.get('/getAllNotes', notes.findAll);
}