var Schema = {};

Schema.createSchema = function(mongoose) {
    // Set schema entity
    var RoadSpotSchema = mongoose.Schema({
        number : {type:Number, required:true, unique:true}
        , gps: {
            latitude : {type:Number, required:true},
            longitude : {type:Number, required:true}
        }
        , isOnRoad : {type:Boolean, required:true}
        , connected: {type:Array, 'default':[]}
        , created_at: {type: Date, index: {unique: false}, 'default': Date.now}
        , updated_at: {type: Date, index: {unique: false}, 'default': Date.now}
    });

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