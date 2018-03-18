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

// app.post('/pages/id', function(request, response) {
//     getPerson(request, response);
// });
app.post('/getPerson/id',urlEncodedParser, function(req,res){
var data = req.body;
var my_obj;
// console.log(data);
// var id = Number(data.id);

swapi.get('people', [1,2,3,4,5,6,7,8,9,10])
    .then(person => console.log(person[1].name))
.catch(err =>console.log('error') );
// getPerson(req,res, id);
// console.log(my_obj[1]);


});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

function getPerson(request, response, id) {
    // First get the person's id
    // var id = request.query.id;

    // TODO: It would be nice to check here for a valid id before continuing on...

    // use a helper function to query the DB, and provide a callback for when it's done
    getPersonFromDb(id, function(error, result) {
        // This is the callback function that will be called when the DB is done.
        // The job here is just to send it back.

        // Make sure we got a row with the person, then prepare JSON to send back
        if (error || result == null || result.length != 1) {
            response.status(500).json({success: false, data: error});
        } else {
            var person = result[0];
            response.status(200).json(result[0]);
        }
    });
}

function getPersonFromDb(id, callback) {
    console.log("Getting person from DB with id: " + id);

    var client = new pg.Client(connectionString);

    client.connect(function(err) {
        if (err) {
            console.log("Error connecting to DB: ")
            console.log(err);
            callback(err, null);
        }

        var sql = "SELECT id, first, last, birthdate FROM person WHERE id = $1::int";
        var params = [id];

        var query = client.query(sql, params, function(err, result) {
            // we are now done getting the data from the DB, disconnect the client
            client.end(function(err) {
                if (err) throw err;
            });

            if (err) {
                console.log("Error in query: ")
                console.log(err);
                callback(err, null);
            }

            console.log("Found result: " + JSON.stringify(result.rows));

            // call whatever function the person that called us wanted, giving it
            // the results that we have been compiling
            callback(null, result.rows);
        });
    });

} // end of getPersonFromDb