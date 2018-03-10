/**
 * Created by Xaz on 2/17/2016.
 */

/*
Author: Chris Kirchner
Organization: OSU
Class: CS290 Web Development
Assignment: Week 7 - GET and POST checker
Date: 21Feb16
Purpose: Echo GET and POST request key/value pairs
*/




//setup express and handlebars
var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({
    defaultLayout: 'Main'
});

//indicate express engine
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

//indicate static directory
//https://stackoverflow.com/questions/13486838/cant-get-stylesheet-to-work-with-ejs-for-node-js
app.use(express.static(__dirname + '/'));

//setup body parser for POST requests
var parser = require('body-parser');
app.use(parser.urlencoded({extended: false}));
app.use(parser.json());

var request = require('request');

var apikey = "f0255f9975d579d1350adf26b6e0f5fb";
var url = "http://api.openweathermap.org/data/2.5/weather?q=";

//setup callback for GET request
app.get('/', function(req, res){
    request(url+'San Diego&APPID=' + apikey, function(err, response, body){
        if (response){
            request({
                "url": url+'San Diego&APPID=' + apikey,
                "method": "GET"
            }, function(err, response, body){
                console.log(response);
                console.log("NESTED");
            });
        }
    });
});

//setup callback for unavailable resource
app.use(function(req, res){
    res.status(404);
    res.render('404');
});

//setup callback for errors
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
});

//listen on port
app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:'
        + app.get('port') + '; press Ctrl-C to terminate.');
});

