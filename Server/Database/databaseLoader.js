var mongoose = require('mongoose');
var databaseLoader = {};

databaseLoader.init = function(app, config){
    console.log('# Initialize the database.');
    connect_database(app, config);
}

function connect_database(app, config){
    console.log('# Called connect().');

    mongoose.Promise = global.Promise;
    mongoose.connect(config.DB_URL, {useMongoClient:true});
    databaseLoader.db = mongoose.connection;

    databaseLoader.db.on('error', console.error.bind(console, 'Mongoose connection error.'));

    databaseLoader.db.on('open', function(){
        console.log('# Connected with database: ', config.DB_URL);
        init_schema(app, config);
    });

    databaseLoader.db.on('disconnected', function(){
        console.log('# Disconnected with database. Retry after 5sec.');
        setInterval(connect_database, 5000);
    });
}

function init_schema(app, config){
    var length_of_schema = config.DB_SCHEMAS.length;
    console.log('# Schemas[%d]', length_of_schema);

    for( var idx = 0; idx < length_of_schema; idx++){
        var current_item = config.DB_SCHEMAS[idx];
        var current_schema = require(current_item.file).createSchema(mongoose);
        console.log('# Read [%s] module, then set the schema.', current_item.file);

        var current_model = mongoose.model(current_item.collection, current_schema);
        console.log('# Set the model for [%s] collection.', current_item.collection);

        databaseLoader[current_item.schemaName] = current_schema;
        databaseLoader[current_item.modelName] = current_model;
        console.log('# Register: Schema name[%s], Model name[%s] on database object.', current_item.schemaName, current_item.modelName);
    }

    app.set('database', databaseLoader);
    console.log('# Successfully register the database object on app object.');
}

module.exports = databaseLoader;