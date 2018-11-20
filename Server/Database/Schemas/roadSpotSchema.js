var Schema = {}
    , config = require('../../config');

Schema.createSchema = function(mongoose) {
    // Set schema entity
    var RoadSpotSchema = mongoose.Schema( config.DB_MODEL_INFOS.roadSpot);

    RoadSpotSchema.static('findAll', function(callback){
        return this.find({}, callback);
    });
    RoadSpotSchema.static('find_by_number', function(_number, callback){
        return this.find({number: _number}, callback);
    });
    RoadSpotSchema.static('update_by_number', function(_number, _data, callback){
        var _query = {'number': _number};
        var _new_values = { $set: {
                'number': _number
                , 'gps' : _data.gps
                , 'connected': _data.connected
                , 'updated_at': Date.now
            }};
        return this.updateOne( _query, _new_values, callback);
    });
    RoadSpotSchema.static('delete_by_number', function(_number, callback){
        return this.deleteOne( {number: _number}, callback);
    })
    return RoadSpotSchema;
};

module.exports = Schema;