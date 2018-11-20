var validChecker = {};

validChecker.check_content_type_json = function(headers){
    console.log('Check content type: ', headers['content-type']);
    var FLAG = false;
    types = headers['content-type'].split(';');
    for( var idx in types){
        if( types[idx].trim() == 'application/json'){
            FLAG = true;
            console.log(' -Type valid.');
            break;
        }
    }

    return FLAG;
}

validChecker.check_params_enough = function( required_number){
    if( params.length != required_number)
        return { code:400, message:'Insufficient parameters'};
    else return true;
}

validChecker.check_number_valid = function( required_number){
    if (!buildingNumber || isNaN(buildingNumber)){
        return res.status(400).json({error: 'Incorrect params or data.'}).end();
    }
    else return true;
}

module.exports = validChecker;