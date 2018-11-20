var add_roadSpot_info = function(req, res){
    console.log('# API called: Add roadSpot information');

    // validate roadSpot number
    roadSpotNumber = req.params.number;
    roadSpotInfo = req.body;
    console.log('roadSpotInfo: ', roadSpotInfo);

    var database = req.app.get('database');
    if( database.db) {
        var roadSpot = new database.roadSpotModel({
            number : roadSpotInfo.number,
            gps: roadSpotInfo.gps,
            connected: roadSpotInfo.connected
        });
        roadSpot.save( function(err){
            if(err) return res.status(500).json({error: 'Error occured in creating data model.'}).end();
            console.log('# Successfully add roadSpot data');
            console.log( roadSpotInfo);
            return res.status(201).json({message: 'Successfully add roadSpot data.'});
        });
    }
    else
        return res.status(500).json({error: 'Error occurred in load database.'}).end();
};

var get_roadSpot_info = function(req, res){
    console.log('# API called: Get roadSpot informations');

    // validate roadSpot number
    roadSpotNumber = req.params.number;
    var database = req.app.get('database');
    if( database.db){
        database.roadSpotModel.find_by_number( roadSpotNumber, function(err, result){
            if(err){
                return res.status(500).json({error: 'Error occured in find roadSpot model.'}).end();
                console.log('Error occured in finding roadSpot model.');
            }

            var output = {
                number: result.number,
                gps: result.gps,
                connected : result.connected
            };

            return res.status(200).json({'data' : output}).end();
        });
    }
    else {
        res.status(500).json({error: 'Error occurred in load database'}).end();
    }
};

var get_roadSpot_infos = function(req, res){
    console.log('# API called: Get roadSpot informations');

    // validate roadSpot number
    var database = req.app.get('database');
    if (database.db){
        database.roadSpotModel.findAll( function(err, result){
            if(err){
                return res.status(500).json({error: 'Error occured in finding roadSpot model.'}).end();
                console.log('Error occured in finding roadSpot model.');
            }

            var output = [];
            for (var i = 0; i < result.length; i++){
                var curNumber = result[i]._doc.number;
                var curGps = result[i]._doc.gps;
                var curConnected = result[i]._doc.connected;
                output.push({
                    number: curNumber,
                    gps: curGps,
                    connected: curConnected
                });
            }

            return res.status(200).json({'data': output}).end();
        });
    }
    else {
        res.status(500).json({error: 'Error occurred in load database'}).end();
    }
};
var update_roadSpot_info = function(req, res){
    console.log('# API called: Update roadSpot information');

    roadSpotNumber = req.params.number;

    var database = req.app.get('database');
    if( database.db){
        database.roadSpotModel.update_by_number( roadSpotNumber, function(err, result){
            if( err){
                return res.status(500).json({error: 'Error occured in finding roadSpot model.'}).end();
                console.log('Error occured in finding roadSpot model.');
            }
            return res.status(200).end();
        })
    }
    else {
        res.status(500).json({error:'Error occured in load database.'}).end();
    }
};
var delete_roadSpot_info = function(req, res){
    console.log('# API called: Delete roadSpot information');

    // validate roadSpot number
    roadSpotNumber = req.params.number;

    var database = req.app.get('database');
    if( database.db){
        database.roadSpotModel.delete_by_number( roadSpotNumber, function(err, result){
            if( err){
                return res.status(500).json({error: 'Error occured in finding roadSpot model.'}).end();
                console.log('Error occured in finding roadSpot model.');
            }
            return res.status(200).end();
        })
    }
    else {
        res.status(500).json({error: 'Error occured in load database'}).end();
    }
};

module.exports.add_roadSpot_info = add_roadSpot_info;
module.exports.get_roadSpot_info = get_roadSpot_info;
module.exports.get_roadSpot_infos = get_roadSpot_infos;
module.exports.update_roadSpot_info = update_roadSpot_info;
module.exports.delete_roadSpot_info = delete_roadSpot_info;