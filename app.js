// Loading Modules

const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const config = require('./config.json')
const app = express();
// const mongoose = require('mongoose');

// Configuration //
    // BodyParser //
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json())
    // HandleBars (HBS) //
        app.engine('hbs', hbs({defaultLayout: 'main', extname: "hbs", helpers: {appName: config.appName}}));
        app.set('view engine', 'hbs')

// Routes
app.get('/', (req, res)=>{
    res.render('index', {title: "Home Page"});
})


// Others

app.listen(config.port, () => {
    console.log("The server was started on the port " + config.port);
})