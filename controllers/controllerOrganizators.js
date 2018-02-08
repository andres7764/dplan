var mongoose = require('mongoose')
var organizators = mongoose.model('organizatorInfo');

exports.createOrganizator = function(req, res) {
	 var org = req.body;
	 	 org['_id'] = new mongoose.Types.ObjectId();
	 	 console.log(org);
    var newOrganizator = new organizators(org);
        newOrganizator.save(function(err, newActivity) {
        if (!err) {
          //if (!error) {return res.status(500).send({info: error}); }
          return res.status(200).send({info: 'Organizador Guardado'});
        }else {
            return res.status(500).send({info: err.message});
        }
    });
};