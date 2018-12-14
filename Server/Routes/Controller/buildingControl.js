var validChecker = require('../validChecker');

var add_building_info = function(req, res){
    console.log('# API called: Add building information');
    console.log('Headers: ', req.headers);
    /*
    if( !validChecker.check_content_type_json(req.headers))
        return res.status(400).end();
    */
    // validate building number
    buildingNumber = req.params.number;
    buildingInfo = req.body;
    console.log('buildingInfo:', buildingInfo);

    var database = req.app.get('database');
    if (database.db){
        var building = new database.BuildingModel({
            name : buildingInfo.name,
            number : buildingNumber,
            gps : buildingInfo.gps,
            description : buildingInfo.description
        });
        building.save( function(err){
            if (err) return res.status(500).json({error: 'Error ocurred in creating data model.'}).end();
            console.log('# Successfully add building data.');
            console.log( buildingInfo);
            return res.status(201).json({message: 'Successfully add building data.'}).end();
        });
    }
    else
        return res.status(500).json({error: 'Error occurred in load database.'}).end();
};

var get_building_info = function(req, res){
    console.log('# API called: Get a building information');

    // validate building number
    buildingNumber = req.params.number;
    if (!buildingNumber || isNaN(buildingNumber)){
        return res.status(400).json({error: 'Incorrect params or data.'}).end();
    }
    var database = req.app.get('database');
    if (database.db){
        database.BuildingModel.find_by_number(buildingNumber, function(err, result){
            if (err){
                console.log('Error occured in finding building model.');
                return res.status(500).json({error: 'Error occured in finding building model.'}).end();
            }
            if( result.length == 0) {
                return res.status(404).json({error: 'There`s no data'}).end();
                console.log('There`s no data.');
            }
            var output = {
                name: result[0]._doc.name,
                number: result[0]._doc.number,
                gps: result[0]._doc.gps,
                imageUrl: config.HOST + '/MobileAppImages/' + result[0]._doc.number +'.png',
                description: result[0]._doc.description
            };

            return res.status(200).json({'data' : output}).end();
        });
    }
    else {
        res.status(500).json({error: 'Error occurred in load database'}).end();
    }
};

var get_building_infos = function(req, res){
    console.log('# API called: Get building informations');

    var database = req.app.get('database');
    if (database.db){
        database.BuildingModel.findAll( function(err, result) {
            if (err) {
                return res.status(500).json({error: 'Error occured in finding building model.'}).end();
                console.log('Error occured in finding building model.');
            }

            var output = [];
            for (var i = 0; i < result.length; i++) {
                var curName = result[i]._doc.name;
                var curNumber = result[i]._doc.number;
                var curGps = result[i]._doc.gps;
                var curDescription = result[i]._doc.description;
                output.push({
                    name: curName,
                    number: curNumber,
                    gps: curGps,
                    description: curDescription
                });
            }

            return res.status(200).json({'data' : output}).end();
        });
    }
    else {
        res.status(500).json({error: 'Error occurred in load database'}).end();
    }
};

var update_building_info = function(req, res){
    console.log('# API called: Update building information');

    // validate building number
    buildingNumber = req.params.number;
    buildingInfo = req.body;

    console.log(req.body);
    if (!buildingNumber || isNaN(buildingNumber))
        return res.status(400).json({error: 'Incorrect params or data'}).end();

    var database = req.app.get('database');
    if (database.db){
        database.BuildingModel.update_by_number( buildingNumber, buildingInfo, function(err, result) {
            if (err) {
                console.log('Error occured in updating.');
                return res.status(500).json({error: 'Error occured in updating.'}).end();
            }
            return res.status(200).end();
        });
    }
    else {
        res.status(500).json({error: 'Error occurred in load database'}).end();
    }
};

var delete_building_info = function(req, res){
    console.log('# API called: Delete building information');

    // validate building number
    buildingNumber = req.params.number;
    if (!buildingNumber || isNaN(buildingNumber))
        return res.status(400).json({error: 'Incorrect params or data'}).end();

    var database = req.app.get('database');
    if (database.db){
        database.BuildingModel.delete_by_number( buildingNumber, function(err, result) {
            if (err) {
                return res.status(500).json({error: 'Error occured in finding building model.'}).end();
                console.log('Error occured in finding building model.');
            }
            return res.status(200).end();
        });
    }
    else {
        res.status(500).json({error: 'Error occurred in load database'}).end();
    }
};

module.exports.add_building_info = add_building_info;
module.exports.get_building_info = get_building_info;
module.exports.get_building_infos = get_building_infos;
module.exports.update_building_info = update_building_info;
module.exports.delete_building_info = delete_building_info;