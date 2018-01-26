var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//User collection
organizatorInfo = new mongoose.Schema({
	_id: Schema.Types.ObjectId,
    nameOrganization:    {type: String},
    idUsersResponsibles: {type: Array },
    codeRNT:             {type: String},
    imgCodeRNT:          {type: String}
});

module.exports = mongoose.model('organizatorInfo',organizatorInfo);