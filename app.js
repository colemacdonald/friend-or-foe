// include modules
var express = require('express'),
    app = express(),
    path = require('path'),
    less = require('less-middleware');
    
// serve static content
app.use(express.static(path.join(__dirname, 'public')));

// setup server
var server = app.listen(8080);