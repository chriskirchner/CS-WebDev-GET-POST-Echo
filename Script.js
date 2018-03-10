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
app.set('port', 3001);

//indicate static directory
//https://stackoverflow.com/questions/13486838/cant-get-stylesheet-to-work-with-ejs-for-node-js
app.use(express.static(__dirname + '/'));

//setup body parser for POST requests
var parser = require('body-parser');
app.use(parser.urlencoded({extended: false}));
app.use(parser.json());

//setup callback for GET request
app.get('/request-checker', function(req, res){
    var context = {};
    var parameters = [];
    //store URL key/value pairs
    for (var p in req.query){
        parameters.push({'name': p, 'value': req.query[p]});
    }
    context.URLList = parameters;
    //specify request type
    context.RequestType = "GET";
    res.render('Request-Checker', context);
});

//setup callback for POSY request
app.post('/request-checker', function(req,res){
    var body_parameters = [];
    //store body key/value pairs
    for (var p in req.body){
        body_parameters.push({'name': p, 'value': req.body[p]});
    }
    var url_parameters = [];
    //store URL key/value pairs
    for (var p in req.query){
        url_parameters.push({'name': p, 'value': req.query[p]});
    }
    context = {};
    context.BodyList = body_parameters;
    context.URLList = url_parameters;
    //specify request type
    context.RequestType = "POST";
    res.render('Request-Checker', context);
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

