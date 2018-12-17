var pathManager = {};
var INF = 99999999;

function get_roadSpots(app, callback){
    var database = app.get('database');

    if (database.db){
        database.RoadSpotModel.findAll( function(err, result){
            if(err){
                console.log('Error occured in finding roadSpot model.');
                callback(err, null);
            }

            var output = {};
            for (var i = 0; i < result.length; i++){
                var curNumber = result[i]._doc.number;
                var curGps = result[i]._doc.gps;
                var curConnected = result[i]._doc.connected;
                output[curNumber] = {gps: curGps, connected: curConnected};
                if( i >= result.length - 1)
                    callback(null, output);
            }
        });
    }
    else
        callback(true, null);
};

function get_buildings(app, callback){
    var database = app.get('database');

    if (database.db){
        database.BuildingModel.findAll( function(err, result){
            if(err){
                console.log('Error occured in finding building model.');
                callback(err, null);
            }

            var output = {};
            for (var i = 0; i < result.length; i++){
                var curNumber = result[i]._doc.number;
                var curGps = result[i]._doc.gps;
                output[curNumber] = {gps: curGps, connected: []};
                if( i >= result.length - 1)
                    callback(null, output);
            }
        });
    }
    else
        callback(true, null);
};

function deg2rad( deg){ return (deg * Math.PI / 180.0);}
function rad2deg( rad){ return (rad * 180.0 / Math.PI);}

function get_distance( _from, _to){
    var theta = _from.longitude - _to.longitude;
    var distance = Math.sin( deg2rad( _from.latitude)) *
                    Math.sin( deg2rad(_to.latitude)) +
                    Math.cos( deg2rad(_from.latitude)) *
                    Math.cos( deg2rad(_to.latitude)) *
                    Math.cos( deg2rad( theta));

    distance = rad2deg( Math.acos( distance)) * 60 * 1.1515 * 1609.344;
    return distance;
}

pathManager.initialize = function(app){
    console.log('# Path initialize ...');

    get_roadSpots(app, function(err, roadSpotResult){
        if( err)
            console.log('Read path data error.');
        else {
            get_buildings(app, function(err, buildingResult){
                if( err)
                    console.log('Read path data error.');
                else {
                    var roadSpots = roadSpotResult;
                    var buildings = buildingResult;

                    var pathMap = {};
                    for( var spotNumberRow in roadSpots){
                        pathMap[spotNumberRow] = {};
                        for( var spotNumberCol in roadSpots){
                            if( roadSpots[spotNumberRow].connected.indexOf( spotNumberCol) != -1 ||
                                roadSpots[spotNumberCol].connected.indexOf( spotNumberRow) != -1){
                                var _distance = get_distance( roadSpots[spotNumberRow].gps, roadSpots[spotNumberCol].gps);
                                var _parent = spotNumberRow;
                            }
                            else{
                                var _distance = spotNumberRow == spotNumberCol ? 0 : INF;
                                var _parent = -1;
                            }
                            pathMap[spotNumberRow][spotNumberCol] = {
                                distance : _distance,
                                parent : _parent
                            };
                        }
                    }

                    for( var spotNumberI in roadSpots){
                        for ( var spotNumberJ in roadSpots){
                            for( var spotNumberK in roadSpots){
                                if( pathMap[ spotNumberK][spotNumberI].distance +
                                    pathMap[ spotNumberI][spotNumberJ].distance <
                                    pathMap[ spotNumberK][spotNumberJ].distance){
                                    pathMap[ spotNumberK][spotNumberJ].distance = pathMap[ spotNumberK][spotNumberI].distance +
                                        pathMap[ spotNumberI][spotNumberJ].distance;
                                    pathMap[ spotNumberK][spotNumberJ].parent = pathMap[spotNumberI][spotNumberJ].parent;
                                }
                            }
                        }
                    }
                    console.log('# Apply path map on server.');
                    pathManager.pathMap = pathMap;
		    console.log('Path map: ', pathMap);

                    for( var range=30; range <= 300; range += 10){
                        for( var buildingNumber in buildings){
                            for( var roadSpotNumber in roadSpots){
                                if( buildings[buildingNumber].connected.length < 4 &&
                                    buildings[buildingNumber].connected.indexOf(roadSpotNumber) == -1){
                                    if( get_distance( buildings[buildingNumber].gps, roadSpots[roadSpotNumber].gps) < range)
                                        buildings[buildingNumber].connected.push( roadSpotNumber);

                                }
                            }
                        }
                    }


                    console.log( buildings);

                    console.log('# Apply building map on server.');
                    pathManager.buildings = buildings;

                    console.log('# Apply roadSpot map on server.');
                    pathManager.roadSpots = roadSpots;
                }
            })
        }
    });

};

module.exports = pathManager;
