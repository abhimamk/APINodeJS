module.exports = function(app) {
    const CustomTitles = require('../controllers/customTitles/index');

    // create a new Custom Title
    app.post('/addCustomTitles', CustomTitles.addCustomTitle);

    // get all All Custom Titles
    app.get('/getAllCustomTitles', CustomTitles.getAllCustomTitle);

    // Update Custom Title
    app.put('/updateCustomTitle/:id', CustomTitles.updateCustomTitle);

    // Delete Custom Title
    app.delete('/deleteCustomTitle/:id', CustomTitles.deleteCustomTitle);

    // Search Title
    app.post('/searchTitle', CustomTitles.searchTitle);
}