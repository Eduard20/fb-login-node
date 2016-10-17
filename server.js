/**
 * Created by Edo on 17.10.2016.
 */
var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var passport = require('passport');
var app = express();
var port = parseInt(process.env.PORT) || 3000;
require('./config/passport')(passport);
app.use(express.static(__dirname + '/data'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.get('/', function(req, res) {
    res.render('index.html'); // load the index.ejs file
});

app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect : '/profile',
        failureRedirect : '/'
    }));

app.listen(port);
