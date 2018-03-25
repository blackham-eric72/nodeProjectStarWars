//Resources
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var pg = require("pg"); // This is the postgres database connection module.
var StarWarsAPI = require('star-wars-api');
swapi = new StarWarsAPI();


const connectionString = "postgres://web_user:webpass@localhost:5433/family_history";

var urlEncodedParser = bodyParser.urlencoded({ extended: false});

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    response.render('pages/index')
});

app.get('/starwars', function(req,res){
   res.render('pages/starwars') ;
});

app.post('/getPerson/id',urlEncodedParser, function(req,res) {

    swapi.get('people', [1,2,3,4,5,6,7,8,9,10])
        .then(function(person){
           res.render('pages/characters', {person}); })
.catch(function(){
    console.log('there was an error');
        });

});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

