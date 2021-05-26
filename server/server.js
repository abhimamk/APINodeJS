const exp = require('express');
const bodyPars = require('body-parser');
const cors = require("cors");

// create express app
const app = exp();

// pares application /x-www-form-urlencoded
app.use(bodyPars.urlencoded({extended: true}));

// parse application/json
app.use(bodyPars.json());

// config the database
const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {useCreateIndex: true,
	useNewUrlParser: true, useUnifiedTopology: true
});

mongoose.connection.on('err', function() {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

mongoose.connection.once('open', function() {
    console.log('Successfully connected to the database');
});


// define a simple route
app.get('/', function(req, res){
    res.send("By Gotham blessing DB is connected.");
});

app.listen(3000, function() {
    console.log('server running on 3000 port')
})

app.use(cors({ origin: '*' }));
require('./app/routes/note.routes')(app);
require('./app/routes/customTitle.routes')(app);