// Loading Modules

const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const config = require('./config.json');
const app = express();
const admin = require('./routes/admin');
const path = require('path');
// const mongoose = require('mongoose');

// Configuration
    // BodyParser
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json())
    // HandleBars (HBS)
        app.engine('hbs', hbs({defaultLayout: 'main', extname: "hbs", helpers: {appName: config.appName}}));
        app.set('view engine', 'hbs')
    // Mongoose (DataBase)
        // Another    
    // Public (css, js, images)
        app.use(express.static(path.join(__dirname,"public")))   

// Routes

    // Route admin
    app.use('/admin', admin);

// Others

app.listen(config.port, () => {
    console.log("The server was started on the port " + config.port);
})