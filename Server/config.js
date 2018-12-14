module.exports = {
    SERVER_PORT: 3389,
    HOST: 'http://49.236.134.66',
    // DB_URL: 'mongodb://49.236.134.66:27017/moAppDb',
    DB_URL: 'mongodb://localhost:27017/moAppDb',
    DB_SCHEMAS: [
        {file:'./Schemas/buildingSchema',
            collection: 'building',
            schemaName:'BuildingSchema',
            modelName:'BuildingModel'},
        {file:'./Schemas/roadSpotSchema',
            collection: 'roadSpot',
            schemaName:'RoadSpotSchema',
            modelName:'RoadSpotModel'},
    ],
    DB_MODEL_INFOS: {
        building: {
            name: {type: String, required:true}
            , number: {type: Number, required:true, unique: true}
            , gps: {
                latitude : {type:Number, required:true},
                longitude : {type:Number, required:true}
            }
            , created_at: {type: Date, index: {unique: false}, 'default': Date.now}
            , updated_at: {type: Date, index: {unique: false}, 'default': Date.now}
        },
        roadSpot: {
            number : {type:Number, required:true, unique:true}
            , gps: {
                latitude : {type:Number, required:true},
                longitude : {type:Number, required:true}
            }
            , isOnRoad : {type:Boolean, required:true}
            , connected: {type:Array, 'default':[]}
            , created_at: {type: Date, index: {unique: false}, 'default': Date.now}
            , updated_at: {type: Date, index: {unique: false}, 'default': Date.now}
        }
    },
    ROUTE_INFOS: [
        {file:'./Controller/buildingControl', path:'/building/:number', method:'add_building_info', type:'post'},
        {file:'./Controller/buildingControl', path:'/building', method:'get_building_infos', type:'get'},
        {file:'./Controller/buildingControl', path:'/building/:number', method:'get_building_info', type:'get'},
        {file:'./Controller/buildingControl', path:'/building/:number', method:'update_building_info', type:'put'},
        {file:'./Controller/buildingControl', path:'/building/:number', method:'delete_building_info', type:'delete'},

        {file:'./Controller/roadSpotControl', path:'/roadspot/:number', method:'add_roadSpot_info', type:'post'},
        {file:'./Controller/roadSpotControl', path:'/roadspot', method:'get_roadSpot_infos', type:'get'},
        {file:'./Controller/roadSpotControl', path:'/roadspot/:number', method:'get_roadSpot_info', type:'get'},
        {file:'./Controller/roadSpotControl', path:'/roadspot/:number', method:'update_roadSpot_info', type:'put'},
        {file:'./Controller/roadSpotControl', path:'/roadspot/:number', method:'delete_roadSpot_info', type:'delete'},

        {file:'./Controller/imageControl', path:'/images/:number', method: 'get_image', type:'get'}
    ]
}