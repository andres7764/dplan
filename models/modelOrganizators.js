var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//User collection
organizatorInfo = new mongoose.Schema({
    nameOrganization:    {type: String},
    idUsersResponsibles: {type: Object},
    codeRNT:             {type: String},
    imgCodeRNT:          {type: String}
});

module.exports = mongoose.model('organizatorInfo',organizatorInfo);