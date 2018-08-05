const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
//'use strict';
var app = express();

//partials are used to re-use that  piece of info from our view files
hbs.registerPartials(__dirname + '/views/partials')


app.use(function (req, res, next) {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFileSync('server.log', log +'\n', function(err){
            if(err){
                console.log('**Unable to append to server.log**')
            }
    });
    next();
});
// app.use(function(req, res, next){
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.set('vie engine', 'hbs');

hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear()
})

hbs.registerHelper('screamIt', function(text){
    return text.toUpperCase();
})

app.get('/', function(req, res){
    res.render('home.hbs', {
        pageTitle: 'Welcome Page',
        //currentYear: new Date().getFullYear(),
        welcomeMessage: 'Hello User'
    });
})

app.get('/about', function(req,res){
    res.render('about.hbs',{    //injecting data using render method
        pageTitle: 'About Page',
        //currentYear: new Date().getFullYear()
    });
})

app.get('/bad', function(req,res){
    res.send({
        errorMessage:'Bad Request 404'
    });
});


app.listen(port, function(){
    console.log(`Server is up on port ${port}`);
});


//NOTE: When using footers, when we are restarting our server, then in the terminal we have to use the command
// nodemon server.js -e js,hbs ..... Last two being the args which you want to see the output of ;)