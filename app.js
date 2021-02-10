// Loading Modules

const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const config = require('./config.json');
const app = express();
const admin = require('./routes/admin');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');

// Configuration
    // Session
        app.use(session({
            secret: config.sessionSecret,
            resave: true,
            saveUninitialized: true
        }));
        app.use(flash())
    // Middleware
        app.use((req, res, next) => {
            res.locals.success_msg = req.flash("success_msg")
            res.locals.error_msg = req.flash("error_msg")
            next()
        })    
    // BodyParser
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json())
    // HandleBars (HBS)
        app.engine('hbs', hbs({defaultLayout: 'main', extname: "hbs", helpers: {appName: config.appName}}));
        app.set('view engine', 'hbs')
    // Mongoose (DataBase)
        mongoose.connect(config.MongoDB, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        }).then(()=>{
            console.log("Successfully connected to MongoDB");
        }).catch(err=>{
            console.error("Error connecting to MongoDB")
        })
    // Public (css, js, images)
        app.use(express.static(path.join(__dirname,"public")))   

// Routes

    // Route admin
    app.use('/admin', admin);

// Others

app.listen(config.port, () => {
    console.log("The server was started on the port " + config.port);
})