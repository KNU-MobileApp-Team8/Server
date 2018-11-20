var Schema = {};

Schema.createSchema = function(mongoose) {
    // Set schema entity
    var BuildingSchema = mongoose.Schema({
        name: {type: String, required:true}
        , number: {type: Number, required:true, unique: true}
        , gps: {
            latitude : {type:Number, required:true},
            longitude : {type:Number, required:true}
        }
        , colleges: {type: Array, 'default': []}
        , description: {type: String, 'default':''}
        , created_at: {type: Date, index: {unique: false}, 'default': Date.now}
        , updated_at: {type: Date, index: {unique: false}, 'default': Date.now}
    });
    BuildingSchema.static('findAll', function(callback){
        return this.find({}, callback);
    });
    BuildingSchema.static('find_by_number', function(_number, callback){
        return this.find({number:_number}, callback);
    });
    BuildingSchema.static('find_by_name', function(_name, callback){
        return this.find({name:_name}, callback);
    });
    BuildingSchema.static('update_by_number', function(_number, _data, callback){
        var _query = { 'number': _number};
        var _new_values = { '$set':{
            'name': _data.name
            , 'number': _number
            , 'gps' : _data.gps
            , 'colleges' : _data.colleges
            , 'description' : _data.description
            , 'updated_at' : Date.now
        }};
        console.log(_number, _data);
        return this.updateOne( _query, _new_values, callback);
    });
    BuildingSchema.static('delete_by_number', function(_number, callback){
        return this.deleteOne( {number:_number}, callback);
    });

    return BuildingSchema;
};

module.exports = Schema;