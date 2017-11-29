var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//User collection
reservas = new mongoose.Schema({
    idActivity:      {type: Schema.ObjectId, ref: 'activitiesmodel'},
    idUser:          {type: Schema.ObjectId, ref: 'usersmodel'},
    dateCreated:     {type: Date, default: new Date()},
    mount:           {type: Number},
    quantity:        {type: Number},
    codes:           {type: String},
    typePayment:     {type: String},
    wasPayment:      {type: Boolean, default: false},
    statusPayment:   {type: String},
    codeTransaction: {type: String},
    dateReserv:      {type: String},
    city:            {type: String},
    bankName:        {type: String},
    mailSend:        {type: Boolean, default: true},
    wasRedeem:       {type: Boolean, default: false},
});

module.exports = mongoose.model('reservasmodel',reservas);