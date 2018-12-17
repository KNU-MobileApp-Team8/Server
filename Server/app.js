/* Load Middleware */
var express = require('express'),
    http = require('http'),
    path = require('path');

var bodyParser = require('body-parser'),
    static = require('serve-static');

var errorHandler = require('errorhandler'),
    expressErrorHandler = require('express-error-handler');

var expressSession = require('express-session');
var routerLoader = require('./Routes/routeLoader');
var databaseLoader = require('./Database/databaseLoader');

var config = require('./config');
var jayson = require('jayson');
var pathManager = require('./pathManager');

console.log('#Load all middle wares.');
/* Construct Server */
app = express();

// Set Port
app.set('port', config.SERVER_PORT || 3000);
console.log('#Set server port: %d', config.SERVER_PORT || 3000);

// Set Parsing
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Set Session
app.use(expressSession({
    secret: 'MobileAppProject',
    resave: true,
    saveUninitialized: true
}));

// Set Routing
var router = express.Router();
routerLoader.init(app, router);

// Error Handling, 404
app.use( expressErrorHandler.httpError(404) );

/* Set & Start Server */
process.on('uncaughtException', function (err) {
    console.log('\nUncaughtException occured: ' + err);
    console.log(err.stack);
});

process.on('SIGTERM', function () {
    console.log("\nProcess closed...");
    app.close();
});

app.on('close', function () {
    console.log("\nExpress server closed...");
    if (database.db) {
        database.db.close();
    }
});


var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('\n# Server start. Port: %d', app.get('port'));
    databaseLoader.init(app, config, function(err){
        if( err){
            console.log('# Error occurred in loading database');
            app.close();
        }

        pathManager.initialize(app);
        app.set('pathManager', pathManager);
    });
});