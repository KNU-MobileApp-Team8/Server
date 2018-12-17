var fs = require('fs');

var get_image = function(req, res){
    console.log('# API called: Get building image');
    console.log('Headers: ', req.headers);

    buildingNumber = req.params.number;

    var img = fs.readFileSync('./Images/' + buildingNumber + '.PNG');
    res.writeHead(200, {'Content-Type': 'image/png' });
    res.end(img, 'binary');
}
module.exports.get_image = get_image;
