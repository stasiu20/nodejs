const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurentYear', ()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});


app.set('view engine', 'hbs')
    .get('/', (req,res) => {
        res.render('home', {
            pageTitle: 'Home Page',
            welcome: 'Witam na mojej stronie'
        });
    })
    .use((req, res, next) => {
        var now = new Date().toString();
        var log = `${now}: ${req.method} ${req.url}`;
        fs.appendFile('server.log', log + '\n', (err)=>{
            if(err){
                console.log('Unable to save');
            }
        });
        console.log(log);
        next();
    })
    // .use((req, res, next) => {
    //     res.render('maitens');
    // })
    .use(express.static(__dirname + '/public'))
    .get('/about', (req,res)=>{
        res.render('about.hbs', {
            pageTitle: 'About Page',
        });
    })
    .get('/bad', (req,res) => {
        res.send({
            errorMessage: 'Bad Getaway mother fucker'
        });
    })
    .listen(3000,'localhost');