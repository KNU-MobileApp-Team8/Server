var find_path = function(req, res){
    console.log('# API called: Find path');
    console.log('# Headers: ', req.headers);

    var pathManager = req.app.get('pathManager');
    var pathMap = pathManager.pathMap;

    var roadSpotFrom = req.query.from;
    var buildingTo = req.query.to;
    var nearestRoadSpot = get_nearest_roadSpot(pathManager, roadSpotFrom, buildingTo);
    var roadSpotTo = nearestRoadSpot;

    console.log('Destination: ', buildingTo);
    console.log('From: ', roadSpotFrom, ' To: ', roadSpotTo);


    var path = [];

    for( var current = roadSpotTo;
         current != roadSpotFrom && current != -1;
         current = pathMap[roadSpotFrom][current].parent){
        
        path.push( current);
    }
    path.push( roadSpotFrom);
    path.reverse();
    console.log( path);
    res.status(200).json({path: path}).end();
}

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

function get_nearest_roadSpot(pathManager, roadSpotNumber, buildingNumber){
    var nearRoadSpots = pathManager.buildings[buildingNumber].connected;
    var nearest = -1, minDistance = 9999.99;

    for( var idx = 0; idx < nearRoadSpots.length; idx++){
        var distance = pathManager.pathMap[roadSpotNumber][ nearRoadSpots[idx] ].distance +
                        get_distance( pathManager.buildings[buildingNumber].gps,
                                        pathManager.roadSpots[ nearRoadSpots[idx]].gps);
        console.log('Spot: ', nearRoadSpots[idx], ' Distance: ', distance);
        if( distance < minDistance){
            minDistance = distance;
            nearest = nearRoadSpots[idx];
        }
    }

    return nearest;
}

module.exports.find_path = find_path;
